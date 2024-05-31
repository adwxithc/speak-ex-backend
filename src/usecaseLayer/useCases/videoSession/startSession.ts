import { BadRequestError } from '../../errors';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IGenerateUniQueString } from '../../interface/services/IGenerateUniQueString';

export const startSession = async ({
    sessionRepository,
    userRepository,
    userId,
    liveUsers,
    generateUniqueString,
}: {
    sessionRepository: ISessionRepository;
    userRepository: IUserRepository;
    generateUniqueString: IGenerateUniQueString;
    userId: string;
    liveUsers: string[];
}) => {
    const userInfo = await userRepository.findUserById(userId);
    if (!userInfo) throw new BadRequestError('invalid user');

    const sessionCode = generateUniqueString.getString();
    let learners: {
        id: string;
    }[] = [];

    if(userInfo?.isMonetized){
        learners = await userRepository.findLearnersWithGoldCoins({helperId:userId}); 
     
        
    }else{
        learners = await userRepository.getLearners({ helperId: userId });
    }



    const learnerIds = learners.map((learner) => learner.id.toString());

    const selectedLearner =
        liveUsers.find((user) => learnerIds.includes(user)) || '';

    const session = await sessionRepository.createSession({
        userId,
        sessionCode,
        selectedLearner,
        isMonetized:userInfo.isMonetized||false
    });

    return { success: true, data: session, message: 'new session started' };
};
