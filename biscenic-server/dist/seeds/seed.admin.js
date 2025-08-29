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
const mongoose_1 = __importDefault(require("mongoose"));
const role_model_1 = __importDefault(require("../models/role.model"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost/your-db');
        const roles = ['admin', 'user'];
        for (const roleName of roles) {
            const existingRole = yield role_model_1.default.findOne({ name: roleName });
            if (!existingRole) {
                yield role_model_1.default.create({ name: roleName });
                console.log(`${roleName} role created`);
            }
        }
        console.log('Roles seeding completed');
        yield mongoose_1.default.disconnect();
    }
    catch (err) {
        console.error('Error seeding roles:', err);
    }
}))();
//# sourceMappingURL=seed.admin.js.map