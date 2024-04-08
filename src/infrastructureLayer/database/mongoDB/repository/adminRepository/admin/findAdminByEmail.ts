import AdminModel from "../../../models/AdminModel";

export const findAdminByEmail = async (
    email:string,
    userModel:typeof AdminModel
)=>{
    return await AdminModel.findOne({email});
    
};