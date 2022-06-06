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
const bcrypt = require('bcrypt');
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const jwt = require("jsonwebtoken");
const loginRouter = express_1.default.Router();
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const returnedUser = yield userSchema_1.default.find({ email: email });
    if (returnedUser.length === 0 || !returnedUser || returnedUser === undefined) {
        return response.status(404).json({ error: "No data in the DB" });
    }
    let user = returnedUser[0];
    const passwordCorrect = user === null ? false :
        yield bcrypt.compare(password, user.password);
    let userToken;
    if (passwordCorrect)
        userToken = {
            username: user.username,
            id: user._id,
        };
    const token = jwt.sign(userToken, config_1.SECRET, {
        expiresIn: 60 * 60 * 24 * 5,
    });
    try {
        return response.status(200).json({
            username: user.username,
            email: user.email, activity: user.activity, height: user.height, weight: user.weight,
            token
        });
    }
    catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
}));
exports.default = loginRouter;
