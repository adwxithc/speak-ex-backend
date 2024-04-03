import UserModel from '../../../models/userModel';


export const findUserByEmail = async(
    email:string,
    userModel:typeof UserModel
)=>{
    const existingUser = await userModel.findOne({email});
    return existingUser;
};