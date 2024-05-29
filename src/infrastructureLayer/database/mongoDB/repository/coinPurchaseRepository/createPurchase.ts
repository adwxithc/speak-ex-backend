import ICoinPurchase from '../../../../../domain/coinPurchase';
import CoinPurchaseModel from '../../models/CoinPurchaseModal';

export const createPurchase = async ({
    purchase,
    coinPurchaseModel,
}: {
    purchase:ICoinPurchase
    coinPurchaseModel: typeof CoinPurchaseModel;
}) => {
    const purchasePlan = await coinPurchaseModel.create(purchase);
    return await purchasePlan.save();
};
