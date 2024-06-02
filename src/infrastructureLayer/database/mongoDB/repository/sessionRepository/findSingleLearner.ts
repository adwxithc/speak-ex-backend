import { ISession } from '../../../../../domain/session';
import IUser from '../../../../../domain/user';
import SessionModel from '../../models/SessionModel';

export const findSingleLearner = async ({
    sessionCode,
    liveUsers,
    sessionModel,
}: {
    sessionCode: string;
    liveUsers: string[];
    sessionModel: typeof SessionModel;
}) => {
    const session = await sessionModel.findOne({ sessionCode }).populate('helper') as ISession & {helper :IUser};
    if(!session) return null;
    const isMonetized = session.helper.isMonetized;

    const [{ learners, offers }] = (await sessionModel.aggregate([
        {
            $match: {
                sessionCode,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'helper',
                foreignField: '_id',
                as: 'helper',
            },
        },
        {
            $unwind: '$helper',
        },
        {
            $lookup: {
                from: 'users',
                let: { proficientLanguage: '$helper.proficientLanguage' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$focusLanguage', '$$proficientLanguage']
                            }
                        }
                    },
                    ...(isMonetized ? [
                        {
                            $lookup: {
                                from: 'wallets',
                                localField: '_id',
                                foreignField: 'userId',
                                as: 'wallet'
                            }
                        },
                        {
                            $unwind: '$wallet'
                        },
                        {
                            $match: {
                                'wallet.goldCoins': { $gt: 5 }
                            }
                        }
                    ] : []),
                    // {
                    //     $project: {
                    //         _id: 1,
                    //     }
                    // }
                ],
                as: 'learners'
            },
        },
        
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'helper.proficientLanguage',
        //         foreignField: 'focusLanguage',
        //         as: 'learners',
        //     },
        // },

        {
            $unwind: '$learners',
        },
        {
            $group: {
                _id: '$sessionCode',
                learners: { $push: '$learners._id' },
                offers: { $first: '$offers' },
            },
        },
    ])) as { learners: string[]; offers: string[] }[];

    const stringifiedLearner = learners.map((learner) => learner.toString());
    const stringifiedOffers = offers.map((offer) => offer.toString());

    const eligibleLearners = stringifiedLearner.filter(
        (learner) => !stringifiedOffers.includes(learner)
    );

    const selectedLearner =
        eligibleLearners.find((learner) => liveUsers.includes(learner)) || null;

    return selectedLearner;
};
