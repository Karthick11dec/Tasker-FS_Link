import React, { Fragment, useState } from "react";
import "../Css/login.css";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const Login = () => {

    const [email, setemail] = useState("");
    const [code, setcode] = useState("");

    const Erase = () => {
        setemail("");
        setcode("");
    }

    const Send = (e) => {

        e.preventDefault();

        if (email.includes("@") && code.length >= 8) {
            fetch("https://tasksubmission-back.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Email: email, Password: code })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.token && data.admin === true) {
                        localStorage.setItem("token", data.token);
                        Erase();
                        alert("Hello There...Admin Login successfully..!");
                        window.location.replace("https://task-submission-fs.netlify.app/admin");
                    }
                    else if (data.token && data.admin === false) {
                        localStorage.setItem("token", data.token);
                        Erase();
                        alert("Hello There...Student Login successfully..!");
                        window.location.replace("https://task-submission-fs.netlify.app/profile");
                    }
                    else if (data.message === "Password not valid") {
                        alert("Entered Password Is Not A Valid One");
                    }
                    else if (data.message === "User not found") {
                        alert("User Not Found");
                    }
                })
                .catch((error) => console.log(error));
        } else {
            Erase();
            alert("Your Entered Incorrect Format Of mail (OR) Password Not a valid one")
        }
    }

    return (

        <Fragment>
            <div className="pl-4 pr-4 pb-5 color pt-5 square">
                <h4 className="fram1">Sign In Here</h4>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required={true}
                    helperText="Please enter registered Email"
                    value={email}
                    onChange={(e) => { setemail(e.target.value) }}
                    fullWidth
                    className="fram"
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required={true}
                    fullWidth
                    helperText="Please enter registered password"
                    value={code}
                    onChange={(e) => { setcode(e.target.value) }}
                    className="fram"
                />
                <div className="text-center pt-3">
                    <Button variant="contained" color="secondary" onClick={(e) => { Send(e) }}>
                        Log In
                </Button>
                </div>
            </div>
        </Fragment>
    )
}
export default Login;