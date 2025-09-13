//server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import shipmentRoutes from './routes/shipment.routes';
import orderItemRoutes from './routes/orderItem.routes';
import cartRoutes from './routes/cart.routes';
import categoryRoutes from './routes/category.routes';
import newsletterRoutes from './routes/newsletter.routes';

import connectDB from "./config/db.config";
import errorHandler from "./middleware/error.middleware";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import addressRoutes from "./routes/address.routes";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line for form data
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://okuselu.github.io",
      "https://okuselu.github.io/biscenic-client",
      "https://biscenic-glmi.vercel.app",
      "https://biscenic.com"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

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

app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/newsletter', newsletterRoutes); // Move this here from line 69

app.use(errorHandler);
const PORT = process.env.PORT || 5050; 

const server = app.listen(PORT, () => {
  console.log(
    colors.yellow.bold(
      `biscenic server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});

process.on("unhandledRejection", (err: any) => {
  console.error(colors.red.bold(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});