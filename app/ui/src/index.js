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
import { NewSchedule } from './pages/newSchedule/NewSchedule';
import { userInputs, patientInputs, schedulesInputs, doctorInputs, techInputs, recepInputs} from './formSource';
import { Schedule } from './pages/schedule/Schedule';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter forceRefresh={true}>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login  />} />
                    <Route path='users'>
                        <Route index element={<List title="users" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={userInputs} title="Adicionar novo usuário" db="users"/>} />
                        <Route path='new/:id' element={<New inputs={userInputs} title="Editar usuário" db="users"/>} />
                    </Route>
                    <Route path='doctors'>
                        <Route index element={<List title="doctors" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={doctorInputs} title="Adicionar novo médico" db="doctors" />} />
                        <Route path='new/:id' element={<New inputs={doctorInputs} title="Editar médico" db="doctors"/>} />
                    </Route>
                    <Route path='tech'>
                        <Route index element={<List title="tech" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={techInputs} title="Adicionar novo Técnico em Laboratório" db="tech"/>} />
                        <Route path='new/:id' element={<New inputs={techInputs} title="Editar Técnico em Laboratório" db="tech"/>} />
                    </Route>
                    <Route path='patients'>
                        <Route index element={<List title="patients" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={patientInputs} title="Adicionar novo Paciente" db="patients"/>} />
                        <Route path='new/:id' element={<New inputs={patientInputs} title="Editar paciente" db="patients"/>} />
                    </Route>
                    <Route path='recepcionists'>
                        <Route index element={<List title="recepcionists" />} />
                        <Route path=':id' element={<Single />} />
                        <Route path='new' element={<New inputs={recepInputs} title="Adicionar novo recepcionista" db="recepcionists"/>} />
                        <Route path='new/:id' element={<New inputs={recepInputs} title="Editar recepcionista" db="recepcionists"/>} />
                    </Route>
                    <Route path="schedule">
                        <Route index element={<Schedule />} />
                        <Route path="new" element={<NewSchedule inputs={schedulesInputs} title="Adicionar novo Agendamento" db="schedule"/>} />
                        <Route path='new/:id' element={<NewSchedule inputs={schedulesInputs} title="Editar agendamento" db="schedule"/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);