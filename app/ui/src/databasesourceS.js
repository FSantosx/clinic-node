export const scheduleCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'paciente', headerName: 'Paciente', width: 230, renderCell: (params) => {
        return (
            <div className="Cell">
                {params.row.pname}
            </div>
        )
    }},
    { field: 'date', headerName:'Data', width: 230},
    { field: 'status', headerName:"Status", width:160, renderCell: (params) => {
        return (
            <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
            </div>
        )
    }}
]