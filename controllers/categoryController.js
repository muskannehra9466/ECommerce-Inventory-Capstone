const Category=require('../models/Category'); const asyncHandler=require('../middleware/asyncHandler');
exports.list=asyncHandler(async(req,res)=>res.json({success:true,data:await Category.find().sort({name:1})}));
exports.create=asyncHandler(async(req,res)=>{if(!req.body.name)return res.status(400).json({success:false,message:'Category name required'});res.status(201).json({success:true,data:await Category.create(req.body)});});
exports.update=asyncHandler(async(req,res)=>{const c=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!c)return res.status(404).json({success:false,message:'Category not found'});res.json({success:true,data:c});});
exports.remove=asyncHandler(async(req,res)=>{const c=await Category.findByIdAndDelete(req.params.id);if(!c)return res.status(404).json({success:false,message:'Category not found'});res.json({success:true,message:'Category deleted'});});
