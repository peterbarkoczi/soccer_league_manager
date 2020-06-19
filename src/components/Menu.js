import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const MenuStyle = styled.div`

     .menu {
     position: absolute;
   }
   
   .menu h3 {
      color: black;
      margin: 1%;
      border: 1px solid red;
      display: inline;
      
   }
`

const Menu = () => {
    return (
        <MenuStyle>
            <div className="menu">
                <Link to="/bajnoksag"><h3>Bajnokság</h3></Link>
                <Link to="/kupak"><h3>Kupák</h3></Link>
                <Link to="/csapatok"><h3>Csapatok</h3></Link>
            </div>
        </MenuStyle>
    )
}

export default Menu;