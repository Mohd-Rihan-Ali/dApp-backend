import express from "express";
import balanceRouter from "./routes/balance";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());

app.use("/api", balanceRouter);

app.listen(8800, () => {
  console.log("Server is running on http://localhost:8800");
});
