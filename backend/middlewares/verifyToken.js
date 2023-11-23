const jwt = require("jsonwebtoken")
const User = require("../model/user.model")
const protect = async (req, res, next) => {
  let token;
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
      token = req.headers.authorization.split(" ")[1]
      const decode  = jwt.verify(token,process.env.JWT_SECRET_KEY || "")
      req.user = await User.findById(decode.id).select("-password")
      next()
    } catch (error) {
      console.log(error)
      res.status(403).json({message:"Not Authorized,no token"})
    }
  }
};



module.exports = 
{
  protect
}
