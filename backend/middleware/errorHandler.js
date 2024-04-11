const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : "Something went wrong",
  });
};

export default errorHandler;
