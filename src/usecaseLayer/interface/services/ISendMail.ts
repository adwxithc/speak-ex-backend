export interface ISendMail {
    sendEmailVerification(username: string, email: string, verificationCode: string): Promise<{success: boolean}>
}