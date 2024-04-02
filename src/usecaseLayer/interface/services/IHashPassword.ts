export interface IHashpassword {
    createHash(password: string): Promise<string>,
    comparePassword(password: string, hashPassword: string): Promise<boolean>
}