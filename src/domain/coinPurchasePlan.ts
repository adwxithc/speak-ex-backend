interface ICoinPurchasePlan{
    id?:string;
    price:number;
    count:number;
    title:string;
    image:string;
    deleted?:boolean;
    createdAt?:string,
    updatedAt?:string
}

export default ICoinPurchasePlan;