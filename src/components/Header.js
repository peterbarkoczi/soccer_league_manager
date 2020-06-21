import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import background from "../red-soccer-bg2.jpg"

const HeaderStyle = styled.div`
   display: flex;
   
   .header {
     width: 100%;
     background-image: url(${background});
   }
   
   .title {
      position: relative;
   }
   
   .title h2 {
      color: whitesmoke;
      font-size: 5em;
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 1%;
   }
   
   .title h3 {
      color: floralwhite;
      font-size: 3em;
      padding-left: 1%;
   }
   
   .menu {
     position: absolute;
     margin-bottom: 2%;
   }
   
   .menu h3 {
      color: black;
      margin: 1%;
      border: 1px solid red;
      display: inline;
      
   }
   
   .login {
      margin: 1%;
      float: right;
   }
   
   .login button {
    display: inline-block;
    position: relative;
    margin: 10px;
    padding: 0 20px;
    text-align: center;
    text-decoration: none;
    font: bold 12px/25px Arial, sans-serif;
    color: #515151;
    background: #d3d3d3;
    border-radius: 30px;
}
    
`;

function Header() {
    return (
        <HeaderStyle>
            <div className="header">
                <div className="login">
                    <button>Login</button>
                    <button>Register</button>
                </div>
                <div className="title">
                    <Link to="/">
                        <h2>Soccer League Manager</h2>
                    </Link>
                </div>
                <div className="menu">
                    <Link to="/bajnoksag"><h3>Bajnokság</h3></Link>
                    <Link to="/kupak"><h3>Kupák</h3></Link>
                    <Link to="/csapatok"><h3>Csapatok</h3></Link>
                </div>
            </div>
        </HeaderStyle>
    );
}

export default Header;