import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';



export const rematch = async ({
    sessionRepository,
    sessionCode,
    liveUsers,

}: {
    sessionRepository: ISessionRepository;
    userRepository:IUserRepository
    sessionCode: string;
    liveUsers:string[]
}) => {
    
   
    const selectedLearner =await sessionRepository.findSingleLearner({liveUsers,sessionCode});

    
    
    if(selectedLearner){
        await  sessionRepository.updateRematchedLearner({sessionCode,selectedLearner });
    }
  
    

    return selectedLearner;
 
}; 