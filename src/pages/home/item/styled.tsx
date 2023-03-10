import styled from 'styled-components';

export const ItemContainer = styled.div`
    border-radius: 10px;
    padding: 10px 30px;
    transition: .2s;

    &:hover {
        background: #fff;
        
        & h2 {
            color: #000; 
        }
    }
`

export const ItemTitle = styled.h2`
    cursor: pointer;
    transition: .2s;
    color: #796480;
`

export const ItemInfoWrap = styled.ul`
    display: flex;
    gap: 15px;
`