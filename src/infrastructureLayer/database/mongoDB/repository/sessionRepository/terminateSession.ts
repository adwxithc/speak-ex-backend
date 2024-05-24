
import SessionModel from '../../models/SessionModel';

export const terminateSession = async ({
    sessionCode,
    endingTime,
    sessionModel,
}: {
    sessionCode: string;
    endingTime:string;
    sessionModel: typeof SessionModel;
}) => {
    await sessionModel.updateOne({sessionCode},{$set:{endingTime}});
};
