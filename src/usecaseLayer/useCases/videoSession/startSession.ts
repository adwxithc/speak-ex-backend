import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IGenerateUniQueString } from '../../interface/services/IGenerateUniQueString';


export const startSession = async ({
    sessionRepository,
    userRepository,
    userId,
    liveUsers,
    generateUniqueString
}: {
    sessionRepository: ISessionRepository;
    userRepository:IUserRepository
    generateUniqueString:IGenerateUniQueString;
    userId: string;
    liveUsers:string[]
}) => {
    
    const sessionCode= generateUniqueString.getString();
    const learners =await userRepository.getLearners({helperId:userId});
   
    const learnerIds = learners.map(learner=>learner.id.toString());
    // const selectedLearner = (learners.find(learner=>liveUsers.includes(learner.id.toString())))?.id || '';
    const selectedLearner = liveUsers.find(user=>learnerIds.includes(user)) || '';
    
    const session =  await sessionRepository.createSession({userId,sessionCode,selectedLearner});
    
    
    return session;
}; 