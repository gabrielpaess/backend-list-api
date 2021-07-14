"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var md_validar_1 = require("./middlewares/md-validar");
var data_1 = require("./data");
var user_1 = __importDefault(require("./classes/user"));
var message_1 = __importDefault(require("./classes/message"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", function (request, response) {
    return response.send("Pagina Principal");
});
app.post("/signin", md_validar_1.validarNome, md_validar_1.validarPassword, function (request, response) {
    var _a = request.body, name = _a.name, password = _a.password;
    var user = new user_1.default(name, password);
    data_1.usersArray.push(user);
    return response.status(200).json({ msg: "Cadastrado com sucesso" });
});
app.post("/login", function (request, response) {
    var _a = request.body, name = _a.name, password = _a.password;
    var user = data_1.usersArray.find(function (f) {
        if (f.userName === name && f.password === password)
            return f;
    });
    if (!user) {
        return response.status(404).json({
            msg: "Usuário e Senha estão errados",
        });
    }
    return response.status(200).json(true);
});
app.get("/messages", function (request, response) {
    return response.json({
        List: data_1.listArray
    });
});
var item = 0;
app.post("/message", function (request, response) {
    var _a = request.body, title = _a.title, detail = _a.detail;
    item += +1;
    var list = new message_1.default(item, title, detail);
    data_1.listArray.push(list);
    return response.status(200).json({ msg: "Cadastrado da Message com sucesso" });
});
app.put("/message/:item", function (request, response) {
    var item = request.params.item;
    var _a = request.body, title = _a.title, detail = _a.detail;
    var itemInt = parseInt(item);
    var list = data_1.listArray.find(function (f) {
        return f.id === itemInt;
    });
    if (!list) {
        return response.status(404).json({
            msg: "Message não encontrado",
        });
    }
    list.title = title;
    list.detail = detail;
    return response.status(200).json({
        success: true,
        msg: "Mensagem Atualizado com Sucesso"
    });
});
app.delete("/message/:item", function (request, response) {
    var item = request.params.item;
    var itemInt = parseInt(item);
    var indice = data_1.listArray.findIndex(function (f) {
        return f.id === itemInt;
    });
    if (indice === -1) {
        return response.status(404).json({
            msg: "Item não encontrado",
        });
    }
    data_1.listArray.splice(indice, 1);
    return response.status(200).json({ msg: "delete" });
});
app.listen(process.env.PORT || 3000);
