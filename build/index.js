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
const config_1 = require("./config/config");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
const mealsRoutes_1 = __importDefault(require("./routes/mealsRoutes"));
const weightRoutes_1 = __importDefault(require("./routes/weightRoutes"));
const personalRoutes_1 = __importDefault(require("./routes/personalRoutes"));
const tokenExtractor = require('./utils/tokenExtractor');
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const pingRoutes_1 = __importDefault(require("./routes/pingRoutes"));
const eliminateUserRoutes_1 = __importDefault(require("./routes/eliminateUserRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('build'));
app.use('/ping', pingRoutes_1.default);
app.use('/api/login', loginRoutes_1.default);
app.use('/api/register', registerRoutes_1.default);
app.use(tokenExtractor);
app.use('/api/eliminate', eliminateUserRoutes_1.default);
app.use('/api/meals', mealsRoutes_1.default);
app.use('/api/personal', personalRoutes_1.default);
app.use('/api/weight', weightRoutes_1.default);
connectMDB().catch(err => console.log(err));
function connectMDB() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to MongoDB
        yield (0, mongoose_1.connect)(`${config_1.MONGO}`);
        console.log('Connected To MongoDB');
    });
}
app.listen(config_1.PORT, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Server running on port ${config_1.PORT}`);
});
