import styled from 'styled-components';

export const NavHeader = styled.nav`
    z-index: 1000;
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom, rgba(var(--bd-violet-rgb), 1), rgba(var(--bd-violet-rgb), 0.95));
`

export const NavWrap = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`

export const NavLogo = styled.h1`
    cursor: pointer;
    color: #fff;
`