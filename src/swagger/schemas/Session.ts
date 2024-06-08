const Session = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the session',
            example: '60d0fe4f5311236168a109ca',
        },
        sessionCode: {
            type: 'string',
            description: 'Code of the session',
            example: 'ABC123',
        },
        isMonetized: {
            type: 'boolean',
            description: 'Indicates if the session is monetized',
            example: false,
        },
        helper: {
            type: 'string',
            description: 'User ID of the session helper',
            example: '60d0fe4f5311236168a109cb',
        },
        learner: {
            type: 'string',
            description: 'User ID of the session learner',
            example: '60d0fe4f5311236168a109cc',
        },
        startingTime: {
            type: 'string',
            description: 'Starting time of the session',
            example: '2024-06-07T12:30:45Z',
        },
        endingTime: {
            type: 'string',
            description: 'Ending time of the session',
            example: '2024-06-07T14:30:45Z',
        },
        offers: {
            type: 'array',
            items: {
                type: 'string',
                description: 'Offer IDs associated with the session',
            },
            description: 'List of offer IDs associated with the session',
            example: ['60d0fe4f5311236168a109cd', '60d0fe4f5311236168a109ce'],
        },
        rate: {
            type: 'number',
            description: 'Rate of the session',
            example: 20,
        },
        rating: {
            type: 'number',
            description: 'Rating of the session',
            minimum: 1,
            maximum: 5,
            example: 4.5,
        },
        languageId: {
            type: 'string',
            description: 'Language ID associated with the session',
            example: '60d0fe4f5311236168a109cf',
        },
        moneyToTheHelper: {
            type: 'number',
            description: 'Amount of money paid to the session helper',
            example: 50.0,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the session was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the session was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['sessionCode', 'helper', 'createdAt', 'updatedAt'],
};

export default Session;
