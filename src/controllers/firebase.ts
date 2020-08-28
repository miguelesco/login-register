import { ProData, PartData, ReturnedUser, LoginUser, UserData } from '../interfaces/database';
import * as firebase from './../services/firebase';
import {path2Client} from '../app';
const fs = require('fs');


export default {
    /**
     * Logs In an user, and returns his data
     * @param req Request
     * @param resp Response
     */
    async login(req: any, resp: any) {
        try {
            const {id, password, type}: LoginUser = req.body;

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
            const userData = await firebase.login({id, password, type});

            if (!userData) {
                return resp.status(404).send('User not found');
            }

            delete userData.password;

            return resp.status(200).send(userData);

        } catch (err) {
            console.log(err);
            return resp.status(500).send({
                message: 'Ha ocurrido un error',
                err
            });
        }
    },
    /**
     * Create an account of the user, set credentials and returns the script if needed
     * @param req Request
     * @param resp Response
     */
    async register(req: any, resp: any) {
        try {
            const {type, data, password}: UserData = req.body;

            // Verification of password

            if (!password || typeof password !== 'string' || password.length < 6) {
                return resp.status(400).send('Password of user missing or incorrect');
            }

            let newUserData: ReturnedUser;

            switch(type) {
                case 'professional': 

                    // Verification of Professional data 
                    if (!isProDataType()) {
                        return resp.status(400).send('Data of professional user missing or incorrect');
                    }

                    // Register user
                    newUserData = await firebase.register({type, data, password});
                    
                    break;
                case 'particular': 
                    // Verification of Professional data 
                    if (!isPartDataType()) {
                        return resp.status(400).send('Data of particular user missing or incorrect');
                    }
                    // Register user
                    newUserData = await firebase.register({type, data, password});
                    break;
                default:
                    return resp.status(400).send('Type of user missing or incorrect');
            }

            delete newUserData.password;

            return resp.status(200).send(newUserData);

            function isProDataType(): boolean {
                const {website, url1, message1, url2, message2} = data as ProData;
                return typeof website === 'string' && typeof url1 === 'string' && typeof message1 === 'string';
            }

            function isPartDataType(): boolean {
                const {gender, age, location} = data as PartData;
                return typeof location === 'string' && typeof gender === 'string' && typeof age === 'number';
            }

        } catch (err) {
            return resp.status(500).send({
                message: 'Ha ocurrido un error',
                err
            });
        }
    },
    /**
     * Uses the snippet and returns the login page
     * @param req Request
     * @param resp Response
     */
    async useSnippet(req: any, resp: any) {
        try {
            const {apiKey, id} = req.body;

            // Verification of apikey and id

            if (!apiKey || typeof apiKey !== 'string') {
                return resp.status(400).send('Apikey of professional user missing or incorrect');
            }

            if (!id || typeof id !== 'string') {
                return resp.status(400).send('ID of professional user missing or incorrect');
            }

            // Get User Data

            let dataUser = await firebase.getUser(id, 'professional')

            if (!dataUser) {
                return resp.status(404).send('Professional user not found');
            }

            dataUser.data = dataUser.data as ProData

            // Verification of apikey

            if (dataUser.data.apiKey !== apiKey) {
                return resp.status(400).send('Invalid ApiKey');
            }

            return resp.status(200).sendFile(path2Client);
        } catch (err) { 
            console.log(err);
            return resp.status(500).send({
                message: 'Ha ocurrido un error',
                err
            });
        }
    }

}