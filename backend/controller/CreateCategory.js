const Category = require("../model/CreateCategory");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const slug = name.toLowerCase().replace(/\s/g, '-');

    const userId = req.headers.user_id;
    console.log(userId)
    const newCategory = new Category({
      owner: userId,
      name,
      image: result.url,
      slug
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
    const userId = req.params.id
    const categories = await Category.find({owner:userId}).select("-owner")

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
    await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: "Successfully deleted product" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const file =req.files && req.files.image;
    const { name } = req.body;

    if (!file) {
      await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
    } else {
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      await Category.findByIdAndUpdate(
        id,
        { name, image: result.url },
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
