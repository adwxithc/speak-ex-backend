import CoinPurchaseModel from '../../models/CoinPurchaseModal';

export const getPopularPurchasePlans = async (
    coinPurchaseModel: typeof CoinPurchaseModel
) => {
    const result = await coinPurchaseModel.aggregate([
        {
            $addFields: {
                planObjectId: { $toObjectId: '$planId' },
            },
        },
        {
            $group: {
                _id: '$planObjectId',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
        {
            $limit: 5,
        },
        
        {
            $lookup: {
                from: 'coinpurchaseplans',
                localField: '_id',
                foreignField: '_id',
                as: 'planDetails',
            },
        },
        {
            $unwind: '$planDetails',
        },
        {
            $project: {
                _id: 0,
                id:'$planDetails.id',
                count:'$planDetails.count',
                image:'$planDetails.image',
                price:'$planDetails.price',
                title:'$planDetails.title',
            },
        },
    ]);
    return result;
};
