import * as admin from 'firebase-admin';
import { LoginUser, ReturnedUser, TypeUser, UserData } from '../interfaces/database';
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
export async function register(userData: UserData): Promise<ReturnedUser> {
    
    let userRecord: admin.auth.UserRecord;
    try {
        // Creates an account in the Authentication system of firebase an set credentials
        userRecord = await auth.createUser({
            password: userData.password
        });
    } catch(err) {
        throw err;
    }
    
    if (userData.type === 'professional') {
        // Creates the ApiKey (its a reverse id)
        const apiKey = userRecord.uid.split('').reverse().join().replace(/,/g, '');

        // Creates the script
        const script = createScript(apiKey, userRecord.uid);

        // Creates the new data with credentials
        userData.data = Object.assign(userData.data, {apiKey});
        userData = Object.assign(userData, {script});
    }

    const newDataUser = Object.assign(userData, {id: userRecord.uid});
    
    try {
        // Creates the document in firestore with the new data
        await firestore.doc(`users/${userData.type}/${userData.type}/${userRecord.uid}`)
        .set(newDataUser, {merge: true});
    } catch (err) {
        // In case of an Error while setting the document, its delete the user
        // from the authentication system
        auth.deleteUser(userRecord.uid);
        throw err;
    }

    delete newDataUser.password;

    return newDataUser;
}

function createScript(apiKey: string, id: string): string {
    let script = 'var myHeaders = new Headers();';
    script += "myHeaders.append('Content-Type', 'application/json');";
    script += "var body = JSON.stringify({'apiKey':'" + apiKey + "','id':'" + id + "'});";
    script += "var requestOptions = {method: 'POST',headers: myHeaders,body: body,redirect: 'follow'};";
    script += "fetch('http://localhost:3001/api/snippet', requestOptions).then(response => response.text())";
    script += ".then(result => {var div=document.createElement('div');div.setAttribute('id', 'loginDiv');document.getElementsByTagName('body')[0].appendChild(div);document.getElementById('loginDiv').innerHTML = result})";
    script += ".catch(error => console.log('error', error));"; 
    return script
}

/**
 * Logs the user in with password and id
 * @param user The information of the user to Log In
 */
export async function login(user: LoginUser): Promise<ReturnedUser | null> {
    try {
        // Gets the data of the user
        const userData = await getUser(user.id, user.type);
        
        // Verify if exists
        if (!userData) {
            return null;
        }
        
        // Verify the password
        if (userData.password !== user.password) {
            throw new Error('Invalid password');
        }

        return userData;
    } catch (err) {
        throw err;
    }
}

/**
 * Gets the user data
 * @param id The id of the user
 * @param type The type of user
 */
export async function getUser(id: string, type: TypeUser): Promise<ReturnedUser | null> {
    try {
        // Gets the data of the user and send it back if exists
        const userData = await firestore.doc(`users/${type}/${type}/${id}`).get();
        return userData.exists ? userData.data() as ReturnedUser : null;
    } catch (err) {
        throw err;
    }
}
