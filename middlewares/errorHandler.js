export default function errorHandler(err, req, res, next) {
  console.log(process.env.ENVIRONMENT);

  return res.status(500).json({
    message: "Error Server",
    error:
      process.env.ENVIRONMENT === "development"
        ? err.message
        : "Error Server Internal",
  });
}
