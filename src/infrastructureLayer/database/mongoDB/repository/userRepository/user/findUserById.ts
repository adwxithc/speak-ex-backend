import UserModel from '../../../models/userModel';


export const findUserById = async(
    id:string,
    userModel:typeof UserModel
)=>{
    const existingUser = await userModel.findById({id}).select('-password');
    return existingUser;
};