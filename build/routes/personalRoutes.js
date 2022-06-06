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
const personalRouter = express_1.default.Router();
personalRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = request.body;
    const returnedUser = yield userSchema_1.default.findById(userID);
    let { username, email, activity, height, weight } = returnedUser;
    if (!returnedUser || returnedUser === undefined) {
        return response.status(404).json({ error: "No data" });
    }
    try {
        return response.status(200).json({ username: username, email: email, activity: activity, height: height, weight: weight });
    }
    catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }
}));
personalRouter.put('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let { userID, username, email, password, activity } = request.body;
    const returnedUser = yield userSchema_1.default.findById(userID);
    if (!returnedUser || returnedUser === undefined) {
        return response.status(404).json({ error: "No data" });
    }
    if (password !== undefined)
        password = yield bcrypt.hashSync(password, config_1.SALT_ROUNDS);
    yield userSchema_1.default.findByIdAndUpdate(userID, {
        username: username,
        email: email,
        activity: activity,
        password
    }, { runValidators: true });
    try {
        return response.status(200).send('Done!');
    }
    catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }
}));
exports.default = personalRouter;
