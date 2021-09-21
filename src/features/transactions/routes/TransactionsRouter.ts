import { Router } from "express";
import TransactionsController from "../controllers/TransactionsController";

export default class TransactionRoutes {
  public init(): Router {
    const routes = Router();

    const controller = new TransactionsController();

    routes.post("/transaction", controller.store);
    routes.get("/transaction", controller.index);
    routes.get("/transaction/:id", controller.show);
    routes.delete("/transaction/:id", controller.delete);

    return routes;
  }
}
