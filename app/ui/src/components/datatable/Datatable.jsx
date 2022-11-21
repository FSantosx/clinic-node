import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userCol, userRows } from '../../databasesource';

export const Datatable = () => {
    const actionCollum = [
        { field:"ações", headerName:"Ações", width: "300", renderCell: () => {
            return (
                <div className='cellAction'>
                    <div className='viewButton'>Visualizar</div>
                    <div className='deleteButton'>Deletar</div>
                    <div className='editButton'>Editar</div>
                </div>
            )
        }}
    ]
    return (
        <div className='datatable'>
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
