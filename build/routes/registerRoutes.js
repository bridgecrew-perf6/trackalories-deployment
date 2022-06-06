"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcrypt = require('bcrypt');
const registerRouter = express_1.default.Router();
registerRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = request.body;
    if (!password || password === undefined) {
        return response.status(400).json({ error: "Password field is wrong" });
    }
    else if (password.length < 3) {
        return response
            .status(400)
            .json({ error: "The password must have at least 3 characters of length" });
    }
    // ENCRIPTING PASSWORD
    const passwordHash = yield bcrypt.hashSync(password, config_1.SALT_ROUNDS);
    const newUser = new userSchema_1.default(Object.assign(Object.assign({}, request.body), { password: passwordHash }));
    try {
        yield newUser.save();
        return response.status(200).send("Registered");
    }
    catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }
}));
exports.default = registerRouter;
