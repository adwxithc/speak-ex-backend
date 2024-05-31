import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';



export const joinSession = async ({
    sessionRepository,
    userRepository,
    userId,
    sessionId
}: {
    sessionRepository: ISessionRepository;
    userRepository:IUserRepository;
    sessionId:string;
    userId: string;
}) => {
    const session = await sessionRepository.findBySessionCode({sessionCode:sessionId});
    if(!session){
        return {success:false,message:'session does not exist'};
    }

    
    if(session.learner) return {success:false,message:'session already occupied'};
    const learner = await userRepository.findLearnerWithWallet(userId);
   
    
    if(!learner) return {success:false,message:'learner does not exist'};
    if(session.isMonetized){
        if(learner.wallet.goldCoins<(learner.focusLanguageInfo.rate/2)) return {success:false,message:'you does not have enough gold coins to join the session'};

    }else{
        if(learner.wallet.silverCoins<(learner.focusLanguageInfo.rate/2)) return {success:false,message:'you does not have enough coins to join the session'};

    }
    
    await sessionRepository.joinLearner({learner:userId, sessionCode:sessionId,languageId:learner.focusLanguage as string,rate:learner.focusLanguageInfo.rate});
    return {
        success:true,
        message:' joined successfully',
        data:session
    };
};