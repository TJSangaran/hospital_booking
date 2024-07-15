"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSchedule = exports.Slot = exports.Doctor = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    time: {
        type: String,
    },
    isBooked: {
        type: Boolean,
        default: false
    }
});
const dateSchedule = new mongoose_1.Schema({
    date: {
        type: String
    },
    slots: [slotSchema]
});
const doctorSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    specialization: {
        type: String
    },
    feesPerSession: {
        type: String
    },
    dates: [dateSchedule]
});
const Doctor = (0, mongoose_1.model)('Doctor', doctorSchema);
exports.Doctor = Doctor;
const Slot = (0, mongoose_1.model)('Slot', slotSchema);
exports.Slot = Slot;
const DateSchedule = (0, mongoose_1.model)('DateSchedule', dateSchedule);
exports.DateSchedule = DateSchedule;
