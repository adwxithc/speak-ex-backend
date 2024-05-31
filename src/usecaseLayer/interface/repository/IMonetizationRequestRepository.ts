import IMonetizationRequest, {
    IMonetizationRequestStatus,
} from '../../../domain/monetizationRequest';
import { IMonetizationRequestData } from '../usecase/videoSessionUseCase';

export interface IMonetizationRequestRepository {
    create({
        userId,
        description,
    }: {
        userId: string;
        description: string;
    }): Promise<IMonetizationRequest>;
    listMonetizationRequests({
        limit,
        page,
        status,
    }: {
        limit: number;
        page: number;
        status: IMonetizationRequestStatus | 'all';
    }): Promise<{
        requests: IMonetizationRequestData[];
        totalRequests: number;
    }>;

    updateMonetizationStatus({
        userId,
        status
    }: {
        userId: string;
        status:IMonetizationRequestStatus
    }): Promise<void>;
}
