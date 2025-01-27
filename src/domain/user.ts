import { DbId } from '../usecaseLayer/interface/db/dbTypes';


interface IUser{
    id?:string;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    profile?:string;
    blocked?:boolean;
    focusLanguage?:string;
    proficientLanguage?:string[]
    followers?: DbId[],
    following?: DbId[]
    isMonetized?:boolean;
    requestedForMonetization?:boolean;
    coverPic?:string;
}

export default IUser; 