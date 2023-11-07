const User = require("../model/userDetails");


const createUser = async (req, res) => {
  try {
    const { user_id, store_name, email, full_name, profile_picture } = req.body;

    if (!email && !store_name && !full_name && !profile_picture && user_id) {
      return res.status(400).json({ error: "all feild are required!!" });
    }

    const checkUserExist = await User.findOne({ user_id });
    if (checkUserExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const createUser = new User({
      user_id,
      store_name,
      email,
      full_name,
      profile_picture,
    });

    await createUser.save();
    res
      .status(200)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};


const getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user_details = await User.find();

    let userFound = false;

    for(user of user_details){
      if(user.user_id == userId){
        userFound = true;
        res.json(user);
        break; 
      }
    }

    if (!userFound) {
      res.status(400).json({ message: "User does not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUser
};
