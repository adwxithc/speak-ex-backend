import { BadRequestError } from '../../errors';
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import { IImageCroper } from '../../interface/services/IIMageCroper';

export const createCoinPurchasePlan = async ({
    count,
    price,
    title,
    imageFile,
    fileBucket,
    imageCroper,
    coinPurchasePlanRepository,
}: {
    count: number;
    price: number;
    title: string;
    imageFile: Express.Multer.File | undefined;
    fileBucket: IFileBucket;
    imageCroper:IImageCroper
    coinPurchasePlanRepository: ICoinPurchasePlanRepository;
}) => {
    if (!imageFile) throw new BadRequestError('image is required');

    const imageBuffer = imageFile.buffer;

   
    const croppedImageBuffer = await imageCroper.crop({aspectRatio:1,imageBuffer});


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
