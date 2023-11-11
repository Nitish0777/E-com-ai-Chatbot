import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database connected successfully`.cyan.underline);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
