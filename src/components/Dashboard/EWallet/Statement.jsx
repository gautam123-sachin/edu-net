import React from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@mui/material";

const Statement = () => {
    const data = [
        { date: "2024-02-18", description: "Transaction 1", amount: "$50.00" },
        { date: "2024-02-17", description: "Transaction 2", amount: "$30.00" },
    ];
    const handleAction = () => {
        console.log("Action clicked");
    };

    return (
        <>
            {data.length > 0 ? (
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
                        {data.map((statement, index) => (
                            <TableRow key={index}>
                                <TableCell>{statement.date}</TableCell>
                                <TableCell>{statement.description}</TableCell>
                                <TableCell>{statement.amount}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleAction(statement)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No statement</p>
            )}
        </>
    );
};

export default Statement;
