import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Person, PersonsState} from "./types.ts";
import api from '../services/api.ts';

const initialState: PersonsState = {
    persons: [],
    status: 'idle',
    error: null,
};

export const fetchPersons = createAsyncThunk('persons/fetchPersons', async () => {
    const response = await api.get('/persons');
    return response.data;
});

export const createPerson = createAsyncThunk('persons/createPerson', async (person: Omit<Person, 'id'>) => {
    const response = await api.post('/persons', person);
    const personId = response.headers.location.split('/').pop();
    return { ...person, id: personId } as Person;
});

export const updatePerson = createAsyncThunk('persons/updatePerson', async (person: Person) => {
    const response = await api.patch(`/persons/${person.id}`, person);
    return response.data;
});

export const deletePerson = createAsyncThunk('persons/deletePerson', async (id: string) => {
    await api.delete(`/persons/${id}`);
    return id;
});

const personsSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPersons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPersons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.persons = action.payload;
            })
            .addCase(fetchPersons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch persons';
            })
            .addCase(createPerson.fulfilled, (state, action) => {
                state.persons.push(action.payload);
            })
            .addCase(updatePerson.fulfilled, (state, action) => {
                const index = state.persons.findIndex(person => person.id === action.payload.id);
                if (index !== -1) {
                    state.persons[index] = action.payload;
                }
            })
            .addCase(deletePerson.fulfilled, (state, action) => {
                state.persons = state.persons.filter(person => person.id !== action.payload);
            });
    },
});

export default personsSlice.reducer;
