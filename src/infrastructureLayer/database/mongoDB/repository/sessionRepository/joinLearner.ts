
import SessionModel from '../../models/SessionModel';


export const joinLearner = async ({
    learner,
    sessionCode,
    languageId,
    sessionModel,
}: {
    learner: string;
    sessionCode:string,
    languageId:string,
    sessionModel: typeof SessionModel;
}) => {

    const session = await sessionModel.updateOne({sessionCode},{learner,startingTime:new Date(),languageId});
    return session.modifiedCount==1;
};
