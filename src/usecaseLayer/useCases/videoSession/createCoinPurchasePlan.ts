import { BadRequestError } from '../../errors';
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import {  IImageFormater } from '../../interface/services/IImageFormater';

export const createCoinPurchasePlan = async ({
    count,
    price,
    title,
    imageFile,
    fileBucket,
    imageFormater,
    coinPurchasePlanRepository,
}: {
    count: number;
    price: number;
    title: string;
    imageFile: Express.Multer.File | undefined;
    fileBucket: IFileBucket;
    imageFormater:IImageFormater
    coinPurchasePlanRepository: ICoinPurchasePlanRepository;
}) => {
    if (!imageFile) throw new BadRequestError('image is required');

    const imageBuffer = imageFile.buffer;

   
    const croppedImageBuffer = await imageFormater.crop({aspectRatio:1,imageBuffer,format:'png'});


    const imageName = await fileBucket.uploadImage({
        imageBuffer: croppedImageBuffer,
        mimetype: imageFile.mimetype,
    });


    const purchasePlan = await coinPurchasePlanRepository.createPurchasePlan({
        count,
        image: imageName,
        price,
        title,
    });
    return purchasePlan;
};
