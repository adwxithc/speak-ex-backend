import UserModel from '../../../models/userModel';


export const findUserById = async(
    id:string,
    userModel:typeof UserModel
)=>{
    const existingUser = await userModel.findById({_id:id}).select('-password');
    return existingUser;
};