import React from "react";
import "./Footer.scss";
import {
    BsGithub,
    BsFacebook,
    BsYoutube,
} from "react-icons/bs";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    (C){" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} FIT-HUMG. All Rights
                        Reserved
                    </span>
                </div>
                <a
                    href="/"
                    className="item3"
                >
                    <BsGithub />
                </a>
                <a
                    href="/"
                    className="item4"
                >
                    <BsFacebook />
                </a>
                <a
                    href="/"
                    className="item5"
                >
                    <BsYoutube />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
