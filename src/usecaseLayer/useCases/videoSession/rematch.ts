import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const rematch = async ({
    sessionRepository,
    sessionCode,
    liveUsers,
}: {
    sessionRepository: ISessionRepository;
    
    sessionCode: string;
    liveUsers: string[];
}) => {
    const selectedLearner = await sessionRepository.findSingleLearner({
        liveUsers,
        sessionCode,
    });

    if (selectedLearner) {
        await sessionRepository.updateRematchedLearner({
            sessionCode,
            selectedLearner,
        });
    }

    return selectedLearner;
};
