export type Tag = {
    label: string;
    id: string;
};

export type Note = {
    id: string;
} & NoteData;

export type NoteData = {
    title: string;
    body: string;
    tags: Tag[];
};

export type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    allTags: Tag[];
} & Partial<NoteData>;

export type RawNote = {
    id: string;
} & RawNoteData;

export type RawNoteData = {
    title: string;
    body: string;
    tagsWithID: string[];
};

export type NewNoteProps = {
    tags: Tag[];
};

export type IndexProps = {
    rawNotes: RawNote[];
    notes: Note[];
    tags: Tag[];
};

export type NoteListProps = {
    notes: Note[];
    tags: Tag[];
    onEditTag: (id: string, label: string) => void;
    onDeleteTag: (id: string) => void;
    onChangeTag: (id: string, label: string) => void;
};

export type EditNoteProps = {
    allTags: Tag[];
} & Note;

export type NoteCardProps = {
    showModal: boolean;
} & Note;
