import IPost from '../../../../../domain/post';
import IUser from '../../../../../domain/user';
import TagModel from '../../models/TagModel';

export const getPopularPosts = async ({
    page,
    limit,
    tagModel,
}: {
    page: number;
    limit: number;
    tagModel: typeof TagModel;
}) => {
    

    const [{totalCount,paginatedFeeds}] = await tagModel.aggregate([
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: 'posts',
                foreignField: 'tags',
                localField: 'name',
                as: 'popularPosts',
            },
        },
        { $unwind: '$popularPosts' },
        {
            $group: {
                _id: '$popularPosts._id',
                title: { $first: '$popularPosts.title' },
                content: { $first: '$popularPosts.content' },
                image: { $first: '$popularPosts.image' },
                id:{$first:'$popularPosts._id'},
                userId: { $first: '$popularPosts.userId' },
                upvotes: { $first: '$popularPosts.upvotes' },
                comments: { $first: '$popularPosts.comments' },
                tags: { $first: '$popularPosts.tags' },
            },
        },
        {
            $facet: {
                paginatedFeeds: [
                    
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                ],
                totalCount: [
                    { $count: 'totalCount' } // Count all documents in the pipeline
                ]
            },
        },
        {
            $project: {
                paginatedFeeds: 1,
                totalCount: { $arrayElemAt: ['$totalCount.totalCount', 0] || 0 }, // Ensure totalCount is not null
            },
        },
    ]);

    

     

    return {
        posts: paginatedFeeds as (IPost & { user: IUser })[],
        totalPosts: totalCount as number,
    };
};
