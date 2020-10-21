import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import background from "../red-soccer-bg2.jpg"
import {DataPackContext} from "./contexts/DataPackContext";
import {Button, ButtonGroup} from "react-bootstrap";
import {hasRole} from "./util/Auth";

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
   
   .login {
      margin: 1%;
      float: right;
   }
    
   .selectedLeague {
      float: left;
      clear: left;
      margin-top: 1%;
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
            <ButtonGroup className="menu" id="headerNavMenu">
                <Link to={`/${path}/bajnoksag`}>
                    <Button variant="danger" size="lg" id="navButtonLeagues">Bajnokság</Button>
                </Link>
                <Link to={`/${path}/kupak`}>
                    <Button variant="danger" size="lg" id="navButtonCups">Kupák</Button>
                </Link>
                <Link to={`/${path}/csapatok`}>
                    <Button variant="danger" size="lg" id="navButtonTeams">Csapatok</Button>
                </Link>
            </ButtonGroup>
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
                <div className="login">
                    <Button variant="secondary" id="logInButton">Bejelentkezés</Button>{' '}
                    <Button variant="secondary" id="signInButton">Regisztráció</Button>
                </div>
                <div className="title">
                    <Link to="/" onClick={reset}>
                        <h2 id="appTitle">Soccer League Manager</h2>
                    </Link>
                    {location.pathname !== "/" ?
                        (<h3 id="locationHeaderTitle">{createName(path)}</h3>) : null}
                </div>
                {location.pathname !== "/" ? renderHeaderButtons() : null}
            </div>
        </HeaderStyle>
    );
}

export default Header;