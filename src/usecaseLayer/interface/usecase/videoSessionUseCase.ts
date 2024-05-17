import { IReport } from '../../../domain/report';
import { ISession } from '../../../domain/session';

export interface IVideoSessionUseCase {
    startSession({
        userId,
        liveUsers,
    }: {
        userId: string;
        liveUsers: string[];
    }): Promise<ISession>;
    rematch({
        sessionCode,
        liveUsers,
    }: {
        sessionCode: string;
        liveUsers: string[];
    }): Promise<string | null>;

    terminateSession({sessionCode}:{sessionCode:string}):Promise<void>

    rate({sessionCode,userId,rating}:{sessionCode:string,userId:string,rating:number}):Promise<ISession>;
    report({sessionCode,description,reporter}:{sessionCode:string,description:string,reporter:string}):Promise<IReport>;
}
