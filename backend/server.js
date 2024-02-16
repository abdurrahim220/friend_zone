import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import messageRoute from "./routes/message.js";
import userRoute from "./routes/user.js";
import connectToMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Server is running!!");
});
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
