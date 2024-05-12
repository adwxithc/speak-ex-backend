
import SessionModel from '../../models/SessionModel';


export const createSession = async ({
    userId,
    sessionCode,
    sessionModel,
}: {
    userId: string;
    sessionCode:string
    sessionModel: typeof SessionModel;
}) => {

    const session = await sessionModel.create({helper:userId,sessionCode});
    return await session.save();
};
