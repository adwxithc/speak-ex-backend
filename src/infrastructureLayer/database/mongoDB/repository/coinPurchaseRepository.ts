import ICoinPurchase from '../../../../domain/coinPurchase';
import ICoinPurchasePlan from '../../../../domain/coinPurchasePlan';
import { ICoinPurchaseRepository } from '../../../../usecaseLayer/interface/repository/ICoinPurchaseRepository';
import CoinPurchaseModel from '../models/CoinPurchaseModal';
import { createPurchase, getPopularPurchasePlans, getTotalEarnings } from './coinPurchaseRepository/';



export class CoinPurchaseRepository implements ICoinPurchaseRepository {
    constructor(private coinPurchaseModel: typeof CoinPurchaseModel) {}

    async createPurchase(purchase: ICoinPurchase): Promise<ICoinPurchase> {
        return await createPurchase({purchase,coinPurchaseModel:this.coinPurchaseModel});
    }

    async getTotalEarnings(){
        return await getTotalEarnings(this.coinPurchaseModel);
        
    }

    async getPopularPurchasePlans(): Promise<ICoinPurchasePlan[]> {
        return await getPopularPurchasePlans(this.coinPurchaseModel);
    }
    
}
