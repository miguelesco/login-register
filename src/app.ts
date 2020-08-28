import express from 'express';
import bodyParser from 'body-parser';
const path = require('path');
var cors = require('cors');

// Get path of login page
const path2Client = path.join(__dirname + '/client/index.html');

const app = express();
// Load routes files
import routes from './routes/firebase';

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.set("view engine", "ejs");

// CORS
app.use(cors({origin:true,credentials: true}));
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    // tslint:disable-next-line: max-line-length
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Client
app.use(express.static(path.join(__dirname, "client")));

// Routes
app.use('/api', routes);

export {app, path2Client};
