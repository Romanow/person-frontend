import React from 'react';
import {TextField, Stack} from '@mui/material';
import {Person} from '../features/types.ts';

interface PersonFormProps {
    data: Person | Omit<Person, 'id'> | null;
    isEditing: boolean;
    onChange: (data: Person | Omit<Person, 'id'>) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({data, isEditing, onChange}) => {
    const handleChange = (field: keyof Person) => (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({...data, [field]: e.target.value} as Person);
    };

    return (
        <Stack spacing={2} sx={{mt: 1}}>
            <TextField
                label="Имя"
                value={data?.name || ''}
                onChange={handleChange('name')}
                disabled={!isEditing}
                fullWidth
            />
            <TextField
                label="Адрес"
                value={data?.address || ''}
                onChange={handleChange('address')}
                disabled={!isEditing}
                fullWidth
            />
            <TextField
                label="Место работы"
                value={data?.work || ''}
                onChange={handleChange('work')}
                disabled={!isEditing}
                fullWidth
            />
            <TextField
                label="Возраст"
                type="number"
                value={data?.age || ''}
                onChange={handleChange('age')}
                disabled={!isEditing}
                fullWidth
            />
        </Stack>
    );
};

export default PersonForm;
