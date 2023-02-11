import { useLocalStorage } from '@/Hook/useLocalStorage';
import { NoteData, RawNote, Tag } from '@/utils/types';
import { useMemo } from 'react';
import uuid from 'react-uuid';

export const useNote = () => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

    const notesWithTags = useMemo(() => {
        return notes.map(({ tagsWithID, ...note }) => {
            return {
                ...note,
                tags: tags.filter((tag) => {
                    return tagsWithID.includes(tag.id);
                }),
            };
        });
    }, [notes, tags]);

    return { notesWithTags, tags };
};
