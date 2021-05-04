import { Fragment, useEffect, useState } from "react";
import "../Profile-Css/body.css";

const Body = () => {
    // console.log(props.data)
    const [value, getvalue] = useState([]);
    const [task, settask] = useState([]);
    const [submit, setsubmit] = useState("");

    let token = localStorage.getItem("token");

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/gettask1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.collection);
                getvalue(data.collection)
            })
    }, [token])

    const Submit = (e, id) => {

        e.preventDefault();

        if (!submit) {
            alert("field is empty")
        } else {
            fetch(`https://tasksubmission-back.herokuapp.com/submit/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
                body: JSON.stringify({
                    submit: submit
                })
            })
                .then((res) => { return res.json() })
                .then((res) => {
                    if (res.one) {
                        alert("Task Submitted Successfully");
                        setsubmit("")
                        window.location.reload();
                    }
                    else if (res.message === "already you were Submit") {
                        alert("Task Were Already submitted by You")
                    }
                })
        }
    }

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/studenttask", {
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.collection) {
                    // console.log(res.collection);
                    settask(res.collection)
                }
            })
    }, [token])

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <h5 className="bold mt-4 mb-5 fixed"><span className="l1">N</span>ew Tasks ➡</h5>
                        <div>
                            <div>
                                {value.map((elem, index) => (
                                    <div key={index}>
                                        <div className="container mt-5 mb-3 square4">
                                            <div className="row">
                                                <div className="col-7"><span className="l2">Task Title : </span>{elem.Title}</div>
                                                <div className="col-5 pb-2">
                                                    <div>
                                                        <span className="l2">Date :</span><span>{elem.date}</span>
                                                    </div>
                                                    <div>
                                                        <span className="l2">Time :</span><span>{elem.time}</span>
                                                    </div>
                                                </div>
                                                <div className="col-12"><span className="l2">Task Details : </span>{elem.Details}</div>
                                                <div className="col-12"><span className="l2">Task Constraints : </span>{elem.Rule} </div>
                                                <div className="col-12"><span className="l2">Task Links : </span>
                                                    <div className="ml-3 col-12"><b>1.</b>{elem.Link1}</div>
                                                    <div className="ml-3 col-12"><b>2.</b>{elem.Link2}</div>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <form className="form-group form-inline">
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="Paste your task url"
                                                            onChange={(e) => { setsubmit(e.target.value) }}
                                                        >
                                                        </input>
                                                        <div className="btn underline" onClick={(e) => { Submit(e, elem._id) }}>submit</div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 offset-1">
                        <h4 className="bold mt-4 mb-2"><span className="l1">S</span>ubmitted Tasks</h4>
                        <div className="row oblique table-dark mt-3 fixed2">
                            <div className="col-3"><span className="l1">T</span>itle</div>
                            <div className="col-4"><span className="l1">U</span>RL</div>
                            <div className="col-3"><span className="l1">D</span>ate</div>
                            <div className="col-2"><span className="l1">T</span>ime</div>
                        </div>
                        {task.map((elem, index) => {
                            return (
                                <div key={index}>
                                    <div className="row mt-3 text-left capitalize">
                                        <div className="col-3"><b>{index + 1}.</b> {elem.Title}</div>
                                        <div className="col-3">{elem.URL}</div>
                                        <div className="col-3">{elem.date}</div>
                                        <div className="col-2">{elem.time}</div>
                                    </div>
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Body;