import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';

export const getUsersPosts = async (
    userId: string,
    postModel: typeof PostModel
): Promise<IPost[] | never> => {
    return await postModel.find({ userId }).select('-content');
};
