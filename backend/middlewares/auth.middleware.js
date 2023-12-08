const jwt = require("jsonwebtoken")
const User = require("../model/user.model")
const Customer = require("../model/customer.model")
const protect = async (req, res, next) => {
  let token;
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
      token = req.headers.authorization.split(" ")[1]
      const decode  = jwt.verify(token,process.env.JWT_SECRET_KEY || null)
      req.user = await User.findById(decode.sub).select("-password")
      if(!req.user || req.user == null){
        res.status(404)
        throw new Error("user is not found")
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(403).json({message:"Not Authorized,no token"})
    }
  }
};

const protectCustomer = async (req, res, next) => {
  let token;
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try {
      token = req.headers.authorization.split(" ")[1]
      const decode  = jwt.verify(token,process.env.JWT_SECRET_KEY || "")
      req.user = await Customer.findById(decode.sub).select("-password")
      if(!req.user || req.user == null){
        res.status(404)
        throw new Error("user is not found")
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(403).json({message:"Not Authorized,no token"})
    }
  }
};

const isAdmin = (req,res,next)=>{
  if(req.user && (req.user.role == "user" || req.user.role == "admin") ){
    next()
  }else{
    res.status(403)
    throw new Error("User is not authenticated")
  }
}

module.exports = 
{
  protect,
  isAdmin,
  protectCustomer
}
