import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavLinks, NavItem, NavBtn, NavBtnLink } from './NavbarElements'
import { animateScroll as scroll } from 'react-scroll'
import { connectWallet } from '../../components/Metamask.js'
import Web3 from 'web3'
import {contract} from '../../constants/contract.js'


const Navbar = ( { toggle } ) => {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');


    const [scrollNav, setScrollNav] = useState( false )
    const [walletAddress, setWalletAddress] = useState( '' )

    useEffect( () => {
        window.addEventListener( 'scroll', changeNav )
    }, [] )

    React.useEffect( () => {
        const checkConnection = async () => {
            // Check if browser is running Metamask
            let web3;
            if ( window.ethereum ) {
                web3 = new Web3( window.ethereum );
            } else if ( window.web3 ) {
                web3 = new Web3( window.web3.currentProvider );
            };

            // Check if User is already connected by retrieving the accounts
            web3.eth.getAccounts()
                .then( async ( addr ) => {
                    if ( addr[0] ) {
                        setWalletAddress( addr[0].substring( 0, 4 ) + '...' + addr[0].substring( addr[0].length - 4, addr[0].length ) )

                        let balance = await web3.eth.getBalance(addr[0])
                        
                        console.log(balance / 1000000000000000000)
                        
                        // const tokenAddress = {
                        //     address: '0xc1eceb0821d492217bdbbaafaddd4ab1cb43da9d',
                        //     token: 'MESSI'
                        // }
                        let tokenABI = [{
                            "constant": true,
                            "inputs": [
                              {
                                "name": "_owner",
                                "type": "address"
                              }
                            ],
                            "name": "balanceOf",
                            "outputs": [
                              {
                                "name": "balance",
                                "type": "uint256"
                              }
                            ],
                            "payable": false,
                            "type": "function"
                          }]
                        const tokenInst = new web3.eth.Contract(tokenABI,'0x2b591e99afe9f32eaa6214f7b7629768c40eeb39');
                        const balanceMessi = await tokenInst.methods.balanceOf(addr[0]).call()
                        console.log('messi' + balanceMessi)


                    }
                } );

        };
        checkConnection();
    }, [] );

    const changeNav = () => {
        if ( window.scrollY >= 200 ) {
            setScrollNav( true )
        } else {
            setScrollNav( false )
        }
    }

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const checkWallet = async () => {
        let walletInfo = await connectWallet()
        if ( walletInfo.hasMetamask ) {
            let address = walletInfo.address[0]
            setWalletAddress( address.substring( 0, 4 ) + '...' + address.substring( address.length - 4, address.length ) )
            let balance = Web3.eth.getBalance( "0x407d73d8a49eeb85d32cf465507dd71d507100c1" )
            console.log( balance )
        } else {
            alert( walletInfo.status )
        }
    }

    const disconectWallet = async () => {

    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={toggleHome}>
                            Messi Finance
                        </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
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
                            <NavBtnLink onClick={walletAddress === '' ? checkWallet : disconectWallet}>{walletAddress === '' ? 'Connect' : walletAddress}</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
