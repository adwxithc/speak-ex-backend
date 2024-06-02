import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export interface ISession{
    id?:string;
    sessionCode:string;
    helper:DbId;
    learner?:DbId;
    moneyToTheHelper?:number;
    startingTime?:string;
    endingTime?:string;
    rating?:number
    languageId?:DbId;
    isMonetized?:boolean;
    rate:number;
    createdAt?:string;
    updatedAt?:string;
    offers:DbId[]
}