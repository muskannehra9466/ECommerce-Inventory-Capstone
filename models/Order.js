const mongoose = require('mongoose');
const schema = new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, items:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},name:String,quantity:Number,unitPrice:Number}],
 total:{type:Number,required:true,min:0}, deliveryAddress:{type:String,required:true}, paymentMethod:{type:String,enum:['cash-on-delivery','simulated'],default:'simulated'}, paymentStatus:{type:String,enum:['pending','paid','failed'],default:'pending'},
 status:{type:String,enum:['placed','processing','shipped','delivered','cancelled'],default:'placed'}
},{timestamps:true});
schema.index({user:1,createdAt:-1}); schema.index({status:1,createdAt:-1});
module.exports = mongoose.model('Order',schema);
