import React, { Fragment, useState } from "react";
import "../Css/signup.css"
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import profile from "../Profile/images.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    small: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    large: {
        width: theme.spacing(35),
        height: theme.spacing(35),
    },
}));

const Signup = () => {

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [code, setcode] = useState("");
    const [dob, setdob] = useState("");
    const [mobile, setmobile] = useState("");
    const [gender, setgender] = useState("");
    const [tele, settele] = useState("");
    const [address, setaddress] = useState("");
    const [blood, setblood] = useState("");
    const [height, setheight] = useState("");
    const [weight, setweight] = useState("");

    const classes = useStyles();

    const Erase = () => {
        setfname("");
        setlname("");
        setemail("");
        setcode("");
        setdob("");
        setmobile("");
        setgender("");
        settele("");
        setaddress("");
        setblood("");
        setheight("");
        setweight("");
    }

    const Register = (e) => {

        e.preventDefault();

        if (email.includes("@") && code.length >= 8 && mobile.length === 10) {
            fetch("https://tasksubmission-back.herokuapp.com/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    Firstname: fname,
                    Lastname: lname,
                    Email: email,
                    Password: code,
                    Dob: dob,
                    Gender: gender,
                    Mobile: mobile,
                    Tele: tele,
                    Address: address,
                    Blood: blood,
                    Height: height,
                    Weight: weight
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.data) {
                        Erase();
                        alert("your Profile has been registered , login to continue !!");
                        window.location.href = "https://task-submission-fs.netlify.app/"
                    }
                    else if (data.already) {
                        alert("you already having an account...please login to continue !!");
                        window.location.href = "https://task-submission-fs.netlify.app/"
                    }
                })
        } else {
            Erase();
            alert("Email,Password and Mobile fields should not be Empty !!")
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center pt-5">
                    <h3 className='move'>Kindly Register Your Profile Informations</h3>
                </div>
                <div className="row flex">
                    <div className="col-3 pad-top">
                        <Avatar alt="emy Sharp" src={profile} className={`${classes.orange} ${classes.large}`} />
                        <h4 className="avatar">Avatar</h4>
                    </div>
                    <div className="col-6 pad pb-4">
                        <form className="square">
                            <div className="row">
                                <div className="col-6">
                                    <p><TextField
                                        id="fname"
                                        label="First Name"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        required={true}
                                        helperText="Might be your First part of name"
                                        value={fname}
                                        onChange={(e) => { setfname(e.target.value) }}
                                    /></p>
                                </div>
                                <div className="col-6">
                                    <p><TextField
                                        id="lname"
                                        label="Last Name"
                                        variant="outlined"
                                        type="text"
                                        required={true}
                                        fullWidth
                                        helperText="Might be your Last part of name"
                                        value={lname}
                                        onChange={(e) => { setlname(e.target.value) }}
                                    /></p>
                                </div>
                                <div className="col-12">
                                    <p><TextField
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        required={true}
                                        helperText="Give your active Email account"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        fullWidth
                                    /></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p><TextField
                                        id="password"
                                        label="Password"
                                        variant="outlined"
                                        type="text"
                                        required={true}
                                        fullWidth
                                        helperText="Create your password with atleast 8 char"
                                        value={code}
                                        onChange={(e) => { setcode(e.target.value) }}
                                    /></p>
                                </div>
                                <div className="col-6">
                                    <p><TextField
                                        id="mobile"
                                        label="Mobile"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                        }}
                                        required={true}
                                        helperText="Enter 10 digit Mobile number"
                                        value={mobile}
                                        onChange={(e) => { setmobile(e.target.value) }}
                                    /></p>
                                </div>
                                <div className="col-12">
                                    <p><TextField
                                        id="address"
                                        label="Address"
                                        variant="outlined"
                                        type="text"
                                        required={true}
                                        helperText="Enter your address"
                                        value={address}
                                        onChange={(e) => { setaddress(e.target.value) }}
                                        fullWidth
                                    /></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p>
                                        <TextField
                                            id="gender"
                                            label="Gender"
                                            variant="outlined"
                                            select
                                            required={true}
                                            fullWidth
                                            helperText="Choose the gender"
                                            value={gender}
                                            onChange={(e) => { setgender(e.target.value) }}
                                        >
                                            <MenuItem value="Male" >Male</MenuItem>
                                            <MenuItem value="Female" >Female</MenuItem>
                                            <MenuItem value="Female" >Transgender</MenuItem>
                                        </TextField>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p><TextField
                                        id="telephone"
                                        label="Telephone"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 14)
                                        }}
                                        helperText="Enter your Telephone number"
                                        value={tele}
                                        onChange={(e) => { settele(e.target.value) }}
                                    /></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p><TextField
                                        id="dob"
                                        variant="outlined"
                                        type="date"
                                        required={true}
                                        fullWidth
                                        helperText="Date of Birth"
                                        value={dob}
                                        onChange={(e) => { setdob(e.target.value) }}
                                    /></p>
                                </div>
                                <div className="col-6">
                                    <p><TextField
                                        id="bloodgroup"
                                        label="Blood-Group"
                                        variant="outlined"
                                        type="text"
                                        required={true}
                                        fullWidth
                                        helperText="Enter your Blood-type"
                                        value={blood}
                                        onChange={(e) => { setblood(e.target.value) }}
                                    /></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p><TextField
                                        id="height"
                                        label="Height"
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        required={true}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Cms</InputAdornment>,
                                        }}
                                        helperText="Enter your Height in cms"
                                        value={height}
                                        onChange={(e) => { setheight(e.target.value) }}
                                    /></p>
                                </div>
                                <div className="col-6">
                                    <p><TextField
                                        id="weight"
                                        label="Weight"
                                        variant="outlined"
                                        type="text"
                                        required={true}
                                        fullWidth
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                        }}
                                        helperText="Enter your Height in kgs"
                                        value={weight}
                                        onChange={(e) => { setweight(e.target.value) }}
                                    /></p>
                                </div>
                            </div>
                            <div className="text-center p-4">
                                <Button variant="contained" color="secondary" onClick={(e) => { Register(e) }}>
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Signup;