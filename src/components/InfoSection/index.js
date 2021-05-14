import React from 'react'
import { Button } from '../ButtonElement'
import {InfoContainer, InfoWrapper, InfoRow, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Column2, ImgWrap, Img} from './InfoSectionElements'
import { StoreContext } from '../../Context/Store'
import CustomSnackbar from '../Snackbar'
import AlertDialogVideo from '../AlertDialogVideo'


const InfoSection = ({lightBg, id, imgStart, topLine, lightText, darkText, buttonLabel, alt, img, headline, description, primary, dark, dark2}) => {

    const { state, dispatch } = React.useContext( StoreContext )
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [openDialogStream, setOpenDialogStream] = React.useState(false)


    const checkTokenAmmount = () => {
        let tokensAvailable = (state.messiTokensAvailable / 100000000000000000000).toFixed(2)
        if (tokensAvailable >= 2000000000){
            setOpenDialogStream(true)
            // setShowSnackbar(true)
        }else{
            setMessage('You must have at least 20.000.000.000 $messi to access Live Broadcasts')
            setShowSnackbar(true)
        }
    }

    const closeSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine> {topLine} </TopLine>
                                <Heading lightText={lightText}> {headline} </Heading>
                                <Subtitle darkText={darkText}> {description} </Subtitle>
                                <BtnWrap>
                                    {buttonLabel !== "" && <Button onClick={checkTokenAmmount}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact="true"
                                        offset={-80}
                                        primary={primary ? 1 : 0}
                                        dark = {dark ? 1: 0}
                                        dark2 = {dark2 ? 1: 0}
                                        
                                    >{buttonLabel}</Button>}
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
                {showSnackbar && <CustomSnackbar onClose={() => closeSnackbar()} variant={'info'} message={message} timer={5000} />}
                {openDialogStream && <AlertDialogVideo closePopUp={() => setOpenDialogStream(false)} />}
            </InfoContainer>
        </>
    )
}

export default InfoSection
