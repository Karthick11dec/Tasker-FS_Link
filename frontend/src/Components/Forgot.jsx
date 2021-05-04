import React, { Fragment, useState } from "react";
import "../Css/login.css";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const Forgot = () => {

    const [email, setemail] = useState("");

    const Erase = () => {
        setemail("");
    }

    const Send = (e) => {
        e.preventDefault();

        if (email.includes("@")) {
            fetch("https://tasksubmission-back.herokuapp.com/link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: email })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.data) {
                        Erase();
                        alert("Reset link has sent to your Email...please check it !!");

                        window.location.replace("https://task-submission-fs.netlify.app/");
                    } else if (res.message === "email is not valid") {
                        alert("User not Found !!");
                    }
                    else if (res.message === "Something went wrong") {
                        alert("Something went wrong !!");
                    }
                })
                .catch((error) => console.log(error));
        } else {
            alert("Entered mail is incorrect..please check it !!");
        }
    }

    return (

        <Fragment>
            <form className="color p-5 square">
                <h4 className="fram1 pb-3">Forgot Password</h4>
                <div className="form-group">
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        required={true}
                        helperText="Enter your Email"
                        value={email}
                        style={{ width: "25vw" }}
                        onChange={(e) => { setemail(e.target.value) }}
                        className="inputcolor"
                    />
                    <span className="ml-3">
                        <Button variant="contained" color="secondary" onClick={(e) => { Send(e) }} className="p-2 mt-4">
                            Get Link
                        </Button>
                    </span>
                </div>
            </form>
        </Fragment>
    )
}
export default Forgot;