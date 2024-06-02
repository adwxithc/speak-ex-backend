import SessionModel from '../../models/SessionModel';

export const getMonthlySessionExpenceSummary = async (
    sessionModel: typeof SessionModel
) => {
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);

    const sessionCountsPromise = sessionModel.aggregate([
        {
            $match: {
                createdAt: { $gte: sevenMonthsAgo }, // Filter sessions within the past 7 months
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 }, // Count sessions in each month
            },
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1 }, // Sort by year and month
        },
    ]);

    const expenseDataPromise = sessionModel.aggregate([
        {
            $match: {
                createdAt: { $gte: sevenMonthsAgo }, // Filter sessions within the past 7 months
                isMonetized: true,
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                moneyToTheHelperSum: { $sum: '$moneyToTheHelper' }, // Count sessions in each month
            },
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1 }, // Sort by year and month
        },
    ]);

    const [expenseData, sessionCounts] = await Promise.all([
        expenseDataPromise,
        sessionCountsPromise,
    ]);

    // Create a map of expense and session count data
    const expenseDataMap = new Map(
        expenseData.map((entry) => [
            `${entry._id.year}-${entry._id.month}`,
            entry.moneyToTheHelperSum,
        ])
    );
    const sessionCountsMap = new Map(
        sessionCounts.map((entry) => [
            `${entry._id.year}-${entry._id.month}`,
            entry.count,
        ])
    );

    // Generate the past 7 months
    const pastSevenMonths = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
        pastSevenMonths.push(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        );
    }
    pastSevenMonths.reverse();

    // Create the final result array
    const result = pastSevenMonths.map((date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is zero-based
        const key = `${year}-${month}`;

        return {
            year: year.toString(),
            month: month.toString(),
            sessionCount: sessionCountsMap.get(key) || 0,
            totalExpense: expenseDataMap.get(key) || 0,
        };
    });

    return result;
};
