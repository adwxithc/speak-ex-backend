import { BadRequestError } from '../../errors';
import { ICoinPurchasePlanRepository } from '../../interface/repository/ICoinPurchasePlanRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const createCoinPurchasePlan = async ({
    count,
    price,
    title,
    imageFile,
    fileBucket,
    coinPurchasePlanRepository,
}: {
    count: number;
    price: number;
    title: string;
    imageFile: Express.Multer.File | undefined;
    fileBucket: IFileBucket;
    coinPurchasePlanRepository: ICoinPurchasePlanRepository;
}) => {
    if (!imageFile) throw new BadRequestError('image is required');
    const imageName = await fileBucket.uploadImage({
        imageBuffer: imageFile.buffer,
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
