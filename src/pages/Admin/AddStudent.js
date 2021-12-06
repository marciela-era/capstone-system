import React, { useState } from 'react'
import { makeStyles, InputAdornment,  Button as MuiButton } from '@material-ui/core';
import Form from  "../../layouts/Form";
import { Grid } from '@material-ui/core';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import Controls from "../../controls/Controls";

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

const year = [
    { id: '2021', title: '' }
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
    { id: 'other', title: 'Other' },
]

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
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },

    addButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
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
    }
}))

const AddMenu = () => { 
    const classes = useStyles();
    const [values, setValues] = useState({
        id: null,
        menuName: null,
        sex: null,
        mob: null,
        dob: null,
        yob: null,
        mowm: null,
        dowm: null,
        yowm: null,
        age: null,
        agem: null,
        height: null,
        weight: null,
        bmi: null,
        nutritional_status: null,
        ps_number: null,
        parents: null,
        beneficiary: null
    })

    const [errors, setErrors] = useState({});

    function addName(e) {
        setValues({...values, menuName: e.target.value});
    }

    function addSex(e) {
        setValues({...values, sex: e.target.value});
    }

    function addMob(e) {
        setValues({...values, mob: e.target.value});
    }

    function addDob(e) {
        setValues({...values, dob: e.target.value});
    }

    function addYob(e) {
        setValues({...values, yob: e.target.value});
    }

    function addMowm(e) {
        setValues({...values, mowm: e.target.value});
    }

    function addDowm(e) {
        setValues({...values, dowm: e.target.value});
    }

    function addYowm(e) {
        setValues({...values, yowm: e.target.value});
    } 

    function addAge(e) {
        setValues({...values, age: e.target.value});
    }
    
    function addAgem(e) {
        setValues({...values, agem: e.target.value});
    }

    function addHeight(e) {
        setValues({...values, height: e.target.value});
    }

    function addWeight(e) {
        setValues({...values, weight: e.target.value});
    }

    function addBmi(e) {
        setValues({...values, bmi: e.target.value});
    }

    function AddNutritionalstatus(e) {
        setValues({...values, nutritional_status: e.target.value});
    }
    
    function addPsnumber(e) {
        setValues({...values, ps_number: e.target.value});
    }

    function addParents(e) {
        setValues({...values, parents: e.target.value});
    }

    function addBeneficiary(e) {
        setValues({...values, beneficiary: e.target.value});
    }


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('menuName' in fieldValues)
            temp.menuName = fieldValues.menuName ? "" : "This field is required."
       
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    } 
    

    function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.ADDMENU).create(values)
            .then(() =>{
                refreshPage()
            })
            .catch(err => {
                alert("Menu already exists!")
            })
        }
    }

     function refreshPage() {
         
         window.location.reload(false);
     };

    

    return (
        <Form onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
            <Controls.Input
                        variant = 'outlined'
                        type = "text"
                        label = "Student Name"
                        name = "menuName" 
                        value = {values.menuName}
                        onChange = {addName}
                        error = {errors.menuName}
                       
                    /> 
            
            <Controls.Select
                        variant = 'outlined'
                        name="mob"
                        label="Date of Birth | Month"
                        value={values.mob}
                        onChange={addMob}
                        options={months}
                        error={errors.mob}
                    />

            <Controls.DatePicker
                        variant = 'outlined'
                        name="mowm"
                        label="Date of Weighing and Measuring"
                        value={values.mowm}
                        onChange={addMowm}
                        options={months}
                    />

            <Controls.Input
                variant = 'outlined'
                type = "text"
                label = "Parents"
                name = "parents"
                value = {values.parents}
                onChange = {addParents}
                error = {errors.parents}
                InputProps = {{
                    startAdornment : <InputAdornment
                    position = "start"></InputAdornment>
                }}
            />
          
          <Controls.Select
                label = "Nutritional Status"
                name = "nutritional_status"
                value = {values.nutritional_status}
                onChange = {AddNutritionalstatus}
                error = {errors.nutritional_status}
                options={statusItems}  
            />

<Controls.Select
                label = "Suggested Foods To Eat"
                name = "dowm"
                value = {values.dowm}
                onChange = {addDowm}
                error = {errors.dowm}
                options={Foods}  
            />

          
    </Grid> 
                    <Grid item xs={3}>

                    <Controls.Select
                        variant = 'outlined'
                        name="sex"
                        label="Sex"
                        value={values.sex}
                        onChange={addSex}
                        options={genderItems}
                        error={errors.sex}
                    />

<Controls.Select
                        variant = 'outlined'
                        name="dob"
                        label="Date of Birth | Day"
                        value={values.dob}
                        onChange={addDob}
                        options={days}
                        error={errors.dob}
                    /> 

            <Controls.Input
                        disabled
                        variant = 'outlined'
                        type = "number"
                        label = "Age in Years"
                        name = "age" 
                        value = {values.age = 2021 - values.yob}
                        onChange = {addAge}
                        error = {errors.age}
                
                    /> 
            
            <Controls.Input
                variant = 'outlined'
                type = "number"
                label = "Height (cm)"
                name = "height"
                value = {values.height}
                onChange = {addHeight}
                error = {errors.height}
              
            />

  

<Controls.Input
                variant = 'outlined'
                type = "text"
                label = "4P's Number"
                name = "ps_number"
                value = {values.ps_number}
                onChange = {addPsnumber}
                error = {errors.ps_number}
               
/>
<MuiButton className = {classes.addStudentButton}
                type = "submit"
                size = "large"
                >Submit</MuiButton>
                
            
                    </Grid>

                    <Grid item xs={3}>
     
                    <Controls.Input
                            disabled
                            variant = 'outlined'
                            type = "number"
                            label = "BMI"
                            name = "bmi"
                            value = { values.bmi = (values.weight / (values.height * values.height)) * 10000}
                            onChange = {addBmi}
                            error = {errors.bmi}
                           
                        />
                   
                <Controls.Select
                        variant = 'outlined'
                        name="yob"
                        label="Date of Birth | Year"
                        value={values.yob}
                        onChange={addYob}
                        options={years}
                        error={errors.yob}
                    /> 

                    <Controls.Input
                        disabled
                        variant = 'outlined'
                        type = "number"
                        label = "Age in Months"
                        name = "agem" 
                        value = {values.agem = values.age * 12}
                        onChange = {addAgem}
                        error = {errors.agem}
                       
                    /> 

                    <Controls.Input
                variant = 'outlined'
                type = "number"
                label = "Weight (kg)"
                name = "weight"
                value = {values.weight}
                onChange = {addWeight}
                error = {errors.weight}
              
            />
            

<Controls.Select
            
                label = "Beneficiary"
                name = "beneficiary"
                value = {values.beneficiary}
                onChange = {addBeneficiary}
                error = {errors.beneficiary}
                options = {beneficiary}
              
            />
                <MuiButton className = {classes.addStudentButton1}
                type = "cancel"
                size = "large"
                onClick = {refreshPage}
                >Cancel</MuiButton>
                

  
            
                </Grid>
            </Grid>
        </Form>
    )
}

export default AddMenu;