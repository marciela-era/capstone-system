import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { getCookie, parsedJwtReturn } from '../pages/cookieReader';
import { DisconnectionLogout, UserLogout } from '../pages/Logout';
import { ORIGIN_URL } from '../api';

export const useStyles = makeStyles(theme => ({
  addButton: {        
      backgroundColor: '#f3b33d',
      color: '#000',
      margin: theme.spacing(1),
      '& .MuiButton-label': {
          textTransform: 'none'
      },
      '&:hover': {
          backgroundColor: '#f3b33d',
      }
  }
}))

const Navbar = () => {
    const location = useLocation();
    function setLoginUsername(){
        let cToken = getCookie("token");
    
        if (cToken === "" || cToken === "undefined"){
            if (window.location.href == (ORIGIN_URL + 'login')){
                return(
                    ""
                );
            }else{
                return (                                   
                    <MuiButton
                        onClick = {(e) => window.location.href='/login'}
                        variant = 'outlined'
                        className = "button">
                            Login
                    </MuiButton>                
                );   
            }         
        }else{
            DisconnectionLogout();
            
            let appender = "";
            switch(parsedJwtReturn().roles){
                case "[ROLE_ADMIN]":
                    appender = "[ADMIN]";
                    break;
                case "[ROLE_CASHIER]":
                    appender = "[CASHIER]";
                    break;
                default:
                    appender = "";
                    break;
            }
            return(
                <>
                    <div >
                        <h4 className='navbar-text'>{appender} {parsedJwtReturn().sub} &nbsp;&nbsp;</h4>
                        <MuiButton
                            onClick = {(e) => UserLogout()}
                            variant = 'outlined'
                            className = "button">
                                Logout
                        </MuiButton>
                        
                    </div>
                </>
                );
        }
    }

    return (
        <nav
            className='navbar fixed-top navbar-custom'
            style={location.pathname === '/' ? { background: 'none' } : {}}
        >
            <div className='container navbar-brand navbar-text icon '>
              
                    Feeding Program Management Information System
                {setLoginUsername()}
            </div>

            
        </nav>
    );
};

export default Navbar;
// import React from "react";
// import {
//   AppBar,
//   Box,
//   Hidden,
//   IconButton,
//   Toolbar,
//   Typography,
// } from "@material-ui/core";
// import Profile from "./Navtabs/profile";
// import Notification from "./Navtabs/notification";
// import { useStyles } from "./HeaderStyles";
// import Messages from "./Navtabs/Messages";
// import MenuIcon from "@material-ui/icons/Menu";

// export default function Navbar({ handleDrawerOpen }) {
//   const classes = useStyles();

//   return (
//     <AppBar position='fixed'>
//       <Toolbar className={classes.toolbar}>
//         <Typography variant='h5' className={classes.logo}>
//           {"Feeding Program Management Information System"}
//         </Typography>
//         <Hidden smDown>
//           <Box style={{ display: "flex" }}>
//             <Notification />
//             <Messages />
//             <Profile />
//           </Box>
//         </Hidden>
//         <Hidden mdUp>
//           <IconButton color='inherit' onClick={handleDrawerOpen}>
//             <MenuIcon />
//           </IconButton>
//         </Hidden>
//       </Toolbar>
//     </AppBar>
//   );
// }
