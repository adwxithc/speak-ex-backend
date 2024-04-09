import AdminModel from '../../../models/AdminModel';

export const findAdminByEmail = async (
    email:string,
    adminModel:typeof AdminModel
)=>{
    return await adminModel.findOne({email});
    
};