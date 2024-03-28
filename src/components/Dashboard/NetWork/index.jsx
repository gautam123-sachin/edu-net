import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    Typography,
    Divider,
    Card,
    CardContent,
    CardHeader,
    Tooltip,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AllMembers from "./AllMembers";
import RefernalMember from "./RefernalMember";
import DownlineMembers from "./DownlineMembers";

const Members = [
    {
        label: 'Referal Members',
        icon: <InfoIcon />,
        color: '#0d6efd',
        toolTipTitle: 'Referal Members',
        totalmembers: '10',
    },
    {
        label: 'Downline Members',
        icon: <InfoIcon />,
        color: '#dc3545',
        toolTipTitle: 'Downline Members',
        totalmembers: '5',
    },
    {
        label: 'All Members',
        icon: <InfoIcon />,
        color: '#ffc107',
        toolTipTitle: 'All Members',
        totalmembers: '20',
    },
    {
        label: 'Monthly Added Members',
        icon: <InfoIcon />,
        color: '#28a745',
        toolTipTitle: 'Monthly Added Members',
        totalmembers: '15',
    },
];

const NetWork = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeTab, setActiveTab] = useState('RefernalMembers');
    const [membersData, setMembersData] = useState([]);
console.log('memberData', membersData);
    useEffect(() => {
        // Fetch data from API based on active tab
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (tab) => {
        try {
            // Make API call based on the tab and set the data to state
            const response = await fetch(`API_URL/${tab}`);
            const data = await response.json();
            setMembersData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getFilter = () => {
        switch (activeTab) {
            case 'RefernalMembers':
                return <RefernalMember />;
            case 'DownlineMembers':
                return <DownlineMembers />;
            case 'AllMembers':
                return <AllMembers />;
            default:
                return <RefernalMember />;
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={12}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h4" mr={1}>Network</Typography>
                </Box>
                <Grid container spacing={3}>
                    {Members.map((item, index) => (
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
                                                {item.totalmembers}
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
                        variant="button"
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'RefernalMembers' ? '#06BBCC' : '#000' }}
                        onClick={() => handleTabChange('RefernalMembers')}
                    >
                        Refernal Members
                    </Typography>
                    <Typography

                        variant="button"
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'DownlineMembers' ? '#06BBCC' : '#000' }}
                        onClick={() => handleTabChange('DownlineMembers')}
                    >
                        Downline Members
                    </Typography>
                    <Typography
                        variant="button"
                        style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === 'AllMembers' ? '#06BBCC' : '#000' }}
                        onClick={() => handleTabChange('AllMembers')}
                    >
                        All Members
                    </Typography>
                </Box>
                <Divider style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold', borderColor: '#030404' }} />
                {getFilter()}
            </Grid>
        </Grid>
    );
};

export default NetWork;
