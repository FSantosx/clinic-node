import './datatableSchedules.scss'
import { DataGrid } from '@mui/x-data-grid';
import { scheduleCol, scheduleRows } from '../../databasesourceS';
import { Link } from 'react-router-dom';

export const DatatableSchedules = ({ title }) => {

    const actionCollum = [
        {
            field: "ações"
            , headerName: "Ações"
            , width: "300"
            , renderCell: () => {
                return (
                    <div className='cellAction'>
                        <Link to={`/${title}/test`} style={{ textDecoration: "none" }}>
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
                Adicionar novo agendamento
                <Link to={`/${title}/new`} style={{ textDecoration: "none" }} className="link">
                    Adicionar novo
                </Link>
            </div>
            <DataGrid
                rows={scheduleRows}
                columns={scheduleCol.concat(actionCollum)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    )
}
