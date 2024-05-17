import languageModel from '../../../database/mongoDB/models/languageModel';
import { LanguageRepository } from '../../../database/mongoDB/repository/languageRepository';


import { LanguageUseCase } from '../../../../usecaseLayer/useCases/languageUseCase';

import { LanguageController } from '../../../../controller/restController/languageController';
import { SessionRepository } from '../../../database/mongoDB/repository/sessionRepository';

import SessionModel from '../../../database/mongoDB/models/SessionModel';



const languageRepository = new LanguageRepository(languageModel);
const sessionRepository = new SessionRepository(SessionModel);


const languageUseCase = new LanguageUseCase({
    languageRepository,
    sessionRepository

});

const languageController = new LanguageController(languageUseCase);

export { languageController };
