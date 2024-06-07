export interface IImageFormater {
    crop({
        imageBuffer,
        aspectRatio,
        format,
        maxWidth,
        maxHeight,
    }: {
        imageBuffer: Buffer;
        aspectRatio: number;
        format: 'jpeg' | 'png';
        maxWidth?: number;
        maxHeight?: number;
    }): Promise<Buffer>;
}
