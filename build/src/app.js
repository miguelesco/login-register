"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path2Client = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = require('path');
var cors = require('cors');
// Get path of login page
const path2Client = path.join(__dirname + '/client/index.html');
exports.path2Client = path2Client;
const app = express_1.default();
exports.app = app;
// Load routes files
const firebase_1 = __importDefault(require("./routes/firebase"));
// middlewares
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.disable('x-powered-by');
app.set("view engine", "ejs");
// CORS
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // tslint:disable-next-line: max-line-length
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Client
app.use(express_1.default.static(path.join(__dirname, "client")));
// Routes
app.use('/api', firebase_1.default);
