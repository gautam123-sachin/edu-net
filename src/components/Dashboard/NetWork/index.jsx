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
import RefernalMember from "./RefernalMember";
import { Stack } from "react-bootstrap";
import { Table, TableHead, TableBody, TableCell, TableRow, Avatar, Paper, TableContainer } from '@mui/material';

const Members = [
    {
        label: 'Referal Members',
        icon: <InfoIcon />,
        color: '#0d6efd',
        toolTipTitle: 'Referal Members',
        totalmembers: '10',
    },
    {
        label: 'Monthly Added Members',
        icon: <InfoIcon />,
        color: '#28a745',
        toolTipTitle: 'Monthly Added Members',
        totalmembers: '15',
    },
];

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
    return (
        <Box container spacing={3}>
            <Box item xs={12}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h4" mr={1}>Network</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
                    gap: "-45px",
                }}>
                    {Members.map((item, index) => (
                        <Stack
                            direction="row"
                            spacing={{xs:3, sm: 4}}
                            key={index}
                            style={{ flex: "none", marginLeft: 20, marginBottom: 10, width: 250 }}
                        >
                            <Card
                                sx={{
                                    width: '100%',
                                    backgroundColor: item.color,
                                    maxWidth: isMobile ? '100%' : '250px', // Adjusted width for mobile view
                                }}
                            >
                                <CardContent style={{
                                    paddingBottom: '15px',
                                }}>
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
                        </Stack>
                    ))}
                </Box>
                <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>Refferred Members</Typography>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }}> {/* Set minWidth to enable horizontal scrolling */}
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
                    </TableContainer>
                </div>
            </Box>
        </Box>


    );
};

export default NetWork;
