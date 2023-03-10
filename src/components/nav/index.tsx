import { FC, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { NavHeader, NavLogo, NavWrap } from "./styled";

export const Nav:FC = () => {
    const navigate = useNavigate()
    const goHome = useCallback(() => navigate('/'), [navigate])
    return (
        <NavHeader>
            <NavWrap>
                <NavLogo onClick={goHome}>BR Group</NavLogo>
            </NavWrap>
        </NavHeader>
    )
}