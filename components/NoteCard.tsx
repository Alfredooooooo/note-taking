import { NoteCardProps } from '@/utils/types';
import { useRouter } from 'next/router';

const NoteCard = ({ title, tags, id, body, showModal }: NoteCardProps) => {
    const router = useRouter();
    return (
        <div className="container mt-4 mx-auto">
            <div
                onClick={() => router.push(id)}
                className={`box min-h-[15rem] min-w-[15rem] m-2 cursor-pointer rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-4 transition-all duration-200 flex justify-center items-center ${
                    showModal ? 'pointer-events-none' : ''
                }`}
            >
                <div className="m-3 overflow-hidden">
                    <h2 className="text-3xl mb-2 text-center">{title}</h2>
                    <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 text-center">
                        {body.length > 300
                            ? body.substring(0, 300) + '...'
                            : body}
                    </p>
                    <div className="flex justify-center items-center flex-wrap mt-2">
                        {tags.map((tag) => {
                            return (
                                <span
                                    className="text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 mr-2 animate-pulse"
                                    key={tag.id}
                                >
                                    {tag.label}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
