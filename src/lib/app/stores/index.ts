import { atom, map } from 'nanostores';

export const meta = map<Record<string, Meta>>({});

export const toast = atom<string | undefined>();
