// src/interface/schemas/MonetizationRequest.ts
const MonetizationRequest = {
    type: 'object',
    properties: {
        description: {
            type: 'string',
            description: 'Description of the monetization request',
            example: 'Requesting monetization for premium content',
        },
        status: {
            type: 'string',
            enum: ['pending', 'accepted', 'rejected'],
            description: 'Status of the monetization request',
            example: 'pending',
        },
        userId: {
            type: 'string',
            description: 'ID of the user making the request',
            example: '60d0fe4f5311236168a109cb',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the request was created',
            example: '2023-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the request was last updated',
            example: '2023-06-07T12:00:00Z',
        },
    },
    required: ['description', 'userId'],
};

export default MonetizationRequest;
