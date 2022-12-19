import './datatableSchedules.scss'
import { DataGrid } from '@mui/x-data-grid';
import { scheduleCol } from '../../databasesourceS';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export const DatatableSchedules = ({ title }) => {

    const Schedules = () => {
        const [schedules, setSchedules] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/schedules/list").then(response => response.json()).then(data => setSchedules(data)).catch(err => console.trace(err))
        }, [])
        return schedules;
    }

    const Patients = () => {
        const [patients, setPatients] = useState([])
        useEffect(() => {
            fetch("http://localhost:3001/api/db/patients/list")
                .then(response => response.json())
                .then(data => {
                    let list = {}
                    data.forEach((item) => {
                        list[item['id']] = item
                    })
                    setPatients(list)
                })
                .catch(err => console.trace(err))
        }, [])
        return patients;
    }

    function RefreshPage() {
        window.location.reload(true);
    }

    function Delete(e, id) {
        console.log(title)
        e.stopPropagation();
        fetch(`http://localhost:3001/api/db/${title+'s'}/delete/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch(err => console.trace(err));
        RefreshPage()
    }

    const pat = Patients();

    let data = Schedules();

    for (let i = 0; i < data.length; i++) {
        data[i]['pname'] = pat[data[i]['paciente']]['name']
    }

    let collumn = scheduleCol;

    const actionCollum = [
        {
            field: "ações"
            , headerName: "Ações"
            , width: "300"
            , renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <button className='deleteButton' onClick={(e) => Delete(e, params.row.id)}>Deletar</button>
                        <Link to={`/${title}/new/${params.row.id}`} style={{ textDecoration: "none" }} >
                            <button className='editButton'>Editar</button>
                        </Link>
                    </div>
                )
            }
        }
    ]
    return (
        <div className='datatable'>
            <div className="datatableTitle">
                Adicionar novo agendamento
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
