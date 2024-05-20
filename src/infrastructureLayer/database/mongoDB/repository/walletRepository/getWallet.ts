
import WalletModel from '../../models/WalletModel';


export const getWallet = async ({
    userId,
    walletModel,

}: {
    userId: string;
    walletModel: typeof WalletModel;
}) => {

   
    
    return await walletModel.findOne({userId});
};
