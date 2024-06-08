// src/interface/schemas/Message.ts
const Message = {
    type: 'object',
    properties: {
        roomId: {
            type: 'string',
            description: 'ID of the chat room',
            example: '60d0fe4f5311236168a109ca',
        },
        senderId: {
            type: 'string',
            description: 'ID of the user who sent the message',
            example: '60d0fe4f5311236168a109cb',
        },
        seen: {
            type: 'boolean',
            description: 'Indicates if the message has been seen',
            example: false,
        },
        text: {
            type: 'string',
            description: 'Text content of the message',
            example: 'Hello, how are you?',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the message was created',
            example: '2023-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the message was last updated',
            example: '2023-06-07T12:00:00Z',
        },
    },
    required: ['roomId', 'senderId', 'text'],
};

export default Message;
