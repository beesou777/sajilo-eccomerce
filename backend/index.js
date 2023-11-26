require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connect } = require("./db/connect");
const PORT = process.env.PORT || 8000;

// @desc routes declaration
const user = require("./routes/user.route");
const createCategory = require("./routes/category.routes");
const createProduct = require("./routes/product.routes");
const homepage = require("./routes/HomepageSection");
const ThemeSystem = require("./routes/themeRouter");
const Order = require("./routes/order.routes");

// @desc middleware declaration
const { errorHandler, notFound } = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const compression = require("compression");

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());
app.use(compression());


app.use("", user);
app.use("", createCategory);
app.use("", createProduct);
app.use("", homepage);
app.use("", ThemeSystem);
app.use("", Order);


app.use(errorHandler)
app.use(notFound)

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
