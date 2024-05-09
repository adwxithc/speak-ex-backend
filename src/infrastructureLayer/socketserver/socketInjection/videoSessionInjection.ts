import { VideoSessionUseCase } from '../../../usecaseLayer/useCases/videoSessionUseCase';
import { GenerateUniQueString } from '../../services/generateUniqueString';


const generateUniqueString = new GenerateUniQueString();

const videoSessionUseCase = new VideoSessionUseCase({generateUniqueString});

export {
    videoSessionUseCase
};