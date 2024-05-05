import ITag from '../../../domain/Tag';


export interface ITagRepository {
    addTag({tags}:{tags:string[]}):Promise<void>
    getTags({ page,limit,key }:{ page:number,limit:number,key:string }):Promise<{tags:ITag[],totalTags:number}>
    
}
