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
const entrySchema_1 = __importDefault(require("../schemas/entrySchema"));
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const mealsRouter = express_1.default.Router();
mealsRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = request.body;
    const meals = yield entrySchema_1.default.find({ user: userID }).populate("user", { username: 1 });
    response.status(200).json(meals);
}));
mealsRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, userID, data } = request.body;
    const meal = yield entrySchema_1.default.find({ date: date, user: userID });
    if (meal.length > 0) {
        meal[0].data = meal[0].data.concat(data);
        try {
            yield meal[0].save();
            return response.status(200).json(meal[0]);
        }
        catch (error) {
            console.log(error);
            return response.status(400);
        }
    }
    const mealEntry = new entrySchema_1.default(Object.assign(Object.assign({}, request.body), { user: userID }));
    const user = yield userSchema_1.default.findById(userID);
    user.entries = user.entries.concat(mealEntry._id);
    try {
        yield mealEntry.save();
        yield user.save();
        return response.status(200).json(mealEntry);
    }
    catch (error) {
        console.log(error);
        return response.status(400);
    }
}));
exports.default = mealsRouter;
