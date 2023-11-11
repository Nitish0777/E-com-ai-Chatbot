import app from "./app.js";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/database.js";

dotenv.config({ path: "server/.env" });

// Connect to database
connectDB();

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${process.env.PORT}`.white.bgGreen);
});
