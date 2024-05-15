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
}
