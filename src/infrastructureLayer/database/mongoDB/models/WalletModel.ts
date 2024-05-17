import mongoose, { Schema } from 'mongoose';
import  IWallet from '../../../../domain/wallet';


const walletSchema = new Schema<IWallet>(
    {
        silverCoins: {
            type: Number,
            required: true,
            default: 0,
        },
        goldCoins: {
            type: Number,
            required: true,
            default: 0,
        },
        money: {
            type: Number,
            required: true,
            default: 0,
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            unique:true,
            ref: 'Users',
        },
        transactions: {
            type:[ mongoose.Schema.ObjectId],
            ref:'Transactions'
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

const WalletModel = mongoose.model<IWallet>('Wallet', walletSchema);

export default WalletModel;
