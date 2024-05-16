import mongoose from 'mongoose';
import LanguageModel from '../../models/languageModel';
import { ILanguageInfo } from '../../../../../usecaseLayer/interface/usecase/languageUseCase';

export const getLanguageInfo = async ({
    languageId,
    languageModel,
}: {
    languageId: string;
    languageModel: typeof LanguageModel;
}) => {
    const aggregationPipeline = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(languageId),
            },
        },
        {
            $facet: {
                helpersCount: [
                    {
                        $lookup: {
                            from: 'users',
                            let: { languageId: { $toString: '$_id' } },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $in: ['$$languageId', '$proficientLanguage'] }
                                    }
                                },
                                {
                                    $count: 'count'
                                }
                            ],
                            as: 'count'
                        }
                    },
                    {
                        $unwind: { path: '$count', preserveNullAndEmptyArrays: true }
                    },
                    {
                        $project: {
                            count: { $ifNull: ['$count.count', 0] }
                        }
                    }
                ],
                learnersCount:[
                    {
                        $lookup: {
                            from: 'users',
                            let: { languageId: { $toString: '$_id' } },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ['$$languageId', '$focusLanguage'] }
                                    }
                                },
                                {
                                    $count: 'count'
                                }
                            ],
                            as: 'count'
                        }
                        
                    },
                    {
                        $unwind: { path: '$count', preserveNullAndEmptyArrays: true }
                    },
                    {
                        $project: {
                            count: { $ifNull: ['$count.count', 0] }
                        }
                    }
                ],
                language:[
                    {
                        $project:{
                            id:'$_id',
                            name:1,
                            basePrice:1,
                            createdAt:1,
                            updatedAt:1,

                        }
                    }
                ]
            },
        },
        {
            $unwind: '$helpersCount'
        },
        {
            $unwind: '$learnersCount'
        },
        {
            $unwind:'$language'
        },
        {
            $project:{
                id:'$helpersCount._id',
                basePrice:'$language.basePrice',
                createdAt:'$language.createdAt',
                updatedAt:'$language.updatedAt',
                name:'$language.name',
                helpersCount:'$helpersCount.count',
                learnersCount:'$learnersCount.count'
            }
        }
    ];

    const languageInfo = (await languageModel.aggregate(
        aggregationPipeline
    )) as [ILanguageInfo];


    return languageInfo[0];
};
