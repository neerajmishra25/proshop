const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRouter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();

const app = express();
connectDB();

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${PORT}`.yellow.bold));
