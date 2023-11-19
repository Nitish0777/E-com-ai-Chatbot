import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Import routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//middleware for error handling
app.use(errorMiddleware);

export default app;
