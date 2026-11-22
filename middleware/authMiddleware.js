const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req,res,next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return res.status(401).json({ success:false, message:'Authorization token required' });
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select('-password -refreshTokenHash');
    if (!req.user || !req.user.isActive) return res.status(401).json({ success:false, message:'User not found or inactive' });
    next();
  } catch (e) { return res.status(401).json({ success:false, message:'Invalid or expired access token' }); }
};
exports.authorize = (...roles) => (req,res,next) => roles.includes(req.user.role) ? next() : res.status(403).json({ success:false, message:'Forbidden: insufficient role permissions' });
