"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = __importDefault(require("../controllers/firebase"));
const router = express_1.default.Router();
router.post('/register', firebase_1.default.register);
router.post('/snippet', firebase_1.default.useSnippet);
router.post('/login', firebase_1.default.login);
exports.default = router;
