import { Fragment } from "react";
import { useEffect, useState } from "react";
import '../Admin-Css/body.css';

const Add = () => {

    const [number, setnumber] = useState("");
    const [title, settitle] = useState("");
    const [details, setdetails] = useState("");
    const [rule, setrule] = useState("");
    const [link1, setlink1] = useState("");
    const [link2, setlink2] = useState("");
    const [link3, setlink3] = useState("");

    const [task, settask] = useState([]);

    const token = localStorage.getItem("token")

    const Post = (e) => {
        e.preventDefault();
        // console.log(title)
        if (title !== "" && details !== "" && rule !== "") {
            fetch("https://tasksubmission-back.herokuapp.com/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                },
                body: JSON.stringify({
                    Number: number,
                    Title: title,
                    Details: details,
                    Rule: rule,
                    Link1: link1,
                    Link2: link2,
                    Link3: link3
                })
            })
                .then((data) => { return data.json() })
                .then((data) => {
                    if (data.add) {
                        alert("Task added to Student !!");
                        window.location.reload();
                    }
                })
        } else {
            alert(`Title,Details and Constraints should not be Empty`)
        }
    }

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/gettask", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((res) => res.json())
            .then((data) => {
                settask(data.collection)
            })
    }, [token])

    return (
        <Fragment>
            <div className="container-fluid editpro">
                <div className="row">
                    <div className="col-6">
                        <h4 className="ml-3 pt-5"><b>Add <span className="l2">Task</span></b></h4>
                        <div className="card mt-4 square2">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="number">Task <span className="l2">Number :</span></label>
                                        <input type="number" id="number" className="form-control formcolor" onChange={(e) => { setnumber(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Task <span className="l2">Title :</span></label>
                                        <input type="text" id="title" className="form-control formcolor" onChange={(e) => { settitle(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="details">Task <span className="l2">Details :</span></label>
                                        <textarea type="text" rows="4" id="details" className="form-control formcolor" onChange={(e) => { setdetails(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Specification">Task <span className="l2"> Constraints :</span></label>
                                        <textarea rows="3" type="text" id="Specification" className="form-control formcolor" onChange={(e) => { setrule(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="link1"><span className="l2">Link 1 : </span> (Reference Links to do the Task)</label>
                                        <input type="text" id="link1" className="form-control formcolor" onChange={(e) => { setlink1(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="link2"><span className="l2">Link 2 : </span>(Reference Links to do the Task)</label>
                                        <input type="text" id="link2" className="form-control formcolor" onChange={(e) => { setlink2(e.target.value) }} />
                                    </div> <div className="form-group">
                                        <label htmlFor="link3"><span className="l2">Link 3 : </span>(Reference Links to do the Task) </label>
                                        <input type="text" id="link3" className="form-control formcolor" onChange={(e) => { setlink3(e.target.value) }} />
                                    </div>
                                </form>
                            </div>
                            <div className="text-center">
                                <button className="btn underline" onClick={(e) => { Post(e) }}>Add Task</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h4 className="ml-3 pt-5"><b>Assigned <span className="l2">Task</span></b></h4>
                        <div className="pt-3">
                            <table className="table table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Task</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                {task.map((elem, index) => (
                                    <tbody>
                                        <tr>
                                            <td><b>{index + 1} .{elem.Title}</b></td>
                                            <td>{elem.date}</td>
                                            <td>{elem.time}</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Add;