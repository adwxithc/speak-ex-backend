
import { BadRequestError } from '../../../errors';
import { IPostRepository } from '../../../interface/repository/IPostRepository';
import { IReportRepository } from '../../../interface/repository/IReportRepository';
import { ISessionRepository } from '../../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';

export const getUserDetails = async ({
    userId,
    userRepository,
    reportRepository,
    sessionRepository,
    postRepository,
    fileBucket,
}: {
    userId:string,
    userRepository: IUserRepository
    reportRepository:IReportRepository;
    sessionRepository:ISessionRepository;
    postRepository:IPostRepository;
    fileBucket:IFileBucket;
}) => {

    const userDataWithWallet = await userRepository.getUserDataWithWallet({userId});
    if(!userDataWithWallet) throw new BadRequestError('invalid user');
    const reports =  await reportRepository.getReportsOnSession({userId});
    const session = await sessionRepository.getUsersSesstionData({userId});
    const postsInfo = await postRepository.getPostsInfo({userId});
    const social={averageLikes:postsInfo.averageLikes,posts:postsInfo.posts,followers:userDataWithWallet.followers?.length||0,following:userDataWithWallet.following?.length||0};

    const usersDetails={
        ...userDataWithWallet,
        reports,
        session,
        social
    };

    usersDetails.profile =  fileBucket.getFileAccessURL(usersDetails.profile||'');
    return usersDetails;
};