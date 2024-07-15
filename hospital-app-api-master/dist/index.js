"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));
const port = process.env.PORT || 5000;
// mongodb+srv://nisha:<password>@cluster0.ep9h1fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
let uri = process.env.ATLAS_URI || 'mongodb+srv://sangaran:12345@cluster0.os7psi4.mongodb.net/doctor?retryWrites=true&w=majority&appName=Cluster0';
if (process.env.NODE_ENV === 'test') {
    uri = process.env.ATLAS_URI_TEST;
}
// Log the URI to check if it is correctly set
console.log(`MongoDB URI: ${uri}`);
(0, mongoose_1.connect)(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log("Connection to database successful!");
    }
    else {
        console.error("Error connecting to database:", err);
    }
});
function getCurrentTime() {
    const date = new Date();
    console.log(date);
}
function getEndDateTime(dateTime) {
    // 2021-03-22T09:00:00
    const hrs = (parseInt(dateTime.split('T')[1].split(':')[0]) + 1).toString().padStart(2, '0');
    const time = hrs + ':00:00';
    const date = dateTime.split('T')[0];
    return date + 'T' + time;
}
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    getCurrentTime();
    console.log(getEndDateTime("2021-03-22T09:00:00"));
});
