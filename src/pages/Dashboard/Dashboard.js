import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "./CommonComponent";
import { DisplayCardGraph } from "./GraphComponent";
import { CardContent } from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  fakeArrayDataGenerator,
  randomValueGenerator,
} from "./fakeArrayDataGenetator";
import {
  amber,
  green,
  indigo,
  lightGreen,
  red,
} from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import UserOverviewComponent from "./UserOverviewComponent";
import ListSection from "./ListSection";

export default function Dashboard() {
  
  return (
    <Box>
      <UserOverviewComponent />
    </Box>
  );
}
