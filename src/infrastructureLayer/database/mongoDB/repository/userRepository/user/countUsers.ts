import UserModel from '../../../models/userModel';


export const countUsers = async(
    userModel:typeof UserModel
)=>{
    const count = await userModel.countDocuments();
    return count;
};