import { DbId } from '../usecaseLayer/interface/db/dbTypes';

interface ITransactionInfo{
    id:DbId;
    type:'credit' | 'debit'
    timeStamp?:Date
}

interface IWallet {
    id?: string;
    userId: DbId;
    silverCoins: number;
    goldCoins: number;
    money: number;
    transactions: ITransactionInfo[];
    createdAt?: string;
    updatedAt?: string;
}
export default IWallet;
