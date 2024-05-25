import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export type CurrencyType='gold' | 'silver' | 'money'

interface ITransaction {
    id?:DbId
    description: string;
    amount: number;
    timestamp: Date;
    type: 'credit' | 'debit';
    currencyType: CurrencyType;
    transactionId: string;
}

export default ITransaction;