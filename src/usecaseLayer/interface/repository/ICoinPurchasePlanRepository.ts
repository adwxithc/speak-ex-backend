import ICoinPurchasePlan from '../../../domain/coinPurchasePlan';

export interface ICoinPurchasePlanRepository {
    createPurchasePlan({count,price,title,image}:{count:number; price:number; title:string; image:string}):Promise<ICoinPurchasePlan>
    getPurchasePlans():Promise<ICoinPurchasePlan[]>
    getPurchasePlan(id:string):Promise<ICoinPurchasePlan|null>
    deletePlan(id:string):Promise<ICoinPurchasePlan|null>
    getAveragePrice():Promise<number>;
}