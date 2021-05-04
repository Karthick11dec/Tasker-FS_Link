import { Fragment, useEffect, useState } from "react";
import "../Admin-Css/navbar.css";
import Body from "../Admin-Jsx/Body";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";

const Navbar = () => {

    const [name, setname] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const [handle, sethandle] = useState("");

    // const history = useHistory();

    const token = localStorage.getItem("token");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Handle = (e, param) => {
        e.preventDefault();
        sethandle(param)
        // console.log(param)
    }

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
        // history.push(1);
        window.location.reload();
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
                    <span ><button className="btn underline" onClick={Home}>Home</button></span>
                    <span className="ml-4">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="menu btn underline">
                            Menu
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <div className="pt-5">
                                <MenuItem onClose={handleClose} onClick={(e) => { Handle(e, "Add"); handleClose() }} className="boxing">Add Task</MenuItem>
                                <MenuItem onClose={handleClose} onClick={(e) => { Handle(e, "View"); handleClose() }} className="boxing">Task Submissions</MenuItem>
                            </div>
                        </Menu>
                    </span>
                    <span className="ml-3"><button className="btn underline" onClick={(e) => { Handle(e, "profile") }}>{name}</button></span>
                    <span className="ml-3 mr-5"><button className="btn underline" onClick={Signout}>Log out</button></span>
                </div>
            </nav>
            <Body data={handle}></Body>
        </Fragment>
    )
}
export default Navbar;