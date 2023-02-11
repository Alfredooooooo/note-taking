import { Schema, models, model } from 'mongoose';

const RawNoteSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tagsWithID: {
        type: [String],
        required: true,
    },
});

export const RawNoteModel = models.RawNote || model('RawNote', RawNoteSchema);
