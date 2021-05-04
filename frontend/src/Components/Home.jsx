import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import Reach from "./Reach";
import Profile from "./Profile-Jsx/Profile"

let token = localStorage.getItem("token");

const Home = () => {
    return (
        <Fragment>
            {token ? <Profile /> : (
                <div>
                    <Navbar />
                    <div>
                        <Body />
                        <Reach />
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default Home;