export interface ISocketRepository {
    addUser(userId: string, socketId: string): Promise<void>;
    removeUser(socketId: string): Promise<void>;
    getUser(userId: string): Promise<{
        userId: string;
        socketId: string;
    } | null>;
    getUser(userId: string): Promise<{
        userId: string;
        socketId: string;
    } | null>;
    getAllUsers(): Promise<
        {
            userId: string;
            socketId: string;
        }[]
    >;
    addToPriorityQueue({ userId }: { userId: string }): Promise<void>;
    getAllUserFromPriority(): Promise<string[]>;
    descreasePriority({ userId }: { userId: string }): Promise<void>;
    removePriority({ userId }: { userId: string }): Promise<void>;
    setSession(sessionCode:string,data:string):Promise<void>
    getSession(sessionCode:string):Promise<string|null>
}
