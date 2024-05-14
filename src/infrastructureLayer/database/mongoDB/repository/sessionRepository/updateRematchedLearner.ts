import { ISession } from '../../../../../domain/session';
import SessionModel from '../../models/SessionModel';

export const updateRematchedLearner = async ({
    sessionCode,
    selectedLearner,
    sessionModel,
}: {
    sessionCode: string;
    selectedLearner: string;
    sessionModel: typeof SessionModel;
}) => {
    const updatedSession  =  await sessionModel.findOneAndUpdate({sessionCode},{$push:{offers:selectedLearner}}) as ISession;
    return updatedSession || null;
};
