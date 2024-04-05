
import UserModel from '../../../models/userModel';


export const changePassword = async(
    {password,userId}:{password:string;userId:string},
    userModels:typeof UserModel
):Promise<boolean>=>{
    const result = await userModels.updateOne({_id:userId},{password:password});
    return result.modifiedCount>0;
};