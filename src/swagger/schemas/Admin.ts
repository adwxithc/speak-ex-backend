const Admin = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the admin',
            example: '60d0fe4f5311236168a109cb',
        },
        email: {
            type: 'string',
            description: 'Email address of the admin',
            example: 'admin@example.com',
        },
        password: {
            type: 'string',
            description: 'Password for the admin account',
            example: 'adminpassword123',
        },
    },
    required: ['email', 'password'],
};

export default Admin;
