
import { BadRequestError } from '../../errors';
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';


export const deletePurchasePlan = async ({
    id,
    coinPurchasePlanRepository,
}: {
    id:string,
    coinPurchasePlanRepository: ICoinPurchasePlanRepository;
}) => {
    const purchasePlan = await coinPurchasePlanRepository.deletePlan(id);
    if (!purchasePlan) {
        throw new BadRequestError('invalid id');
    }
    return purchasePlan;
};
