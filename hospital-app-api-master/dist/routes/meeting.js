"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appointment_model_1 = require("../models/appointment.model");
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = (0, express_1.Router)();
router.get("/get-token", (req, res) => {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
    const options = { expiresIn: "10m", algorithm: "HS256" };
    const payload = {
        apikey: API_KEY,
        permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, options);
    res.json({ token });
});
//
router.post("/create-meeting/", (req, res) => {
    const { token, region } = req.body;
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
    const options = {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ region }),
    };
    (0, node_fetch_1.default)(url, options)
        .then((response) => response.json())
        .then((result) => res.json(result)) // result will contain meetingId
        .catch((error) => console.error("error", error));
});
//
router.get("/validate-meeting/:meetingId", (req, res) => {
    const token = req.body.token;
    const meetingId = req.params.meetingId;
    // const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;
    // const options = {
    //   method: "POST",
    //   headers: { Authorization: token },
    // };
    // fetch(url, options)
    //   .then((response: any) => response.json())
    //   .then((result: any) => res.json(result)) // result will contain meetingId
    //   .catch((error: any) => console.error("error", error));
    appointment_model_1.Appointment.findOne({ meetingId }).then((appointment) => {
        if (appointment) {
            // Get current dateTime
            const date = new Date();
            let currDateTime = date.getFullYear().toString();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            currDateTime += month < 10 ? ('-0' + month.toString()) : '-' + month.toString();
            currDateTime += day < 10 ? ('-0' + day.toString()) : '-' + day.toString();
            currDateTime += hour < 10 ? ('T0' + hour.toString()) : 'T' + hour.toString();
            currDateTime += minutes < 10 ? (':0' + minutes.toString()) : ':' + minutes.toString();
            currDateTime += seconds < 10 ? (':0' + seconds.toString()) : ':' + seconds.toString();
            const meetingStarted = Date.parse(currDateTime) >= Date.parse(appointment.date + 'T' + appointment.slotTime);
            const meetingEnded = Date.parse(currDateTime) >= (Date.parse(appointment.date + 'T' + appointment.slotTime) + 30 * 60000);
            res.json({
                valid: true,
                meetingStarted,
                meetingEnded,
                appointment
            });
        }
        else {
            res.json({
                valid: false
            });
        }
    });
});
router.get("/time-left/:meetingId", (req, res) => {
    const token = req.body.token;
    const meetingId = req.params.meetingId;
    appointment_model_1.Appointment.findOne({ meetingId }).then((appointment) => {
        if (appointment) {
            // Get current dateTime
            const date = new Date();
            let currDateTime = date.getFullYear().toString();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            currDateTime += month < 10 ? ('-0' + month.toString()) : '-' + month.toString();
            currDateTime += day < 10 ? ('-0' + day.toString()) : '-' + day.toString();
            currDateTime += hour < 10 ? ('T0' + hour.toString()) : 'T' + hour.toString();
            currDateTime += minutes < 10 ? (':0' + minutes.toString()) : ':' + minutes.toString();
            currDateTime += seconds < 10 ? (':0' + seconds.toString()) : ':' + seconds.toString();
            const timeLeft = Date.parse(appointment.date + 'T' + appointment.slotTime) - (Date.parse(currDateTime) - 30 * 60000);
            res.json({
                valid: true,
                timeLeft
            });
        }
        else {
            res.json({
                valid: false
            });
        }
    });
});
exports.default = router;
