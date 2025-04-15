const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  export { errorHandler };