import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderDiv = styled.div`
   font-size: 2em;
`

function Header() {
    return(
        <HeaderDiv>
            <Link to="/">
                <h1>Soccer League Manager</h1>
            </Link>
        </HeaderDiv>
    );
}

export default Header;