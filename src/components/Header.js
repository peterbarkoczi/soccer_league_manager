import React, {useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import background from "../red-soccer-bg2.jpg"
import {LeagueContext} from "./contexts/LeagueContext";
import {Button} from "react-bootstrap";

const HeaderStyle = styled.div`
   display: flex;
   
   .header {
     width: 100%;
     background-image: url(${background});
     margin-bottom: 3%;
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
    
   .selectedLeague {
      float: left;
      clear: left;
      margin-top: 1%;
    }
    
`;

function Header() {

    const {isSelected, setIsSelected, setShowLeaguesDiv} = useContext(LeagueContext);

    function clickOnTitle() {
        setShowLeaguesDiv(true);
        setIsSelected(false);
        localStorage.clear();
    }

    return (
        <HeaderStyle>
            <div className="header">
                <div className="login">
                    <Button variant="secondary">Bejelentkezés</Button>{' '}
                    <Button variant="secondary">Regisztráció</Button>
                </div>
                <div className="title">
                    <Link to="/" onClick={clickOnTitle}>
                        <h2>Soccer League Manager</h2>
                    </Link>
                    <h3>{localStorage.getItem("leagueName") != null ? localStorage.getItem("leagueName") : null}</h3>
                </div>
                {isSelected ? (
                    <div className="menu">
                        <Link to={`/${localStorage.getItem("path")}/bajnoksag`}><h3>Bajnokság</h3></Link>
                        <Link to={`/${localStorage.getItem("path")}/kupak`}><h3>Kupák</h3></Link>
                        <Link to={`/${localStorage.getItem("path")}/csapatok`}><h3>Csapatok</h3></Link>
                    </div>
                ) : null}
            </div>
        </HeaderStyle>
    );
}

export default Header;