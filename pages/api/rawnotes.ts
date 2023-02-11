// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RawNoteModel } from '@/models/RawNote';
import { connectMongo } from '@/utils/connectMongo';
import { Note, NoteData, RawNote } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import uuid from 'react-uuid';

type Data = {
    RawNotes: RawNote[];
    RawNote: RawNote;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<Data>>
) {
    if (req.method === 'GET') {
        const RawNotes = await getAllRawNotes();
        res.status(200).json({ RawNotes });
    } else if (req.method === 'POST') {
        await connectMongo();
        const { tags, ...data }: NoteData = req.body;
        const newRawNote = await RawNoteModel.create({
            ...data,
            id: uuid(),
            tagsWithID: tags.map((tag) => {
                return tag.id;
            }),
        });
        res.status(200).json({ RawNote: newRawNote });
    } else if (req.method === 'PUT') {
        await connectMongo();
        const { id, title, body, tags }: Note = req.body;
        const updatedRawNote = await RawNoteModel.findOne({ id: id });
        updatedRawNote.title = title;
        updatedRawNote.body = body;
        updatedRawNote.tagsWithID = tags.map((tag) => {
            return tag.id;
        });
        updatedRawNote.save();
        res.status(200).json({ RawNote: updatedRawNote });
    } else if (req.method === 'DELETE') {
        await connectMongo();
        const { id } = req.body;
        const deletedRawNote = await RawNoteModel.findOne({ id: id });
        deletedRawNote.delete();
        res.status(200).json({ RawNote: deletedRawNote });
    }
}

export async function getAllRawNotes() {
    await connectMongo();
    const RawNotes = await RawNoteModel.find();
    return RawNotes as RawNote[];
}

export async function getRawNote(id: String) {
    await connectMongo();
    const RawNote = await RawNoteModel.findOne({ id: id });
    return RawNote as RawNote;
}
