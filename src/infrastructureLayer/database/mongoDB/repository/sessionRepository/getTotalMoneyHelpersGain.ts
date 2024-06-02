import SessionModel from '../../models/SessionModel';

export const getTotalMoneyHelpersGain = async (
    sessionModel: typeof SessionModel
) => {
    const now = new Date();
   
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // Months are zero-based, so we add 1
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Handle January
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear; // If current month is January, previous month is in the previous year

    // Pad single digit months with leading zero
    const currentMonthFormatted = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    const previousMonthFormatted = previousMonth < 10 ? '0' + previousMonth : previousMonth;

    const currentMonthYear = `${currentYear}-${currentMonthFormatted}`;
    const previousMonthYear = `${previousYear}-${previousMonthFormatted}`;
 

    // Start of the previous month
    const previousMonthStart = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
    );


    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const result = await sessionModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: previousMonthStart,
                    $lt: currentMonthEnd,
                },
                isMonetized:true,
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m', date: '$createdAt' },
                },
                totalMoney: { $sum: '$moneyToTheHelper' },
            },
        },

    ]);

    const totalHelperEarnedMoney = {
        thisMonth: 0,
        lastMonth: 0,
    };

    
    

    // Extract earnings for the current and previous months
    result.forEach((item) => {
        if (item._id === currentMonthYear) {
            totalHelperEarnedMoney.thisMonth = item.totalMoney;
        } else if (item._id === previousMonthYear) {
            totalHelperEarnedMoney.lastMonth = item.totalMoney;
        }
    });

    return totalHelperEarnedMoney;
};
