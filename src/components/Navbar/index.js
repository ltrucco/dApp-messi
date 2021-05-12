import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {IconContext} from 'react-icons/lib'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu,NavLinks, NavItem, NavBtn, NavBtnLink} from './NavbarElements'
import {animateScroll as scroll} from 'react-scroll'
import {connectWallet} from '../../components/Metamask.js'
import Web3 from 'web3'


const Navbar = ({toggle}) => {

    const [scrollNav, setScrollNav] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')

    useEffect(() =>{
        window.addEventListener('scroll', changeNav)
    }, [])

    React.useEffect(() => {
        const checkConnection = async () => {
 
            // Check if browser is running Metamask
            let web3;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            };
 
            // Check if User is already connected by retrieving the accounts
            web3.eth.getAccounts()
                .then(async (addr) => {
                    if(addr[0])
                        setWalletAddress(addr[0].substring(0,4) + '...' + addr[0].substring(addr[0].length -4 ,addr[0].length))
                });
        };
        checkConnection();
    }, []);

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

    const checkWallet = async () => {
        let walletInfo = await connectWallet()
        if (walletInfo.hasMetamask){
            let address = walletInfo.address[0]
            setWalletAddress(address.substring(0,4) + '...' + address.substring(address.length -4 ,address.length))
        }else{
            alert(walletInfo.status)
        }
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
                            <NavBtnLink onClick={checkWallet}>{walletAddress === '' ? 'Connect' : walletAddress}</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
