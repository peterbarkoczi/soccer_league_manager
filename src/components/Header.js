import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
// import background from "../red-soccer-bg2.jpg"
import background3 from "../greenSoccer.jpg";
import background4 from "../soccer-background-dark.jpg";
import background2 from "../soccerManagerTableBackground.jpg";
import background from "../soccer-background-grey_2.jpg"
import {DataPackContext} from "./contexts/DataPackContext";
import {Button, ButtonGroup} from "react-bootstrap";
import {hasRole} from "./util/Auth";

const HeaderStyle = styled.div`
   
   .header {
     width: 98vw;
     background: url(${background}) no-repeat center center fixed;
     -webkit-background-size: cover;
     -moz-background-size: cover;
     -o-background-size: cover;
     background-size: cover;
     margin: 2% auto;
     padding: 0.2%;
     border-radius: 20px;
     opacity: 0.9;
     height: 100%;
   }
   
   .title {
      position: static;
   }
   
   .title h2 {
      color: whitesmoke;
      font-size: 4em;
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 1%;
   }
   
   .title h3 {
      color: floralwhite;
      font-size: 2em;
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
    
   .loggedInButtons {
      float: right;
      vertical-align: middle;
      margin-right: 1%;  
   }
   
   #logout, #adminPage {
      //padding-right: 20%;
      margin: 5%
      //opacity: 0.8;
   }
   
   #headerNavMenu {
      width: 100%;
      display: flex;
      justify-content: center;
   }
   
   .menu Button {
      border: none;
      margin-right: 10px;
      background-image: url(${background2});
      font-size: 1.5em;
   }
   
`;

// const GlobalStyle = createGlobalStyle`
//    body {
//       background-image: url(${background});
//    }
// `;

const Header = () => {

    const setBodyBackground = (path) => {
        if (["signup", "signIn", "users"].some(pathName => path.includes(pathName))) {
            return background3;
        }
        return background4;
    }

    const GlobalStyle = createGlobalStyle`
      body {
        // background-image: url(${props => setBodyBackground(props.path)});
        // background-position: center;
        // background-repeat: no-repeat;
        // background-size: cover;
        height: 100%;
        width: 100%;
        margin: 0;
        background: url(${props => setBodyBackground(props.path)}) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
      }
    `;

    const {setShowLocationDiv} = useContext(DataPackContext);

    const [path, setPath] = useState("");

    const reset = () => {
        setShowLocationDiv(true);
    }

    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("user");
        history.push("/signIn")
    }

    useEffect(() => {
        let tempPath;
        if (location.pathname !== "/") {
            tempPath = location.pathname.substring(1, location.pathname.indexOf("/", location.pathname.indexOf("/") + 1));
        }
        setPath(tempPath);
    }, [location.pathname])

    const renderHeaderButtons = () => {
        if (location.pathname === "/signIn" || location.pathname === "/signup" || location.pathname === "/users") return null;
        return (
            <ButtonGroup className="menu" id="headerNavMenu">
                <Link to={`/${path}/news`}>
                    <Button variant="danger" size="lg" id="navButtonLeagues">Hírek</Button>
                </Link>
                <Link to={`/${path}/bajnoksag`}>
                    <Button variant="danger" size="lg" id="navButtonLeagues">Bajnokság</Button>
                </Link>
                <Link to={`/${path}/kupak`}>
                    <Button variant="danger" size="lg" id="navButtonCups">Kupák</Button>
                </Link>
                <Link to={`/${path}/csapatok`}>
                    <Button variant="danger" size="lg" id="navButtonTeams">Csapatok</Button>
                </Link>
                <Link to={`/${path}/contact`}>
                    <Button variant="danger" size="lg" id="navButtonLeagues">Kapcsolat</Button>
                </Link>
            </ButtonGroup>
        )
    }

    const displayHeaderTitle = () => {
        return location.pathname !== "/" || location.pathname !== "/users";
    }

    const createName = (name) => {
        if (["signup", "signIn", "users"].some(route => location.pathname.includes(route))) return null;
        if (name !== undefined) {
            return name.split("_").join(" ");
        }
        return null;
    }


    return (
        <HeaderStyle>
            <GlobalStyle path={location.pathname}/>
            <div className="header">
                {localStorage.getItem("user") === null ?
                    <div className="login">
                        <Link to="/signIn">
                            <Button variant="secondary" id="logInButton">Bejelentkezés</Button>{' '}
                        </Link>
                        <Link to="/signup">
                            <Button variant="secondary" id="signUpButton">Regisztráció</Button>
                        </Link>
                    </div> :
                    <div className="loggedInButtons">
                        <div id="logout">
                            <Button variant="success" id="logoutButton" onClick={() => logout()}>Kijelentkezés</Button>
                        </div>
                        {'  '}
                        {hasRole(["admin"]) &&
                        <div id="adminPage">
                            <Link to="/users">
                                <Button variant="success" id="adminPageButton">Felhasználók</Button>
                            </Link>
                        </div>}
                    </div>

                }

                <div className="title">
                    <Link to="/" onClick={reset}>
                        <h2 id="appTitle">Soccer League Manager</h2>
                    </Link>
                    {displayHeaderTitle() ?
                        (<h3 id="locationHeaderTitle">{createName(path)}</h3>) : null}
                </div>
                {location.pathname !== "/" ? renderHeaderButtons() : null}
            </div>
        </HeaderStyle>
    );
}

export default Header;