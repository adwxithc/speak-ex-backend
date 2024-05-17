
export type CurrencyType='gold' | 'silver' | 'money'

interface ITransaction {
    description: string;
    amount: number;
    timestamp: Date;
    type: 'credit' | 'debit';
    currencyType: CurrencyType;
    transactionId: string;
}

export default ITransaction;