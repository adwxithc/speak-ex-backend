import CoinPurchasePlanModel from '../../models/CoinPurchasePlan';

export const createPurchasePlan = async ({
    count,
    price,
    title,
    image,
    coinPurchasePlanModel,
}: {
    count: number;
    price: number;
    title: string;
    image: string;
    coinPurchasePlanModel: typeof CoinPurchasePlanModel;
}) => {
    const purchasePlan = await coinPurchasePlanModel.create({
        count,
        price,
        title,
        image,
    });
    return await purchasePlan.save();
};
