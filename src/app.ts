import express, { Application } from "express";
import produtosRoutes from "./routes/produtosRoutes";

const app: Application = express();

app.use(express.json());

app.use("/produtos", produtosRoutes);

export default app;
