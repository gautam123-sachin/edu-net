import React from "react";
import { Table, TableHead, TableBody, TableCell, TableRow, Avatar } from '@mui/material';

const RefernalMember = () => {
    const refernalMembers = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://example.com/avatar1.png",
            position: "Left",
            profession: "Engineer"
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "https://example.com/avatar2.png",
            position: "Right",
            profession: "Software Developer"
        },
        {
            id: 3,
            name: "Alice Johnson",
            avatar: "https://example.com/avatar3.png",
            position: "Left",
            profession: "Graphic Designer"
        },
    ];

    return (
        <>
            <Table>
                <TableHead sx={{ backgroundColor: '#0d6efd' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User Avatar</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Profession</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {refernalMembers.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>
                                <Avatar key={member.id} alt={member.name} src={member.avatar} />
                            </TableCell>
                            <TableCell>{member.id}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell>{member.profession}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default RefernalMember;
