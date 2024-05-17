import { CurrencyType } from '../../../../domain/transaction';
import { IWalletRepository } from '../../../../usecaseLayer/interface/repository/IWalletRepository';
import { IGenerateUniQueString } from '../../../../usecaseLayer/interface/services/IGenerateUniQueString';
import TransactionModel from '../models/TransactionModel';
import WalletModel from '../models/WalletModel';
import { creditToWallet, debitFromWallet } from './walletRepository/';

export class WalletRepository implements IWalletRepository {
    
    private walletModel: typeof WalletModel;
    private transactionModel: typeof TransactionModel;
    private generateUniQueString: IGenerateUniQueString;

    constructor({
        walletModel,
        transactionModel,
        generateUniQueString,
    }: {
        walletModel: typeof WalletModel;
        transactionModel: typeof TransactionModel;
        generateUniQueString: IGenerateUniQueString;
    }) {
        this.walletModel = walletModel;
        this.transactionModel = transactionModel;
        this.generateUniQueString = generateUniQueString;
    }

    async creditToWallet({
        userId,
        currencyType,
        amount,
        description,
    }: {
        userId: string;
        currencyType: CurrencyType;
        amount: number;
        description: string;
    }) {
        return await creditToWallet({
            userId,
            currencyType,
            amount,
            walletModel: this.walletModel,
            transactionModel: this.transactionModel,
            description,
            generateUniQueString: this.generateUniQueString,
        });
    }

    async debitFromWallet({
        userId,
        currencyType,
        amount,
        description,
    }: {
        userId: string;
        currencyType: CurrencyType;
        amount: number;
        description: string;
    }) {
        return await debitFromWallet({
            userId,
            currencyType,
            amount,
            walletModel: this.walletModel,
            transactionModel: this.transactionModel,
            description,
            generateUniQueString: this.generateUniQueString,
        });
    }
}
