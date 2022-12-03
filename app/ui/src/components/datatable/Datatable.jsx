import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userCol, patientCol, recepcionistCol, doctorCol, scheduleCol, techCol} from '../../Col';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Datatable = ({ title }) => {
    var str;
    const Users = () => {
        const [users, setUsers] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/users/list").then(response => response.json()).then(data => setUsers(data)).catch(err => console.trace(err))
        }, [])
        return users;
    }

    const Patients = () => {
        const [patients, setPatients] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/patients/list").then(response => response.json()).then(data => setPatients(data)).catch(err => console.trace(err))
        }, [])
        return patients;
    }

    const Doctors = () => {
        const [doctors, setDoctors] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/doctors/list").then(response => response.json()).then(data => setDoctors(data)).catch(err => console.trace(err))
        }, [])
        return doctors;
    }

    const Recepcionists = () => {
        const [recepcionists, setRecepcionists] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/recepcionists/list").then(response => response.json()).then(data => setRecepcionists(data)).catch(err => console.trace(err))
        }, [])
        return recepcionists;
    }

    const Tech = () => {
        const [tech, setTech] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/tech/list").then(response => response.json()).then(data => setTech(data)).catch(err => console.trace(err))
        }, [])
        return tech;
    }

    let data;
    let collumn
    switch (title) {
        case "users":
            str = "usuário"
            data = Users();
            collumn = userCol;
            break;
        case "patients":
            str = "paciente"
            data = Patients();
            collumn = patientCol;
            break;
        case "tech":
            str = "Tecnico em Laboratorio"
            data = Tech();
            collumn = techCol;
            break;
        case "doctors":
            str = "médico"
            data = Doctors();
            collumn = doctorCol
            break;
        case "recepcionists":
            str = "recepcionista"
            data = Recepcionists();
            collumn = recepcionistCol;
            break;
        default:
            break;
    }

    const actionCollum = [
        {
            field: "ações"
            , headerName: "Ações"
            , width: "300"
            , renderCell: () => {
                return (
                    <div className='cellAction'>
                        <Link to={`/${title}/:id`} style={{ textDecoration: "none" }}>
                            <div className='viewButton'>Visualizar</div>
                        </Link>
                        <div className='deleteButton'>Deletar</div>
                        <div className='editButton'>Editar</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Adicionar novo {str}
                <Link to={`/${title}/new`} style={{ textDecoration: "none" }} className="link">
                    Adicionar novo
                </Link>
            </div>
            <DataGrid
                rows={data}
                columns={collumn.concat(actionCollum)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    )
}
