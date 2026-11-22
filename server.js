require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { setIO } = require('./services/socket');
const eventBus = require('./services/eventBus');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_ORIGIN || '*', methods: ['GET','POST'] } });
setIO(io);
io.on('connection', socket => {
  socket.on('join-user-room', userId => { if (userId) socket.join(`user:${userId}`); });
  socket.on('disconnect', () => {});
});
eventBus.on('order-placed', order => io.to(`user:${order.user}`).emit('order-status', { orderId: order._id, status: order.status }));
eventBus.on('stock-low', product => io.emit('low-stock-alert', { productId: product._id, name: product.name, stock: product.stock }));

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
app.get('/api/health', (req,res) => res.json({ success:true, message:'E-Commerce Inventory API is running', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`))).catch(err => { console.error('Database connection failed:', err.message); process.exit(1); });
module.exports = { app, server };
