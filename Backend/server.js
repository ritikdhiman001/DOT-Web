import express from "express";
import "dotenv/config";
import routes from "./src/routes/userRoute.js";
import cors from "cors";
import paymentRoutes from "./src/routes/payment.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is Running ${process.env.PORT}`),
);
