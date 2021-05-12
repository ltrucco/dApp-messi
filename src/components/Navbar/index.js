import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu,NavLinks, NavItem, NavBtn, NavBtnLink} from './NavbarElements'
import {animateScroll as scroll} from 'react-scroll'

const Navbar = ({toggle}) => {

    const [scrollNav, setScrollNav] = useState(false)

    useEffect(() =>{
        window.addEventListener('scroll', changeNav)
    }, [])

    const changeNav = () => {
        if(window.scrollY >= 200){
            setScrollNav(true)
        }else{
            setScrollNav(false)
        }
    }

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={toggleHome}>
                            Messi Finance
                        </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars/>
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to="liveStreams" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Live Streams</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="graphic" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Graphic analysis</NavLinks>
                            </NavItem>
                            {/* <NavItem>
                                <NavLinks to="services" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Services</NavLinks>
                            </NavItem> */}
                            <NavItem>
                                <NavLinks to="predictions" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Predictions</NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink to="/signin">Sign In</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
