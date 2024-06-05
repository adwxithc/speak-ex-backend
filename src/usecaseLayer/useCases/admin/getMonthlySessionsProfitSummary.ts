import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const getMonthlySessionsProfitSummary = async (
    sessionRepository: ISessionRepository
) => {
    const result = await sessionRepository.getMonthlySessionExpenceSummary();
    const MonthlySessionsProfitSummary = result.map((item) => {
        return {
            profit: Number((item.totalExpense * (1 / 9)).toFixed(2)),
            month: item.month,
            year: item.year,
            sessionCount: item.sessionCount,
        };
    });
    return MonthlySessionsProfitSummary;
};
