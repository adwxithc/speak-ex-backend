import IUser from '../../../../../../domain/user';
import UserModel from '../../../models/userModel';

export const listUsers = async (
    { page, limit, key }: { page: number; limit: number; key: string },
    userModels: typeof UserModel
): Promise<{users: Omit<IUser, 'password'>[];totalUsers: number;}> => {
    const users = await userModels.find({
        userName: { $regex: new RegExp(`^${key}`, 'i') } 
    })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-password');

    const totalUsers = await UserModel.countDocuments({userName: { $regex: new RegExp(`^${key}`, 'i') } });

    return {users,totalUsers};
};
