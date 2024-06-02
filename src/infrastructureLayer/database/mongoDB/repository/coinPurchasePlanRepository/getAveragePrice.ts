import CoinPurchasePlanModel from '../../models/CoinPurchasePlan';

export const getAveragePrice = async (
    coinPurchasePlanModel: typeof CoinPurchasePlanModel
) => {
    const result = await coinPurchasePlanModel.aggregate([
        {
            $match: { deleted: false }, 
        },
        {
            $group: {
                _id: null,
                totalCount: { $sum: '$count' },
                totalPrice: { $sum: '$price' },
            },
        },
    ]);

    if (result.length > 0) {
        const { totalCount, totalPrice } = result[0];
        return totalCount > 0 ? totalPrice / totalCount : 0;
    } else {
        return 0; // or handle the case where there are no documents
    }
};
