import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import connectToMongoDB from "./db/connectMongoDB.js";

const app = express();
const port = 5000;

dotenv.config();
app.use(express.json());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Server is running!!");
});
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
