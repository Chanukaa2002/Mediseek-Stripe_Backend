import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { handleCreatePaymentSession } from "./controllers/paymentController.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/payment-sheet", handleCreatePaymentSession);
app.get("/", (req, res) => {
  res.send("Hello wrold!");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runing => ${PORT}`);
});
