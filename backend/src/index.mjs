import express from "express";
import cors from "cors";
import "dotenv/config";
import chatsRouter from './routes/chatsRouter.mjs';
import { connectDB } from "./services/db.mjs";

const app = express();
app.use(cors());
app.use(express.json());
await connectDB();

app.use('/chats', chatsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, "0.0.0.0", async () => {
  console.log("Server running on port 3000");
});