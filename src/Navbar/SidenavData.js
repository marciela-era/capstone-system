import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SavingsIcon from "@mui/icons-material/Savings";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyles";

export default function SidenavData({ handleDrawerClose }) {
  const classes = useStyles();
  const listItemData = [
    { label: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
    { label: "Master List", link: "/masterlist", icon: <BookIcon /> },
    { label: "Distribution List",  link: "/distributionlist",   icon: <FormatListBulletedOutlinedIcon /> },
    { label: "Work & Financial Plan", link: "/workandfinancialplan", icon: <EventNoteIcon /> },
    { label: "Budget", link: "/budget", icon: <SavingsIcon /> }
  ];
  return (
    <List>
      {listItemData.map((item, i) => (
        <Button
          size='small'
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
          key={i}>
          <ListItem
            exact
            component={NavLink}
            to={item.link}
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
}
