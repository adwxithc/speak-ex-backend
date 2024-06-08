const Transaction = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the transaction',
            example: '60d0fe4f5311236168a109ca',
        },
        description: {
            type: 'string',
            description: 'Description of the transaction',
            example: 'Purchase of a product',
        },
        amount: {
            type: 'number',
            description: 'Amount of the transaction',
            example: 100.0,
        },
        type: {
            type: 'string',
            description: 'Type of the transaction',
            enum: ['credit', 'debit'],
            example: 'debit',
        },
        currencyType: {
            type: 'string',
            description: 'Type of currency used in the transaction',
            enum: ['gold', 'silver', 'money'],
            example: 'money',
        },
        transactionId: {
            type: 'string',
            description: 'Unique identifier for the transaction',
            example: 'abc123',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the transaction was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the transaction was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['description', 'amount', 'type', 'currencyType', 'transactionId', 'createdAt', 'updatedAt'],
};

export default Transaction;
