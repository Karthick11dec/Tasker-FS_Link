import { Link, useHistory } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "../Profile-Css/navbar.css";

const Navbar = () => {

    const [name, setname] = useState("");

    const history = useHistory();

    const token = localStorage.getItem("token");

    const Signout = () => {
        localStorage.clear();
        window.location.replace("https://task-submission-fs.netlify.app/");
    }

    useEffect(() => {
        fetch("https://tasksubmission-back.herokuapp.com/users", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                authorization: token
            }
        })
            .then((data) => { return data.json() })
            .then((data) => {
                let firstname = data.collection[0].Firstname;
                let lastname = data.collection[0].Lastname;
                let letter1 = firstname.split("");
                let letter2 = lastname.split("");
                let letters = letter1[0].toUpperCase() + letter2[0].toUpperCase();
                setname(letters)
            });
    }, [token])

    const Home = () => {
        window.location.reload();
    }

    const Query = () => {
        window.location.href = "https://task-submission-fs.netlify.app/quries";
    }

    return (
        <Fragment>
            <nav className='navbar sticky'>
                <div>
                    <Link to="/">
                        <div className="navbar-brand name">Geeks <span className="l">L</span>earn</div>
                    </Link>
                </div>
                <div style={{ float: 'right' }}>
                    <span>
                        <button className="btn underline" onClick={Home}>Home</button>
                    </span>
                    <span className="ml-2">
                        <button className="btn underline" onClick={Query}>Quries</button>
                    </span>
                    <span className="ml-2">
                        <button className="btn underline" onClick={() => {history.push("/student")} }>{name}</button>
                    </span>
                    <span className="mr-4 ml-2">
                        <button className="btn underline" onClick={Signout}>Sign Out</button>
                    </span>
                </div>
            </nav>
        </Fragment>
    )
}
export default Navbar;