const jwt = require("jsonwebtoken");

//Tạo token cho user
function authenticateToken(req, res, next) {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split("")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    //Kiểm tra đúng user
    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
