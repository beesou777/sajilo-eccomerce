require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./db/connect");
const PORT = process.env.PORT || 8000;
const userDetails = require('./routes/CreateUser')
const createCategory = require("./routes/CreateCategory")
const createProduct= require("./routes/CreateProduct")
const homepage= require("./routes/HomepageSection")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const compression = require("compression")

app.use(cors());
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles:true
}))
app.use(express.json());
app.use(compression())
app.use("",userDetails)
app.use("",createCategory)
app.use("",createProduct)
app.use("",homepage)

const start = async () => {
  try {
    await connectdb(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
