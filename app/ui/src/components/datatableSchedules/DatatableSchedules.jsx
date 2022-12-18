import './datatableSchedules.scss'
import { DataGrid } from '@mui/x-data-grid';
import { scheduleCol } from '../../databasesourceS';
import { useEffect, useState} from "react";
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

    const pat = Patients();

    let data = Schedules();

    for(let i=0; i<data.length;i++) {
        data[ i ]['pname'] = pat[ data[ i ]['paciente'] ]['name']
    }
    console.log(data)
    let collumn = scheduleCol;

    const actionCollum = [
        {
            field: "ações"
            , headerName: "Ações"
            , width: "300"
            , renderCell: () => {
                return (
                    <div className='cellAction'>
                        {/*<Link to={`/${title}/test`} style={{ textDecoration: "none" }}>
                            <div className='viewButton'>Visualizar</div>
                        </Link>*/}
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
