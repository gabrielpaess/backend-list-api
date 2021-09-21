"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
var typeorm_1 = require("typeorm");
var UserRoutes_1 = __importDefault(require("../../../../features/user/routes/UserRoutes"));
var User_1 = require("./User");
var Transactions = /** @class */ (function (_super) {
    __extends(Transactions, _super);
    function Transactions(title, value, description, idOwner) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.value = value;
        _this.description = description;
        _this.idOwner = idOwner;
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Transactions.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: "title" }),
        __metadata("design:type", String)
    ], Transactions.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ name: "value" }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "value", void 0);
    __decorate([
        typeorm_1.Column({ name: "description" }),
        __metadata("design:type", String)
    ], Transactions.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ name: "id_owner" }),
        __metadata("design:type", Number)
    ], Transactions.prototype, "idOwner", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.transactions; }),
        typeorm_1.JoinColumn({ name: "id_owner", referencedColumnName: "id" }),
        __metadata("design:type", UserRoutes_1.default)
    ], Transactions.prototype, "user", void 0);
    Transactions = __decorate([
        typeorm_1.Entity({ name: "transactions" }),
        __metadata("design:paramtypes", [String, Number, String, Number])
    ], Transactions);
    return Transactions;
}(typeorm_1.BaseEntity));
exports.Transactions = Transactions;
