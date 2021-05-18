import styled from 'styled-components'
import {Link} from 'react-scroll'

export const Button = styled.button`
    border-radius: 50px;
    background: ${({primary}) => (primary? '#01bf71' : '#01bf71')};
    white-space: nowrap;
    padding: ${({big}) =>(big ? '14px 48px' : '12px 30px' )};
    color: ${({dark}) => (dark ? '#010606' : '#fff')};
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    font-weight: 500;
    border:none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items:center;
    transition: all 0.2s ease-in-out;
    font-weight: 600;

    &:hover{
        transform: scale(1.02);
        transition:  0.2s ease-in-out;
        background: ${({primary}) => (primary? '#01bf71' :'#01bf71')};
    }

`