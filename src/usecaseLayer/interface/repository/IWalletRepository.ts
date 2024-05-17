import ITransaction, { CurrencyType } from '../../../domain/transaction';


export interface IWalletRepository {
    creditToWallet({userId,currencyType,amount,description}:{userId:string,currencyType:CurrencyType,amount:number,description:string}):Promise<ITransaction>;
    debitFromWallet({userId,currencyType,amount,description}:{userId:string,currencyType:CurrencyType,amount:number, description:string}):Promise<ITransaction>;
    
}
