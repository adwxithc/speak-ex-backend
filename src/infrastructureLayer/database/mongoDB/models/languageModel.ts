import mongoose, { Schema } from 'mongoose';
import ILanguage from '../../../../domain/language';



const languageSchema = new Schema<ILanguage>(
    {
        name: {
            type: String,
            required: true,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const LanguageModel = mongoose.model<ILanguage>('Language', languageSchema);


export default LanguageModel;
