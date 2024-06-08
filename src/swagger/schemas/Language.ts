// src/interface/schemas/Language.ts
const Language = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'The name of the language',
            example: 'English',
        },
        basePrice: {
            type: 'number',
            description: 'The base price for the language course',
            example: 29.99,
        },
        rate: {
            type: 'number',
            description: 'The rate for the language course',
            example: 1.2,
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the language was created',
            example: '2023-06-07T12:00:00Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the language was last updated',
            example: '2023-06-07T12:00:00Z',
        },
    },
    required: ['name', 'basePrice'],
};

export default Language;
