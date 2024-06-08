// src/interface/schemas/CoinPurchase.ts
const CoinPurchase = {
    type: 'object',
    properties: {
        amount: {
            type: 'number',
            description: 'The amount of coins purchased',
            example: 100,
        },
        planId: {
            type: 'string',
            description: 'ID of the coin purchase plan',
            example: '60d0fe4f5311236168a109ca',
        },
        userId: {
            type: 'string',
            description: 'ID of the user making the purchase',
            example: '60d0fe4f5311236168a109cb',
        },
        transactionId: {
            type: 'string',
            description: 'Transaction ID for the purchase',
            example: 'ffdg1234567890abcdef',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the purchase was created',
            example: '2023-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the purchase was last updated',
            example: '2023-06-07T12:00:00Z',
        },
    },
    required: ['amount', 'planId', 'userId', 'transactionId'],
};

export default CoinPurchase;
