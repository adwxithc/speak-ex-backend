import IUser from '../../../../../../domainLayer/user';
import UserModel from '../../../models/userModel';


export const createUser = async(
    newUser:IUser,
    userModels:typeof UserModel
):Promise<IUser>=>{
    const user = await userModels.create(newUser);
    await user.save();
    return user;

};