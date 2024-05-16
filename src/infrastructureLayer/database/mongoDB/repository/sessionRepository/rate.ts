
import { ISession } from '../../../../../domain/session';
import SessionModel from '../../models/SessionModel';


export const rate = async ({
    sessionCode,
    rating,
    sessionModel,
}: {
    sessionCode:string
    rating:number;
    sessionModel: typeof SessionModel;
}) => {

    const session = await sessionModel.findOneAndUpdate({sessionCode},{rating}, { new: true }) as ISession;
    return session;
 
};
