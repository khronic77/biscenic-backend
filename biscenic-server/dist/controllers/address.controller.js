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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.getAllAddresses = exports.addAddress = void 0;
const AddressService = __importStar(require("../services/address.services"));
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { street, city, state, country, zipCode, phoneNumber, isDefault } = req.body;
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized", error: true });
        return;
    }
    const userId = req.user._id.toString();
    try {
        const newAddress = yield AddressService.addAddress({
            user: userId,
            street,
            city,
            state,
            country,
            zipCode,
            phoneNumber,
            isDefault,
        });
        res.status(201).json({
            message: "Address added successfully",
            data: newAddress,
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error adding address",
            error: error.message,
        });
    }
});
exports.addAddress = addAddress;
const getAllAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({
            message: "Unauthorized",
            error: "User is not authenticated",
            data: null,
        });
        return;
    }
    const userId = req.user._id.toString();
    try {
        const addresses = yield AddressService.getAllAddresses(userId);
        res.status(200).json({
            message: "Addresses retrieved successfully",
            data: addresses,
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving addresses",
            error: error.message,
        });
    }
});
exports.getAllAddresses = getAllAddresses;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({
            message: "Unauthorized",
            error: "User is not authenticated",
            data: null,
        });
        return;
    }
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id.toString();
    try {
        const updatedAddress = yield AddressService.updateAddress(id, userId, updates);
        res.status(200).json({
            message: "Address updated successfully",
            data: updatedAddress,
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating address",
            error: error.message,
        });
    }
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({
            message: "Unauthorized",
            error: "User is not authenticated",
            data: null,
        });
        return;
    }
    const { id } = req.params;
    const userId = req.user._id.toString();
    try {
        yield AddressService.deleteAddress(id, userId);
        res.status(200).json({
            message: "Address deleted successfully",
            data: null,
            error: null,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting address",
            error: error.message,
        });
    }
});
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=address.controller.js.map