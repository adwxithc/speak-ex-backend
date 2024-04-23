export interface IFileBucket {
    randomImageName(bytes: number): string;
    uploadImage({
        mimetype,
        imageBuffer,
    }: {
        mimetype: string;
        imageBuffer: Buffer;
    }): Promise<string>;
    getFileAccessURL(Key: string): string;
    deleteFile(Key:string):Promise<boolean>
}
