const jwt = require("jsonwebtoken");

//Tạo token cho user
function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token === null)
    return res
      .status(401)
      .json({ success: false, message: "No access token provided" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: err });

    //Kiểm tra đúng user
    req.user = user.id._id;

    next();
  });
}

module.exports = authenticateToken;
