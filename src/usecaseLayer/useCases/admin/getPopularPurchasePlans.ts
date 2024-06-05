import { ICoinPurchaseRepository } from '../../interface/repository/ICoinPurchaseRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const getPopularPurchasePlans = async ({coinPurchaseRepository,fileBucket}:{coinPurchaseRepository: ICoinPurchaseRepository; fileBucket:IFileBucket}
    
) => {
    const plans= await coinPurchaseRepository.getPopularPurchasePlans();
    plans.forEach(plan=>(plan.image=fileBucket.getFileAccessURL(plan.image)));
    return plans;
};
