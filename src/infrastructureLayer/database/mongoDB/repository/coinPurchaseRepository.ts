import ICoinPurchase from '../../../../domain/coinPurchase';
import { ICoinPurchaseRepository } from '../../../../usecaseLayer/interface/repository/ICoinPurchaseRepository';
import CoinPurchaseModel from '../models/CoinPurchaseModal';
import { createPurchase } from './coinPurchaseRepository/';



export class CoinPurchaseRepository implements ICoinPurchaseRepository {
    constructor(private coinPurchaseModel: typeof CoinPurchaseModel) {}

    async createPurchase(purchase: ICoinPurchase): Promise<ICoinPurchase> {
        return await createPurchase({purchase,coinPurchaseModel:this.coinPurchaseModel});
    }
    
}
