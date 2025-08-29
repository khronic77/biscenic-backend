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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_services_1 = require("../services/user.services");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_services_1.UserService.registerUser(req.body);
        res.status(201).json({
            message: "User registered successfully",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield user_services_1.UserService.loginUser(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}));
router.get("/profile", auth_middleware_1.protect, (req, res) => {
    res.status(200).json({
        message: "Profile retrieved successfully",
        data: req.user
    });
});
router.get("/admin", auth_middleware_1.protect, auth_middleware_1.admin, (req, res) => {
    res.status(200).json({ message: "Welcome Admin!" });
});
router.get("/users", auth_middleware_1.protect, auth_middleware_1.admin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_services_1.UserService.getAllUsers();
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}));
router.delete("/users/:id", auth_middleware_1.protect, auth_middleware_1.admin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_services_1.UserService.deleteUser(req.params.id);
        res.status(200).json({
            message: "User deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}));
router.put("/users/:id/role", auth_middleware_1.protect, auth_middleware_1.admin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, action } = req.body;
        const user = yield user_services_1.UserService.updateUserRole(req.params.id, role, action);
        res.status(200).json({
            message: "User role updated successfully",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}));
router.put("/profile", auth_middleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const updatedUser = yield user_services_1.UserService.updateProfile(userId.toString(), req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUser
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}));
exports.default = router;
//# sourceMappingURL=user.routes.js.map