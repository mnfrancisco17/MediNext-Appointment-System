const JWT = require("jsonwebtoken");
// import { message } from "antd";

module.exports = async (req, res, next) => {
  try {
    // Corrected from req.header to req.headers
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({
            message: "Authentication Failed!",
            success: false,
          });
        } else {
          req.body.userId = decode.id;
          next();
        }
      });
    } else {
      return res.status(401).send({
        message: "Authorization header is missing",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "An error occurred during authentication",
      success: false,
    });
  }
};
