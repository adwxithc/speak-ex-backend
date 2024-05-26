import mongoose from 'mongoose';
import UserModel from '../../../models/userModel';
import { IUserDataWithWallet } from '../../../../../../usecaseLayer/interface/repository/IUserRepository';

export const getUserDataWithWallet = async ({
    userId,
    userModel,
}: {
    userId: string;
    userModel: typeof UserModel;
}) => {

    const [existingUser] = (await userModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId),
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
            $project: {
                'wallet.transactions': 0,
            },
        },
        {
            $addFields: {
                focusLanguageObjectId: { $toObjectId: '$focusLanguage' },
            },
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
            $unwind: {path:'$focusLanguageInfo',preserveNullAndEmptyArrays: true },
        },
        {
            $unwind: {path:'$proficientLanguage',preserveNullAndEmptyArrays: true },
        },
        {
            $addFields: {
                proficientLanguageObjectId: { $toObjectId: '$proficientLanguage' },
            },
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'proficientLanguageObjectId',
                foreignField: '_id',
                as: 'proficientLanguageInfo',
            },
        },
        {
            $unwind: {path:'$proficientLanguageInfo',preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: '$_id',
                firstName: { $first: '$firstName' },
                lastName: { $first: '$lastName' },
                userName: { $first: '$userName' },
                email: { $first: '$email' },
                profile: { $first: '$profile' },
                blocked: { $first: '$blocked' },
                focusLanguage: { $first: '$focusLanguage' },
                focusLanguageInfo: { $first: '$focusLanguageInfo' },
                wallet: { $first: '$wallet' },
                proficientLanguage: { $push: '$proficientLanguage' },
                proficientLanguageInfo: { $push: '$proficientLanguageInfo' },
                followers: { $first: '$followers' },
                following: { $first: '$following' },
                isMonetized: { $first: '$isMonetized' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
            },
        },

    ])) as (IUserDataWithWallet)[];

    

    return existingUser;
};
