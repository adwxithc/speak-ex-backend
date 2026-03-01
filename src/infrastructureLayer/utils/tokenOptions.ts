


interface ITokenOptions {
    expires: Date;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;

}

// options for cookies
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + 5 * 60 * 60 * 1000), //5 hour
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
};
export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
};
