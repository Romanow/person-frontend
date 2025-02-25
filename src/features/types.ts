export interface Person {
    id: string;
    name: string;
    age: number;
    address: string;
    work: string;
}

export interface PersonsState {
    persons: Person[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
