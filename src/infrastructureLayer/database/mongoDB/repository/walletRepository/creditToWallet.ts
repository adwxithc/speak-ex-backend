import { CurrencyType } from '../../../../../domain/transaction';
import TransactionModel from '../../models/TransactionModel';
import WalletModel from '../../models/WalletModel';


export const creditToWallet = async ({
    userId,
    currencyType,
    amount,
    description,
    walletModel,
    
    transactionModel,
    transactionId
}: {
    userId: string;
    currencyType: CurrencyType;
    amount: number;
    description:string;
    walletModel: typeof WalletModel;
    transactionModel: typeof TransactionModel;
    transactionId:string
}) => {
  
    const transaction  = await transactionModel.create({amount,currencyType,description,timestamp:new Date(),transactionId,type:'credit'});

    let updateCommand ={};
    if(currencyType=='gold'){
        updateCommand={$inc:{goldCoins:amount},$push:{transactions:transaction.id}};
    }else if(currencyType=='silver'){
        updateCommand={$inc:{silverCoins:amount},$push:{transactions:transaction.id}};
    }else{
        updateCommand={$inc:{money:amount},$push:{transactions:transaction.id}};
    }

    await walletModel.findOneAndUpdate({userId},updateCommand,{upsert:true,new:true});
    return transaction;
};