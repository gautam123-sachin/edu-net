import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@mui/material';

const TransferHistory = () => {
    const transferHistory = [
        {
            date: '2024-02-18',
            amount: '$50',
            description: 'Received from John Doe',
        },
        {
            date: '2024-02-17',
            amount: '$30',
            description: 'Sent to Jane Doe',
        },
    ];

    const handleAction = (transfer) => {
        // Define the action you want to perform here
        console.log('Action performed for transfer:', transfer);
    };

    return (
        <>
            {transferHistory && transferHistory.length > 0 ? (
                <Table>
                    <TableHead sx={{ backgroundColor: '#0d6efd' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transferHistory.map((transfer, index) => (
                            <TableRow key={index}>
                                <TableCell>{transfer.date}</TableCell>
                                <TableCell>{transfer.description}</TableCell>
                                <TableCell>{transfer.amount}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleAction(transfer)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No transfer history available.</p>
            )}
        </>
    );
};

export default TransferHistory;
