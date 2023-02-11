import { Note } from '@/utils/types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { getRawNote } from '../api/rawnotes';
import { getAllTags } from '../api/tags';
import gfm from 'remark-gfm';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const urlid = context.params?.id;
    let rawNote = await getRawNote(urlid as string);
    let allTags = await getAllTags();

    if (rawNote == null) {
        return {
            notFound: true,
        };
    }

    rawNote = JSON.parse(JSON.stringify(rawNote));
    allTags = JSON.parse(JSON.stringify(allTags));

    const { tagsWithID, ...restData } = rawNote;

    const { title, body, tags, id } = {
        ...restData,
        tags: allTags.filter((tag) => tagsWithID.includes(tag.id)),
    };

    return {
        props: {
            title,
            body,
            tags,
            id,
        },
    };
};

const NoteById = ({ title, body, tags, id }: Note) => {
    const [showModal, setShowModal] = useState(false);

    async function deleteRawNote() {
        await fetch(`/api/rawnotes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        router.push('/');
    }

    const router = useRouter();

    return (
        <div className={`relative overflow-auto w-screen h-screen`}>
            <div
                className={`mx-12 mt-8 mb-8 flex justify-between items-center ${
                    showModal ? 'blur-3xl' : ''
                }`}
            >
                <div className="mt-2 text-center">
                    <div className="font-bold text-5xl">{title}</div>
                    <div className="flex justify-center items-center flex-wrap mt-2">
                        {tags.map((tag) => {
                            return (
                                <span
                                    className="text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 mr-2 animate-pulse mt-2"
                                    key={tag.id}
                                >
                                    {tag.label}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div
                    className={`flex flex-wrap items-center justify-end flex-col lg:flex-row w-full ${
                        showModal ? 'blur-3xl' : ''
                    }`}
                >
                    <button
                        className="hover:bg-blue-400 bg-transparent border-blue-500 text-blue-700 border font-bold text-xl py-3 px-8 rounded-full transition duration-500 lg:mr-4 hover:border-transparent hover:text-white mt-2"
                        onClick={() => router.push(`${id}/edit`)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-transparent hover:bg-rose-400 text-rose-700 font-bold hover:text-white py-3 px-8 text-xl border border-rose-500 hover:border-transparent rounded-full transition duration-500 lg:mr-4 mt-2"
                        onClick={() => setShowModal(true)}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-transparent hover:bg-slate-400 text-slate-700 font-bold hover:text-white py-3 px-8 text-xl border border-slate-500 hover:border-transparent rounded-full transition duration-500 mt-2"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        Back
                    </button>
                </div>
            </div>
            <ReactMarkdown
                className={`mx-12 ${showModal ? 'blur-3xl' : ''}`}
                remarkPlugins={[gfm]}
            >
                {body}
            </ReactMarkdown>
            {showModal && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                <svg
                                    aria-hidden="true"
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
                            <div className="p-6 text-center">
                                <svg
                                    aria-hidden="true"
                                    className="mx-auto mb-4 text-gray-400 w-14 h-14"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                    Are you sure you want to delete this?
                                </h3>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    onClick={() => {
                                        deleteRawNote();
                                        setShowModal(false);
                                    }}
                                >
                                    Yes, I&apos;m sure
                                </button>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteById;
