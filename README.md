

# SpeakEx Backend

Welcome to the backend repository for SpeakEx, a platform designed to help users achieve fluency in new languages through real-time conversations.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Contributing](#contributing)
8. [Links](#links)
9. [Contact](#contact)

## Overview

The backend of SpeakEx is built using Node.js, Express.js, and TypeScript, following Clean Architecture principles for maintainability and scalability. It handles server-side logic, including real-time communication, user authentication, and data management, and integrates seamlessly with the frontend.

## Features

- **Real-Time Conversations**: Manages WebRTC signaling and TURN server configuration for video calls.
- **User Management**: Handles user registration, authentication, and profile management with JWT-based authentication.
- **Dynamic Matching**: Implements a priority queue-based algorithm for pairing learners with helpers based on compatibility and availability.
- **Real-Time Notifications and Chat**: Uses WebSocket for real-time notifications and chat functionality.
- **Payment Integration**: Processes payments using Stripe with webhook support for flexible transaction handling.
- **Community Blog**: Manages blog posts with media storage on AWS S3 and supports rich text content.
- **Internationalization (i18n)**: Facilitates multi-language support for localized content.
- **Clean Architecture**: Adheres to Uncle Bob’s Clean Architecture principles for separation of concerns, scalability, and maintainability.
- **Documentation**: Documented with Swagger/OpenAPI for API endpoints.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for Node.js to handle HTTP requests and middleware.
- **TypeScript**: Adds type safety and enhances the development experience.
- **MongoDB**: NoSQL database for data storage and management.
- **WebSocket**: For real-time communication and notifications.
- **JWT**: For secure user authentication.
- **Stripe**: Payment processing integration.
- **AWS S3**: For media storage.
- **Swagger/OpenAPI**: For API documentation.
- **Docker**: For containerized deployment.
- **AWS EC2**: For hosting the application.

## Installation

To get started with the backend development:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/adwxithc/speak-ex-backend.git
   cd speak-ex-backend
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, run:

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following content:

```env
# Database URL
MONGO_URI='mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/speakex?retryWrites=true&w=majority&appName=Cluster0'

# Redis URL
REDIS_URL=redis://localhost:6379

# Server Port
PORT=5000

# Client URL
CLIENT_URL='http://localhost:3000'

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE='' 
SMTP_MAIL=<your_email>@gmail.com
SMTP_PASSWORD=<your_email_password>
EMAIL_USE_TLS=true

# JWT Configuration
JWT_KEY='<your_jwt_key>'
JWT_VERIFICATION_KEY='<your_jwt_verification_key>'
JWT_VERIFIED_KEY='<your_jwt_verified_key>'
JWT_ACCESS_KEY='<your_jwt_access_key>'
JWT_REFRESH_KEY='<your_jwt_refresh_key>'
JWT_RESET_PASSWORD_KEY='<your_jwt_reset_password_key>'

# AWS S3 Configuration
BUCKET_NAME=<your_bucket_name>
BUCKET_REGION='eu-north-1'
S3_ACCESS_KEY=<your_s3_access_key>
S3_SECRET_ACCESS_KEY=<your_s3_secret_access_key>

# Stripe Payment Configuration
STRIPE_KEY=<your_stripe_key>
WEBHOOK_SECRET=<your_webhook_secret>
```

Replace the placeholder values with your actual values.

## Running the Application

Start the server with:

```bash
npm run dev
```

The backend will be available at `http://localhost:5000`.

## Contributing

We welcome contributions to SpeakEx! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.


## Links

- **Backend GitHub Repository**: [SpeakEx Backend GitHub](https://github.com/adwxithc/speak-ex-backend)
- **Frontend GitHub Repository**: [SpeakEx Frontend GitHub](https://github.com/adwxithc/speak-ex-frontend)
- **Live Link**: [SpeakEx Live](https://speakex.easycart.website/)

## Contact

For questions or feedback, please contact:

- **Adwaith C**
- **Email**: [adwaithjanardhanan0@gmail.com](mailto:adwaithjanardhanan0@gmail.com)
- **LinkedIn**: [Adwaith C LinkedIn](https://www.linkedin.com/in/adwaith-c-25b5a0218/)
- **GitHub**: [adwxithc](https://github.com/adwxithc)

