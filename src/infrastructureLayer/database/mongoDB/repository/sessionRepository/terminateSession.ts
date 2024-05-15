
import SessionModel from '../../models/SessionModel';

export const terminateSession = async ({
    sessionCode,
    sessionModel,
}: {
    sessionCode: string;
    sessionModel: typeof SessionModel;
}) => {
    await sessionModel.updateOne({sessionCode},{$set:{endingTime:new Date()}});
};
