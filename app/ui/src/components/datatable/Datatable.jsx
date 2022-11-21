import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userCol, userRows } from '../../databasesource';
import { Link } from 'react-router-dom';

export const Datatable = () => {
    const actionCollum = [
        {
            field: "ações", headerName: "Ações", width: "300", renderCell: () => {
                return (
                    <div className='cellAction'>
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
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
                Adicionar novo usuário
                <Link to="/users/new" style={{textDecoration:"none"}} className="link">
                    Adicionar novo
                </Link>
            </div>
            <DataGrid
                rows={userRows}
                columns={userCol.concat(actionCollum)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    )
}
