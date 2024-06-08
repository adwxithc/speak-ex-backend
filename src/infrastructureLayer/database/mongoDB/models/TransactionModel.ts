import mongoose, { Schema } from 'mongoose';
import ITransaction from '../../../../domain/transaction';



const transactionSchema = new Schema<ITransaction>(
    {
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['credit', 'debit'],
            required: true,
        },
        currencyType: {
            type: String,
            enum: ['gold', 'silver', 'money'],
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
            unique:true
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const TransactionModel = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default TransactionModel;
