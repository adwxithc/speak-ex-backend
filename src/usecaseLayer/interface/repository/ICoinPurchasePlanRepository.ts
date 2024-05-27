import ICoinPurchasePlan from '../../../domain/coinPurchasePlan';

export interface ICoinPurchasePlanRepository {
    createPurchasePlan({count,price,title,image}:{count:number; price:number; title:string; image:string}):Promise<ICoinPurchasePlan>
}