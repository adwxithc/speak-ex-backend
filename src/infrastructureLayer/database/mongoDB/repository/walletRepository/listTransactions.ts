import mongoose from 'mongoose';
import WalletModel from '../../models/WalletModel';
import ITransaction from '../../../../../domain/transaction';

export const listTransactions = async ({
    userId,
    limit,
    page,
    type,
    walletModel,
}: {
    userId: string;
    page: number;
    limit: number;
    type: 'all' | 'credit' | 'debit';
    walletModel: typeof WalletModel;
}) => {
    let matchCriteria = {};

    if (type == 'credit' || type == 'debit') {
        matchCriteria = {
            'transactions.type':type
        };
    } 

    const transactionsPromise =  walletModel.aggregate([
        {
            $match:{userId:new mongoose.Types.ObjectId(userId)}
        },
        {
            $unwind:'$transactions'
        },
        {
            $match:matchCriteria
        },
        {
            $sort:{ 'transactions.timeStamp':-1}
        },
        {
            $skip:(page-1)*limit
        },
        {
            $limit:limit
        },
        {
            $lookup:{
                from:'transactions',
                localField:'transactions.id',
                foreignField:'_id',
                as:'transactionData'
            }
        },
        {
            $unwind:'$transactionData'
        },
        {
            $project:{
                id:'$transactionData._id',
                description:'$transactionData.description',
                amount:'$transactionData.amount',
                type:'$transactionData.type',
                currencyType:'$transactionData.currencyType',
                transactionId:'$transactionData.transactionId',
                createdAt:'transactionData.createdAt'
            }
        }
    ]) ;



    const totalTransactionsPromise =  walletModel.aggregate([
        {
            $match:{userId:new mongoose.Types.ObjectId(userId)}
        },
        {
            $unwind:'$transactions'
        },
        {
            $match:matchCriteria
        },
        {
            $group:{
                _id:null,
                count:{$sum:1}
            }
        }
    ]);

    const [transactions, [totalTransactions]] = await Promise.all([transactionsPromise,totalTransactionsPromise]);

    return {transactions:transactions as ITransaction[], totalTransactions:totalTransactions.count as number };
};
