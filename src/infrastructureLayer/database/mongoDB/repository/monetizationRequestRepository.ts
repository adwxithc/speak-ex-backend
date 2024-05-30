
import { IMonetizationRequestRepository } from '../../../../usecaseLayer/interface/repository/IMonetizationRequestRepository';
import MonetizationRequestModel from '../models/monetizationRequest';
import { create } from './monetizationRequestRepository/';

export class MonetizationRequestRepository implements IMonetizationRequestRepository
{
    constructor(
        private monetizationRequestModel: typeof MonetizationRequestModel
    ) {}

    async create({
        userId,
        description,
    }: {
        userId: string;
        description: string;
    }) {
        return await create({
            userId,
            description,
            monetizationRequestModel: this.monetizationRequestModel,
        });
    }
}
