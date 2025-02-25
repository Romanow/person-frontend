import React, {useState, useEffect} from 'react';
import {Grid2, Card, CardContent, Typography, Button, CircularProgress, Alert, CardActions, Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../hooks/hooks.ts';
import {fetchPersons} from '../features/personsSlice.ts';
import {Person} from "../features/types.ts";
import PersonModal from './PersonModal';

const PersonList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {persons, status, error} = useAppSelector(state => state.persons);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'view' | 'edit' | 'create'>('view');

    useEffect(() => {
        dispatch(fetchPersons());
    }, [dispatch]);

    const handleOpenCreate = () => {
        setModalType('create');
        setOpenModal(true);
    };

    if (status === 'loading') {
        return <CircularProgress/>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <div style={{padding: '20px'}}>
            <h1>Сотрудники</h1>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2}}>
                <Button variant="contained" onClick={handleOpenCreate}>
                    Создать
                </Button>
            </Box>

            {persons.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                        width: '100%'
                    }}
                >
                    <Typography variant="h4" color="textSecondary">
                        Пустой список
                    </Typography>
                </Box>
            ) : (
                <Grid2 container spacing={3}>
                    {persons.map((person: Person) => (
                        <Grid2 size={6} key={person.id}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                        Сотрудник
                                    </Typography>
                                    <Typography variant="h5" component="div">{person.name} ({person.age})</Typography>
                                    <Typography sx={{color: 'text.secondary'}}>
                                        Место жительства: {person.address}
                                    </Typography>
                                    <Typography sx={{color: 'text.secondary'}}>
                                        Место работы: {person.work}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {
                                        setSelectedPerson(person);
                                        setModalType('view');
                                        setOpenModal(true);
                                    }}>Изменить</Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}

            <PersonModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                person={selectedPerson}
                type={modalType}
            />
        </div>
    );
};

export default PersonList;
