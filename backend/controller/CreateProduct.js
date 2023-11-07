const User = require("../model/CreateProduct");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const createProduct = async (req, res) => {
  try {
    const {
      user,
      product_name,
      product_description,
      selling_price,
      actual_price,
      quantity,
      product_sku,
      status, 
      product_category,
    } = req.body;

    const file1 = req.files.product_images;
    const result1 = await cloudinary.uploader.upload(file1.tempFilePath);
 
    if (!product_name && !status && !actual_price) {
      return res.status(400).json({ error: "those fields are required!!" });
    }
    const createProduct = new User({
      user,
      product_name,
      product_description,
      product_images:result1.url,
      product_sku,
      selling_price,
      status,
      quantity,
      actual_price,
      product_category,
    });

    console.log(createProduct)
    // await createProduct.save();
    // res
    //   .status(200)
    //   .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await User.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error fetching products", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await User.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log("Error fetching product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    product_images,
    product_category,
    quantity,
    selling_price,
    actual_price,
    product_sku,
    status,
  } = req.body;
  try {
    const updatedProduct = await User.findByIdAndUpdate(
      id,
      {
        product_name,
        selling_price,
        quantity,
        product_sku,
        status,
        product_images,
        product_category,
        actual_price,
      },
      { new: true }
    );
    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.log("Error updating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Successfully deleted product" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
