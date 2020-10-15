import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "./model/admin";

const signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      user.save();
      const token = jwt.sign({ userId: user._id }, "MARKET-PLACE", {
        expiresIn: "12h",
      });

      return res.status(200).json({
        message: "Succesful account creation",
        name: user.name,
        email: user.email,
        token: token,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).json({
        message: "An error occured in account creaton",
      });
    });
};

const login = (req, res, next) => {
  Admin.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User not found",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status("401").json({
              error: new Error("Incorrect password try again"),
            });
          }
          const token = jwt.sign({ userId: user._id }, "MARKET-PLACE", {
            expiresIn: "12h",
          });
          res.status(200).json({
            message: "Login was successful",
            name: user.name,
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error: new Error("error occured. We will fix it."),
          });
        });
    })
    .catch((error) => {
      return res.status(400).json({
        error: new Error("error occured. We will fix it."),
      });
    });
};

export { signUp, login };
