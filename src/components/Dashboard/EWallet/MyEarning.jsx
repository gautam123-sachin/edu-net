import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Button } from '@mui/material';

const MyEarning = () => {
    // Sample data for earnings including type, description, date, and amount
    const earningData = [
        { type: 'Commissions', description: 'Sales commissions', date: '2024-02-15', amount: '$500' },
        { type: 'Referral Commissions', description: 'Referral earnings', date: '2024-02-16', amount: '$200' },
        { type: 'Team Commissions', description: 'Team bonuses', date: '2024-02-17', amount: '$300' },
        { type: 'Monthly Commissions', description: 'Monthly bonuses', date: '2024-02-18', amount: '$400' },
    ];

    const handleAction = (earning) => {
        // Placeholder function for handling action
        console.log('View button clicked for:', earning);
    };

    return (
        <div>
            {earningData && earningData.length > 0 ? (
                <Table>
                    <TableHead sx={{ backgroundColor: '#0d6efd' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {earningData.map((earning, index) => (
                            <TableRow key={index}>
                                <TableCell>{earning.type}</TableCell>
                                <TableCell>{earning.description}</TableCell>
                                <TableCell>{earning.date}</TableCell>
                                <TableCell>{earning.amount}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleAction(earning)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No earnings available.</p>
            )}
        </div>
    );
};

export default MyEarning;
