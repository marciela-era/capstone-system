import { useEffect , useState, useRef} from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { Button as MuiButton, makeStyles, InputAdornment, Toolbar} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../layouts/Popup';
import AddStudent from './AddStudent';
import PrintFile from './PrintFile';
import { getCookie, parsedJwtReturn } from '../cookieReader';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone'; 
import PageHeader from "../../controls/PageHeader";
import Controls from "../../controls/Controls";
import { Grid } from '@material-ui/core';
import Form from  "../../layouts/Form";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import useForm from "../../controls/useForm";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

const months = [
    { id: '1', title: 'January' },
    { id: '2', title: 'February' },
    { id: '3', title: 'March' },
    { id: '4', title: 'April' },
    { id: '5', title: 'May' },
    { id: '6', title: 'June' },
    { id: '7', title: 'July' },
    { id: '8', title: 'August' },
    { id: '9', title: 'September' },
    { id: '10', title: 'October' },
    { id: '11', title: 'November' },
    { id: '12', title: 'December' }
]

const days = [
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
    { id: '4', title: '4' },
    { id: '5', title: '5' },
    { id: '6', title: '6' },
    { id: '7', title: '7' },
    { id: '8', title: '8' },
    { id: '9', title: '9' },
    { id: '10', title: '10' },
    { id: '11', title: '11' },
    { id: '12', title: '12' },
    { id: '13', title: '13' },
    { id: '14', title: '14' },
    { id: '15', title: '15' },
    { id: '16', title: '16' },
    { id: '17', title: '17' },
    { id: '18', title: '18' },
    { id: '19', title: '19' },
    { id: '20', title: '20' },
    { id: '21', title: '21' },
    { id: '22', title: '22' },
    { id: '23', title: '23' },
    { id: '24', title: '24' },
    { id: '25', title: '25' },
    { id: '26', title: '26' },
    { id: '27', title: '27' },
    { id: '28', title: '28' },
    { id: '29', title: '29' },
    { id: '30', title: '30' },
    { id: '31', title: '31' }
  
]

const years = [
    { id: '1999', title: '1999' },
    { id: '2000', title: '2000' },
    { id: '2001', title: '2001' },
    { id: '2002', title: '2002' },
    { id: '2003', title: '2003' },
    { id: '2004', title: '2004' },
    { id: '2005', title: '2005' },
    { id: '2006', title: '2006' },
    { id: '2007', title: '2007' },
    { id: '2008', title: '2008' },
    { id: '2009', title: '2009' },
    { id: '2010', title: '2010' },
    { id: '2011', title: '2011' },
    { id: '2012', title: '2012' },
    { id: '2013', title: '2013' },
    { id: '2014', title: '2014' },
    { id: '2015', title: '2015' },
    { id: '2016', title: '2016' },
    { id: '2017', title: '2017' },
    { id: '2018', title: '2018' },
    { id: '2019', title: '2019' },
    { id: '2020', title: '2020' },
    { id: '2021', title: '2021' },
    { id: '2022', title: '2022' },
    { id: '2023', title: '2023' },
    { id: '2024', title: '2024' },
    { id: '2025', title: '2025' },
    { id: '2026', title: '2026' },
    { id: '2027', title: '2027' },
    { id: '2028', title: '2028' },
    { id: '2029', title: '2029' },
    { id: '2030', title: '2030' },
    { id: '2031', title: '2031' }
]

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' }]

const beneficiary = [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' }
]

const statusItems = [
    { id: 'underweight', title: 'Underweight | (Below 18.5)' },
    { id: 'healthy',     title: 'Healthy  |  (18.5 – 24.9)' },
    { id: 'overweight',  title: 'Overweight | (25.0 – 29.9)' },
    { id: 'obesity',     title: 'Obesity  |  (30.0 and above)' }
]

const Foods = [
    { id: 'Potatoes, bread, rice, pasta or other starchy carbohydrates. Eating variety of fruit and vegetables every day. Drinking plenty of water.', title: 'For Underweight Students' },
    { id: 'Whole grains, vegetables, whole fruits (not fruit juices), nuts, seeds, beans, and other healthful sources of protein. Drink water or other beverages that are naturally calorie-free.',  title: 'For Healthy Students' },
    { id: 'Fruits and vegetables and starchy foods. Some milk and dairy foods. Some meat, fish, eggs, beans and other non-dairy sources of protein. Just small amounts of food and drinks that are high in fat and sugar',  title: 'For Overweight Students' },
    { id: 'Fruit and vegetables. Some meat, fish, eggs, beans and other non-dairy sources of protein. Just small amounts of food and drinks that are high in fat and sugar',  title: 'For Obese Students' },
]

const useStyles = makeStyles(theme => ({
    
    tableHead: {
        color: theme.palette.primary.main,
        backgroundColor: '#FFFFF0',
    },

    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    addButton: {
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
        }
    },

    addStudentButton: {
        backgroundColor: '#239B56',
        width: '200px',
        height: '40px',
        color: '#000',
        marginLeft: '1rem',
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#FCF3CF',
        }
    },

    addStudentButton1: {
        backgroundColor: '#B9770E',
        width: '200px',
        height: '40px',
        color: '#000',
        marginLeft: '1rem',
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#FCF3CF',
        }
    },

    otherButtons: {
        backgroundColor: '#AED6F1',
        width: '150px',
        height: '40px',
        color: '#000',
        margin: theme.spacing(.5),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#FCF3CF',
        }
    },

    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '90%',
        margin: '0 0 0 20px'
    },
    newButton: {
        position: 'absolute',
        right: '2px'
    }
}))

function refreshPage() {
    window.location.reload();
};

export default function Admin(props) {
    
    const [menuItems, setMenuItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    const [openPopup, setOpenPopup] = useState(false);
    const [openEditPopup, setEditOpenPopup] = useState(false);
    const [openPrintPopup, setOpenPrintPopup] = useState(false);

    const [tempID, setTempID] = useState(0);
    const [tempMenuName, setTempMenuName] = useState("");
    const [tempSex, setTempSex] = useState("");
    const [tempMob, setTempMob] = useState("");
    const [tempDob, setTempDob] = useState("");
    const [tempYob, setTempYob] = useState("");
    const [tempMowm, setTempMowm] = useState("");
    const [tempDowm, setTempDowm] = useState("");
    const [tempYowm, setTempYowm] = useState("");
    const [tempAge, setTempAge] = useState("");
    const [tempAgem, setTempAgem] = useState("");
    const [tempHeight, setTempHeight] = useState("");
    const [tempWeight, setTempWeight] = useState("");
    const [tempBmi, setTempBmi] = useState("");
    const [tempNutritionalstatus, setTempNutritionalstatus] = useState("");
    const [tempPsnumber, setTempPsnumber] = useState("");
    const [tempParents, setTempParents] = useState("");
    const [tempBeneficiary, setTempBeneficiary] = useState("");
    const { values, setValues } = useForm();

    const classes = useStyles();

    const prePopulateEditingRow = (menuModel) =>{
        setEditOpenPopup(true);
        createAPIEndpoint(ENDPOINTS.SINGLEMENUITEM).fetchById(menuModel.id, menuModel)
        .then(res=>{
            setTempID(res.data.id)
            setTempMenuName(res.data.menuName);
            setTempSex(res.data.sex);
            setTempMob(res.data.mob);
            setTempDob(res.data.dob);
            setTempYob(res.data.yob);
            setTempMowm(res.data.mowm);
            setTempDowm(res.data.dowm);
            setTempYowm(res.data.yowm);
            setTempAge(res.data.age);
            setTempAgem(res.data.age);
            setTempHeight(res.data.height);
            setTempWeight(res.data.weight);
            setTempBmi(res.data.bmi);
            setTempNutritionalstatus(res.data.nutritional_status);
            setTempPsnumber(res.data.ps_number);
            setTempParents(res.data.parents);
            setTempBeneficiary(res.data.beneficiary);

        }).catch((error) => console.log(error))
    }

    function addName(e) {
        setTempMenuName(e.target.value)
    }

    function addSex(e) {
        setTempSex(e.target.value);
    }

    function addMob(e) {
        setTempMob(e.target.value);
    }

    function addDob(e) {
        setTempDob(e.target.value);
    }

    function addYob(e) {
        setTempYob(e.target.value);
    }

    function addMowm(e) {
        setTempMowm(e.target.value);
    }

    function addDowm(e) {
        setTempDowm(e.target.value);
    }

    function addYowm(e) {
        setTempYowm(e.target.value);
    }

    function addAge(e) {
        setTempAge(e.target.value);
    }

    function addAgem(e) {
        setTempAgem(e.target.value);
    }
    
    function addHeight(e) {
        setTempHeight(e.target.value);
    }

    function addWeight(e) {
        setTempWeight(e.target.value);
    }

    function addBmi(e) {
        setTempBmi(e.target.value);
    }

    function addNutritionalstatus(e) {
        setTempNutritionalstatus(e.target.value);
    }
    
    function addPsnumber(e) {
        setTempPsnumber(e.target.value);
    }

    function addParents(e) {
        setTempParents(e.target.value);
    }

    function addBeneficiary(e) {
        setTempBeneficiary(e.target.value);
    }

    const updateMenuItems = (id) => {
        let updatedMenuModel ={
            id: tempID,
            menuName: tempMenuName,
            sex: tempSex,
            mob: tempMob,
            dob: tempDob,
            yob: tempYob,
            mowm: tempMowm,
            dowm: tempDowm,
            yowm: tempYowm,
            age: (2021 - tempYob),
            agem: ((2021 - tempYob) * (12)),
            height: tempHeight,
            weight: tempWeight,
            bmi:  ((tempWeight / (tempHeight * tempHeight)) * 10000),
            nutritional_status: tempNutritionalstatus,
            ps_number: tempPsnumber,
            parents: tempParents,
            beneficiary: tempBeneficiary,
            
        }
        createAPIEndpoint(ENDPOINTS.UPDATEMENU).update(id, updatedMenuModel)
        refreshPage();
    }

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.MENUITEM)
            .fetchAll()
            .then((result) => {
                setMenuItems(result.data);
                setSearchList(result.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        let x = [...menuItems];
        x = x.filter((y) => {
          return y.menuName.toLowerCase().includes(searchKey.toLocaleLowerCase());
        });
        setSearchList(x);
      }, [searchKey, menuItems]);
    

    const deleteStudent = (index, id) => {
        let x = { ...values };
    
         if (window.confirm("Are you sure you want to remove this item?")) {
            setValues({ ...x});
            menuItems.find((item) => item.id === id);
            let order = { id }
            createAPIEndpoint(ENDPOINTS.DELETEMENU).delete(id, order);
         }
            window.location.reload();
      }
    
      
    if (getCookie("token") === "" || getCookie("token") === "undefined"){
        alert("Please Sign-in as Admin");
        window.location.href = '/login';
    }else if(parsedJwtReturn().roles !== "[ROLE_ADMIN]"){
        alert("Access Denied: Only Admins allowed");
        window.location.href = '/';       
    }else{
        return (
        <>
            <Paper className={classes.pageContent}>
                <PageHeader
                    title="Master List"
                    subTitle=" Beneficiaries for School-Based Feeding Program (SBFP)"
                    icon={<GroupTwoToneIcon fontSize="large" />}
                />

            <Toolbar>
                <Controls.Input
                    label="Search Student"
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    InputProps=
                    {{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                />
    
                <MuiButton
                        onClick={() =>  setOpenPopup(true) }
                        variant='outlined'
                        className={classes.addButton} 
                        startIcon={<AddIcon />} >  Add Student                
                </MuiButton>

                <MuiButton
                        onClick={() =>  setOpenPrintPopup(true) }
                        variant='outlined'
                        className={classes.otherButtons} 
                        startIcon={<LocalPrintshopOutlinedIcon />} >  Print File                
                </MuiButton>
                    
             </Toolbar>
        
    
    <TableContainer>  
        <TableHead className={classes.tableHead} >
            <TableRow className="tableHead">
                <TableCell align='center'>Actions</TableCell> 
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
                <TableCell align='center' colSpan = {1}>Suggested Foods to Eat</TableCell>
                <TableCell align='center'></TableCell>
             
            </TableRow>
        </TableHead>
    
        <TableBody>
        {searchList.map((item, idx) => (
                <TableRow key={idx}>
                     <TableCell align='center'>
                       
                       <Controls.ActionButton
                           color="primary"
                           onClick = {() => prePopulateEditingRow(item) }>
                           <EditOutlinedIcon fontSize="small" />
                       </Controls.ActionButton>

                       <Controls.ActionButton
                           color="secondary"
                           onClick = {() => deleteStudent(idx, item.id) }>
                           <CloseIcon fontSize="small" />
                       </Controls.ActionButton>
                   
                                   </TableCell>        
                    <TableCell align='center'> {item.id} </TableCell>
                    <TableCell align='center'> {item.menuName} </TableCell>
                    <TableCell align='center'> {item.sex} </TableCell>
                    <TableCell align='center'> {item.mob}/{item.dob}/{item.yob} </TableCell>
                    <TableCell align='center'> {item.mowm} </TableCell>
                    <TableCell align='center'> {item.age} / {item.agem} </TableCell>
                    <TableCell align='center'> {item.weight}kgs </TableCell>
                    <TableCell align='center'> {item.height}cm </TableCell>
                    <TableCell align='center'> {item.bmi} </TableCell>
                    <TableCell align='center'> {item.nutritional_status} </TableCell>
                    <TableCell align='center'> {item.ps_number} </TableCell>
                    <TableCell align='center'> {item.parents} </TableCell>
                    <TableCell align='center'> {item.beneficiary} </TableCell>
                    <TableCell align='center' colSpan = {2}> {item.dowm} </TableCell>
                    <TableCell align='center'></TableCell>
                </TableRow>
            ))}
       </TableBody>
    </TableContainer>
</Paper>

        
    <Popup title = "Add New Student" openPopup = {openPopup} setOpenPopup = {setOpenPopup}> <AddStudent /> </Popup>
    <Popup title = "Print Student File" openPopup = {openPrintPopup} setOpenPopup = {setOpenPrintPopup}> <PrintFile /> </Popup>
    <Popup title = "Edit Student Information" openPopup = {openEditPopup} setOpenPopup = {setEditOpenPopup}>
    
    <Form>
        <Grid container>
            <Grid item xs={6}>

                <Controls.Input
                    variant = 'outlined'
                    type = "text"
                    label = "New Student Name"
                    name = "menuName" 
                    value = {tempMenuName}
                    onChange = {addName}
                />

                <Controls.Select
                    label = "New Date of Birth | Month"
                    name = "mob" 
                    value = {tempMob}
                    onChange = {addMob}
                    options={months} 
                />

                <Controls.DatePicker
                    label = "New Date of Weighing and Measuring"
                    name = "mowm"
                    value = {tempMowm}
                    onChange = {addMowm}
               />

                <Controls.Input
                    variant = 'outlined'
                    type = "text"
                    label = "New Parents Name"
                    name = "parents" 
                    value = {tempParents}
                    onChange = {addParents}
                
                />

                <Controls.Select
                    label = "New Nutritional Status"
                    name = "nutritional_status" 
                    value = {tempNutritionalstatus}
                    onChange = {addNutritionalstatus}
                    options={statusItems} 
                />

<Controls.Select
                    label = "New Suggested Foods To Eat"
                    name = "dowm" 
                    value = {tempDowm}
                    onChange = {addDowm}
                    options={Foods} 
                />

         

            </Grid>
                  
            <Grid item xs={3}>

                <Controls.Select
                    variant = 'outlined'
                    label = "New Sex"
                    name = "sex"
                    value = {tempSex}
                    onChange = {addSex}
                    options={genderItems}
                />

                <Controls.Select
                    label = "New Date of Birth | Day"
                    name = "dob" 
                    value = {tempDob}
                    onChange = {addDob}
                    options={days} 
                />


                {/* <Controls.Input
                    variant = 'outlined'
                    type = "number"
                    label = "New Age in Years"
                    name = "age" 
                    value = {tempAge}
                    onChange = {addAge}
                /> */}

                <Controls.Input
                    disabled
                    variant = 'outlined'
                    type = "text"
                    label = "New Age in Years"
                   // name = "age"
                    value = { 2021 - tempYob}
                   // onChange = {addAge}
                    
                />

                <Controls.Input
                    hidden
                    variant = 'outlined'
                    type = "text"
                    label = "New Age in Years"
                    name = "age"
                //    value = {tempAge}
                   onChange = {addAge}   
                />
            
                <Controls.Input
                    variant = 'outlined'
                    type = "number"
                    label = "New Height"
                    name = "height"
                    value = {tempHeight}
                    onChange = {addHeight}
                />

                <Controls.Input
                    variant = 'outlined'
                    type = "text"
                    label = "New 4P's Number"
                    name = "ps_number"
                    value = {tempPsnumber}
                    onChange = {addPsnumber}
                />

<MuiButton
                className = {classes.addStudentButton}
                size = "large"
                onClick={() => updateMenuItems(tempID)}
                >Save
            </MuiButton>

           
            </Grid>

            <Grid item xs={3}>
                <Controls.Input
                    disabled
                    variant = 'outlined'
                    type = "text"
                    label = "New BMI"
                   // name = "bmi"
                    value = { (tempWeight / (tempHeight * tempHeight)) * 10000}
                   // onChange = {addBmi}
                    
                />
                <Controls.Input
                    hidden
                    variant = 'outlined'
                    type = "text"
                    label = "New BMI"
                    name = "bmi"
                //    value = {tempBmi}
                   onChange = {addBmi}   
                />
 
                <Controls.Select
                    label = "New Date of Birth | Year"
                    name = "yob" 
                    value = {tempYob}
                    onChange = {addYob}
                    options={years} 
                />

                {/* <Controls.Input
                    variant = 'outlined'
                    type = "number"
                    label = "New Age in Months"
                    name = "agem" 
                    value = {tempAgem}
                    onChange = {addAgem}
                /> */}

                <Controls.Input
                    disabled
                    variant = 'outlined'
                    type = "text"
                    label = "New Age in Months"
                   // name = "agem"
                    value = { (2021 - tempYob) * 12 }
                   // onChange = {addAgem}
                    
                />

                <Controls.Input
                    hidden
                    variant = 'outlined'
                    type = "text"
                    label = "New Age in Months"
                    name = "agem"
                //    value = {tempAgem}
                   onChange = {addAgem}   
                />


                <Controls.Input
                    variant = 'outlined'
                    type = "number"
                    label = "New Weight"
                    name = "weight" 
                    value = {tempWeight}
                    onChange = {addWeight}
                />

                <Controls.Select
                    label = "New Beneficiary"
                    name = "beneficiary"
                    value = {tempBeneficiary}
                    onChange = {addBeneficiary}
                    options = { beneficiary }
                />

<MuiButton 
            className = {classes.addStudentButton1}
            size = "large"
            onClick = {()=> setEditOpenPopup(false)}
            >Cancel
            </MuiButton>

            </Grid>
        </Grid>   
    </Form>
</Popup> 

</>
       
);
}
};
