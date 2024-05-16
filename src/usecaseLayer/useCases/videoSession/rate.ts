import { BadRequestError } from '../../errors';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const rate = async ({
    sessionRepository,
    sessionCode,
    userId,
    rating,
}: {
    sessionRepository: ISessionRepository;
    
    sessionCode: string;
    userId:string;
    rating:number;
}) => {
   
    const session = await sessionRepository.findBySessionCode({sessionCode});
    console.log(session, userId, sessionCode);
    
    if(!session || session.learner?.toString()!==userId ){

        throw new BadRequestError('invalid session');
    }
    if(session.rating){
        throw new BadRequestError('session already rated');
    }

    const ratedSession = await sessionRepository.rate({sessionCode,rating});
    return ratedSession;
   
};
