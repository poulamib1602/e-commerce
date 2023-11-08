const express = require('express');
const logger = require('./logger');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./route/user");
const authRouter = require("./route/auth");
const productRouter = require("./route/product");
const cartRouter = require("./route/cart");
const orderRouter = require("./route/order");


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);

});