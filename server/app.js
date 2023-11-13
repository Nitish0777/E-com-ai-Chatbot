import express from "express";
import productRoute from "./routes/productRoute.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());

// Import routes
app.use("/api/v1", productRoute);

//middleware for error handling
app.use(errorMiddleware);

export default app;
