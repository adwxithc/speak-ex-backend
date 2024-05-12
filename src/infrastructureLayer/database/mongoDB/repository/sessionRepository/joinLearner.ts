
import SessionModel from '../../models/SessionModel';


export const joinLearner = async ({
    learner,
    sessionCode,
    sessionModel,
}: {
    learner: string;
    sessionCode:string
    sessionModel: typeof SessionModel;
}) => {

    const session = await sessionModel.updateOne({sessionCode},{learner,startingTime:new Date()});
    return session.modifiedCount==1;
};
