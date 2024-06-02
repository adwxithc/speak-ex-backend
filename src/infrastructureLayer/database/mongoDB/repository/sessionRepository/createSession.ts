
import mongoose from 'mongoose';
import SessionModel from '../../models/SessionModel';


export const createSession = async ({
    userId,
    selectedLearner,
    sessionCode,
    sessionModel,
    isMonetized
}: {
    userId: string;
    selectedLearner:string
    sessionCode:string
    isMonetized:boolean,
    sessionModel: typeof SessionModel;
}) => {

    const user = selectedLearner?new mongoose.Types.ObjectId(selectedLearner):'';
    const offers = user?[user]:[];
    const session = await sessionModel.create({helper:userId,sessionCode,offers,isMonetized});
    return await session.save();
};
