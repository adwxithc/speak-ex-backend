
import mongoose from 'mongoose';
import UserModel from '../../../models/userModel';



export const findLearnersWithGoldCoins = async(
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
            $lookup: { 
                from: 'users', 
                let: { proficientLanguage: '$proficientLanguage' }, 
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$focusLanguage', '$$proficientLanguage']
                            }
                        }
                    },
                    {
                        $lookup:{
                            from:'wallets',
                            localField:'_id',
                            foreignField:'userId',
                            as:'wallet'
                        }
                    },
                    {
                        $unwind:'$wallet'
                    },
                    {
                        $match: {
                            'wallet.goldCoins': { $gt: 5 }
                        }
                    },
                    {
                        $project: {
                            id:'$_id',
                            wallet:1
                        }
                    }
                ],
                as: 'learners' 
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
                // wallet:'$learners.wallet'
            }
        }
    ]);


    return learners;
  
};