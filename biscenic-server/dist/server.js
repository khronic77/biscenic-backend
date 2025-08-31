"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const colors_1 = __importDefault(require("colors"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const shipment_routes_1 = __importDefault(require("./routes/shipment.routes"));
const orderItem_routes_1 = __importDefault(require("./routes/orderItem.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const newsletter_routes_1 = __importDefault(require("./routes/newsletter.routes"));
const db_config_1 = __importDefault(require("./config/db.config"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
dotenv_1.default.config();
(0, db_config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // Add this line for form data
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://okuselu.github.io",
        "https://okuselu.github.io/biscenic-client"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
// Serve uploaded files statically
app.use('/uploads', express_1.default.static('uploads'));
// Add root route handler
app.get('/', (req, res) => {
    res.json({
        message: 'Biscenic API Server is running! 🚀',
        status: 'healthy',
        endpoints: {
            products: '/api/products',
            categories: '/api/categories',
            cart: '/api/carts',
            users: '/api/users',
            orders: '/api/orders',
            newsletter: '/api/newsletter'
        }
    });
});
app.use('/api/categories', category_routes_1.default);
app.use('/api/orders', order_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use('/api/shipments', shipment_routes_1.default);
app.use('/api/order-items', orderItem_routes_1.default);
app.use('/api/carts', cart_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/addresses', address_routes_1.default);
app.use('/api/newsletter', newsletter_routes_1.default); // Move this here from line 69
app.use(error_middleware_1.default);
const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
    console.log(colors_1.default.yellow.bold(`biscenic server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});
process.on("unhandledRejection", (err) => {
    console.error(colors_1.default.red.bold(`Error: ${err.message}`));
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map