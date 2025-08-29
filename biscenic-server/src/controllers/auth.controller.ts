// auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new Error('Please provide all required fields')); 
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new Error('Email already in use'));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const { password: excludedPassword, email: excludedEmail, ...userData } = newUser;
    res.status(201).json({ message: 'User created successfully', data: userData, error: false });
  } catch (error: any) {
    next(error); 
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Please provide email and password'));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new Error('Invalid email or password'));
    }

    const isValidPassword = await bcrypt.compare(password, user!.password);
    if (!isValidPassword) {
      return next(new Error('Invalid email or password'));
    }

    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '24h' });
    res.status(200).json({ message: 'Logged in successfully', token, userData: { userId: user?._id } });
  } catch (error: any) {
    next(error);
  }
};