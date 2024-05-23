import ITransaction, { CurrencyType } from '../../../domain/transaction';
import IWallet from '../../../domain/wallet';


export interface IWalletRepository {
    creditToWallet({userId,currencyType,amount,description,transactionId}:{userId:string,currencyType:CurrencyType,amount:number,description:string,transactionId:string}):Promise<ITransaction>;
    debitFromWallet({userId,currencyType,amount,description,transactionId}:{userId:string,currencyType:CurrencyType,amount:number, description:string,transactionId:string}):Promise<ITransaction>;
    getWallet({userId}:{userId:string}):Promise<IWallet|null>
}