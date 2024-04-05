import UserModel from '../../../models/userModel';


export const findUserByUserName = async(
    userName:string,
    userModel:typeof UserModel
)=>{
    const existingUser = await userModel.findOne({userName});
    return existingUser;
};