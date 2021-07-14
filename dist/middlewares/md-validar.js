"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarPassword = exports.validarNome = void 0;
var data_1 = require("../data");
function validarNome(request, response, next) {
    var name = request.body.name;
    if (!name) {
        return response.status(400).json({
            msg: "O nome deve ser informado",
        });
    }
    if (name.length < 3) {
        return response.status(400).json({
            msg: "O nome deve conter no minimo 3 caracteres",
        });
    }
    var existe = data_1.usersArray.find(function (f) {
        return f.userName === name;
    });
    if (existe) {
        return response.status(400).json({ msg: "Nome já Cadastrado" });
    }
    next();
}
exports.validarNome = validarNome;
function validarPassword(request, response, next) {
    var password = request.body.password;
    if (!password) {
        return response.status(400).json({
            msg: "Password dever ser informado corretamente",
        });
    }
    next();
}
exports.validarPassword = validarPassword;
