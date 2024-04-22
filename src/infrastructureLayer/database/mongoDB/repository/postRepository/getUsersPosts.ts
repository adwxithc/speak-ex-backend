import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';

export const getUsersPosts = async(
    userId : string,
    postModel:typeof PostModel
):Promise<IPost[] | never>=>{

    console.log(userId,'userId-------------');
    
    const posts = await postModel.find({userId}).select('-content');
    console.log(posts,'user-----------------------------post');
    
    return posts;
};