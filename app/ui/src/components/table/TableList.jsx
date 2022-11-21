import "./tablelist.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const TableList = () => {

    const rows = [
        { id: 12434123, name: "João das Cove", status: "Encaminhado para exame" },
        { id: 432341, name: "Maria Alface", status: "Medicamento receitado" },
        { id: 4432, name: "Jurema Andrada", status: "Encaminhado para exame" },
        { id: 5321521, name: "Jacinto Pereira", status: "Encaminhado para exame" },
    ];

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">ID</TableCell>
                        <TableCell className="tableCell">Nome</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">{row.id}</TableCell>
                            <TableCell className="tableCell">{row.name}</TableCell>
                            <TableCell className="tableCell">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
