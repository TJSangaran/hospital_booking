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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.route("/login").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (username !== 'admin@admin.com' || password !== 'Admin@1234') {
            return res.status(201).json({ message: "wrong username or password" });
        }
        // Doctor found, return the token to the client side
        const token = jsonwebtoken_1.default.sign(JSON.stringify({ type: 'admin' }), process.env.KEY, {
            algorithm: process.env.ALGORITHM,
        });
        return res.status(200).json({ token: token.toString(), user: { type: 'admin' } });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.default = router;
