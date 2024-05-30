import IMonetizationRequest from '../../../domain/monetizationRequest';

export interface IMonetizationRequestRepository {
    create({userId,description}:{userId:string,description:string}):Promise<IMonetizationRequest>
}