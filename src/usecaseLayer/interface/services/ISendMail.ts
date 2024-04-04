export interface ISendMail {
    sendEmailVerification(username: string, email: string, verificationCode: number): Promise<{success: boolean}>
}