
import { Card, CardContent, Typography, Divider } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  header: {
    textTransform: "uppercase"
  }
}));

function CardSummary({ title, value, footer }) {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            className={classes.header}
            color="textPrimary"
          >
            {title}
          </Typography>
          <Divider />
          <Typography variant="h3" color="textPrimary">
            {value}
          </Typography>
          <div>{footer}</div>
        </CardContent>
      </Card>
    </>
  );
}

export { CardSummary };
