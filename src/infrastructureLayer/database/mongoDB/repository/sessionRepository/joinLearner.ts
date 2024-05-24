
import SessionModel from '../../models/SessionModel';


export const joinLearner = async ({
    learner,
    sessionCode,
    rate,
    languageId,
    sessionModel,
}: {
    learner: string;
    sessionCode:string,
    rate:number,
    languageId:string,
    sessionModel: typeof SessionModel;
}) => {

    const session = await sessionModel.updateOne({sessionCode},{learner,startingTime:new Date(),languageId,rate});
    return session.modifiedCount==1;
};
