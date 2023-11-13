import app from "./app.js";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/database.js";

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.red);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "server/.env" });

// Connect to database
connectDB();

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${process.env.PORT}`.white.bgGreen);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
