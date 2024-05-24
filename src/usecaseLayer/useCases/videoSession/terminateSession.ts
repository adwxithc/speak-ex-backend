import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IWalletRepository } from '../../interface/repository/IWalletRepository';
import { IGenerateUniQueString } from '../../interface/services/IGenerateUniQueString';

export const terminateSession = async ({
    sessionRepository,
    walletRepository,
    generateUniqueString,
    sessionCode,
}: {
    sessionRepository: ISessionRepository;
    walletRepository: IWalletRepository;
    generateUniqueString: IGenerateUniQueString;
    sessionCode: string;
}) => {
    const session = await sessionRepository.findBySessionCode({ sessionCode });

    if (
        !session ||
        !session?.helper ||
        !session.learner ||
        session.endingTime
    ) {
        return;
    }

    const endingTime = new Date();
    const startingTime = new Date(session.startingTime as string);

    const durationInHours =
        (endingTime.getTime() - startingTime.getTime()) / 3600_000;
    const totalcoinsExchanged =Math.floor( durationInHours * session.rate);

    const creditDescription = `Congratulations! You've successfully helped another user improve their language skills. As a token of appreciation for your time and effort, you've earned ${totalcoinsExchanged} silver coins. Keep up the great work and continue sharing your knowledge to earn more rewards!`;
    const debitDescription = `Congratulations! You've successfully completed a learning session.  your  account has been debited ${totalcoinsExchanged} silver coins. `;

    const creditPromise = walletRepository.creditToWallet({
        amount: totalcoinsExchanged,
        currencyType: 'silver',
        description: creditDescription,
        transactionId: generateUniqueString.getString(),
        userId: session.helper.toString(),
    });
    const debitPromise =  walletRepository.debitFromWallet({
        amount: totalcoinsExchanged,
        currencyType: 'silver',
        description: debitDescription,
        transactionId: generateUniqueString.getString(),
        userId: session.learner.toString(),
    });
    const terminatePromise = sessionRepository.terminateSession({
        sessionCode,
        endingTime: endingTime.toString(),
    });

    const res = await Promise.all([creditPromise,debitPromise,terminatePromise]);
    console.log(res,'termination process data');
    
};
