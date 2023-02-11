import NoteForm from '@/components/NoteForm';
import { EditNoteProps, NoteData, Tag } from '@/utils/types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getRawNote } from '../api/rawnotes';
import { getAllTags } from '../api/tags';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const urlid = context.params?.id;
    let rawNote = await getRawNote(urlid as string);
    if (rawNote == null) {
        return {
            notFound: true,
        };
    }
    let allTags = await getAllTags();

    rawNote = JSON.parse(JSON.stringify(rawNote));
    allTags = JSON.parse(JSON.stringify(allTags));

    const { tagsWithID, ...restData } = rawNote;

    const { title, body, tags, id } = {
        ...restData,
        tags: allTags.filter((tag) => tagsWithID.includes(tag.id)),
    };

    return {
        props: {
            id,
            tags,
            body,
            title,
            allTags,
        },
    };
};

const EditNote = ({ id, tags, body, title, allTags }: EditNoteProps) => {
    const router = useRouter();
    async function onEditNote(data: NoteData) {
        const dataToSend = { id, ...data };
        await fetch(`/api/rawnotes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        router.back();
    }

    async function onCreateTag(newTag: Tag) {
        await fetch('/api/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTag),
        });
    }

    return (
        <div className="my-10 mx-10">
            <h1 className="text-4xl font-bold mb-4">Edit Note</h1>
            <NoteForm
                onSubmit={onEditNote}
                onAddTag={onCreateTag}
                allTags={allTags}
                title={title}
                body={body}
                tags={tags}
            />
        </div>
    );
};

export default EditNote;
