import { Router } from "express";
import UserController from "../controllers/UserController";

export default class AutorRoutes {
  public init(): Router {
    const routes = Router();

    const controller = new UserController();

    routes.post("/user", controller.store);
    routes.get("/user", controller.index);
    routes.get("/user/:id", controller.show);
    routes.delete("/user/:id", controller.delete);
    routes.put("/user/:id", controller.update);

    return routes;
  }
}
