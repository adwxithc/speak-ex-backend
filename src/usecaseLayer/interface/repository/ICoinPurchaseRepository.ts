import ICoinPurchase from '../../../domain/coinPurchase';
import ICoinPurchasePlan from '../../../domain/coinPurchasePlan';

export interface ICoinPurchaseRepository {
    createPurchase(pruchase: ICoinPurchase): Promise<ICoinPurchase>;
    getTotalEarnings(): Promise<{ thisMonth: number; lastMonth: number }>;
    getPopularPurchasePlans():Promise<ICoinPurchasePlan[]>
}
