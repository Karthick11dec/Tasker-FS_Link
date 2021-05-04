import React, { Fragment, useState } from "react";
import Login from "../Components/Login";
import Road from "../Profile/road.jpg";
import Carrier from "../Profile/career.jpg";
import Start from "../Profile/start.jpg";
import Love from "../Profile/love.jpeg";
import Money from "../Profile/money.jpg";
import Blog from "../Profile/blog.jpg";
import Forgot from "../Components/Forgot";

const Body = () => {

    const [forget, setforget] = useState(false);
    const [name, setname] = useState(false);

    return (
        <Fragment>
            <div className="container-fluid p-5 text" id="login">
                <div className="row">
                    <div className="col-7">
                        <div className="row">
                            <p className="col-12 p-2">
                                <h4 className="mb-4 fram1"><b>Is Confused To Choose Your Carrier Path ?</b></h4>
                                <img src={Road} style={{ float: "right" }} alt="road images" className="pl-3" />
                                <div className="align">
                                    It is important to come up with your career planning as it gives you the much needed direction
                                    and makes it clear there where you see yourself in future. It makes you aware of your strength
                                    and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                                </div>
                            </p>
                            <p className="col-12 p-3">
                                <h4 className="mb-4 mt-3 text-right fram1"><b>Where to Start Carrier ? Hope we guide..</b></h4>
                                <img src={Carrier} style={{ float: "left" }} alt="road images" className="pr-3" />
                                <div className="align">
                                    It is important to come up with your career planning as it gives you the much needed direction
                                    and makes it clear there where you see yourself in future. It makes you aware of your strength
                                    and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                                </div>
                            </p>
                        </div>
                    </div>
                    <div className="col-5 mt-5">
                        {forget ? <Forgot /> : <Login />}
                        <p className="text-center pt-3" >{name ? <b>Back to login !</b> : <b>forgot password ?</b>}
                            <span className="line" onClick={() => { setforget(!forget); setname(!name) }}>Click here</span>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 p-2">
                        <h4 className="mb-3 mt-2 text-left fram1"><b>Don't Hesitate Yourself.. Start Your Carrier Here</b></h4>
                        <img src={Start} style={{ float: "right", height: "35vh", width: "35vw" }} alt="road images" className="pl-3" />
                        <div className="align">
                            It is important to come up with your career planning as it gives you the much needed direction
                            and makes it clear there where you see yourself in future. It makes you aware of your strength
                            and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                            It is important to come up with your career planning as it gives you the much needed direction
                            and makes it clear there where you see yourself in future. It makes you aware of your strength
                            and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                        </div>
                    </div>
                    <div className="col-12 p-3">
                        <h4 className="mb-4 text-right fram1"><b>Why We give Hope to u ? </b></h4>
                        <img src={Love} style={{ float: "left", height: "35vh", width: "35vw" }} alt="road images" className="pr-3" />
                        <div className="align">
                            It is important to come up with your career planning as it gives you the much needed direction
                            and makes it clear there where you see yourself in future. It makes you aware of your strength
                            and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                            It is important to come up with your career planning as it gives you the much needed direction
                            and makes it clear there where you see yourself in future. It makes you aware of your strength
                            and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                        </div>
                    </div>
                    <div className="col-12 p-3">
                        <h4 className="mb-5 mt-3 text-left fram1"><b>Placements and responsibilities</b></h4>
                        <img src={Blog} alt="road images" className="pr-3 img-fluid" />
                        <div className="text-center">
                            It is important to come up with your career planning as it gives you the much needed direction
                            and makes it clear there where you see yourself in future. It makes you aware of your strength
                            and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                            It is important to come up with your career planning as it gives you the much needed direction
                            and makes it clear there where you see yourself in future. It makes you aware of your strength
                            and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                        </div>
                    </div>
                    <div className="col-12 p-3">
                        <h4 className="mb-4 mt-2 text-right fram1"><b>Your Shine Carrier and Package</b></h4>
                        <img src={Money} style={{ float: "left" }} alt="road images" className="pr-3" />
                        <div className="align">
                            <div>
                                It is important to come up with your career planning as it gives you the much needed direction
                                and makes it clear there where you see yourself in future. It makes you aware of your strength
                                and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                                It is important to come up with your career planning as it gives you the much needed direction
                                and makes it clear there where you see yourself in future.
                            </div>
                            <br></br>
                            <div>
                                It is important to come up with your career planning as it gives you the much needed direction
                                and makes it clear there where you see yourself in future. It makes you aware of your strength
                                and weaknesses and the skills and knowledge that are required to achieve your goals in future.It is important to come up with your career planning as it gives you the much needed direction
                                and makes it clear there where you see yourself in future. It makes you aware of your strength
                                and weaknesses and the skills and knowledge that are required to achieve your goals in future.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Body;