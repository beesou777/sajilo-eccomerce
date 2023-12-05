const Navbar = require("../model/Navbar.model")

const createNavbar = async (req,res,next)=>{
    try {
        const id = req.headers.user_id
        const {name,link} = req.body
        if(!name || !link){
            res.status(400)
            return next({
                message:"All field are required"
            })
        }
        const navbar = await Navbar({
            user:id,
            name,
            link
        })
        res.status(200).json({success:true,message:"successfully created",navbar})
    } catch (error) {
        next({
            message:"Internal server error"
        })
    }
}

const getNavbar = async (req,res,next)=>{
    try {
        const id = req.headers.user_id
        const navbar = await Navbar.find({user:id})
        if(!navbar){
            res.status(404)
            return next({
                message:"Navbar not found add"
            })
        }
        res.status(200).json({success:true,navbar})
    } catch (error) {
        next({
            message:"Internal server error"
        })
    }
}

const updateNavbar = async (req,res,next)=>{
    try {
        const id = req.params.id
        const {name,link} = req.body
        if(!name || !link){
            res.status(400)
            return next({
                message:"all are required"
            })
        }
        const navbar = await Navbar.findByIdAndUpdate(id,{
            name,
            link
        },{new:true})
        res.status(200).json({success:true,
            navbar,
            message:"successfully updated"})
    } catch (error) {
        next({
            message:"Internal server error"
        })
    }

}


const deleteNavbar = async(req,res,next)=>{
    try {
        const id =req.params.id
        const navbar = await Navbar.findByIdAndDelete({id})
        res.status(200).json({success:true,message:"successfully deleted",navbar})
    } catch (error) {
        next({
            message:"Internal server error"
        })
    }
}

module.exports = {
    createNavbar,
    getNavbar,
    updateNavbar,
    deleteNavbar
}