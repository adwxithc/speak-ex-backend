import { BadRequestError } from '../../errors';
import { ICoinPurchaseRepository } from '../../interface/repository/ICoinPurchaseRepository';
import { IWalletRepository } from '../../interface/repository/IWalletRepository';
import { IPaymentService } from '../../interface/services/IPaymentService';

export const paymentConfirmation = async ({
    signature,
    payload,
    walletRepository,
    coinPurchaseRepository,
    paymentService,
}: {
    signature: string;
    payload: Buffer;
    walletRepository: IWalletRepository;
    coinPurchaseRepository: ICoinPurchaseRepository;
    paymentService: IPaymentService;
}) => {

    const result = await paymentService.verify({
        signature,
        payload,
    });

    if(!result) throw new BadRequestError('invalid event');

    const {transactionId,metadata}=result;
    const {amount,coinCount,coinPurchasePlanId,userId}=metadata;
    

    await coinPurchaseRepository.createPurchase({
        amount,
        planId: coinPurchasePlanId,
        transactionId,
        userId,
    });
    await walletRepository.creditToWallet({
        amount: coinCount,
        currencyType: 'gold',
        description: `Purchase successful! You have bought ${coinCount} gold coins for ${amount} Rs. Thank you for your transaction.`,
        transactionId,
        userId,
    });
};
