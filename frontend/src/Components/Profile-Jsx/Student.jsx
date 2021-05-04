import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import "../Admin-Css/body.css"
import Image from "./images.jpg";

function Student() {

    const [render, setrender] = useState([]);
    const [edit, setedit] = useState(false);

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [dob, setdob] = useState("");
    const [mobile, setmobile] = useState("");
    const [gender, setgender] = useState("");
    const [tele, settele] = useState("");
    const [address, setaddress] = useState("");
    const [blood, setblood] = useState("");
    const [height, setheight] = useState("");
    const [weight, setweight] = useState("");

    let token = localStorage.getItem("token");

    const Erase = () => {
        setfname("");
        setlname("");
        setdob("");
        setmobile("");
        setgender("");
        settele("");
        setaddress("");
        setblood("");
        setheight("");
        setweight("");
    }

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
            .then((data) => { return data.json() })
            .then((data) => {
                setrender(data.collection)
            })
    }, [token])

    const Edit = (render) => {

        setrender(false);
        setedit(true);

        const data = render[0];

        setfname(data.Firstname);
        setlname(data.Lastname);
        setdob(data.DOB);
        setmobile(data.Mobile);
        setgender(data.Gender);
        settele(data.Telephone);
        setaddress(data.Address);
        setblood(data.Blood);
        setheight(data.Height);
        setweight(data.Weight);
    }

    const Save = (e) => {
        e.preventDefault();

        fetch("https://tasksubmission-back.herokuapp.com/updatepro", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({
                Firstname: fname,
                Lastname: lname,
                DOB: dob,
                Mobile: mobile,
                Gender: gender,
                Telephone: tele,
                Address: address,
                Blood: blood,
                Height: height,
                Weight: weight
            })
        })
            .then((res) => { return res.json() })
            .then((res) => {
                if (res.update) {
                    Erase();
                    alert("Profile updated successfully !!");
                    window.location.reload();
                }
            })
    }

    return (
        <Fragment>
            {render &&

                (<div className="container-fluid mt-4 mb-5">
                    <div className="row">
                        <div className="col-10">
                            <span style={{ float: 'right' }} className="mt-3 mb-3">
                                <div className='btn edit'><i class="fas fa-user-edit" onClick={() => { Edit(render) }}> Edit</i></div>
                            </span>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-3 my-auto">
                            <img src={Image} className="img-fluid" alt="this is Admin profile"></img>
                            <h2 style={{ marginLeft: "5vw" }} className="mt-3">Ava<span className="tar">tar</span></h2>
                        </div>
                        <div className="col-6 pt-2">
                            {render.map((elem, index) => (
                                <div key={index}>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">N</span>ame :
                                   </div>
                                        <div className="col-6 font3">
                                            {elem.Firstname} {elem.Lastname}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">E</span>mail :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Email}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">M</span>obile :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Mobile}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">T</span>elephone :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Telephone}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">G</span>ender :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Gender}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">D</span>OB :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.DOB}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">B</span>lood :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Blood}
                                        </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">H</span>eight :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Height} Cms
                                   </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">W</span>eight :
                                   </div>
                                        <div className="col-6 font2">
                                            {elem.Weight} Kgs
                                   </div>
                                    </p>
                                    <p className="row d-flex justify-content-center">
                                        <div className="col-3 font1">
                                            <span className="l1">A</span>ddress:
                                   </div>
                                        <div className="col-6 font3">
                                            {elem.Address}
                                        </div>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                )}

            { edit && (

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10">
                            <span style={{ float: 'right' }} className="mt-3">
                                <div className="btn edit" onClick={(e) => Save(e)}><i class="fas fa-save"> Save</i></div>
                            </span>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center editpro">
                        <div className="col-3 my-auto">
                            <img src={Image} className="img-fluid" alt="this is Admin profile"></img>
                            <h2 style={{ marginLeft: "5vw" }} className="mt-3">Ava<span className="tar">tar</span></h2>
                        </div>
                        <div className="col-6 pt-2">
                            <form style={{ fontWeight: "bold" }} className="p-4 mb-3 square1" >
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="fname"><span className="l1">F</span>irstname :</label>
                                            <input type="text"
                                                id="fname"
                                                className="form-control font5"
                                                required
                                                value={fname}
                                                onChange={(e) => { setfname(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="lname"><span className="l1">L</span>astname :</label>
                                            <input type="text"
                                                id="lname"
                                                className="form-control font5"
                                                required
                                                value={lname}
                                                onChange={(e) => { setlname(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="mobile"><span className="l1">m</span>obile :</label>
                                            <input type="number"
                                                id="mobile"
                                                className="form-control font5"
                                                required
                                                value={mobile}
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                }}
                                                onChange={(e) => { setmobile(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="tele"><span className="l1">t</span>elephone :</label>
                                            <input type="number"
                                                id="tele"
                                                className="form-control font5"
                                                required
                                                value={tele}
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                                                }}
                                                onChange={(e) => { settele(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="gender"><span className="l1">g</span>ender :</label>
                                            <input type="text"
                                                id="gender"
                                                className="form-control font5"
                                                required
                                                value={gender}
                                                onChange={(e) => { setgender(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="dob"><span className="l1">d</span>OB :</label>
                                            <input type="date"
                                                id="dob"
                                                className="form-control font5"
                                                required
                                                value={dob}
                                                onChange={(e) => { setdob(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="blood"><span className="l1">b</span>lood Group :</label>
                                    <input type="text"
                                        id="blood"
                                        className="form-control font5"
                                        required
                                        value={blood}
                                        onChange={(e) => { setblood(e.target.value) }}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="height"><span className="l1">h</span>eight : (in Cms)</label>
                                            <input type="number"
                                                id="height"
                                                className="form-control font5"
                                                required
                                                value={height}
                                                onChange={(e) => { setheight(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="weight"><span className="l1">w</span>eight : (in Kgs)</label>
                                            <input type="number"
                                                id="weight"
                                                className="form-control font5"
                                                required
                                                value={weight}
                                                onChange={(e) => { setweight(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address"><span className="l1">a</span>ddress :</label>
                                    <textarea type="text"
                                        id="address"
                                        className="form-control font5 font6"
                                        required
                                        rows={5}
                                        value={address}
                                        onChange={(e) => { setaddress(e.target.value) }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            )}
        </Fragment>
    );
}

export default Student;