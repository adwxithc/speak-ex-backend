
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

    const post = await sessionModel.create({helper:userId,sessionCode});
    return await post.save();
};
