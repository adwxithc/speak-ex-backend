
import mongoose from 'mongoose';
import UserModel from '../../../models/userModel';



export const getLearners = async(
    {  
        helperId,
        userModel
    }:{
        helperId:string;
        userModel:typeof UserModel
    }
)=>{
    const learners  = await userModel.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(helperId)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'proficientLanguage',
                foreignField:'focusLanguage',
                as:'learners'
            }
        },
        {
            $project:{
                learners:1,
                _id:0
            }
        },
        {
            $unwind:'$learners'
        },
        {
            $project:{
                'id':'$learners._id',
                
            }
        }
    ]);
    
    

    return learners;
  
};