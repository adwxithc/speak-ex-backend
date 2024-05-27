import mongoose, { Schema } from 'mongoose';

import ICoinPurchasePlan from '../../../../domain/coinPurchasePlan';

const coinPurchasePlanSchema = new Schema<ICoinPurchasePlan>(
    {
        count: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
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

const CoinPurchasePlanModel = mongoose.model<ICoinPurchasePlan>(
    'CoinPurchasePlan',
    coinPurchasePlanSchema
);

export default CoinPurchasePlanModel;
