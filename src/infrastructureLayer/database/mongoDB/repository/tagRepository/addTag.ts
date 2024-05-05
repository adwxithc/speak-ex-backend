import TagModel from '../../models/TagModel';

export const addTag = async ({
    tags,
    tagModel,
}: {
    tags: string[];
    tagModel: typeof TagModel;
}) => {
    const operations = tags.map((tag) => ({
        updateOne: {
            filter: { name: tag },
            update: { $inc: { count: 1 } }, 
            upsert: true, 
        },
    }));
    await tagModel.bulkWrite(operations, { ordered: false });
};
