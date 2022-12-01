export const scheduleCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'paciente', headerName: 'Paciente', width: 230, renderCell: (params) => {
        return (
            <div className="Cell">
                {params.row.firstName}
            </div>
        )
    }},
    { field: 'data', headerName:'Data', width: 230},
    { field: 'status', headerName:"Status", width:160, renderCell: (params) => {
        return (
            <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
            </div>
        )
    }}
]

export const scheduleRows = [
    { id: 234, firstName: 'Jon', data: '12/12/2022', status: "agendado"},
    { id: 432, firstName: 'Jon', data: '12/12/2022', status: "desistencia"},
    { id: 433, firstName: 'Jon', data: '12/12/2022', status: "remarcado"},
]