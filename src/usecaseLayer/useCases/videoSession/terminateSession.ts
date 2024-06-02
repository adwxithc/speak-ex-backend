import IWallet from '../../../domain/wallet';
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IWalletRepository } from '../../interface/repository/IWalletRepository';
import { IGenerateUniQueString } from '../../interface/services/IGenerateUniQueString';

export const terminateSession = async ({
    sessionRepository,

    walletRepository,
    generateUniqueString,
    coinPurchasePlanRepository,
    sessionCode,
    endingTime,
}: {
    sessionRepository: ISessionRepository;

    walletRepository: IWalletRepository;
    coinPurchasePlanRepository: ICoinPurchasePlanRepository;
    generateUniqueString: IGenerateUniQueString;
    sessionCode: string;
    endingTime: string;
}) => {

    const session = await sessionRepository.findBySessionCode({ sessionCode });

    if (
        !session ||
        !session?.helper ||
        !session.learner ||
        session.endingTime
    ) {
        return { success: false, message: 'invalid session' };
    }

    const learnersWalletPromise = walletRepository.getWallet({
        userId: session?.learner?.toString() as string,
    });
    const goldCoinRatePromise = coinPurchasePlanRepository.getAveragePrice();
    

    let learnersWallet: IWallet | null, goldCoinRate = 0;

    if (session?.isMonetized) {
        [learnersWallet, goldCoinRate] = await Promise.all([learnersWalletPromise,goldCoinRatePromise,]);
    } else {
        learnersWallet = await learnersWalletPromise;
    }

    //FIND CURRENCY EXCHANGE WAY
    const currencyTypeForHelper = session.isMonetized ? 'money' : 'silver';
    const currencyTypeForLearner = session.isMonetized ? 'gold' : 'silver';

    //FIND TIME DURATION
    const endingTimeStamp = new Date(endingTime);
    const startingTime = new Date(session.startingTime as string);

    const durationInHours =
        (endingTimeStamp.getTime() - startingTime.getTime()) / 3600_000;

    //FIND TOTAL COIN EXCHANGE
    const totalcoinsExchanged = Math.min(
        Math.floor(durationInHours * session.rate),
        (session.isMonetized?learnersWallet?.goldCoins:learnersWallet?.silverCoins) as number
    );

    if(totalcoinsExchanged<=0){
        return {
            success: true,
            data: totalcoinsExchanged,
            message: 'session terminated',
        };
    }

    //CALCULATING THE WORTH OF 90% OF COIN EXCHANGED (WHICH WILL BE CREDITED TO THE HELPER)
    const moneyToTheHelper = Number((totalcoinsExchanged * goldCoinRate * 0.9).toFixed(2));

    //CREATING DESCRIPTION FOR TRANSACTION
    const creditDescription = `Congratulations! You've successfully helped another user improve their language skills. As a token of appreciation for your time and effort, you've earned ${ session.isMonetized ? moneyToTheHelper + 'Rs from thse session' : totalcoinsExchanged + 'silver coins'}. Keep up the great work and continue sharing your knowledge to earn more rewards!`;
    const debitDescription = `Congratulations! You've successfully completed a learning session ${session.isMonetized && 'from a top rated helper' }.  your  account has been debited ${totalcoinsExchanged} ${ session.isMonetized ? 'gold' : 'silver' } coins. `;

    //PERFORMING TRANSACTION 
    const creditPromise = walletRepository.creditToWallet({
        amount: session.isMonetized ? moneyToTheHelper : totalcoinsExchanged,
        currencyType: currencyTypeForHelper,
        description: creditDescription,
        transactionId: generateUniqueString.getString(),
        userId: session.helper.toString(),
    });
    const debitPromise = walletRepository.debitFromWallet({
        amount: totalcoinsExchanged,
        currencyType: currencyTypeForLearner,
        description: debitDescription,
        transactionId: generateUniqueString.getString(),
        userId: session.learner.toString(),
    });
    const terminatePromise = sessionRepository.terminateSession({
        sessionCode,
        moneyToTheHelper:session.isMonetized?moneyToTheHelper:0,
        endingTime: endingTimeStamp.toString(),
    });

    await Promise.all([creditPromise, debitPromise, terminatePromise]);

    return {
        success: true,
        data: totalcoinsExchanged,
        message: 'session terminated',
    };
};
