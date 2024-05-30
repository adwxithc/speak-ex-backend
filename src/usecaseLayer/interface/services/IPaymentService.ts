
import ICoinPurchasePlan from '../../../domain/coinPurchasePlan';

export interface IPaymentService {
    createPaymentIntent({amount,userId,coinPurchasePlan}:{amount:number,userId:string,coinPurchasePlan:ICoinPurchasePlan}):Promise<string|undefined>
    verify({signature, payload}:{signature:string,payload:Buffer}):Promise<{metadata:{userId:string,coinPurchasePlanId: string,amount:number,coinCount: number},transactionId:string}|null>
}
