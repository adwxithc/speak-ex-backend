import ICoinPurchase from '../../../domain/coinPurchase';


export interface ICoinPurchaseRepository {
    createPurchase(pruchase:ICoinPurchase):Promise<ICoinPurchase>
 
}