// src/interface/schemas/Comment.ts
const Comment = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            description: 'The text content of the comment',
            example: 'This is a comment.',
        },
        parentId: {
            type: 'string',
            nullable: true,
            description: 'ID of the parent comment if this is a reply',
            example: '60d0fe4f5311236168a109ca',
        },
        postId: {
            type: 'string',
            description: 'ID of the post this comment belongs to',
            example: '60d0fe4f5311236168a109cb',
        },
        userId: {
            type: 'string',
            description: 'ID of the user who made the comment',
            example: '60d0fe4f5311236168a109cc',
        },
        replys: {
            type: 'number',
            description: 'Number of replies to this comment',
            example: 2,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the comment was created',
            example: '2023-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the comment was last updated',
            example: '2023-06-07T12:00:00Z',
        },
    },
    required: ['text', 'postId', 'userId'],
};

export default Comment;
