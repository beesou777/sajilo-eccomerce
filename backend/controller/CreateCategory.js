const User = require("../model/CreateCategory");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const createCategory = async (req, res) => {
  const { user, category_name } = req.body;
  try {
    const file = req.files.category_images;
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const newCategory = new User({
      user,
      category_name,
      category_images: result.url,
    });
    await newCategory.save();

    res.status(200).json({ success: true, message: newCategory });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const getCategories = async (req, res) => {
  try {
    const userId = req.headers["user-id"]
    const categories = await User.find({ user: userId });
    if (!categories) {
      return res.status(400).json({ message: "user id not found" });
    }
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteCategories = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Successfully deleted product" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const file =req.files && req.files.category_images;
    const { category_name } = req.body;

    if (!file) {
      await User.findByIdAndUpdate(
        id,
        { category_name },
        { new: true }
      );
    } else {
      const result = await cloudinary.uploader.upload(file.tempFilePath);

      await User.findByIdAndUpdate(
        id,
        { category_name, category_images: result.url },
        { new: true }
      );
    }

    res.status(200).json({ msg: "Successfully updated product" });
  } catch (error) {
    console.log("Error updating category", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createCategory,
  getCategories,
  deleteCategories,
  editCategories,
};
