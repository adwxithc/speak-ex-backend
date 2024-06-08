const Notification = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'Unique identifier for the notification',
            example: '60d0fe4f5311236168a109ca',
        },
        message: {
            type: 'string',
            description: 'Notification message',
            example: 'Your post received a like',
        },
        read: {
            type: 'boolean',
            description: 'Indicates if the notification has been read',
            example: false,
        },
        title: {
            type: 'string',
            description: 'Title of the notification',
            example: 'New like on your post',
        },
        userId: {
            type: 'string',
            description: 'User ID associated with the notification',
            example: '60d0fe4f5311236168a109cb',
        },
        actionCreator: {
            type: 'string',
            description: 'User ID of the action creator',
            example: '60d0fe4f5311236168a109cd',
        },
        relatedEntity: {
            type: 'string',
            description: 'Identifier of the related entity (e.g., post ID)',
            example: '60d0fe4f5311236168a109ce',
        },
        type: {
            type: 'string',
            description: 'Type of notification',
            enum: ['POST_LIKE', 'POST_COMMENT', 'MONETIZATION_REQUEST'],
            example: 'POST_LIKE',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the notification was created',
            example: '2024-06-07T12:30:45Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp indicating when the notification was last updated',
            example: '2024-06-07T12:30:45Z',
        },
    },
    required: ['message', 'read', 'title', 'actionCreator', 'relatedEntity', 'type', 'createdAt', 'updatedAt'],
};

export default Notification;
