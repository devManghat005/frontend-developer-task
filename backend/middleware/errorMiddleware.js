export const notFound = (req, res, next) => {
  // Handles unknown routes
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // Sends a safe error response to the client
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
  });
};
