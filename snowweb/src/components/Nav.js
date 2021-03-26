import React from "react"
import { Link } from "react-router-dom";

import styled from "styled-components"

import logo from "../images/logo.png"

const NavContainer = styled.div`
    height: 75px;
    width: auto;
    background-color: black;
    color:  #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;
`

const NavLogo = styled.div`
    height: auto;
    width: 20rem;
    padding: 1.3rem 3rem 1.3rem 3rem;
`

const LogoImage = styled.img`
    width: 100%;
    height: 100%;
`

const NavGroup = styled.div`
    height: auto;
    width: auto;
    padding: 1.3rem 3rem 1.3rem 3rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

const TempNavDiv = styled.div`
    height: auto;
    padding: 0 0 0 2rem;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-weight: normal;
    font-size: 2.5vmin;

    &:hover {
        text-decoration: none;
        color: #ffffff;
        font-weight: bold;
    }
`

function Nav() {
    return (
        <NavContainer>
            <NavLogo>
                <Link to="/">
                    <LogoImage src={logo} alt="Logo" />
                </Link>
            </NavLogo>
            <NavGroup>
                <TempNavDiv>
                    <NavLink to="/about">About</NavLink>
                </TempNavDiv>
                <TempNavDiv>
                    <NavLink to="/contribute">Contribute</NavLink>
                </TempNavDiv>
            </NavGroup>
        </NavContainer>
    )
}

export default Nav