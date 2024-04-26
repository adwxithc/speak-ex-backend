import mongoose from 'mongoose';
import { BadRequestError } from '../../usecaseLayer/errors';
import { IValidateDbObjects } from '../../usecaseLayer/interface/services/validateDbObjects';

export class ValidateDbObjects implements IValidateDbObjects{

    validateId = (id: string| undefined) => {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError('Invalid _id format.');
        }
        return id;
    };

}


