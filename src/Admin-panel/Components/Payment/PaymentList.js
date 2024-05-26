import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  DataGrid,
} from '@mui/x-data-grid';

import { Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';



export default function PaymentList() {
const [rows, setRows] = React.useState([]);

  const columns = [
    { field: 'username', headerName: 'Username', width: 170 },
    { field: 'transactionId', headerName: 'Transaction ID', width: 170 },
    { field: 'phoneNo', headerName: 'Phone Number', width: 160 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row)}>
            Delete
          </Button>
         {params?.row?.status === "pending"  && <Button variant="contained" color="success" onClick={() => handleApprove(params.row)}>
            Approve
          </Button> }
        </Stack>
      ),
    },
  ];

  const fetchAllPaymentRequests = async() => {
    const response = await axios.get("http://localhost:8000/v1/payments");
    if (response?.status === 200) {
      setRows(response?.data);
    }
  }

  const handleDelete = async(row) => {
    try {
      const res = await axios.delete("http://localhost:8000/v1/payments", {transactionId: row?.transactionId});
      if (res?.status === 200) {
        fetchAllPaymentRequests();
      }
     } catch (error) {
      
     }
  };
  
  const handleApprove = async(row) => {
   try {
    const res = await axios.put("http://localhost:8000/v1/payments", {transactionId: row?.transactionId});
    if (res?.data?.transactionId) {
      fetchAllPaymentRequests();
    }
   } catch (error) {
    
   }
  };

  React.useEffect(() => {
    fetchAllPaymentRequests();
  }, [])
  

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={4} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                color="textPrimary"
              >
                Payment Approval
              </Typography>
              <Box
                sx={{
                  height: 500,
                  width: '100%',
                  '& .actions': {
                    color: 'text.secondary',
                  },
                  '& .textPrimary': {
                    color: 'text.primary',
                  },
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row._id}
                  isCellEditable={false}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}