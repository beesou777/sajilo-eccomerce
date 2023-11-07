const checkUserIdCookie = (req, res, next) => {
  const userIdCookie = req.headers.access_token
  if (userIdCookie) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {checkUserIdCookie}
