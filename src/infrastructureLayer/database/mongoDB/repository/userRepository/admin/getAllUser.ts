import IUser from '../../../../../../domainLayer/user';
import UserModel from '../../../models/userModel';

export const getAllUser= async():Promise<IUser[]>=>{
    return await UserModel.find();
};