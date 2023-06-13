const jwt = require("jsonwebtoken");
const JWTsecret = "sakib@@";

const fetchuser = (req, res, next) => {
  // get the user id from jwt token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "login with valid token" });
  }
  try {
    const data = jwt.verify(token, JWTsecret);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: err });
  }
};
module.exports = fetchuser;
