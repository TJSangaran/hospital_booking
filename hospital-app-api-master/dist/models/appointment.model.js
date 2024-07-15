"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const feedback = new mongoose_1.Schema({
    given: {
        type: Boolean,
        default: false
    },
    stars: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    title: {
        type: String,
        default: ""
    },
    review: {
        type: String,
        default: ""
    }
});
const appointmentSchema = new mongoose_1.Schema({
    doctorId: {
        required: true,
        type: String
    },
    dateId: {
        required: true,
        type: String
    },
    slotId: {
        required: true,
        type: String
    },
    patientId: {
        required: true,
        type: String
    },
    date: {
        type: String
    },
    slotTime: {
        type: String
    },
    doctorName: {
        type: String
    },
    doctorEmail: {
        type: String
    },
    patientName: {
        type: String
    },
    googleMeetLink: {
        type: String
    },
    meetingId: {
        type: String
    },
    feedback: feedback
});
const Appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
exports.Appointment = Appointment;
const Feedback = (0, mongoose_1.model)('Feedback', feedback);
exports.Feedback = Feedback;
