"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var LoginUser = (function () {
    function LoginUser(userName, password) {
        this.id = uuid_1.v4();
        this.userName = userName;
        this.password = password;
    }
    return LoginUser;
}());
exports.default = LoginUser;
