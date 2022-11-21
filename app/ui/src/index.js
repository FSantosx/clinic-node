import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { List } from './pages/list/List';
import { Single } from './pages/single/Single';
import { New } from './pages/new/New';
import { userInputs, patientInputs } from './formSource';
import { Schedule } from './pages/schedule/Schedule';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='users'>
                        <Route index element={<List title="users" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={userInputs} title="Adicionar novo usuário" />} />
                    </Route>
                    <Route path='patients'>
                        <Route index element={<List title="patients" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={patientInputs} title="Adicionar novo Paciente" />} />
                    </Route>
                    <Route path="schedules">
                        <Route index element={<Schedule />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);