

import { ISession } from '../../../../../domain/session';
import SessionModel from '../../models/SessionModel';


export const findBySessionCode = async ({
    sessionCode,
    sessionModel,
}: {

    sessionCode:string
    sessionModel: typeof SessionModel;
}):Promise<ISession | null> => {
    const session = await sessionModel.findOne({sessionCode}) || null  ;
    return session;
};
