import React from 'react';
import { Avatar, Box, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';

const AllMembers = () => {

      const allMembers = [
        {
            id: 1,
            name: 'John Doe',
            avatar: 'https://example.com/avatar1.png',
            joiningDate: '2024-02-18',
            position: 'Left',
            profession: 'Engineer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar2.png',
            joiningDate: '2024-02-19',
            position: 'Right',
            profession: 'Software Developer',
        },
    ];

    return (
        <Box>
            <Table>
                <TableHead sx={{ backgroundColor: '#0d6efd' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Avatar</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Joining Date</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Profession</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allMembers.map(member => (
                        <TableRow key={member.id}>
                            <TableCell>
                                <Avatar alt={member.name} src={member.avatar} />
                            </TableCell>
                            <TableCell>{member.id}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.joiningDate}</TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell>{member.profession}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
)
}
export default AllMembers;