import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { createAPIEndpoint, ENDPOINTS } from '../../api/index'
import { Button as MuiButton, makeStyles, InputAdornment, Toolbar} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Paper from '@material-ui/core/Paper'

export default function PrinterWrapper({ children }) {
    const [printFile, setPrintFile] = useState([]);

    const useStyles = makeStyles(theme => ({
    fileButton: {
        backgroundColor: '#A3E4D7',
        width: '150px',
        height: '40px',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#FCF3CF',
        },
        body: {
            overflow: 'hidden', /* Hide vertical scrollbar */
            overflowX: 'hidden' /* Hide horizontal scrollbar */
          }
    }
    }))

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.MENUITEM).fetchAll()
        .then(res => {
            setPrintFile(res.data.sort((a, b) => a.timeM > b.timeM ? 1:-1))  
                })
                .catch(err => console.log(err))
        }, [])

    const linkToPrint = () => {
        return (
            <MuiButton
            variant='outlined'
            className={classes.fileButton} 
            startIcon={<LocalPrintshopOutlinedIcon />} >  Print File                
    </MuiButton>
        )
    }
    const componentRef = useRef();
    const classes = useStyles();
    return (
        <>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <div ref={componentRef}  id="container2">
                {children}
                <TableContainer component = {Paper}>  
        <TableHead>
            <TableRow>
                <TableCell align='center'>No.</TableCell>
                <TableCell align='center'>Name (First|Middle|Last)</TableCell>
                <TableCell align='center'>Sex</TableCell>
                <TableCell align='center'>Date of Birth (MM/DD/YYYY)</TableCell>
                <TableCell align='center'>Date of Weighing/Measuring</TableCell>
                <TableCell align='center'>Age in Years / Months</TableCell>
                <TableCell align='center'>Weight</TableCell>
                <TableCell align='center'>Height</TableCell>
                <TableCell align='center'>BMI</TableCell>
                <TableCell align='center'>Nutritional Status</TableCell>
                <TableCell align='center'>4Ps ID Number</TableCell>
                <TableCell align='center'>Parents Name</TableCell>
                <TableCell align='center'>SBFP Beneficiary?</TableCell>
                <TableCell align='center'>Suggested Foods To Eat</TableCell>
            </TableRow>
        </TableHead>
    
        <TableBody>
            { printFile.map((item, idx) => (
                <TableRow key={idx}>
                    <TableCell align='center'> {item.id} </TableCell>
                    <TableCell align='center'> {item.menuName} </TableCell>
                    <TableCell align='center'> {item.sex} </TableCell>
                    <TableCell align='center'> {item.mob}/{item.dob}/{item.yob} </TableCell>
                    <TableCell align='center'> {item.mowm} </TableCell>
                    <TableCell align='center'> {item.age} / {item.agem} </TableCell>
                    <TableCell align='center'> {item.weight}kgs </TableCell>
                    <TableCell align='center'> {item.height} </TableCell>
                    <TableCell align='center'> {item.bmi} </TableCell>
                    <TableCell align='center'> {item.nutritional_status} </TableCell>
                    <TableCell align='center'> {item.ps_number} </TableCell>
                    <TableCell align='center'> {item.parents} </TableCell>
                    <TableCell align='center'> {item.beneficiary} </TableCell>
                    <TableCell align='center'> {item.dowm} </TableCell>

                </TableRow>
                 ))}
                 </TableBody>
              </TableContainer>

    </div>   
</>
    );
}
