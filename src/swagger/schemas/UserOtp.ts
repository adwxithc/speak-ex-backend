const UserOtp = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the user OTP',
            example: '60d0fe4f5311236168a109ca',
        },
        email: {
            type: 'string',
            description: 'Email address associated with the OTP',
            example: 'john.doe@example.com',
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
            description: 'Timestamp indicating when the user OTP was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the user OTP was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['email', 'otp', 'expiresAt', 'createdAt', 'updatedAt'],
};

export default UserOtp;
