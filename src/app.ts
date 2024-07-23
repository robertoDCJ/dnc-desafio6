import express, { Application } from "express";
import clientsRoutes from "./routes/clientsRoutes";
import productsRoutes from "./routes/productsRoutes";
import stocksRoutes from "./routes/stocksRoutes";

const app: Application = express();

app.use(express.json());

app.use("/produtos", productsRoutes);
app.use("/estoques", stocksRoutes);
app.use("/clientes", clientsRoutes);

export default app;
