import CoinPurchasePlanModel from '../../models/CoinPurchasePlan';

export const getPurchasePlans = async (coinPurchasePlanModel: typeof CoinPurchasePlanModel) => {
    return await coinPurchasePlanModel.find({deleted:false});
};
