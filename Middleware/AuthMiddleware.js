const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Please provide a valid Auth token"
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user"
        });
      }

      req.user = { id: decoded.id }; // ✅ Store token info safely here
      next();
    });

  } catch (err) {
    console.log("Auth middleware error:", err);
    return res.status(400).send({
      success: false,
      message: "Something went wrong in AuthMiddleware",
      error: err.message
    });
  }
};

