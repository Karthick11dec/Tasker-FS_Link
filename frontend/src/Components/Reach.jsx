import React, { Fragment } from "react";
import About from "./About";
import "../Css/reach.css";

const Reach = () => {

    return (
        <Fragment>
            <div id="reach">
                <div className="container-fluid p-5 color2">
                    <div className="row d-flex justify-content-center">
                        <div className="col-8 mr-5">
                            <About />
                        </div>
                        <div className="col-3 text1">
                            <h3 className="text-left pr-3 pb-3 pt-3 fram1"><b>Reach Us</b></h3>
                            <a href="https://www.google.com/" className="social">
                                <div className="p">
                                    <i class="fas fa-phone-square-alt fa-2x"></i>
                                    <div className="pl-3 font">7904587770</div>
                                </div>
                            </a>
                            <a href="https://www.google.com/" className="social" target="_blank" rel="noreferrer">
                                <div className="p">
                                    <i class="fas fa-globe fa-2x"></i>
                                    <div className="pl-3 font">www.geekslearn.in</div>
                                </div>
                            </a>
                            <a href="mailto:karthickraja11dec@gmail.com" className="social" target="_blank" rel="noreferrer">
                                <div className="p">
                                    <i class="fas fa-envelope fa-2x"></i>
                                    <div className="pl-3 font">karthickraja11dec@gmail.com</div>
                                </div>
                            </a>
                            <a href="https://www.telegram.com/" className="social" target="_blank" rel="noreferrer">
                                <div className="p">
                                    <i class="fab fa-telegram fa-2x"></i>
                                    <div className="pl-3 font">Our Official Telegram page</div>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/" className="social" target="_blank" rel="noreferrer">
                                <div className="p">
                                    <i class="fab fa-instagram fa-2x"></i>
                                    <div className="pl-3 font">Our Official Instagram Page</div>
                                </div>
                            </a>
                            <a href="https://www.facebook.com/" className="social" target="_blank" rel="noreferrer">
                                <div className="p">
                                    <i class="fab fa-facebook-square fa-2x"></i>
                                    <div className="pl-3 font">Our Official Facebook Page</div>
                                </div>
                            </a>
                            <a href="https://www.twitter.com/" className="social" target="_blank" rel="noreferrer">
                                <div className="p">
                                    <i class="fab fa-twitter-square fa-2x"></i>
                                    <div className="pl-3 font">Our Official Twitter Page</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Reach;