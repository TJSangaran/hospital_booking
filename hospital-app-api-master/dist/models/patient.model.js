"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    }
});
const Patient = (0, mongoose_1.model)('Patient', patientSchema);
exports.default = Patient;
