import React, { Fragment, useState } from "react";
import "../Css/login.css";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const Reset = () => {

    const [email, setemail] = useState("");
    const [code, setcode] = useState("");

    const Erase = () => {
        setemail("");
        setcode("");
    }

    const Put = (e) => {
        e.preventDefault();

        if (email.includes("@") && code.length >= 8) {

            fetch("https://tasksubmission-back.herokuapp.com/reset", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Email: email, Password: code })
            })
                .then((data) => data.json())
                .then((res) => {

                    if (res.message === "user not found") {
                        alert("User Not Found")
                    }
                    else if (res.message === "entered password is same as existing one") {
                        alert("Entered Password is same as existing one");
                    }
                    else if (res.set) {
                        Erase();
                        alert("New password updated successfully !!");
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert("Your Entered Incorrect Format Of mail (OR) Password Not a valid one !!")
        }
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-center" style={{ marginTop: "10vh" }}>
                <form style={{ width: "40vw" }} className="square">
                    <h3 className="fram1">Reset Password</h3>
                    <div className="p-4">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            required={true}
                            helperText="Enter your Email"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}
                            className="form-control"
                        />
                    </div>
                    <div className="p-4">
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="text"
                            required={true}
                            className="form-control"
                            helperText="Enter New password"
                            value={code}
                            onChange={(e) => { setcode(e.target.value) }}
                        />
                    </div>
                    <div className="mt-4 ml-4">
                        <Button variant="contained" color="secondary" onClick={(e) => { Put(e) }}>
                            Reset
                    </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}
export default Reset;