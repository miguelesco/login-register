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
exports.getUser = exports.login = exports.register = void 0;
const admin = __importStar(require("firebase-admin"));
const serviceAccount = require('./../../../firebase.json');
// Initialize the firebase App
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://devsign-b57f7.firebaseio.com'
});
/** Instance of firestore (database) of firebase */
const firestore = admin.firestore();
/** Instance of Authentication admin system of firebase */
const auth = admin.auth();
/**
 * Register the user in the authentication instance of firebase, and
 * creates a document to set its data
 * @param userData The data of the user
 * @returns The credentials and data of the user without the password
 */
function register(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        let userRecord;
        try {
            // Creates an account in the Authentication system of firebase an set credentials
            userRecord = yield auth.createUser({
                password: userData.password
            });
        }
        catch (err) {
            throw err;
        }
        if (userData.type === 'professional') {
            // Creates the ApiKey (its a reverse id)
            const apiKey = userRecord.uid.split('').reverse().join().replace(/,/g, '');
            // Creates the script
            const script = createScript(apiKey, userRecord.uid);
            // Creates the new data with credentials
            userData.data = Object.assign(userData.data, { apiKey });
            userData = Object.assign(userData, { script });
        }
        const newDataUser = Object.assign(userData, { id: userRecord.uid });
        try {
            // Creates the document in firestore with the new data
            yield firestore.doc(`users/${userData.type}/${userData.type}/${userRecord.uid}`)
                .set(newDataUser, { merge: true });
        }
        catch (err) {
            // In case of an Error while setting the document, its delete the user
            // from the authentication system
            auth.deleteUser(userRecord.uid);
            throw err;
        }
        delete newDataUser.password;
        return newDataUser;
    });
}
exports.register = register;
function createScript(apiKey, id) {
    let script = 'var myHeaders = new Headers();';
    script += "myHeaders.append('Content-Type', 'application/json');";
    script += "var body = JSON.stringify({'apiKey':'" + apiKey + "','id':'" + id + "'});";
    script += "var requestOptions = {method: 'POST',headers: myHeaders,body: body,redirect: 'follow'};";
    script += "fetch('http://localhost:3001/api/snippet', requestOptions).then(response => response.text())";
    script += ".then(result => {var div=document.createElement('div');div.setAttribute('id', 'loginDiv');document.getElementsByTagName('body')[0].appendChild(div);document.getElementById('loginDiv').innerHTML = result})";
    script += ".catch(error => console.log('error', error));";
    return script;
}
/**
 * Logs the user in with password and id
 * @param user The information of the user to Log In
 */
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Gets the data of the user
            const userData = yield getUser(user.id, user.type);
            // Verify if exists
            if (!userData) {
                return null;
            }
            // Verify the password
            if (userData.password !== user.password) {
                throw new Error('Invalid password');
            }
            return userData;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.login = login;
/**
 * Gets the user data
 * @param id The id of the user
 * @param type The type of user
 */
function getUser(id, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Gets the data of the user and send it back if exists
            const userData = yield firestore.doc(`users/${type}/${type}/${id}`).get();
            return userData.exists ? userData.data() : null;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getUser = getUser;
