import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
    // GetObjectCommand,
} from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import { IFileBucket } from '../../usecaseLayer/interface/services/IFileBucket';

export class FileBucket implements IFileBucket {
    BUCKET_NAME = process.env.BUCKET_NAME as string;
    BUCKET_REGION = process.env.BUCKET_REGION as string;
    AWS_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY as string;
    AWS_ACCESS_KEY = process.env.S3_ACCESS_KEY as string;
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            credentials: {
                accessKeyId: this.AWS_ACCESS_KEY,
                secretAccessKey: this.AWS_SECRET_KEY,
            },
            region: this.BUCKET_REGION,
        });
    }

    randomImageName(bytes=32): string {
        return crypto.randomBytes(bytes).toString('hex');
    }

    async uploadImage({
        mimetype,
        imageBuffer,
    }: {
        mimetype: string;
        imageBuffer: Buffer;
    }) {
        const imageName = this.randomImageName();

        const command = new PutObjectCommand({
            Bucket: this.BUCKET_NAME,
            Key: imageName,
            Body: imageBuffer,
            ContentType: mimetype,
        });
        await this.s3.send(command);
        return imageName;
    }

    getFileAccessURL(Key: string) {
        // const getObjectParams = {
        //     Bucket: this.BUCKET_NAME,
        //     Key,
        // };
        // const command = new GetObjectCommand(getObjectParams);
        // const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
        const url= `https://${this.BUCKET_NAME}.s3.${this.BUCKET_REGION}.amazonaws.com/${Key}`;
        return url;
    }

    async deleteFile(Key: string): Promise<boolean> {

        const command = new DeleteObjectCommand({
            Bucket: this.BUCKET_NAME,
            Key: Key,
        });
        const res = await this.s3.send(command);
        console.log(res);
        
        return true;
    }
}

