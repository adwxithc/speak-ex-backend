import mongoose, { Schema } from 'mongoose';
import ICoinPurchase from '../../../../domain/coinPurchase';

const coinPurchaseSchema = new Schema<ICoinPurchase>(
    {
        amount:{
            type:Number,
            required:true
        },
        planId:{
            type:String,
            required:true,
            ref:'CoinPurchasePlan',
        },
        userId:{
            type:String,
            required:true,
            ref:'users',
        },
        transactionId:{
            type:String,
            required:true,
        }

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

const CoinPurchaseModel = mongoose.model<ICoinPurchase>('CoinPurchaseSchema', coinPurchaseSchema);

export default CoinPurchaseModel;
