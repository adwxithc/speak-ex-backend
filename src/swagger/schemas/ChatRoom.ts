const ChatRoom = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the chat room',
            example: '60d0fe4f5311236168a109ca',
        },
        members: {
            type: 'array',
            items: {
                type: 'string',
                format: 'uuid',
                description: 'User ID of members in the chat room',
            },
            description: 'List of members in the chat room',
            example: ['60d0fe4f5311236168a109cb', '60d0fe4f5311236168a109cc'],
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the chat room was created',
            example: '2024-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the chat room was last updated',
            example: '2024-06-07T12:30:00Z',
        },
    },
    required: ['members'],
};

export default ChatRoom;
