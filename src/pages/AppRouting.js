import React, {useState} from 'react';
import Login from './Login';
import Navbar from '../Navbar/Navbar';
import Sidenav from "../Navbar/Sidenav";
import Admin from './Admin';
import Dashboard from './Dashboard/Dashboard'
import { useStyles } from "../Navbar/HeaderStyles";
import { Box } from "@material-ui/core";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function AppRouting() {
    const classes = useStyles();
  
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerOpen = () => {
      setMobileOpen(!mobileOpen);
    };
    const handleDrawerClose = () => {
      setMobileOpen(false);
  
      
    };

return (
        <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/login' component={Login} />
              <div>

              <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
             <Box className={classes.wrapper}>
                <Route exact path='/masterlist' component={Admin} />
                <Route exact path='/dashboard' component={Dashboard} />
                </Box>
                </div>
            </Switch>
            
        </Router>

    );
}
