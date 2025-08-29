import Payment from '../models/payment.model';

export class PaymentService {
    static async createPayment(paymentData: {
        user: string;
        order: string;
        amount: number;
        paymentMethod: string;
        transactionReference: string;
    }) {
        const { user, order, amount, paymentMethod, transactionReference } = paymentData;

        const existingPayment = await Payment.findOne({ transactionReference });
        if (existingPayment) {
            throw new Error('Transaction reference already exists');
        }

        const payment = new Payment({
            user,
            order,
            amount,
            paymentMethod,
            transactionReference,
        });

        await payment.save();
        return payment;
    }
}

