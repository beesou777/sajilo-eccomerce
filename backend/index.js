require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {connect} = require("./db/connect");
const PORT = process.env.PORT || 8000;
const user = require('./routes/user.route')
const createCategory = require("./routes/Category")
const createProduct= require("./routes/Product")
const homepage= require("./routes/HomepageSection")
const ThemeSystem = require("./routes/themeRouter")
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
app.use("",user)
app.use("",createCategory)
app.use("",createProduct)
app.use("",homepage)
app.use("",ThemeSystem)


const start = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
