import { CurrencyType } from '../../../../domain/transaction';
import { IWalletRepository } from '../../../../usecaseLayer/interface/repository/IWalletRepository';
import TransactionModel from '../models/TransactionModel';
import WalletModel from '../models/WalletModel';
import {
    creditToWallet,
    debitFromWallet,
    getWallet,
    listTransactions,
} from './walletRepository/';

export class WalletRepository implements IWalletRepository {
    private walletModel: typeof WalletModel;
    private transactionModel: typeof TransactionModel;

    constructor({
        walletModel,
        transactionModel,
    }: {
        walletModel: typeof WalletModel;
        transactionModel: typeof TransactionModel;
    }) {
        this.walletModel = walletModel;
        this.transactionModel = transactionModel;
    }

    async creditToWallet({
        userId,
        currencyType,
        amount,
        description,
        transactionId,
    }: {
        userId: string;
        currencyType: CurrencyType;
        amount: number;
        description: string;
        transactionId: string;
    }) {
        return await creditToWallet({
            userId,
            currencyType,
            amount,
            walletModel: this.walletModel,
            transactionModel: this.transactionModel,
            description,
            transactionId,
        });
    }

    async debitFromWallet({
        userId,
        currencyType,
        amount,
        description,
        transactionId,
    }: {
        userId: string;
        currencyType: CurrencyType;
        amount: number;
        description: string;
        transactionId: string;
    }) {
        return await debitFromWallet({
            userId,
            currencyType,
            amount,
            walletModel: this.walletModel,
            transactionModel: this.transactionModel,
            description,
            transactionId,
        });
    }

    async getWallet({ userId }: { userId: string }) {
        return await getWallet({ userId, walletModel: this.walletModel });
    }
    async listTransactions({
        limit,
        page,
        type,
        userId,
    }: {
        limit: number;
        page: number;
        type: 'credit' | 'debit' | 'all';
        userId: string;
    }) {
        return await listTransactions({
            limit,
            page,
            type,
            userId,
            walletModel: this.walletModel,
        });
    }
   
    
}
