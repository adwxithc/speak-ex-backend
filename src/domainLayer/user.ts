interface IUser{
    id?:number;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    profile?:string;
    blocked?:boolean;
    focusLanguage?:string;
    proficientLanguage?:string[]
    
}

export default IUser;