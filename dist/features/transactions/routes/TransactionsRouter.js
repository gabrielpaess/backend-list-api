"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TransactionsController_1 = __importDefault(require("../controllers/TransactionsController"));
var TransactionRoutes = /** @class */ (function () {
    function TransactionRoutes() {
    }
    TransactionRoutes.prototype.init = function () {
        var routes = express_1.Router();
        var controller = new TransactionsController_1.default();
        routes.post("/transaction", controller.store);
        routes.get("/transaction", controller.index);
        routes.get("/transaction/:id", controller.show);
        return routes;
    };
    return TransactionRoutes;
}());
exports.default = TransactionRoutes;
