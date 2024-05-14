
import SessionModel from '../../models/SessionModel';


export const findSingleLearner = async ({
    sessionCode,
    liveUsers,
    sessionModel,
}: {

    sessionCode:string;
    liveUsers:string[];
    sessionModel: typeof SessionModel;
}) => {
    const [{learners, offers}] = await sessionModel.aggregate([
        {
            $match:{
                sessionCode,
            },
          
        },
        {
            $lookup:{
                from: 'users',
                localField: 'helper',
                foreignField: '_id',
                as: 'helper',
            }
        },
        {
            $unwind:'$helper'
        },
        {
            $lookup:{
                from:'users',
                localField:'helper.proficientLanguage',
                foreignField:'focusLanguage',
                as:'learners'
            }
        },
    
        {
            $unwind:'$learners'
        },
        {
            $group:{
                _id:'$sessionCode',
                learners:{$push:'$learners._id'},
                offers:{$first:'$offers'}
            }
        }
        
    ]) as {learners:string[], offers:string[]}[];

    
    


    const stringifiedLearner = learners.map(learner=>learner.toString());
    const stringifiedOffers = offers.map(offer=>offer.toString());
    
    const eligibleLearners = stringifiedLearner.filter(learner=>!stringifiedOffers.includes(learner));

    console.log(stringifiedLearner,'stringifiedLearner',eligibleLearners,'eligibleLearners',stringifiedOffers,'stringifiedOffers');
    
    
    
    const selectedLearner = eligibleLearners.find(learner=>liveUsers.includes(learner)) || null;


    
    
    return selectedLearner;
};
