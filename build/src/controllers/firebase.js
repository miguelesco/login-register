"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = __importStar(require("./../services/firebase"));
const app_1 = require("../app");
const fs = require('fs');
exports.default = {
    /**
     * Logs In an user, and returns his data
     * @param req Request
     * @param resp Response
     */
    login(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, password, type } = req.body;
                // Verification of id, password and type
                if (!id || typeof id !== 'string') {
                    return resp.status(400).send('Id of user missing or incorrect');
                }
                if (!type || typeof type !== 'string') {
                    return resp.status(400).send('Type of user missing or incorrect');
                }
                if (!password || typeof password !== 'string' || password.length < 6) {
                    return resp.status(400).send('Password of user missing or incorrect');
                }
                // Log In the user
                const userData = yield firebase.login({ id, password, type });
                if (!userData) {
                    return resp.status(404).send('User not found');
                }
                delete userData.password;
                return resp.status(200).send(userData);
            }
            catch (err) {
                console.log(err);
                return resp.status(500).send({
                    message: 'Ha ocurrido un error',
                    err
                });
            }
        });
    },
    /**
     * Create an account of the user, set credentials and returns the script if needed
     * @param req Request
     * @param resp Response
     */
    register(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, data, password } = req.body;
                // Verification of password
                if (!password || typeof password !== 'string' || password.length < 6) {
                    return resp.status(400).send('Password of user missing or incorrect');
                }
                let newUserData;
                switch (type) {
                    case 'professional':
                        // Verification of Professional data 
                        if (!isProDataType()) {
                            return resp.status(400).send('Data of professional user missing or incorrect');
                        }
                        // Register user
                        newUserData = yield firebase.register({ type, data, password });
                        break;
                    case 'particular':
                        // Verification of Professional data 
                        if (!isPartDataType()) {
                            return resp.status(400).send('Data of particular user missing or incorrect');
                        }
                        // Register user
                        newUserData = yield firebase.register({ type, data, password });
                        break;
                    default:
                        return resp.status(400).send('Type of user missing or incorrect');
                }
                delete newUserData.password;
                return resp.status(200).send(newUserData);
                function isProDataType() {
                    const { website, url1, message1, url2, message2 } = data;
                    return typeof website === 'string' && typeof url1 === 'string' && typeof message1 === 'string';
                }
                function isPartDataType() {
                    const { gender, age, location } = data;
                    return typeof location === 'string' && typeof gender === 'string' && typeof age === 'number';
                }
            }
            catch (err) {
                return resp.status(500).send({
                    message: 'Ha ocurrido un error',
                    err
                });
            }
        });
    },
    /**
     * Uses the snippet and returns the login page
     * @param req Request
     * @param resp Response
     */
    useSnippet(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { apiKey, id } = req.body;
                // Verification of apikey and id
                if (!apiKey || typeof apiKey !== 'string') {
                    return resp.status(400).send('Apikey of professional user missing or incorrect');
                }
                if (!id || typeof id !== 'string') {
                    return resp.status(400).send('ID of professional user missing or incorrect');
                }
                // Get User Data
                let dataUser = yield firebase.getUser(id, 'professional');
                if (!dataUser) {
                    return resp.status(404).send('Professional user not found');
                }
                dataUser.data = dataUser.data;
                // Verification of apikey
                if (dataUser.data.apiKey !== apiKey) {
                    return resp.status(400).send('Invalid ApiKey');
                }
                return resp.status(200).sendFile(app_1.path2Client);
            }
            catch (err) {
                console.log(err);
                return resp.status(500).send({
                    message: 'Ha ocurrido un error',
                    err
                });
            }
        });
    }
};
