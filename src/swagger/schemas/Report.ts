const Report = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the report',
            example: '60d0fe4f5311236168a109ca',
        },
        description: {
            type: 'string',
            description: 'Description of the report',
            example: 'Inappropriate content',
        },
        type: {
            type: 'string',
            description: 'Type of reported item',
            enum: ['sessions', 'posts'],
            example: 'posts',
        },
        referenceId: {
            type: 'string',
            description: 'ID of the reported item',
            example: '60d0fe4f5311236168a109cb',
        },
        reportedUser: {
            type: 'string',
            description: 'User ID of the reported user',
            example: '60d0fe4f5311236168a109cc',
        },
        reporter: {
            type: 'string',
            description: 'User ID of the reporter',
            example: '60d0fe4f5311236168a109cd',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the report was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the report was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['description', 'type', 'referenceId', 'reportedUser', 'reporter', 'createdAt', 'updatedAt'],
};

export default Report;
