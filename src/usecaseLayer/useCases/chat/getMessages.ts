
import { BadRequestError } from '../../errors';
import { IMessageRepository } from '../../interface/repository/IMessageRepository';


export const getMessages = async ({
    limit,
    page,
    roomId,
    messageRepository,
}:{
    limit:number,
    page:number
    roomId: string,
    messageRepository: IMessageRepository,

}) => {

    if (
        typeof page !== 'number' ||
        typeof limit !== 'number'
    
    ) {
        throw new BadRequestError('invalid parameters');
    }
    
    return await messageRepository.getMessages({roomId,page,limit});

};
