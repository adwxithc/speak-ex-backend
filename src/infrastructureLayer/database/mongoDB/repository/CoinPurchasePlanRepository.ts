
import { ICoinPurchasePlanRepository } from '../../../../usecaseLayer/interface/repository/ICoinPurchasePlanRepository';
import CoinPurchasePlanModel from '../models/CoinPurchasePlan';
import { createPurchasePlan, deletePlan, getAveragePrice, getPurchasePlan, getPurchasePlans } from './coinPurchasePlanRepository/';



export class CoinPurchasePlanRepository implements ICoinPurchasePlanRepository {
    constructor(private coinPurchasePlanModel: typeof CoinPurchasePlanModel) {}

    async createPurchasePlan({ count, price, title, image }: { count: number; price: number; title: string; image: string; }){
        return await createPurchasePlan({count, price, title, image,coinPurchasePlanModel:this.coinPurchasePlanModel });
    }
    async getPurchasePlans(){
        return await getPurchasePlans(this.coinPurchasePlanModel);
    }
    async deletePlan(id: string) {
        return await deletePlan({id,coinPurchasePlanModel:this.coinPurchasePlanModel});
    }
    async getPurchasePlan(id: string){
        return await getPurchasePlan({id, coinPurchasePlanModel:this.coinPurchasePlanModel});
    }
    async getAveragePrice(){
        return await getAveragePrice(this.coinPurchasePlanModel);
    }
    
}
