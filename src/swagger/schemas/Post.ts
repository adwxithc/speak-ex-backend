const Post = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the post',
            example: '60d0fe4f5311236168a109ca',
        },
        title: {
            type: 'string',
            description: 'Title of the post',
            example: 'Introduction to JavaScript',
        },
        content: {
            type: 'string',
            description: 'Content of the post',
            example: 'This is a beginner-friendly guide to JavaScript.',
        },
        image: {
            type: 'string',
            description: 'URL of the post image (if any)',
            example: 'https://example.com/image.jpg',
        },
        userId: {
            type: 'string',
            description: 'User ID of the post author',
            example: '60d0fe4f5311236168a109cb',
        },
        upvotes: {
            type: 'array',
            items: {
                type: 'string',
                description: 'User IDs who upvoted the post',
            },
            description: 'List of user IDs who upvoted the post',
            example: ['60d0fe4f5311236168a109cc', '60d0fe4f5311236168a109cd'],
        },
        comments: {
            type: 'array',
            items: {
                type: 'string',
                description: 'Comment IDs associated with the post',
            },
            description: 'List of comment IDs associated with the post',
            example: ['60d0fe4f5311236168a109ce', '60d0fe4f5311236168a109cf'],
        },
        tags: {
            type: 'array',
            items: {
                type: 'string',
                description: 'Tags associated with the post',
            },
            description: 'List of tags associated with the post',
            example: ['javascript', 'tutorial'],
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the post was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the post was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['title', 'content', 'userId', 'createdAt', 'updatedAt'],
};

export default Post;
