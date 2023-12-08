const Product = require("../model/product.model");
const User = require("../model/user.model");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const postProduct = async (req, res) => {
  try {
    const {
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
      return res.status(400).json({ error: "Please fill all forms" });
    }
    const createProduct = new Product({
      user: req.headers.user_id,
      product_name,
      product_description,
      product_images: result1.url,
      product_sku,
      selling_price,
      status,
      quantity,
      actual_price,
      product_category,
    });
    await createProduct.save();
    res
      .status(200)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getAllProducts = async (req, res,next) => {
  try {
    let currentUser;

    if (req.headers.user_id) {
      currentUser = req.headers.user_id;
    } else if (req.headers.url) {
      let domain = req.headers.url.trim().split('/')[1]
      const user = await User.findOne({ sub_domain: domain });
      if (user) {
        currentUser = user._id.valueOf();
      } else {
        res.status(404);
        return next({ message: "User not found for the provided sub_domain" });
      }
    } else {
      res.status(400);
      return next({ message: "Missing user identifier in headers" });
    }
    // product searching
    const keyword = req.query.search
      ? {
          $or: [
            {
              product_name: {
                $regex: req.query.search.trim(),
                $options: "i",
              },
            },
            {
              product_sku: {
                $regex: req.query.search.trim(),
                $options: "i",
              },
            },
          ],
        }
      : {};
    const products = await Product.find({ user:currentUser, ...keyword })
      .select("-user")
      .populate({
        path: "product_category",
        select: "name image",
      });
    if (!products || products.length == 0) {
      return res
        .status(404)
        .json({ success: true, message: "product not found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error fetching products", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate({
        path: "product_category",
        select: "-user",
      })
      .select("-user");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log("Error fetching product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProductById = async (req, res) => {
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

    const updatedProduct = await Product.findByIdAndUpdate(
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
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Successfully deleted product" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSubDomainProduct = async (req, res) => {
  try {
    const getSubDomain = req.params.id;
    const getUser = await User.findOne({ sub_domain: getSubDomain });

    if (!getUser) {
      return res.status(404).json({ message: "page not found" });
    }
    const product = await Product.find({ user: getUser });
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  getSubDomainProduct,
};
