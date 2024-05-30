
import { IMonetizationRequestStatus } from '../../../../domain/monetizationRequest';
import { IMonetizationRequestRepository } from '../../../../usecaseLayer/interface/repository/IMonetizationRequestRepository';
import MonetizationRequestModel from '../models/monetizationRequest';
import { create, listMonetizationRequests } from './monetizationRequestRepository/';

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

    async listMonetizationRequests({ limit, page, status }: { limit: number; page: number; status: IMonetizationRequestStatus | 'all'; }) {
        return await listMonetizationRequests({limit, page, status, monetizationRequestModel:this.monetizationRequestModel});
    }

}
