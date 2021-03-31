const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const uploadRouter = require("./routes/uploadRouter");
const path = require("path");
const morgan = require("morgan");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/uploads", uploadRouter);

app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "..frontend/build/index.html"))
	);
}
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${PORT}`.yellow.bold));
