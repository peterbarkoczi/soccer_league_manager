import React, {useContext} from "react";
import {Link} from "react-router-dom";
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

    const {isSelected, setIsSelected, setShowLocationDiv} = useContext(DataPackContext);

    function reset() {
        setShowLocationDiv(true);
        setIsSelected(false);
        localStorage.clear();
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
                    {localStorage.getItem("location") != null ?
                        (<h3 id="locationHeaderTitle">{localStorage.getItem("location")}</h3>) : null}
                </div>
                {isSelected ? (
                    <ButtonGroup className="menu">
                        <Link to={`/${localStorage.getItem("path")}/bajnoksag`}>
                            <Button variant="danger" size="lg" id="navButtonSubLeague">Bajnokság</Button>
                        </Link>
                        <Link to={`/${localStorage.getItem("path")}/kupak`}>
                            <Button variant="danger" size="lg" id="navButtonCups">Kupák</Button>
                        </Link>
                        <Link to={`/${localStorage.getItem("path")}/csapatok`}>
                            <Button variant="danger" size="lg" id="navButtonTeams">Csapatok</Button>
                        </Link>
                    </ButtonGroup>
                ) : null}
            </div>
        </HeaderStyle>
    );
}

export default Header;