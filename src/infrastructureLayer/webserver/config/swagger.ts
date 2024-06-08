import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import {
    Admin,
    ChatRoom,
    CoinPurchase,
    CoinPurchasePlan,
    Comment,
    Language,
    Message,
    MonetizationRequest,
    Notification,
    Post,
    Report,
    Session,
    Tag,
    Transaction,
    UnverifiedUser,
    User,
    UserOtp,
    Wallet,
} from '../../../swagger/schemas';


const PORT = process.env.PORT || 5000;

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SpeakEx  Docs',
            version: '1.0.0',
            description:
                'Api application made for speakEx language learning platform  with express and documented with Swagger',
            constact: {
                name: 'Adwaith C',
                email: 'adwaithjanardhanan0@gmail.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}/`,
            },
        ],

        components: {
            schemas: {
                User,
                Admin,
                ChatRoom,
                CoinPurchase,
                CoinPurchasePlan,
                Comment,
                Language,
                Message,
                MonetizationRequest,
                Notification,
                Post,
                Report,
                Session,
                Tag,
                Transaction,
                UnverifiedUser,
                UserOtp,
                Wallet,
            },
        
            securitySchemes: {
                userAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['src/infrastructureLayer/webserver/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
