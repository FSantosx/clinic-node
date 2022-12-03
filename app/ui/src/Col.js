export const userCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'user', headerName: 'Usuário', width: 230, renderCell: (params) => {
            return (
                <div className="Cell">
                    {params.row.user}
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Email', width: 230 },
    {
        field: 'status', headerName: "Status", width: 160, renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            )
        }
    }
]

export const patientCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'name', headerName: 'Paciente', width: 230, renderCell: (params) => {
            return (
                <div className="Cell">
                    {params.row.name}
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Email', width: 230 },
]

export const recepcionistCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'recepcionist', headerName: 'Recepcionista', width: 230, renderCell: (params) => {
            return (
                <div className="Cell">
                    {params.row.recepcionist}
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Email', width: 230 },
    {
        field: 'status', headerName: "Status", width: 160, renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            )
        }
    }
]

export const doctorCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'doctor', headerName: 'Médico', width: 230, renderCell: (params) => {
            return (
                <div className="Cell">
                    {params.row.doctor}
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Email', width: 230 },
    {
        field: 'status', headerName: "Status", width: 160, renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            )
        }
    }
]

export const techCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'name', headerName: 'nome', width: 230, renderCell: (params) => {
            return (
                <div className="Cell">
                    {params.row.name}
                </div>
            )
        }
    },
    { field: 'email', headerName: 'Data', width: 230 },
    {
        field: 'status', headerName: "Status", width: 160, renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            )
        }
    }
]