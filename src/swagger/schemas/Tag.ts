const Tag = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the tag',
            example: '60d0fe4f5311236168a109ca',
        },
        name: {
            type: 'string',
            description: 'Name of the tag',
            example: 'javascript',
        },
        count: {
            type: 'number',
            description: 'Number of times the tag has been used',
            example: 10,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the tag was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the tag was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['name', 'createdAt', 'updatedAt'],
};

export default Tag;
