import React from 'react';
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';

const Info = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card elevation={3} >
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Personal Information
                        </Typography>
                        <Divider style={{ fontWeight: 'bold', borderColor: '#030404' }}/>
                        <Typography variant="body1" style={{ marginTop: 10 }}>
                            <strong>Address:</strong> [Address Here]<br />
                            <strong>Phone:</strong> [Phone Number Here]<br />
                            <strong>Email:</strong> [Email Address Here]<br />
                            <strong>Postion:</strong> [Left or Right]<br />
                            <strong>Total connection:</strong> [Total Connection]<br />
                            <strong>Refernal code :</strong> [Refernal Code]<br /> 
                            <strong>Total Video:</strong> [Total Video]<br />
                            <strong>Total Earing:</strong> [Total Earning]<br />
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Info;
