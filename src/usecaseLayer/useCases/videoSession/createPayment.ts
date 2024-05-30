import { BadRequestError } from '../../errors';
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import { IPaymentService } from '../../interface/services/IPaymentService';

export const createPayment = async ({
    userId,
    coinPurchasePlanId,
    coinPurchasePlanRepository,
    paymentService,
    fileBucket
}: {
    userId: string;
    coinPurchasePlanId: string;
    coinPurchasePlanRepository:ICoinPurchasePlanRepository
    paymentService: IPaymentService;
    fileBucket:IFileBucket
}) => {
    const plan = await coinPurchasePlanRepository.getPurchasePlan(coinPurchasePlanId);

    if(!plan) throw new BadRequestError('invalid plan');
    plan.image = fileBucket.getFileAccessURL(plan.image);

    const id = await paymentService.createPaymentIntent({amount:plan.price,coinPurchasePlan:plan,userId}) || '';

    return id ;
};
