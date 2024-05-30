import CoinPurchasePlanModel from '../../models/CoinPurchasePlan';

export const getPurchasePlan = async ({id,coinPurchasePlanModel}:{id:string,coinPurchasePlanModel: typeof CoinPurchasePlanModel}) => {
    return await coinPurchasePlanModel.findOne({_id:id});
};
