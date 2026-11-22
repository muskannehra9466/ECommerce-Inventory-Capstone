const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name:{type:String,required:true,unique:true,trim:true}, description:{type:String,default:''} },{timestamps:true});
schema.index({name:1},{unique:true}); module.exports = mongoose.model('Category',schema);
