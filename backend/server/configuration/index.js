import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected");
    })
    .catch(() => {
      console.log("Connection to server failed");
    });
};

export default dbConnect;
