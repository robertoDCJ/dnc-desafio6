import express, { Application } from "express";
import productsRoutes from "./routes/productsRoutes";
import stocksRoutes from "./routes/stocksRoutes";

const app: Application = express();

app.use(express.json());

app.use("/produtos", productsRoutes);
app.use("/estoques", stocksRoutes);

export default app;
