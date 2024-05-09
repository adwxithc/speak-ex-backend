import { ISession } from '../../../domain/session';


export interface ISessionRepository {
    createSession({ userId, sessionCode }: { userId: string, sessionCode:string }): Promise<ISession>;
}
