import express from "express";
import productRoute from "./routes/productRoute.js";

const app = express();

app.use(express.json());

// Import routes
app.use("/api/v1", productRoute);

export default app;
