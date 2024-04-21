import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';

export const createPost = async(
    newPost : IPost,
    postModel:typeof PostModel
):Promise<IPost | never>=>{

    const post = await postModel.create(newPost);
    await post.save();
    return post;
};