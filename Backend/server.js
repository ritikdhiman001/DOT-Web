import express from "express";
import "dotenv/config";
import routes from "./src/routes/userRoute.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(process.env.PORT, () =>
  console.log(`Server is Running ${process.env.PORT}`),
);
