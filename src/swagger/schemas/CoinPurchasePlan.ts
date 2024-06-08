// src/interface/schemas/CoinPurchasePlan.ts
const CoinPurchasePlan = {
    type: 'object',
    properties: {
        count: {
            type: 'number',
            description: 'The number of coins in the purchase plan',
            example: 100,
        },
        image: {
            type: 'string',
            description: 'Image name  for the plan',
            example: 'c25a2df94bb2db2cbcc62bf6050639a497aad0dadb1107fe8e848b7c8def7426',
        },
        price: {
            type: 'number',
            description: 'Price of the coin purchase plan',
            example: 9.99,
        },
        title: {
            type: 'string',
            description: 'Title of the coin purchase plan',
            example: 'Basic Plan',
        },
        deleted: {
            type: 'boolean',
            description: 'Indicates if the plan is deleted',
            example: false,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the plan was created',
            example: '2023-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the plan was last updated',
            example: '2023-06-07T12:00:00Z',
        },
    },
    required: ['count', 'image', 'price', 'title'],
};

export default CoinPurchasePlan;
