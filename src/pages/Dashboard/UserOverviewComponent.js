import React, { useState } from "react";
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { GeneralGraphComponent } from "./GraphComponent";
import { useEffect } from "react";
import { useStyles } from "./BodyStyles";
import { fakeArrayDataGenerator } from "./fakeArrayDataGenetator";
import { blue, red, yellow, green } from "@material-ui/core/colors";

export default function UserOverviewComponent() {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);

  const GraphData = [
    {
      id: "userGraph",
      type: "line",
      datasets: [
        {
          label: "Underweight",
          data: fakeArrayDataGenerator({ count: 12, digit: 12 }),
          backgroundColor: yellow[100],
          borderColor: blue["A200"],
          fill: true,
          tension: 1,
        },
        {
          label: "Healthy",
          data: fakeArrayDataGenerator({ count: 10, digit: 12 }),
          backgroundColor:  green[200],
          borderColor: red["A200"],
          fill: true,
          tension: 1,
        },
        {
          label: "Overweight",
          data: fakeArrayDataGenerator({ count: 11, digit: 12 }),
          backgroundColor: blue[300],
          borderColor: red["A200"],
          fill: true,
          tension: 1,
        },
        {
          label: "Obese",
          data: fakeArrayDataGenerator({ count: 12, digit: 12 }),
          backgroundColor: red[300],
          borderColor: red["A200"],
          fill: true,
          tension: 1,
        }
      ],
      xAxislabels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
    {
      id: "userPieGraph",
      type: "pie",
      datasets: [
        {
          label: "Current Month",
          data: fakeArrayDataGenerator({ count: 4, digit: 10 }),
          backgroundColor: [yellow[100], green[200], blue[300], red[300]],
          borderColor: blue["A200"],
          fill: true,
          tension: 0.5,
        },
      ],
      xAxislabels: ["UnderWeight", "Healthy", "Overweight", "Obesity"],
    },
  ];

  useEffect(() => {
    if (!fetched) {
      GraphData.map((item) =>
        GeneralGraphComponent({
          id: item.id,
          type: item.type,
          datasets: item.datasets,
          xAxislabels: item.xAxislabels,
        })
      );
      setFetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);
  return (
    <Box className={classes.section}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='h6'>
                Monthly Overview of Students' Nutritional Status
              </Typography>
            </CardContent>
            <CardContent>
              <canvas
                id='userGraph'
                className={classes.displayUserGraph}></canvas>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='h6'>
                Summary of Students' Nutritional Status
              </Typography>
            </CardContent>
            <CardContent>
              <canvas
                id='userPieGraph'
                className={classes.displayUserGraph}></canvas>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
