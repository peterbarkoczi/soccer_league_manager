import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import background3 from "../soccer-background-office.jpg";
import background4 from "../soccer-background-dark.jpg";
import background2 from "../soccerManagerTableBackground.jpg";
import background from "../soccer-background-office.jpg"
import {Button, ButtonGroup} from "react-bootstrap";
import {hasRole} from "./util/Auth";

import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import IconButton from "@material-ui/core/IconButton";

const HeaderStyle = styled.div`

  .header {
    width: 98vw;
    background: url(${background}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin: 2% auto 0;
    padding: 0.5%;
    border-radius: 20px;
    opacity: 0.9;
    height: 100%;
  }

  .title {
    position: static;
  }

  .title h2 {
    color: whitesmoke;
    font-size: 3em;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 1%;
  }

  .title h3 {
    color: floralwhite;
    font-size: 2.5em;
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
    //margin-right: 1%;
    margin: auto;
    padding: 1%;
  }

  #logout {
    padding-bottom: 0.7%;
  }

  #logout, #adminPage {
    //padding-right: 20%;
    margin: auto;
    padding-left: 0.7%;
    //opacity: 0.8;
  }
  
  //.loggedInButtons button {
  //  //padding-left: 20%;
  //  padding-bottom: 20%;
  //  padding-top: 0;
  //}
  
  #logoutIconButton {
    padding-top: 0;
    padding-bottom: 20%;
    outline: none;
    border: none;
  }
  
  #logoutIconButton #logoutIconButtonTooltip {
    visibility: hidden;
    color: white;
    position: absolute;
    z-index: 1;
    right: 105%;
    opacity: 0;
    transition: opacity 1s;
  }

  #logoutIconButton:hover #logoutIconButtonTooltip {
    visibility: visible;
    opacity: 1;
  }

  #adminPageIconButton #adminPageButtonTooltip {
    visibility: hidden;
    color: white;
    position: absolute;
    z-index: 1;
    right: 105%;
    opacity: 0;
    transition: opacity 1s;
  }

  #adminPageIconButton:hover #adminPageButtonTooltip {
    visibility: visible;
    opacity: 1;
  }
  
  #adminPageIconButton {
    padding-top: 20%;
    padding-bottom: 0;
    outline: none;
    border: none;
  }
  
  .icon {
    color: white;
    font-size: 1.3em;
    outline: none;
  }

  #logoutButton, #adminPageButton {
    font-size: 1em;
  }

  #headerNavMenu {
    margin-top: 0;
    position: static;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  #headerNavMenu a {
    font-size: 2.2em;
    padding-top: 0;
    padding-right: 1%;
    padding-left: 1%;
    background: rgba(9, 8, 8, 0.25);
  }

  .navButton {
    border: none;
    //margin-right: 10px;
      //background-image: url(${background2});
    background-color: rgba(255, 255, 255, 0);
    font-size: 1.5em;
  }

  .navButton:focus {
    border: none;
  }


  @media screen and (max-width: 900px) {

    #logoutButton, #adminPageButton {
      font-size: 1.5vw;
    }

    #logout, #adminPage {
      float: right;
    }

    #headerNavMenu {
      flex-grow: 1;
      flex-direction: column;
      align-items: center;
    }

    #headerNavMenu a {
      font-size: 5vw;
    }
  }

  @media screen and (max-width: 510px) {
    //.title h2 {
    //  font-size: 1em;
    //}
    //.title h3 {
    //  font-size: 0.5em;
    //}
    //#logoutButton {
    //  font-size: 0.25em;
    //}
    //
    //#headerNavMenu a {
    //  font-size: 1em;
    //}
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


    const [path, setPath] = useState("");

    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("user");
        history.push(`/${path}/signIn`)
    }

    useEffect(() => {
        let tempPath;
        if (location.pathname !== "/") {
            tempPath = location.pathname.substring(1, location.pathname.indexOf("/", location.pathname.indexOf("/") + 1));
        }
        setPath(tempPath);
    }, [location.pathname])

    const renderHeaderButtons = () => {
        if (location.pathname === `/${path}/signIn` || location.pathname === `/${path}/signup` || location.pathname === `/${path}/users`) return null;
        return (
            <ButtonGroup className="menu" id="headerNavMenu">
                <Link to={`/${path}/hirek`}>Hírek</Link>
                <Link to={`/${path}/bajnoksag`}>Bajnokság</Link>
                <Link to={`/${path}/kupak`}>Kupák</Link>
                <Link to={`/${path}/csapatok`}>Csapatok</Link>
                <Link to={`/${path}/kapcsolat`}>Kapcsolat</Link>
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
                {location.pathname !== "/" &&
                <>
                    {localStorage.getItem("user") === null ?
                        <div className="login">
                            <Link to={`/${path}/signIn`}>
                                <Button variant="secondary" id="logInButton">Bejelentkezés</Button>{' '}
                            </Link>
                            <Link to={`/${path}/signup`}>
                                <Button variant="secondary" id="signUpButton">Regisztráció</Button>
                            </Link>
                        </div> :
                        <div className="loggedInButtons">
                            <div id="logout">
                                <IconButton
                                    id={"logoutIconButton"}
                                    onClick={() => logout()}>
                                    <CancelPresentationIcon className={"icon"} id={"logoutIcon"}/>
                                    <span id={"logoutIconButtonTooltip"}>Kijelentkezés</span>
                                </IconButton>
                            </div>
                            {'  '}
                            {hasRole(["admin"]) &&
                            <div id="adminPage">
                                <Link to={`/${path}/users`}>
                                    <IconButton id={"adminPageIconButton"} >
                                        <PeopleAltOutlinedIcon className={"icon"} id={"adminPageIcon"}/>
                                        <span id={"adminPageButtonTooltip"}>Felhasználók</span>
                                    </IconButton>
                                </Link>
                            </div>}
                        </div>
                    }
                </>}
                <div className="title">
                    <Link to="/">
                        <h2 id="appTitle">Soccer League Manager</h2>
                    </Link>
                    {displayHeaderTitle() ?
                        (<h3 id="locationHeaderTitle">{createName(path)}</h3>) : null}
                </div>
            </div>
            {location.pathname !== "/" ? renderHeaderButtons() : null}
        </HeaderStyle>
    );
}

export default Header;