"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = __importDefault(require("./patients"));
const doctors_1 = __importDefault(require("./doctors"));
const appointments_1 = __importDefault(require("./appointments"));
const admin_1 = __importDefault(require("./admin"));
const meeting_1 = __importDefault(require("./meeting"));
const router = (0, express_1.Router)();
router.use('/doctors', doctors_1.default);
router.use('/patients', patients_1.default);
router.use('/appointments', appointments_1.default);
router.use('/admin', admin_1.default);
router.use('/meeting', meeting_1.default);
exports.default = router;
