import React, {useState, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import PersonForm from './PersonForm';
import {Person} from '../features/types.ts';
import {useAppDispatch} from '../hooks/hooks.ts';
import {deletePerson, updatePerson, createPerson} from '../features/personsSlice.ts';

interface PersonModalProps {
    open: boolean;
    onClose: () => void;
    person: Person | null;
    type: 'view' | 'edit' | 'create';
}

const PersonModal: React.FC<PersonModalProps> = ({open, onClose, person, type}) => {
    const dispatch = useAppDispatch();
    const [currentType, setCurrentType] = useState(type);
    const [formData, setFormData] = useState<Person | Omit<Person, 'id'> | null>(person);

    useEffect(() => {
        setCurrentType(type);
        setFormData(person || {name: '', age: 18, address: '', work: ''});
    }, [type, person]);

    const handleDelete = () => {
        if (person) {
            dispatch(deletePerson(person.id));
            onClose();
        }
    };

    const handleSave = () => {
        if (currentType === 'edit' && person) {
            dispatch(updatePerson(formData as Person));
        } else if (currentType === 'create') {
            dispatch(createPerson(formData as Omit<Person, 'id'>));
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {currentType === 'view' ? 'Информация о пользователе' :
                    currentType === 'edit' ? 'Редактирование пользователя' : 'Создание пользователя'}
            </DialogTitle>

            <DialogContent>
                <PersonForm
                    data={formData}
                    isEditing={currentType !== 'view'}
                    onChange={setFormData}
                />
            </DialogContent>

            <DialogActions>
                {currentType === 'view' ? (
                    <>
                        <Button color="error" onClick={handleDelete}>
                            Удалить
                        </Button>
                        <Button onClick={() => setCurrentType('edit')}>
                            Редактировать
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => {
                            if (type === 'create') onClose();
                            else setCurrentType('view');
                        }}>
                            Отмена
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Сохранить
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default PersonModal;
