import { NoteListProps, Tag } from '@/utils/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactSelect from 'react-select';
import NoteCard from './NoteCard';

const NoteList = ({
    notes,
    tags: allTags,
    onDeleteTag,
    onEditTag,
    onChangeTag,
}: NoteListProps) => {
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const filteredNotes = notes.filter((note) => {
        if (
            (title === '' ||
                note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
                selectedTags.every((tag) => {
                    return note.tags.some((noteTag) => noteTag.id === tag.id);
                }))
        )
            return true;
    });

    return (
        <div className="relative w-screen h-screen overflow-auto">
            <div
                className={`mx-12 mt-8 mb-4 flex justify-between items-center ${
                    showModal ? 'blur-3xl' : ''
                }`}
            >
                <h1 className="font-bold text-5xl">Notes</h1>
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 px-8 rounded-full transition duration-500 mr-4"
                        onClick={() => router.push('/new')}
                        disabled={showModal}
                    >
                        Create
                    </button>
                    <button
                        className="bg-transparent hover:bg-rose-400 text-rose-700 font-bold hover:text-white py-3 px-8 text-xl border border-rose-500 hover:border-transparent rounded-full transition duration-500"
                        disabled={showModal}
                        onClick={() => setShowModal(true)}
                    >
                        Edit Tags
                    </button>
                </div>
            </div>
            <div className={`mx-12 ${showModal ? 'blur-xl' : ''}`}>
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
                            placeholder="Search for title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="w-[49%]">
                        <label
                            htmlFor="tags"
                            className="block mb-2 text-xl font-medium text-gray-900"
                        >
                            Tags
                        </label>
                        <ReactSelect
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
                                        return {
                                            id: tag.value,
                                            label: tag.label,
                                        };
                                    })
                                );
                            }}
                            options={allTags.map((tag) => {
                                return { value: tag.id, label: tag.label };
                            })}
                        />
                    </div>
                </div>
            </div>

            <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-12 ${
                    showModal ? 'blur-xl' : ''
                }`}
            >
                {filteredNotes.map((note) => {
                    return (
                        <NoteCard
                            key={note.id}
                            title={note.title}
                            tags={note.tags}
                            id={note.id}
                            body={note.body}
                            showModal={showModal}
                        />
                    );
                })}
            </div>

            {showModal && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 overflow-x-hidden overflow-y-auto">
                    <div className="relative w-full h-full max-w-2xl md:h-auto">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Edit Tags{' '}
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={() => setShowModal(false)}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allTags.map((tag) => {
                                    return (
                                        <form
                                            key={tag.id}
                                            className="text-base leading-relaxed text-gray-500 relative w-full flex gap-2 items-center justify-center"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                onEditTag(tag.id, tag.label);
                                            }}
                                        >
                                            <input
                                                type="text"
                                                required
                                                defaultValue={tag.label}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                onChange={(e) => {
                                                    onChangeTag(
                                                        tag.id,
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <button type="submit">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-check-square w-[1.5rem] h-[1.5rem]"
                                                    viewBox="0 0 16 16"
                                                >
                                                    {' '}
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{' '}
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />{' '}
                                                </svg>
                                            </button>
                                            <button
                                                className="text-2xl -translate-y-[0.125rem]"
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteTag(tag.id);
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </form>
                                    );
                                })}
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button
                                    data-modal-hide="defaultModal"
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => setShowModal(false)}
                                >
                                    Done
                                </button>
                                <button
                                    data-modal-hide="defaultModal"
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteList;
