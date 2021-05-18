import React, {useState, useEffect} from 'react'
import { apiCalls } from '../api/apiCalls';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/Data';
import Navbar from '../components/Navbar'
import Services from '../components/Services';
import Sidebar from '../components/Sidebar'
import { StoreContext } from '../Context/Store';

const Home =() => {

    const [isOpen, setIsOpen] = useState(false);
    const { state, dispatch } = React.useContext( StoreContext )

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getCoin()
    }, [])

    const getCoin = () => {
        apiCalls.getCoin() 
        .then((res) => {
            dispatch({
                type: 'GET_TOKEN_AMMOUNT',
                tokenAmmount: res.data[0].required
            })
        })
        .catch( ( err ) => {
            dispatch({
                type: 'GET_TOKEN_AMMOUNT',
                tokenAmmount: ''
            })
        })
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <HeroSection/>  
            <InfoSection {...homeObjOne}/>          
            <InfoSection {...homeObjTwo}/>
            {/* <Services/> */}
            <InfoSection {...homeObjThree}/>
            <Footer/>
        </>
    )
}

export default Home
