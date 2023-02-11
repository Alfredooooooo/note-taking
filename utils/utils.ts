import { useLocalStorage } from '@/Hook/useLocalStorage';
import { RawNote } from '@/utils/types';

const [notes, setNotes] = useLocalStorage<RawNote>('NOTES', []);
export function handle() {}
