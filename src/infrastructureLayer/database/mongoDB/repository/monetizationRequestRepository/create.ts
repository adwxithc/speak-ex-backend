import MonetizationRequestModel from '../../models/monetizationRequest';

export const create = async ({
    userId,
    description,
    monetizationRequestModel,
}: {
    userId: string;
    description: string;
    monetizationRequestModel: typeof MonetizationRequestModel;
}) => {
    const monetizationRequest = await monetizationRequestModel.create({
        description,
        userId,
    });
    return await monetizationRequest.save();
};
