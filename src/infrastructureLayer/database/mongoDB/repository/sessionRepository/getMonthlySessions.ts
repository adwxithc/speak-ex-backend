
import mongoose from 'mongoose';
import SessionModel from '../../models/SessionModel';
import { ILnaguageMonthelySessions } from '../../../../../usecaseLayer/interface/usecase/languageUseCase';


export const getMonthlySessions = async ({

    languageId,
    sessionModel,
}: {
  
    languageId:string,
    sessionModel: typeof SessionModel;
}) => {

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySessions = await sessionModel.aggregate([
        {
            $match: {
                languageId: new mongoose.Types.ObjectId(languageId),
                createdAt: { $gte: sixMonthsAgo }
            }
        },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        {
            $addFields: {
                monthName: {
                    $dateToString: { format: '%B', date: { $dateFromParts: { year: '$_id.year', month: '$_id.month' } } }
                }
            }
        },
        {
            $sort: {
                '_id.year': 1,
                '_id.month': 1
            }
        },
        {
            $project: {
                _id: 0,
                year: '$_id.year',
                month: '$monthName',
                count: 1
            }
        }
    ]) as ILnaguageMonthelySessions[];

    return monthlySessions;
    
};
