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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return next(new Error('Please provide all required fields'));
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return next(new Error('Email already in use'));
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = new user_model_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        const { password: excludedPassword, email: excludedEmail } = newUser, userData = __rest(newUser, ["password", "email"]);
        res.status(201).json({ message: 'User created successfully', data: userData, error: false });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new Error('Please provide email and password'));
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return next(new Error('Invalid email or password'));
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return next(new Error('Invalid email or password'));
        }
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({ message: 'Logged in successfully', token, userData: { userId: user === null || user === void 0 ? void 0 : user._id } });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map