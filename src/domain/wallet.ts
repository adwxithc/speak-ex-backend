import { DbId } from '../usecaseLayer/interface/db/dbTypes';



interface IWallet {
    id?: string;
    userId: DbId;
    silverCoins: number;
    goldCoins: number;
    money: number;
    transactions: DbId[];
    createdAt?: string;
    updatedAt?: string;
}
export default IWallet;
