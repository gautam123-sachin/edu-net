import React, { useState } from "react";
import {
    Grid,
    Button,
    Divider,
    Box,
    CardHeader,
    Typography,
    Card,
    CardContent,
    Tooltip,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InfoIcon from '@mui/icons-material/Info';
import Pagination from '@mui/material/Pagination';

import Statement from "./Statement.jsx";
import MyEarning from "./MyEarning.jsx";
import TransferHistory from "./TransferHistory.jsx";
import FundTransferForm from './FundTransferForm.jsx';

const stripePromise = loadStripe('pk_test_51OGEyFSDrJBc0PMT7YnkTkPKV4BAlhVEcsd5xvqeyB8GHuC8cNLzJTT4VhbBu0BH4aQYiEZcupUHw2JT7QSggTNG001fwkfnAI');

const E_WALLET = [
    {
        label: 'Total Amount',
        toolTipTitle: 'Total Amount',
        amount: '$ 123.2',
        icon: <InfoIcon />,
        color: '#2C008A',
    },
    {
        label: 'Remaining Amount',
        toolTipTitle: 'Remaining Amount',
        amount: '$ 123.2',
        icon: <InfoIcon />,
        color: '#71A92F',
    },
    {
        label: 'E-Wallet Balance',
        toolTipTitle: 'Credit-Debit',
        amount: '$ 123.2',
        icon: <InfoIcon />,
        color: '#05C7B9',
    },
    {
        label: 'Commission Earned',
        toolTipTitle: 'All Earned Commission',
        amount: '$ 123.4',
        icon: <InfoIcon />,
        color: '#2C008A',
    }
];

const EWallet = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeTab, setActiveTab] = useState('Statement');
    const [fundTransferOpen, setFundTransferOpen] = useState(false);
    const [page, setPage] = useState(1); 
    const [itemsPerPage] = useState(4);

    const handleFundTransferClose = () => {
        setFundTransferOpen(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getFilter = () => {
        switch (activeTab) {
            case 'Statement':
                return <Statement />;
            case 'TransferHistory':
                return <TransferHistory />;
            case 'MyEarnings':
                return <MyEarning />;
            default:
                return <Statement />;
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = E_WALLET.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={12}>
                <Elements stripe={stripePromise}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h4" component="h4" mr={1}>E-Wallet</Typography>
                        <div style={{ marginLeft: 'auto' }}>
                            <Button variant="contained" color="primary" onClick={() => setFundTransferOpen(true)}>Request for Payment</Button>
                        </div>
                        {fundTransferOpen && <FundTransferForm open={fundTransferOpen} onClose={handleFundTransferClose} />}
                    </Box>
                </Elements>
                <Grid container spacing={3}>
                    {currentItems.map((item, index) => (
                        <Grid item xs={12} lg={3} key={index}>
                            <Card sx={isMobile ? { backgroundColor: item.color } : { width: '250px', backgroundColor: item.color }}>
                                <CardContent style={{ paddingBottom: '15px' }}>
                                    <CardHeader
                                        style={{ padding: '0px' }}
                                        action={
                                            <Tooltip title={item.toolTipTitle}>
                                                <IconButton>
                                                    {item.icon}
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        title={
                                            <Typography style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }} color="text.secondary" gutterBottom>
                                                {item.label}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography variant="h5" component="div" style={{ color: '#fff', fontWeight: '600' }}>
                                                {item.amount}
                                            </Typography>
                                        }
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Divider style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold', borderColor: '#030404' }} />
                <Box mt={2} mb={2}>
                    <Typography
                        onClick={() => handleTabChange('Statement')}
                        variant="button"
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'Statement' ? '#06BBCC' : '#000' }}
                    >
                        Statement
                    </Typography>
                    <Typography
                        onClick={() => handleTabChange('TransferHistory')}
                        variant="button"
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'TransferHistory' ? '#06BBCC' : '#000' }}
                    >
                        Transfer History
                    </Typography>
                    <Typography
                        onClick={() => handleTabChange('MyEarnings')}
                        variant="button"
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'MyEarnings' ? '#06BBCC' : '#000' }}
                    >
                        My Earnings
                    </Typography>

                </Box>

                <Divider style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold', borderColor: '#030404' }} />
                {getFilter()}
                <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                        count={Math.ceil(E_WALLET.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default EWallet;
