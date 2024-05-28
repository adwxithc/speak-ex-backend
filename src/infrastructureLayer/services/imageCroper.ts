import sharp from 'sharp';
import { IImageCroper } from '../../usecaseLayer/interface/services/IIMageCroper';

export class ImageCroper implements IImageCroper {
    constructor() {}

    async crop({
        imageBuffer,
        aspectRatio,
    }: {
        imageBuffer: Buffer;
        aspectRatio: number;
    }) {
        const metadata = await sharp(imageBuffer).metadata();

        const { width, height } = metadata;
        if (!width || !height) {
            throw new Error('Invalid image dimensions');
        }

        // Calculate the cropping dimensions to maintain the desired aspect ratio
        let newWidth = width;
        let newHeight = Math.round(width / aspectRatio);

        if (newHeight > height) {
            newHeight = height;
            newWidth = Math.round(height * aspectRatio);
        }

        // Calculate the top-left corner coordinates for the crop area
        const left = Math.round((width - newWidth) / 2);
        const top = Math.round((height - newHeight) / 2);

        // Crop the image to the desired aspect ratio and convert to JPEG
        const croppedImageBuffer = await sharp(imageBuffer)
            .extract({ width: newWidth, height: newHeight, left, top })
            .jpeg()
            .toBuffer();

        return croppedImageBuffer;
    }
}
