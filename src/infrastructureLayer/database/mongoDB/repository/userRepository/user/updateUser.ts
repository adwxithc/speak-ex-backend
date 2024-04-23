import IUser from '../../../../../../domain/user';
import { BadRequestError } from '../../../../../../usecaseLayer/errors';
import UserModel from '../../../models/userModel';


export const updateUser = async(
    {id,firstName,lastName,email,blocked,profile}:{id:string,firstName?:string,lastName?:string,email?:string,blocked?:boolean,profile?:string},
    userModels:typeof UserModel
):Promise<IUser>=>{

    const user = await userModels.findById(id);
    if(!user){
        throw new BadRequestError('invalid user');

    }
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.blocked= blocked!==undefined? blocked : user.blocked;
    user.profile=profile || user.profile;

    const updatedUser =await user.save();
    updatedUser.password='';
    return updatedUser;

};