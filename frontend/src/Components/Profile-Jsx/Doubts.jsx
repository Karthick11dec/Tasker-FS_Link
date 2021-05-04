import { Fragment } from "react";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router";

const Doubts = () => {

    const [name, setname] = useState("");
    const [batch, setbatch] = useState("");
    const [head, sethead] = useState("");
    const [body, setbody] = useState("");
    const [query, setquery] = useState([]);

    // const history = useHistory();

    const token = localStorage.getItem("token");

    const Erase = () => {
        setname("");
        setbatch("");
        setbody("");
        sethead("");
    }

    const Add = (e) => {
        e.preventDefault();

        if (name !== "" && head !== "" && body !=="") {

        fetch("https://tasksubmission-back.herokuapp.com/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({ Name: name, Batch: batch, Head: head, Body: body })
        })
            .then((data) => { return data.json() })
            .then((data) => {
                if (data.query) {
                    Erase();
                    alert("Your Query has been submitted Successfully");
                    window.location.reload();
                    // history.push('/quries')
                }
                else {
                    alert("Server loading..please try again later")
                }
            })
        } else {
            alert("Name,Query title and Details should not be empty !!");
        }
    }

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/doubt", {
            method: "GET",
            headers: {
                "Content-type": "applicatiion/json",
                authorization: token
            }
        })
            .then((data) => data.json())
            .then((datas) => {
                // console.log(datas)
                setquery(datas.data)
            })
    }, [token])

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <div className="square4">
                            <h4 className="bold text-center mb-3">Have a quries ? Ask Your Quries here</h4>
                            <form >
                                <div className="form-group">
                                    <lable for="name"><span className="l2">N</span>ame:</lable>
                                    <input type="text" className="form-control batch" id="name" value={name} onChange={(e) => setname(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <lable for="batch"><span className="l2">B</span>atch:</lable>
                                    <input type="text" className="form-control batch" id="batch" value={batch} onChange={(e) => setbatch(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <lable for="queryhead"><span className="l2">Q</span>uery Heading:</lable>
                                    <input type="text"
                                        className="form-control batch"
                                        maxLength="30" id="queryhead"
                                        value={head}
                                        placeholder="30 Char maximum allowed"
                                        onChange={(e) => sethead(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <lable for="querybody"><span className="l2">Q</span>uery Detail:</lable>
                                    <textarea type="text" className="form-control batch" id="querybody" value={body} onChange={(e) => setbody(e.target.value)} rows={6} required />
                                </div>
                                <div className="text-center">
                                    <button className="btn underline batch" onClick={(e) => { Add(e) }}>Add Query</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-7 mt-4">
                        <h4 className="bold text-center mb-4">Raised Queris</h4>
                        <div className="row mb-3 table-dark bold">
                            <div className="col-3">Date</div>
                            <div className="col-2">Batch</div>
                            <div className="col-5">Head</div>
                            <div className="col-2">Time</div>
                        </div>
                        {query.map((elem, index) => (
                            <div key={index}>
                                <div className="row" >
                                    <div className="col-3">{elem.date}</div>
                                    <div className="col-2">{elem.Batch}</div>
                                    <div className="col-5">{elem.Head}</div>
                                    <div className="col-2">{elem.time}</div>
                                </div>
                                <hr></hr>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Doubts;