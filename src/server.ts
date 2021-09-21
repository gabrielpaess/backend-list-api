import express from "express";

import Database from "./core/data/connections/Database";
import UserRoutes from "./features/user/routes/UserRoutes";
import TransactionRoutes from "./features/transactions/routes/TransactionsRouter";
import cors from "cors";

const app = express();
// Receber json no corpo da Requisição
app.use(express.json());
app.use(cors());

// Vincular as rotas
const userRoutes = new UserRoutes().init();
const transactionRoutes = new TransactionRoutes().init();
app.use(userRoutes, transactionRoutes);

const init = async () => {
  await new Database().openConnection();
  app.listen(process.env.PORT || 3000, () => {
    console.log("Rodando");
  });
};

init();
