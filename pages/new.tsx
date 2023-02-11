import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import NoteForm from '@/components/NoteForm';
import { NewNoteProps, NoteData, Tag } from '@/utils/types';
import { getAllTags } from './api/tags';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
    let tags = await getAllTags();
    tags = JSON.parse(JSON.stringify(tags));
    return {
        props: {
            tags,
        },
    };
};

const NewNote = ({ tags }: NewNoteProps) => {
    const router = useRouter();
    async function onCreateNote(data: NoteData) {
        await fetch('/api/rawnotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        router.push('/');
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
            <h1 className="text-4xl font-bold mb-4">New Note</h1>
            <NoteForm
                onSubmit={onCreateNote}
                onAddTag={onCreateTag}
                allTags={tags}
            />
        </div>
    );
};

export default NewNote;
