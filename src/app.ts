import express, { Application } from "express";
import clientsRoutes from "./routes/clientsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import productsRoutes from "./routes/productsRoutes";
import stocksRoutes from "./routes/stocksRoutes";

const app: Application = express();

app.use(express.json());

app.use("/produtos", productsRoutes);
app.use("/estoques", stocksRoutes);
app.use("/clientes", clientsRoutes);
app.use("/pedidos", ordersRoutes);

export default app;
