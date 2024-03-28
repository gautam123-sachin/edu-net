import React from 'react';
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';

const Info = ({ user }) => {
    console.log('user1234', user);
    const { address, phone, email, position, totalConnection, referralCode, totalVideo, totalEarning } = user;
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Personal Information
                            </Typography>
                            <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }} />
                            <Typography variant="body1" style={{ marginTop: 10 }}>
                                <strong>Address:</strong> {address ? address : 'N/A'}<br />
                                <strong>Phone:</strong> {phone ? phone : 'N/A'}<br />
                                <strong>Email:</strong> {email ? email : 'N/A'}<br />
                                <strong>Position:</strong> {position ? position : 'N/A'}<br />
                                <strong>Total connection:</strong> {totalConnection ? totalConnection : 'N/A'}<br />
                                <strong>Referral code:</strong> {referralCode ? referralCode : 'N/A'}<br />
                                <strong>Total Video:</strong> {totalVideo ? totalVideo : 'N/A'}<br />
                                <strong>Total Earning:</strong> {totalEarning ? totalEarning : 'N/A'}<br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Info;
