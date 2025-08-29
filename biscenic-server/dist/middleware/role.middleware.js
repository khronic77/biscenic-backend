"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        var _a, _b;
        const userRole = Array.isArray((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles)
            ? req.user.roles
            : [(_b = req.user) === null || _b === void 0 ? void 0 : _b.roles];
        if (!userRole || !Array.isArray(userRole)) {
            res
                .status(403)
                .json({ message: "Access denied. Insufficient permissions." });
            return;
        }
        if (!userRole.some((role) => allowedRoles.includes(role))) {
            res
                .status(403)
                .json({ message: "Access denied. Insufficient permissions." });
            return;
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=role.middleware.js.map