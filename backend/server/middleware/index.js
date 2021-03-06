import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "MARKET-PLACE");
    const userId = decodedToken.userId;
    const exp = decodedToken.expiresIn;
    if (req.body.userId && req.body.userId !== userId) {
      if (Date.now() >= exp * 1000) {
        res.status(400).json({
          message: "Token timed out. Login again",
        });
      }
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: "User is unautorized",
    });
  }
};
