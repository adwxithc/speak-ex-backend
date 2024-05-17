import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export interface ISession{
    id?:string;
    sessionCode:string;
    helper:DbId;
    learner?:DbId;
    startingTime?:string;
    endingTime?:string;
    rating?:number
    createdAt?:string;
    updatedAt?:string;
    offers:DbId[]
}