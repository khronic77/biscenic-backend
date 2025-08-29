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
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    static registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, roles } = userData;
            const existingUser = yield user_model_1.default.findOne({ email });
            if (existingUser) {
                throw new Error("Email already in use");
            }
            const userRoles = ["user"];
            if (roles === null || roles === void 0 ? void 0 : roles.includes("admin")) {
                userRoles.push("admin");
            }
            const newUser = new user_model_1.default({
                email,
                username,
                password,
                roles: userRoles,
            });
            return yield newUser.save();
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const isValidPassword = yield user.matchPassword(password);
            if (!isValidPassword) {
                throw new Error("Invalid email or password");
            }
            const token = user.getAuthToken();
            console.log("User roles:", user.roles);
            return { token, user };
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.findByIdAndDelete(userId);
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find()
                .select('-password')
                .sort({ createdAt: -1 });
            return users;
        });
    }
    static updateUserRole(userId, role, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            if (action === "add" && !user.roles.includes(role)) {
                user.roles.push(role);
            }
            else if (action === "remove") {
                user.roles = user.roles.filter(r => r !== role);
                if (user.roles.length === 0) {
                    user.roles = ["user"];
                }
            }
            yield user.save();
            return user;
        });
    }
    static updateProfile(userId, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phone, address } = profileData;
            const user = yield user_model_1.default.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                phone,
                address
            }, { new: true, runValidators: true }).select('-password');
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map