const User= {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the user',
            example: '60d0fe4f5311236168a109ca',
        },
        firstName: {
            type: 'string',
            description: 'First name of the user',
            example: 'John',
        },
        lastName: {
            type: 'string',
            description: 'Last name of the user',
            example: 'Doe',
        },
        userName: {
            type: 'string',
            description: 'Username of the user',
            example: 'johndoe123',
        },
        email: {
            type: 'string',
            description: 'Email address of the user',
            example: 'john.doe@example.com',
        },
        password: {
            type: 'string',
            description: 'Password for the user account',
            example: '123456a@',
        },
        profile: {
            type: 'string',
            description: 'Profile picture name',
            example: 'c25a2df94bb2db2cbcc62bf6050639a497aad0dadb1107fe8e848b7c8def7426',
        },
        blocked: {
            type: 'boolean',
            description: 'Indicates if the user is blocked',
            example: false,
        },
        focusLanguage: {
            type: 'string',
            description: 'Language user is focusing on',
            example: '60d0fe4f5311236168a109ca',
        },
        proficientLanguage: {
            type: 'array',
            items: {
                type: 'string',
            },
            description: 'Languages id the user is proficient in',
            example: ['60d0fe4f5311236168a109ca', '60d0fe4f5311236168a109ca'],
        },
        followers: {
            type: 'array',
            items: {
                type: 'string',
                format: 'uuid',
                description: 'User ID of followers',
            },
            description: 'List of followers',
            example: [
                '60d0fe4f5311236168a109ca',
                '60d0fe4f5311236168a109cb',
            ],
        },
        following: {
            type: 'array',
            items: {
                type: 'string',
                format: 'uuid',
                description: 'User ID of following',
            },
            description: 'List of users being followed',
            example: [
                '60d0fe4f5311236168a109cc',
                '60d0fe4f5311236168a109cd',
            ],
        },
        isMonetized: {
            type: 'boolean',
            description: 'Indicates if the user is monetized',
            example: false,
        },
        requestedForMonetization: {
            type: 'boolean',
            description:
                'Indicates if the user has requested for monetization',
            example: false,
        },
    },
    required: [
        'firstName',
        'userName',
        'email',
        'password',
    ],
};
export default User;