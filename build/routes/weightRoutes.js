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
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const weightRouter = express_1.default.Router();
weightRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = request.body;
    const returnedUser = yield userSchema_1.default.findById(userID);
    let weight = returnedUser.weight;
    if (!returnedUser || returnedUser === undefined) {
        return response.status(404).json({ error: "No data" });
    }
    try {
        return response.status(200).json(weight);
    }
    catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }
}));
weightRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, date, userID } = request.body;
    const user = yield userSchema_1.default.findById(userID);
    const lastWeight = user.weight[user.weight.length - 1].date;
    if (date == lastWeight) {
        return response.status(400).json({ error: "Only one weight post per day" });
    }
    user.weight = user.weight.concat({ date: date, weight: weight });
    try {
        yield userSchema_1.default.updateOne({ _id: userID }, { weight: user.weight });
        return response.status(200).json({ username: user.username, weight: user.weight });
    }
    catch (error) {
        console.log(error);
        return response.status(400);
    }
}));
exports.default = weightRouter;
