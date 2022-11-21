export const userCol = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'User', width: 230, renderCell: (params) => {
        return (
            <div className="Cell">
                {params.row.firstName}
            </div>
        )
    }},
    { field: 'email', headerName:'Email', width: 230},
    { field: 'status', headerName:"Status", width:160, renderCell: (params) => {
        return (
            <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
            </div>
        )
    }}
]

export const userRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: "active"},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: "inactive"},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]