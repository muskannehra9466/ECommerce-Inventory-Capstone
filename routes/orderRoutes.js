const r=require('express').Router();const c=require('../controllers/orderController');const {protect,authorize}=require('../middleware/authMiddleware');
r.post('/',protect,authorize('customer'),c.create);r.get('/my',protect,authorize('customer'),c.mine);r.get('/',protect,authorize('admin','seller'),c.all);r.patch('/:id/status',protect,authorize('admin','seller'),c.updateStatus);module.exports=r;
