import { Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react"
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            label: "Success Count",
            stack: "Stack 0",
            data: [12, 19, 6, 77, 76, 67, 7, 6, 76, 6, 6, 7, 7,],
            backgroundColor: "green"
        },
    ]
};

const options = {
    scales: {
        xAxes: [
            {
                stacked: true
            }
        ],
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
};

const datapie = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            data: [300, 50, 100, 20, 80, 200],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#db3d44",
                "#4257b2",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#db3d44",
                "#4257b2",
                "#36A2EB"
            ]
        }
    ]
};

const AdminDashboard = () => {
    return (
        <div>
            <Grid>
                <Grid container spacing={3}>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    // className={classes.header}
                                    color="textPrimary"
                                >
                                    Total Member
                                </Typography>
                                <Divider />
                                <Typography variant="h3" color="textPrimary">
                                    22
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    // className={classes.header}
                                    color="textPrimary"
                                >
                                    Total credit
                                </Typography>
                                <Divider />
                                <Typography variant="h3" color="textPrimary">
                                    27
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    // className={classes.header}
                                    color="textPrimary"
                                >
                                    Total Debit
                                </Typography>
                                <Divider />
                                <Typography variant="h3" color="textPrimary">
                                    21
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    // className={classes.header}
                                    color="textPrimary"
                                >
                                    Total Remaining
                                </Typography>
                                <Divider />
                                <Typography variant="h3" color="textPrimary">
                                    25
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    //    className={classes.header}
                                    color="textPrimary">
                                    Active
                                </Typography>
                                <Divider />
                                <Paper>
                                    <Bar data={data} options={options} />
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    //    className={classes.header}
                                    color="textPrimary">
                                    Active
                                </Typography>
                                <Divider />
                                <Paper>
                                    <Pie data={datapie} />
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default AdminDashboard;