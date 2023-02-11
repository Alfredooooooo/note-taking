import { Schema, models, model } from 'mongoose';

const TagSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

export const TagModel = models.Tag || model('Tag', TagSchema);
