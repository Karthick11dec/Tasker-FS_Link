import { Fragment, React, useEffect, useState } from "react";
import "../Admin-Css/body.css";

import Add from "../Admin-Jsx/Add";
import AdminProfile from "../Admin-Jsx/Adminpro";
import Completed from "../Admin-Jsx/Completed";

const Body = (props) => {
    // console.log(props.data)
    const [state, setstate] = useState("--- Pickup any options you need on top --- ");
    const [count, setcount] = useState("");
    const [student, setstudent] = useState("Student Count : ")

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/totalstudent")
            .then((res) => { return res.json() })
            .then((res) => {
                if (res.data) {
                    let arr = res.data;
                    // console.log(arr.length-1)
                    setcount(arr.length - 1)
                }
            })
    }, [])

    useEffect(() => {
        if (props.data === "Add" || props.data === "View" || props.data === "profile") {
            setcount(false)
            setstate(false)
            setstudent(false)
        }
    }, [props.data])

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div style={{ float: "right" }} className="mt-3 mr-3">
                            <h6>{student}<span className="l1">{count}</span></h6>
                        </div>
                        <div className="state"><h3>{state}</h3></div>
                        {props.data === "Add" && <Add />}
                        {props.data === "View" && <Completed />}
                        {props.data === "profile" && <AdminProfile />}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Body;
