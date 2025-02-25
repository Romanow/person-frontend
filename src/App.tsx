import React from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import PersonList from './components/PersonList';
import {CssBaseline, Container} from '@mui/material';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <PersonList/>
            </Container>
        </Provider>
    );
};

export default App;
