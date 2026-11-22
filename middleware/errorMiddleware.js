exports.notFound = (req,res) => res.status(404).json({ success:false, message:`Route not found: ${req.originalUrl}` });
exports.errorHandler = (err,req,res,next) => {
  console.error(err.stack || err);
  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : err.name === 'CastError' ? 400 : 500);
  res.status(status).json({ success:false, message: err.message || 'Internal server error', ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}) });
};
