const r=require('express').Router();const c=require('../controllers/categoryController');const {protect,authorize}=require('../middleware/authMiddleware');
r.get('/',c.list);r.post('/',protect,authorize('admin'),c.create);r.patch('/:id',protect,authorize('admin'),c.update);r.delete('/:id',protect,authorize('admin'),c.remove);module.exports=r;
