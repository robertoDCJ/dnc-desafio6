import express, { Application } from "express";
import productsRoutes from "./routes/productsRoutes";

const app: Application = express();

app.use(express.json());

app.use("/produtos", productsRoutes);

export default app;
