
import SessionModel from '../../models/SessionModel';

export const terminateSession = async ({
    sessionCode,
    moneyToTheHelper,
    endingTime,
    sessionModel,
}: {
    sessionCode: string;
    moneyToTheHelper:number;
    endingTime:string;
    sessionModel: typeof SessionModel;
}) => {
    await sessionModel.updateOne({sessionCode},{$set:{endingTime,moneyToTheHelper}});
};
