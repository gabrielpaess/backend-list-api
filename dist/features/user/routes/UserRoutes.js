"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var AutorRoutes = /** @class */ (function () {
    function AutorRoutes() {
    }
    AutorRoutes.prototype.init = function () {
        var routes = express_1.Router();
        var controller = new UserController_1.default();
        routes.post("/user", controller.store);
        routes.get("/user", controller.index);
        routes.get("/user/:id", controller.show);
        routes.delete("/user/:id", controller.delete);
        routes.put("/user/:id", controller.update);
        return routes;
    };
    return AutorRoutes;
}());
exports.default = AutorRoutes;
