const checkUserIdCookie = (req, res, next) => {
  const userIdCookie = req.headers.access_token
  if (userIdCookie) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const checkUser = (req, res, next) => {
  const user = req.headers.user_id
  if (user) {
    next();
  } else {
    res.status(401).json({ message: "user not found" });
  }
};


module.exports = {checkUserIdCookie,checkUser}
