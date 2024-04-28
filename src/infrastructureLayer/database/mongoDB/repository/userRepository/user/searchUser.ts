import IUser from '../../../../../../domain/user';
import UserModel from '../../../models/userModel';

export const searchUser = async (
    {
        page,
        limit,
        key,
      
    }: { page: number; limit: number; key: string;},
    userModels: typeof UserModel
): Promise<{ users: Omit<IUser, 'password'>[]; totalUsers: number }> => {

    const filter = { userName: { $regex: new RegExp(`^${key}`, 'i') },blocked:false };

    const users = await userModels
        .find(filter)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('userName profile');

    const totalUsers = await UserModel.countDocuments({
        userName: { $regex: new RegExp(`^${key}`, 'i') },
    });

    return { users, totalUsers };
};
