import sharp from 'sharp';
import { IImageFormater } from '../../usecaseLayer/interface/services/IImageFormater';

export class ImageFormater implements IImageFormater {
    constructor() {}

    async crop({
        imageBuffer,
        aspectRatio,
        format='jpeg'
    }: {
        imageBuffer: Buffer;
        aspectRatio: number;
        format:'jpeg'|'png'
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

        // Crop the image to the desired aspect ratio
        let imageProcessing = sharp(imageBuffer).extract({
            width: newWidth,
            height: newHeight,
            left,
            top,
        });

        // Check if format conversion is needed
        if (format === 'jpeg') {
            imageProcessing = imageProcessing.jpeg();
        } else if (format === 'png') {
            imageProcessing = imageProcessing.png();
        } else {
            throw new Error('Invalid image format specified');
        }

        // Convert the image to the desired format and return the buffer
        const croppedImageBuffer = await imageProcessing.toBuffer();

        return croppedImageBuffer;
    }
}
