const bcrypt = require('bcryptjs'); const jwt = require('jsonwebtoken'); const crypto = require('crypto');
const User = require('../models/User'); const asyncHandler = require('../middleware/asyncHandler');
const signAccess = user => jwt.sign({id:user._id,role:user.role},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES||'15m'});
const signRefresh = user => jwt.sign({id:user._id},process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRES||'7d'});
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
exports.register = asyncHandler(async(req,res)=>{
 const {name,email,password,role}=req.body; if(!name||!email||!password) return res.status(400).json({success:false,message:'name, email and password are required'});
 if(password.length<6) return res.status(400).json({success:false,message:'Password must contain at least 6 characters'});
 if(role && role!=='customer') return res.status(403).json({success:false,message:'Public registration is limited to customer role'});
 if(await User.findOne({email})) return res.status(409).json({success:false,message:'Email already registered'});
 const user=await User.create({name,email,password:await bcrypt.hash(password,12),role:'customer'});
 const accessToken=signAccess(user), refreshToken=signRefresh(user); user.refreshTokenHash=hash(refreshToken); await user.save();
 res.status(201).json({success:true,data:{user:{id:user._id,name:user.name,email:user.email,role:user.role},accessToken,refreshToken}});
});
exports.login = asyncHandler(async(req,res)=>{
 const {email,password}=req.body; const user=await User.findOne({email}).select('+password');
 if(!user || !await bcrypt.compare(password||'',user.password)) return res.status(401).json({success:false,message:'Invalid email or password'});
 const accessToken=signAccess(user), refreshToken=signRefresh(user); user.refreshTokenHash=hash(refreshToken); await user.save();
 res.json({success:true,data:{user:{id:user._id,name:user.name,email:user.email,role:user.role},accessToken,refreshToken}});
});
exports.refresh = asyncHandler(async(req,res)=>{
 const {refreshToken}=req.body; if(!refreshToken) return res.status(400).json({success:false,message:'refreshToken is required'});
 const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET); const user=await User.findById(decoded.id).select('+refreshTokenHash');
 if(!user || user.refreshTokenHash!==hash(refreshToken)) return res.status(401).json({success:false,message:'Refresh token invalid or revoked'});
 const accessToken=signAccess(user), newRefresh=signRefresh(user); user.refreshTokenHash=hash(newRefresh); await user.save();
 res.json({success:true,data:{accessToken,refreshToken:newRefresh}});
});
exports.logout = asyncHandler(async(req,res)=>{ await User.findByIdAndUpdate(req.user._id,{$unset:{refreshTokenHash:1}}); res.json({success:true,message:'Logged out; refresh token revoked'}); });
exports.me = asyncHandler(async(req,res)=>res.json({success:true,data:req.user}));
