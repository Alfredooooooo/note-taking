// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TagModel } from '@/models/Tag';
import { connectMongo } from '@/utils/connectMongo';
import { Tag } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    tags: Tag[];
    tag: Tag;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<Data>>
) {
    if (req.method === 'GET') {
        const tags = await getAllTags();
        res.status(200).json({ tags });
        return;
    } else if (req.method === 'POST') {
        await connectMongo();
        const tag: Tag = req.body;
        const newTag = await TagModel.create(tag);
        res.status(201).json({ tag: newTag });
        return;
    } else if (req.method === 'PUT') {
        await connectMongo();
        const { id, label } = req.body;
        const editTag = await TagModel.findOne({ id: id });
        editTag.label = label;
        editTag.save();
        res.status(203).json({ tag: editTag });
        return;
    } else if (req.method === 'DELETE') {
        await connectMongo();
        const { id } = req.body;
        const deletedTag = await TagModel.findOne({ id: id });
        deletedTag.delete();
        res.status(200).json({ tag: deletedTag });
        return;
    }
}

export async function getAllTags() {
    await connectMongo();
    const tags = await TagModel.find();
    return tags as Tag[];
}
