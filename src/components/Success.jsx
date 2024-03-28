import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const Success = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardContent className="text-center">
                    <Typography variant="h5" component="h2" gutterBottom>
                            <CheckCircle className="text-success mb-2" style={{ fontSize: 30 }} />
                            Payment successful
                        </Typography>

                        <Typography variant="body1">
                            Your membership is now active. Welcome to the community!
                        </Typography>
                        <ol className="list-decimal list-inside space-y-4 mt-4">
                            <li>
                                Access Premium Content: Dive into our exclusive collection of premium content, including articles,
                                videos, and tutorials. Expand your knowledge and stay ahead of the curve.
                            </li>
                            <li>
                                Engage with Exclusive Community Features: Connect with like-minded individuals in our thriving
                                community. Participate in discussions, share your experiences, and collaborate on projects.
                            </li>
                            <li>
                                Enjoy Special Discounts and Offers: As a valued member, you'll have access to exclusive discounts
                                and offers from our partners. Take advantage of these deals to enhance your learning experience.
                            </li>
                        </ol>
                        <Button fullWidth variant="contained" color="primary" className="mt-4" component={Link} to={'/dashboard'}>
                            Go to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Success;
