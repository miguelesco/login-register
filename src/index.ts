import {app} from './app';

const PORT = 3001;

app.listen(PORT, (err) => {
    if(err) { console.error("ERROR: " + err) }
    console.log(`Ready on port ${PORT}`);
});