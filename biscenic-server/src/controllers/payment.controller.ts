import { Request, Response, NextFunction } from 'express';
import axios from 'axios'

export const initiatePayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, amount } = req.body;

    if(!email|| !amount) {
        res.status(400).json({ message: "Email and amount are required", data: null, error: true});
        return;
    }
    try {
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${paystackSecretKey}`,
                }
            }
        );
        console.log(response)

        const { authorization_url } = response.data.data;

        res.status(200).json({
            message: "Payment initialization successful",
            data: { authorization_url },
            error: null
        })
    } catch(error: any) {
        res.status(500).json({
            message: "Failed to initialize payment",
            data: null,
            error: error.response?.data?.message || error.message
        });
    }
}

export const verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { reference } = req.query;

    if (!reference) {
        res.status(400).json({
            message: "Transaction reference is required", 
            data: null,
            error: true
        })
        return;
    }
    try {
        const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${paystackSecretKey}`
                }
            }
        )

        const paymentData = response.data.data;
        
        if(paymentData.status === 'success') {
            res.status(200).json({
                message: "Payment verification successful",
                data: paymentData,
                error: null
            })
        } else {
            res.status(400).json({
                message: "Payment verification failed",
                data: paymentData,
                error: true
            })
        }
    } catch(error: any) {
        res.status(500).json({
            message: "Failed to verify payment",
            data: null,
            error: error.response?.data?.message || error.message
        })
    }
}