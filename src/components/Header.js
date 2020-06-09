import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderDiv = styled.div`
   font-size: 2em;
`

function Header() {
    return (
        <HeaderStyle>
            <div className="header">
                <div className="logo">
                    <Link to="/">
                        <h4>Soccer
                            League
                            Manager</h4>
                    </Link>
                </div>
                <div className="menu">
                    <Link to="/bajnoksag">
                        <h4>Bajnokság</h4>
                    </Link>
                    <Link to="/kupak">
                        <h4>Kupák</h4>
                    </Link>
                    <Link to="/csapatok">
                        <h4>Csapatok</h4>
                    </Link>
                </div>
                <div className="login">
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
        </HeaderStyle>
    );
}

export default Header;