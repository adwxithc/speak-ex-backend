

import { VideoSessionController } from '../../../../controller/restController/sessionController';
import { VideoSessionUseCase } from '../../../../usecaseLayer/useCases/videoSessionUseCase';
import ReportModel from '../../../database/mongoDB/models/ReportModel';
import SessionModel from '../../../database/mongoDB/models/SessionModel';
import UserModel from '../../../database/mongoDB/models/userModel';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { ReportRepository } from '../../../database/mongoDB/repository/reportRepository';
import { SessionRepository } from '../../../database/mongoDB/repository/sessionRepository';
import { GenerateUniQueString } from '../../../services/generateUniqueString';

const generateUniqueString = new GenerateUniQueString();

const sessionRepository = new SessionRepository(SessionModel);
const userRepository = new UserRepository(UserModel);
const reportRepository = new ReportRepository(ReportModel);

export const videoSessionUseCase = new VideoSessionUseCase({
    generateUniqueString,
    sessionRepository,
    userRepository,
    reportRepository
});

const videoSessionController = new VideoSessionController(videoSessionUseCase);

export { videoSessionController };