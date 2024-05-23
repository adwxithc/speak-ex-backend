
import { IWalletRepository } from '../../../interface/repository/IWalletRepository';


export const getWallet = async ({ 
    userId,
    walletRepository
}: {
    userId:string,
    walletRepository:IWalletRepository
}) => {
   
    return await walletRepository.getWallet({userId});
};
