import CoinPurchasePlanModel from '../../models/CoinPurchasePlan';

export const deletePlan = async ({
    id,
    coinPurchasePlanModel,
}: {
    id:string,
    coinPurchasePlanModel: typeof CoinPurchasePlanModel;
}) => {
    return await coinPurchasePlanModel.findByIdAndDelete(id);
};
