export interface IUser{
    id?:number;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
    profile?:string;
    blocked?:boolean;
    focusLanguage:string;
    proficientLanguage:string[]
    
}