import { BadRequestError } from '../../errors';
import { IWalletRepository } from '../../interface/repository/IWalletRepository';


export const getTransactions = async ({
    userId,
    page,
    limit,
    type,
    walletRepository,
}: {
    userId:string,
    page:number,
    limit:number,
    type:string,
    walletRepository: IWalletRepository,
}) => {
    if (type !== 'credit' && type !== 'debit' && type !== 'all')
        throw new BadRequestError('invalid transaction type');

    const { transactions, totalTransactions } = await walletRepository.listTransactions({
        limit,
        page,
        type,
        userId,
    });
   
    const lastPage = Math.ceil(totalTransactions / limit);

    return { transactions, totalTransactions, lastPage };
};
