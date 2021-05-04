import React, { useEffect, useState } from 'react';
import "../Admin-Css/body.css";
import { Fragment } from 'react';

function Completed() {

    const [data, setdata] = useState([]);
    const [from, setfrom] = useState("");
    const [submit, setsubmit] = useState([]);

    let token = localStorage.getItem("token");

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/gettask", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((res) => { return res.json() })
            .then((res) => {
                setdata(res.collection)
            })
    }, [token])

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/popup", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((res) => { return res.json() })
            .then((res) => {
                // console.log(res.collection);
                setsubmit(res.collection)
            })
    }, [token])

    const Erase = () => {
        setfrom("");
    }

    const All = (e) => {
        e.preventDefault();

        fetch("https://tasksubmission-back.herokuapp.com/gettask", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((res) => { return res.json() })
            .then((res) => {
                alert("All tasks are showed below !!")
                setdata(res.collection)
            })
    }

    const Filter = (e) => {
        e.preventDefault();

        if (from) {
            fetch("https://tasksubmission-back.herokuapp.com/filter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
                body: JSON.stringify({
                    From: from
                })
            })
                .then((data) => { return data.json() })
                .then((data) => {
                    let array = data.collection
                    if (array.length === 0) {
                        setdata(data.collection)
                        alert(`Tasks are not assigned at date ${from}`)
                    }
                    else if (array.length > 0) {
                        alert(`Tasks submissions on date ${from} showed below !!`)
                        setdata(data.collection)
                    }
                })
            Erase();
        }
        else {
            alert("Date field should not be empty !!")
        }
    }

    return (
        <Fragment>
            <div className="row d-flex justify-content-center p-4 editpro">
                <div className="col-3 pt-3">
                    <h4>Search Filter</h4>
                    <p>(Using Date Search)</p>
                </div>
                <div className="col-3">
                    <label htmlFor="date" style={{ fontWeight: 'bold' }} >Enter Date here:</label>
                    <input type="date" id="date" className="form-control" value={from} onChange={(e) => { setfrom(e.target.value) }} />
                </div>
                <div className="col-4 my-auto">
                    <button className="btn underline ml-4" onClick={(e) => { Filter(e) }}>Search Filter</button>
                    <button className="btn underline ml-4" onClick={(e) => { All(e) }}>All tasks</button>
                </div>
            </div>
            <div className="contianer-fluid editpro ml-3 mr-3 mb-5">
                <div className="row d-flex justify-content-center bold">
                    <div className="col-3 square3 bg-dark text-light p-3">
                        <div>Task <span className="l2">Title</span> / <span className="l2">Date</span> of Assignment</div>
                    </div>
                    <div className="col-7 square3 bg-dark text-light p-3">
                        <div className="row text-left">
                            <div className="col-4"><span className="l2">Name </span>of the Submittor</div>
                            <div className="col-4"><span className="l2">URL </span>of the Task</div>
                            <div className="col-2"><span className="l2">Date </span>of Submission</div>
                            <div className="col-2"><span className="l2">Time </span>of Submission</div>
                        </div>
                    </div>
                </div>
                {data.map((elem, index) => (
                    <div className="row d-flex justify-content-center" key={index}>
                        <div className="col-3 square3 p-3 text-left">
                            <b>{elem.Title} /</b>
                            <div>{elem.date}</div>
                        </div>
                        <div className="col-7 square3 p-3">
                            {submit.filter(person => person.Title === elem.Title)
                                .map((item, index) => (
                                    <div key={index}>
                                        <div className="row text-left">
                                            <div className="col-4">
                                                {index +1} .
                                                <span>{item.Fname}</span>
                                                <span>{item.Lname}</span>
                                            </div>
                                            <div className="col-4">
                                                {item.URL}
                                            </div>
                                            <div className="col-2">
                                                {item.date}
                                            </div>
                                            <div className='col-2'>
                                                {item.time}
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </Fragment >
    );
}

export default Completed;