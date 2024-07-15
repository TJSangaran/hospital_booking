"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_model_1 = __importDefault(require("../models/patient.model"));
const appointment_model_1 = require("../models/appointment.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const stripe_1 = __importDefault(require("stripe"));
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const stripe = new stripe_1.default("sk_test_51IabQNSCj4BydkZ38AsoDragCM19yaMzGyBVng5KUZnCNrxCJuj308HmdAvoRcUEe2PEdoORMosOaRz1Wl8UX0Gt00FCuSwYpz", {
    // @ts-ignore
    apiVersion: null,
});
const router = (0, express_1.Router)();
router.route('/').get((req, res) => {
    patient_model_1.default.find().then(patients => {
        res.status(200).json(patients);
    }).catch((err) => {
        res.status(400).json(`Error : ${err}`);
    });
});
// To update a patient's phone number
router.route('/update-phone').put((req, res) => {
    const patientId = req.body.patientId;
    patient_model_1.default.findOne({ _id: patientId }).then(patient => {
        if (patient) {
            patient.phoneNumber = req.body.phoneNumber;
            patient.save().then(() => {
                res.status(200).json('Patient\'s phone number updated');
            }).catch(err => {
                res.status(400).json({ message: `Error : ${err}` });
            });
        }
    });
});
router.route('/signup').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username; // Required.. can't be undefined
    const password = req.body.password;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    // Hash password
    const salt = yield (0, bcrypt_1.genSalt)(10);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
    const newPatient = new patient_model_1.default({
        username,
        password: hashedPassword,
        name,
        phoneNumber,
    });
    newPatient
        .save()
        .then(() => {
        res.json("Patient added");
        // console.log(`${newDoctor} added!`)
    })
        .catch((err) => {
        res.status(400).json(`Error : ${err}`);
        // console.log(err);
    });
}));
router.route("/login").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const plainTextPassword = req.body.password;
        const patient = yield patient_model_1.default.findOne({
            username: username,
        });
        console.log(patient);
        if (patient === null || !(yield (0, bcrypt_1.compare)(plainTextPassword, patient.password))) {
            return res.status(201).json({ message: "wrong username or password" });
        }
        // Doctor found, return the token to the client side
        const token = jsonwebtoken_1.default.sign(JSON.stringify(patient), process.env.KEY, {
            algorithm: process.env.ALGORITHM,
        });
        return res.status(200).json({ token: token.toString(), user: Object.assign(Object.assign({}, patient === null || patient === void 0 ? void 0 : patient.toJSON()), { type: 'patient' }) });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
router.route('/getPatientDetails/:patientId').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        const patient = yield patient_model_1.default.findOne({ _id: patientId });
        if (patient) {
            return res.status(200).json(patient);
        }
        else {
            return res.status(201).json({ message: "Patient not found!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
}));
router.route('/previous-appointments').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.body.patientId;
        const appointments = yield appointment_model_1.Appointment.find({ patientId: patientId });
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
        const filteredAppointments = appointments.filter((appointment) => {
            return Date.parse(currDateTime) >= (Date.parse(appointment.date + 'T' + appointment.slotTime) + 30 * 600000);
        });
        const sortedAppointments = filteredAppointments.sort((a, b) => {
            return Date.parse(b.date + 'T' + b.slotTime) - Date.parse(a.date + 'T' + a.slotTime);
        });
        res.status(200).json(sortedAppointments);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}));
router.route('/upcoming-appointments').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.body.patientId;
        const appointments = yield appointment_model_1.Appointment.find({ patientId: patientId });
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
        const filteredAppointments = appointments.filter((appointment) => {
            return Date.parse(currDateTime) <= (Date.parse(appointment.date + 'T' + appointment.slotTime) + 30 * 60000);
        });
        const sortedAppointments = filteredAppointments.sort((a, b) => {
            return Date.parse(a.date + 'T' + a.slotTime) - Date.parse(b.date + 'T' + b.slotTime);
        });
        res.status(200).json(sortedAppointments);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}));
router.route("/payment").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { finalBalnce, token } = req.body;
    // console.log(product);
    const idempotencyKey = (0, uuid_1.v4)();
    return stripe.customers
        .create({
        email: token.email,
        source: token.id
    })
        .then(customer => {
        stripe.charges
            .create({
            amount: finalBalnce * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Booked Appointement Successfully`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, {
            idempotencyKey
        })
            .then(result => res.status(200).json(result))
            .catch(err => {
            console.log(`Error : ${err}`);
            res.status(400).json(err);
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
}));
exports.default = router;
