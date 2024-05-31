import { BadRequestError } from '../../errors';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';


export const getVideoSessions = async ({
    userId,
    page,
    limit,
    type,
    sessionRepository,
    fileBucket
}: {
    userId: string;
    page: number;
    limit: number;
    type: string;
    sessionRepository: ISessionRepository;
    fileBucket:IFileBucket
}) => {
    if(type!=='helping' && type!=='learning' && type!=='all') throw new BadRequestError('invalid session type');

    const {sessions,totalSessions} = await sessionRepository.listSessions({limit,page,type,userId});
    sessions.forEach(session=>{
        session.helperData.profile =fileBucket.getFileAccessURL(session.helperData.profile || '');
        session.learnerData.profile =fileBucket.getFileAccessURL(session.learnerData.profile || '');
    });
    const lastPage = Math.ceil(totalSessions / limit);

    return {sessions,totalSessions,lastPage};


};
