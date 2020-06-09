import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.div`
   text-align: center;
   padding: 2%;
   margin: 2%;
   border: dotted aquamarine;
   display: flex;
   justify-content: space-between;
   
   a {
      text-decoration: none;
   }
   
   .logo h4 {
    color: green;
    
    &:hover {
       color: blue;
    }
   }
   
   .menu h4 {
      color: red;
      margin: 1%;
   }
    
`;

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