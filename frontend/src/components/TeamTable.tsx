import { UserRepresentation } from "@/models/UserInterfaces";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TeamTable({userList} : {userList : UserRepresentation[]}){

    return (          
    <TableContainer sx={{ width: "50%"}}>
        <Table aria-label="team table">
        <TableHead>
            <TableRow sx={{ backgroundColor: "#171717"}}>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {userList.map((user: UserRepresentation) => (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {user.name} {user.surname}
                </TableCell>
                <TableCell>{user.email}</TableCell>
            </TableRow>
            ))}
            
        </TableBody>
        </Table>
    </TableContainer>
    );
}