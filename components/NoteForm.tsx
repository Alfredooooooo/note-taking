import { NoteFormProps, Tag } from '@/utils/types';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import uuid from 'react-uuid';

const NoteForm = ({
    onSubmit,
    onAddTag,
    allTags,
    title = '',
    body = '',
    tags = [],
}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const [allTagsOption, setAllTagsOption] = useState<Tag[]>(allTags);
    const bodyRef = useRef<HTMLTextAreaElement>(null);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleRef.current!.value;
        const body = bodyRef.current!.value;

        const data = {
            title,
            body,
            tags: selectedTags,
        };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-between items-center">
                <div className="w-[49%]">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-xl font-medium text-gray-900"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="border-[1.9px] border-gray-300 text-gray-900 text-sm rounded-[4px] block w-full p-2.5 focus:border-blue-500 focus:ring-blue-500 outline-none focus:border-[3px]"
                        placeholder="Enter Your Title"
                        required
                        ref={titleRef}
                        defaultValue={title}
                    />
                </div>
                <div className="w-[49%]">
                    <label
                        htmlFor="tags"
                        className="block mb-2 text-xl font-medium text-gray-900"
                    >
                        Tags
                    </label>
                    <CreatableSelect
                        isSearchable={true}
                        id="tags"
                        instanceId="tags"
                        required
                        value={selectedTags.map((tag) => {
                            return { label: tag.label, value: tag.id };
                        })}
                        isMulti
                        onChange={(tags) => {
                            setSelectedTags(
                                tags.map((tag) => {
                                    return { id: tag.value, label: tag.label };
                                })
                            );
                        }}
                        onCreateOption={(label) => {
                            const newTag = { id: uuid(), label };
                            setSelectedTags((prev) => {
                                return [...prev, newTag];
                            });
                            onAddTag(newTag);
                            setAllTagsOption((prev) => {
                                return [...prev, newTag];
                            });
                        }}
                        options={allTagsOption.map((tag) => {
                            return { value: tag.id, label: tag.label };
                        })}
                    />
                </div>
            </div>
            <div className="mt-8">
                <label
                    htmlFor="body"
                    className="block mb-2 text-xl font-medium text-gray-900"
                >
                    Note Body
                </label>{' '}
                <div
                    tabIndex={0}
                    className="w-full border-2 border-gray-200 rounded-2xl bg-gray-50 focus:border-blue-500 focus:ring-blue-500 outline-none focus:border-[3px]"
                    id="body"
                >
                    <div className="px-4 py-4 bg-white rounded-t-lg">
                        <label htmlFor="body" className="sr-only">
                            Your Note
                        </label>
                        <textarea
                            id="body"
                            rows={4}
                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none focus:ring-0 h-96"
                            placeholder="Your Note Body..."
                            required
                            ref={bodyRef}
                            defaultValue={body}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 border-t">
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 mr-2"
                        >
                            Post Note
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default NoteForm;
