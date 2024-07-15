"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_model_1 = require("../models/appointment.model");
const router = (0, express_1.Router)();
router.route('/add-meet-link').put((req, res) => {
    const meetLink = req.body.meetLink;
    const appointmentId = req.body.appointmentId;
    const meetingId = req.body.meetingId;
    appointment_model_1.Appointment.findOne({ _id: appointmentId }).then((appointment) => {
        if (appointment) {
            appointment.googleMeetLink = meetLink;
            appointment.meetingId = meetingId;
            console.log(`Received meet link : ${meetLink}`);
            appointment.save().then(() => {
                console.log(`Updated the meet link!`);
                res.status(200).json({ message: "Meet link updated!" });
            }).catch((err) => {
                console.log(`Cannot add meet link to the appointment due to ${err}`);
                res.status(400).json({ message: `Cannot add meet link to the appointment due to ${err}` });
            });
        }
    });
});
router.route('/feedback').put((req, res) => {
    const appointmentId = req.body.appointmentId;
    const stars = req.body.stars;
    const title = req.body.title;
    const review = req.body.review;
    appointment_model_1.Appointment.findOne({ _id: appointmentId }).then((appointment) => {
        if (appointment) {
            appointment.feedback.stars = stars;
            appointment.feedback.title = title;
            appointment.feedback.review = review;
            appointment.feedback.given = true;
            appointment.save().then(() => {
                res.status(200).json({ message: `Feedback updated successfully!` });
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
exports.default = router;
