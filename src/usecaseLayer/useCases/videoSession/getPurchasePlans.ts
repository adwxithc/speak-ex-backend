
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const getPurchasePlans = async ({
    coinPurchasePlanRepository,
    fileBucket,
   
}: {
    coinPurchasePlanRepository: ICoinPurchasePlanRepository;
    fileBucket:IFileBucket,
  
}) => {

    const purchasePlans = await coinPurchasePlanRepository.getPurchasePlans();

    purchasePlans.forEach(p=>p.image=fileBucket.getFileAccessURL(p.image));
    return purchasePlans;
};