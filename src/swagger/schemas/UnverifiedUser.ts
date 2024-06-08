const UnverifiedUser = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the unverified user',
            example: '60d0fe4f5311236168a109ca',
        },
        firstName: {
            type: 'string',
            description: 'First name of the unverified user',
            example: 'John',
        },
        lastName: {
            type: 'string',
            description: 'Last name of the unverified user',
            example: 'Doe',
        },
        userName: {
            type: 'string',
            description: 'Username of the unverified user',
            example: 'johndoe123',
        },
        email: {
            type: 'string',
            description: 'Email address of the unverified user',
            example: 'john.doe@example.com',
        },
        password: {
            type: 'string',
            description: 'Password for the unverified user account',
            example: '123456a@',
        },
        otp: {
            type: 'number',
            description: 'One-time password (OTP) for verification',
            example: 123456,
        },
        expiresAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the OTP expires',
            example: '2024-06-07T12:30:45Z',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the unverified user was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the unverified user was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['firstName', 'lastName', 'userName', 'email', 'password', 'otp', 'expiresAt', 'createdAt', 'updatedAt'],
};

export default UnverifiedUser;
