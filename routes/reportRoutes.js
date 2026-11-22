const r=require('express').Router();const c=require('../controllers/reportController');const {protect,authorize}=require('../middleware/authMiddleware');
r.use(protect,authorize('admin','seller'));r.get('/sales',c.sales);r.get('/inventory',c.inventory);r.get('/low-stock',c.lowStock);module.exports=r;
