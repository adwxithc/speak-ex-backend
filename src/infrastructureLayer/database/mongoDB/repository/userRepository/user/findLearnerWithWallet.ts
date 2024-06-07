import mongoose from 'mongoose';
import UserModel from '../../../models/userModel';
import IUser from '../../../../../../domain/user';
import IWallet from '../../../../../../domain/wallet';
import ILanguage from '../../../../../../domain/language';


export const findLearnerWithWallet = async (
    id: string,
    userModel: typeof UserModel
) => {

    
    const [existingUser] = (await userModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'wallets',
                localField: '_id',
                foreignField: 'userId',
                as: 'wallet',
            },
        },
        {
            $unwind: '$wallet',
        },
        {
            $addFields: {
                focusLanguageObjectId: { $toObjectId: '$focusLanguage' }
            }
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'focusLanguageObjectId',
                foreignField: '_id',
                as: 'focusLanguageInfo',
            },
        },

        {
            $unwind: '$focusLanguageInfo',
        },
        {
            $project: {
             
                id: '$_id',
                firstName: 1,
                lastName:1,
                userName:1,
                blocked:1,
                focusLanguage:1,
                proficientLanguage:1,
                isMonetized:1,
                followers:1,
                following:1,
                email: 1,
                createdAt: 1,
                updatedAt: 1,
                wallet: {
                 
                    id: '$wallet._id',
                    userId: 1,
                    silverCoins: 1,
                    goldCoins:1,
                    money:1,
                    transactions:1,
                    createdAt: 1,
                    updatedAt: 1,
                },
                focusLanguageInfo:1
            },
        }
    ])) as (Omit<IUser & {wallet:IWallet,focusLanguageInfo:ILanguage}, 'password'> | null)[];
  
    
    return existingUser;
};
