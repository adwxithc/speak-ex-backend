import ITag from '../../../../../domain/Tag';
import TagModel from '../../models/TagModel';

export const getTags =async ({ page, limit, key,tagModel }:{ page:number, limit:number, key:string,tagModel:typeof TagModel })=>{

    const filter = { name: { $regex: new RegExp(`^${key}`, 'i') }};
    const tags = await tagModel
        .find(filter)
        .sort({ count: -1 })
        .skip((page - 1) * limit)
        .limit(limit) as ITag[];

        
    const totalTags = await tagModel.countDocuments(filter);
    return {tags, totalTags};

};