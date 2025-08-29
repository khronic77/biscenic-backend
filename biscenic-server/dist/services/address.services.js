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
exports.deleteAddress = exports.updateAddress = exports.getAllAddresses = exports.addAddress = void 0;
exports.createAddress = createAddress;
const address_model_1 = __importDefault(require("../models/address.model"));
const addAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, isDefault } = data;
    if (isDefault) {
        yield address_model_1.default.updateMany({ user }, { $set: { isDefault: false } });
    }
    return yield address_model_1.default.create(data);
});
exports.addAddress = addAddress;
const getAllAddresses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield address_model_1.default.find({ user: userId });
});
exports.getAllAddresses = getAllAddresses;
const updateAddress = (id, userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield address_model_1.default.findOne({ _id: id, user: userId });
    if (!address) {
        throw new Error("Address not found");
    }
    if (updates.isDefault) {
        yield address_model_1.default.updateMany({ user: userId }, { $set: { isDefault: false } });
    }
    Object.assign(address, updates);
    return yield address.save();
});
exports.updateAddress = updateAddress;
const deleteAddress = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield address_model_1.default.findOneAndDelete({ _id: id, user: userId });
    if (!address) {
        throw new Error("Address not found");
    }
});
exports.deleteAddress = deleteAddress;
function createAddress(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=address.services.js.map