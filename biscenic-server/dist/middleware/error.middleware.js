"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        error: true,
        message: error.message,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error.middleware.js.map