import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';
import router from './routes';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors({
    origin: "*", // allow the server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));

const port = process.env.PORT || 5000;
// mongodb+srv://nisha:<password>@cluster0.ep9h1fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
let uri = process.env.ATLAS_URI || 'mongodb+srv://sangaran:12345@cluster0.os7psi4.mongodb.net/doctor?retryWrites=true&w=majority&appName=Cluster0';
if (process.env.NODE_ENV === 'test') {
    uri = process.env.ATLAS_URI_TEST as string;
}

// Log the URI to check if it is correctly set
console.log(`MongoDB URI: ${uri}`);

connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err: any) => {
    if (!err) {
        console.log("Connection to database successful!");
    } else {
        console.error("Error connecting to database:", err);
    }
});

function getCurrentTime() {
    const date = new Date();
    console.log(date);
}

function getEndDateTime(dateTime: string) {
    // 2021-03-22T09:00:00
    const hrs = (parseInt(dateTime.split('T')[1].split(':')[0]) + 1).toString().padStart(2, '0');
    const time = hrs + ':00:00';
    const date = dateTime.split('T')[0];
    return date + 'T' + time;
}

app.use(router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    getCurrentTime();
    console.log(getEndDateTime("2021-03-22T09:00:00"));
});
