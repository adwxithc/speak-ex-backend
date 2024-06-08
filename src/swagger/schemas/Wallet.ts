const Wallet = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the wallet',
            example: '60d0fe4f5311236168a109ca',
        },
        silverCoins: {
            type: 'number',
            description: 'Amount of silver coins in the wallet',
            example: 100,
        },
        goldCoins: {
            type: 'number',
            description: 'Amount of gold coins in the wallet',
            example: 50,
        },
        money: {
            type: 'number',
            description: 'Amount of money in the wallet',
            example: 1000,
        },
        userId: {
            type: 'string',
            description: 'User ID associated with the wallet',
            example: '60d0fe4f5311236168a109cb',
        },
        transactions: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Unique identifier for the transaction',
                        example: '60d0fe4f5311236168a109cc',
                    },
                    type: {
                        type: 'string',
                        description: 'Type of the transaction (credit or debit)',
                        enum: ['credit', 'debit'],
                        example: 'credit',
                    },
                    timeStamp: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Timestamp of the transaction',
                        example: '2024-06-07T12:30:45Z',
                    },
                },
            },
            description: 'List of transactions associated with the wallet',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the wallet was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the wallet was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['silverCoins', 'goldCoins', 'money', 'userId', 'transactions', 'createdAt', 'updatedAt'],
};

export default Wallet;
