import { ICoinPurchaseRepository } from '../../interface/repository/ICoinPurchaseRepository';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const getDashboardNumerics = async ({
    coinPurchaseRepository,
    sessionRepository,
  
}: {
    coinPurchaseRepository: ICoinPurchaseRepository;
    sessionRepository:ISessionRepository

}) => {
    const totalEarningsPromise =  coinPurchaseRepository.getTotalEarnings();
    const totalSessionsPromise =  sessionRepository.getTotalSessionCounts();
    const totalHelperEarnedMoneyPromise =  sessionRepository.getTotalMoneyHelpersGain();

     

    const  [totalEarnings, totalSessions, totalHelperEarnedMoney]  = await Promise.all([totalEarningsPromise, totalSessionsPromise, totalHelperEarnedMoneyPromise]);

    const totalProfit={
        thisMonth:Number((totalHelperEarnedMoney.thisMonth*(1/9)).toFixed(2)),
        lastMonth:Number((totalHelperEarnedMoney.lastMonth*(1/9)).toFixed(2))
    };
    return {
        totalEarnings,totalSessions, totalProfit
    };
};
