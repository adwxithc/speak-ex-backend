import IMonetizationRequest, { IMonetizationRequestStatus } from '../../../domain/monetizationRequest';

export interface IMonetizationRequestRepository {
    create({userId,description}:{userId:string,description:string}):Promise<IMonetizationRequest>
    listMonetizationRequests({limit,page,status}:{limit:number,page:number,status: IMonetizationRequestStatus | 'all'}):Promise<{requests: IMonetizationRequest[];totalRequests: number;}>
}