import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavLinks, NavItem, NavBtn, NavBtnLink, NavBtnLinkToken, NavBtnLinkPancake} from './NavbarElements'
import { animateScroll as scroll } from 'react-scroll'
import { connectWallet, disconnectWalletMetamask } from '../../components/Metamask.js'
import Web3 from 'web3'
import {contract} from '../../constants/contract.js'
import {tokenABI} from '../../constants/tokenABI.js'
import AlertDialogSlide from '../AlertDialogSlide'
import { StoreContext } from '../../Context/Store'
import {apiCalls} from '../../api/apiCalls'

const Navbar = ( { toggle } ) => {
    // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    // window.ethereum.on('disconnect', () => alert('error'));
    const { state, dispatch } = React.useContext( StoreContext )
    const [scrollNav, setScrollNav] = useState( false )
    const [showPopUpDisconnect, setShowPopUpDisconnect] = useState(false)

    useEffect( () => {
        window.addEventListener( 'scroll', changeNav )
    }, [] )

    React.useEffect( () => {
        // document.addEventListener('disconnect', eventDisconnectWallet, false);

        getLiveUrl()

        const checkConnection = async () => {
            // Check if browser is running Metamask
            let web3;
            if ( window.ethereum ) {
                web3 = new Web3( window.ethereum );
            } else if ( window.web3 ) {
                web3 = new Web3( window.web3.currentProvider );
            };

            // Check if User is already connected by retrieving the accounts
            web3?.eth?.getAccounts()
                .then( async ( addr ) => {
                    if ( addr[0] ) {
                        dispatch({
                            type: 'UPDATE_WALLET_ADDRESS',
                            walletAddress: addr[0].substring( 0, 4 ) + '...' + addr[0].substring( addr[0].length - 4, addr[0].length)
                        })
                        
                        const tokenInst = new web3.eth.Contract(tokenABI,contract);
                        const balancemessi = await tokenInst.methods.balanceOf(addr[0]).call()
                        .then((res) => {
                            dispatch({
                                type: 'UPDATE_MESSI_TOKENS',
                                messiTokensAvailable: res.toString()
                            })
                        })
                    }
                } );

        };
        checkConnection();
    }, [] );

    const getLiveUrl = () => {
        apiCalls.getLive({coin:'messi'})
        .then((res) => {
            dispatch({
                type: 'GET_LIVE_URL',
                liveUrl: res.data.liveUrl
            })
        })
        .catch( ( err ) => {
            dispatch({
                type: 'GET_LIVE_URL',
                liveUrl: ''
            })

        })

        // apiCalls.patchCoin("1")
        // .then((res) => {
        //     dispatch({
        //         type: 'GET_LIVE_URL',
        //         liveUrl: res.data.liveUrl
        //     })
        // })
        // .catch( ( err ) => {
        //     dispatch({
        //         type: 'GET_LIVE_URL',
        //         liveUrl: ''
        //     })

        // })
    }

    const changeNav = () => {
        if ( window.scrollY >= 750 ) {
            setScrollNav( true )
        } else {
            setScrollNav( false )
        }
    }

    const eventDisconnectWallet = () => {
        dispatch({
            type: 'UPDATE_WALLET_ADDRESS',
            walletAddress: ''
        })
    }

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const checkWallet = async () => {
        let walletInfo = await connectWallet()
        if ( walletInfo.hasMetamask ) {
            let addr = walletInfo.address[0]
            dispatch({
                type: 'UPDATE_WALLET_ADDRESS',
                walletAddress: addr.substring( 0, 4 ) + '...' + addr.substring( addr.length - 4, addr.length)
            })

            document.location.reload()

        } else {
            alert( walletInfo.status )
        }
    }

    const disconnectWallet = async () => {
        setShowPopUpDisconnect(true)
    }
    const closePopUpDisconnect = async() => {
        setShowPopUpDisconnect(false)
        disconnectWalletMetamask()
        

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
                                <NavLinks to="liveStreams" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Livestreams</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="graphic" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Graphic analysis</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="predictions" smooth={true} duration={500} spy={true} exact='true' offset={-80} >Predictions</NavLinks>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink onClick={() => state.walletAddress === '' ? checkWallet() : disconnectWallet()}>{state.walletAddress === '' ? 'Connect' : state.walletAddress}</NavBtnLink>
                            {state.messiTokensAvailable && <NavBtnLinkToken >{(state.messiTokensAvailable / 100000000000000000000).toFixed(2)}</NavBtnLinkToken>}
                            <NavBtnLinkPancake href="//exchange.pancakeswap.finance/#/swap?inputCurrency=0xC1ecEB0821d492217bdbbAAfaDdD4aB1Cb43dA9d&outputCurrency=BSC" target="_blank">Buy $messi</NavBtnLinkPancake>
                        </NavBtn>
                        {showPopUpDisconnect && <AlertDialogSlide closePopUp={() => setShowPopUpDisconnect(false)} closePopUpDisconnect={() => closePopUpDisconnect()}/> }
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
