
import { ITagRepository } from '../../interface/repository/ITagRepository';



export const getTags = async ({
    page,
    limit,
    key,
    tagRepository
}: {
    page:number,
    limit:number,
    key:string,
    tagRepository:ITagRepository
}) => {
    const res= await tagRepository.getTags({
        page,
        limit,
        key,
    });
    
    return res;
};
 