import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import background from "../red-soccer-bg2.jpg"
import {DataPackContext} from "./contexts/DataPackContext";
import {Button, ButtonGroup} from "react-bootstrap";

const HeaderStyle = styled.div`
   display: flex;
   
   .header {
     width: 100%;
     background-image: url(${background});
     margin-bottom: 4%;
     padding: 0.2%;
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
     margin-top: 0.5%;
     margin-bottom: 2%;
   }
   
   .menu a {
      color: white;
      display: inline;
      
   }
    
   .selectedLeague {
      float: left;
      clear: left;
      margin-top: 1%;
    }
    
   #headerButtons {
      display: flex;
      justify-content: center;
   }
   
   
   #locationHeaderTitle, #appTitle {
      text-align: center;
      margin: 1%;
   }
   
   #headerTop {
      position: relative;
   }
   
   .login {
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(-100%, -50%);
   }
   
   .loginButton {
      margin: 2%;
   }
   
   .headerNavButton {
      margin: 0 2%;
   }
    
    
`;

function Header() {

    const {setShowLocationDiv} = useContext(DataPackContext);

    const [path, setPath] = useState("");

    function reset() {
        setShowLocationDiv(true);
    }

    const location = useLocation();

    useEffect(() => {
        let tempPath;
        if (location.pathname !== "/") {
            tempPath = location.pathname.substring(1, location.pathname.indexOf("/", location.pathname.indexOf("/") + 1));
        }
        setPath(tempPath);
    }, [location.pathname])

    const renderHeaderButtons = () => {
        return (
            <div id="headerButtons">
                <ButtonGroup className="menu" id="headerNavMenu">
                    <Link to={`/${path}/bajnoksag`} className="headerNavButton">
                        <Button variant="danger" size="lg" id="navButtonLeagues">Bajnokság</Button>
                    </Link>
                    <Link to={`/${path}/kupak`} className="headerNavButton">
                        <Button variant="danger" size="lg" id="navButtonCups">Kupák</Button>
                    </Link>
                    <Link to={`/${path}/csapatok`} className="headerNavButton">
                        <Button variant="danger" size="lg" id="navButtonTeams">Csapatok</Button>
                    </Link>
                </ButtonGroup>
            </div>
        )
    }

    const createName = (name) => {
        if (name !== undefined) {
            return name.split("_").join(" ");
        }
        return null;
    }


    return (
        <HeaderStyle>
            <div className="header">
                <div id="headerTop">
                    <div className="login">
                        <Button variant="secondary" id="logInButton" className="loginButton">Bejelentkezés</Button>{' '}
                        <Button variant="secondary" id="signInButton" className="loginButton">Regisztráció</Button>
                    </div>
                    <div className="title">
                        <Link to="/" onClick={reset}>
                            {location.pathname !== "/" ?
                                (<h2 id="locationHeaderTitle">{createName(path)}</h2>) :
                                <h2 id="appTitle">Soccer League Manager</h2>}
                        </Link>
                    </div>
                </div>
                {location.pathname !== "/" ? renderHeaderButtons() : null}
            </div>
        </HeaderStyle>
    );
}

export default Header;