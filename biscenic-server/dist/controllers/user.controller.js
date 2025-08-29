"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("../services/user.services");
const AddressService = __importStar(require("../services/address.services"));
class UserController {
    static getUserProfile(arg0, protect, getUserProfile) {
        throw new Error("Method not implemented.");
    }
    static adminDashboard(arg0, protect, admin, adminDashboard) {
        throw new Error("Method not implemented.");
    }
    static deleteUser(arg0, protect, admin, deleteUser) {
        throw new Error("Method not implemented.");
    }
    /**
     * Register a new user and create a default shipping address
     * @param req - Express request object
     * @param res - Express response object
     * @param next - Express next function
     */
    static registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, roles, shippingAddress } = req.body; // Add roles here
                // Validate required fields
                if (!username || !email || !password) {
                    res
                        .status(400)
                        .json({ message: "Please provide username, email, and password" });
                    return;
                }
                if (!(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.street) ||
                    !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.city) ||
                    !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.state) ||
                    !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) ||
                    !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.zipCode) ||
                    !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.phoneNumber)) {
                    res.status(400).json({
                        message: "Please provide all required fields for the shipping address",
                    });
                    return;
                }
                const newUser = yield user_services_1.UserService.registerUser({
                    username,
                    email,
                    password,
                    roles: roles || ["user"],
                });
                try {
                    const newAddress = yield AddressService.addAddress({
                        user: newUser._id.toString(),
                        street: shippingAddress.street,
                        city: shippingAddress.city,
                        state: shippingAddress.state,
                        country: shippingAddress.country,
                        zipCode: shippingAddress.zipCode,
                        phoneNumber: shippingAddress.phoneNumber,
                        isDefault: true,
                    });
                    const _a = newUser.toObject(), { password: excludedPassword } = _a, userData = __rest(_a, ["password"]);
                    res.status(201).json({
                        message: "User registered successfully",
                        data: {
                            user: userData,
                            defaultAddress: newAddress,
                        },
                        error: null,
                    });
                }
                catch (addressError) {
                    yield user_services_1.UserService.deleteUser(newUser._id.toString());
                    res.status(500).json({
                        message: "Failed to create shipping address",
                        error: addressError.message || "Unknown error occurred",
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: "Registration failed",
                    error: error.message || "Unknown error occurred",
                });
            }
        });
    }
    /**
     * Login a user and return their token
     * @param req - Express request object
     * @param res - Express response object
     * @param next - Express next function
     */
    static loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Validate login credentials
                if (!email || !password) {
                    res.status(400).json({ message: "Please provide email and password" });
                    return;
                }
                const { token, user } = yield user_services_1.UserService.loginUser(email, password);
                res.status(200).json({
                    message: "Logged in successfully",
                    token,
                    user: {
                        userId: user._id.toString(),
                        username: user.username,
                        email: user.email,
                        roles: user.roles,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_services_1.UserService.getAllUsers();
                res.status(200).json({
                    message: "Users retrieved successfully",
                    data: users,
                    error: null
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Failed to fetch users",
                    error: error.message
                });
            }
        });
    }
    static updateUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { role, action } = req.body;
                const updatedUser = yield user_services_1.UserService.updateUserRole(userId, role, action);
                res.status(200).json({
                    message: "User role updated successfully",
                    data: updatedUser,
                    success: true
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Failed to update user role",
                    error: error.message
                });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map