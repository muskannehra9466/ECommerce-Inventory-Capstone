const r=require('express').Router();const c=require('../controllers/cartController');const {protect,authorize}=require('../middleware/authMiddleware');
r.use(protect,authorize('customer'));r.get('/',c.get);r.post('/items',c.add);r.delete('/items/:productId',c.remove);module.exports=r;
