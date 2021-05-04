import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../Css/navbar.css"

const Navbar = () => {
    return (
        <Fragment>
            <nav className='navbar sticky'>
                <div>
                    <Link to="/">
                        <div className="navbar-brand name">Geeks <span className="l">L</span>earn</div>
                    </Link>
                </div>
                <div style={{ float: 'right' }}>
                    <Link to="/signup">
                        <span className="navbar-brand underline">Sign Up</span>
                    </Link>
                    <a href="#login" className="navbar-brand underline">Sign In</a>
                    <a href="#reach" className="navbar-brand underline">Reach Us</a>
                </div>
            </nav>
        </Fragment>
    )
}
export default Navbar;