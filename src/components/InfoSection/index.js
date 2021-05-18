import React, {useEffect} from 'react'
import { Button } from '../ButtonElement'
import {InfoContainer, InfoWrapper, InfoRow, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Column2, ImgWrap, Img} from './InfoSectionElements'
import { StoreContext } from '../../Context/Store'
import CustomSnackbar from '../Snackbar'
import AlertDialogVideo from '../AlertDialogVideo'
import { apiCalls } from '../../api/apiCalls'
import AlertDialogGraphics from '../AlertDialogGraphics'


const InfoSection = ({lightBg, id, imgStart, topLine, lightText, darkText, buttonLabel, alt, img, headline, description, primary, dark, dark2}) => {

    const { state, dispatch } = React.useContext( StoreContext )
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [openDialogStream, setOpenDialogStream] = React.useState(false)
    const [openDialogGraphics, setOpenDialogGraphics] = React.useState(false)


    

    const checkTokenAmmount = () => {
        let tokensAvailable = (state.messiTokensAvailable / 100000000000000000000).toFixed(2)
        let tokensNeeded = state.tokenAmmount
        if (tokensNeeded == ''){
            setMessage('Hubo un problema para obtener la cantidad de tokens necesarios para acceder al vivo!')
            setShowSnackbar(true)
        }else{
            if (tokensAvailable >= parseInt(tokensNeeded)){
                if (state.liveUrl !== ''){
                    setOpenDialogStream(true)
                }
                else{
                    setMessage('Hubo un problema para cargar la direccion del vivo!')
                    setShowSnackbar(true)
                }
    
            }else{
                setMessage('Para poder acceder al vivo debes poseer al menos ' + tokensNeeded + ' $messi')
                setShowSnackbar(true)
            }
        }
        
    }

    const closeSnackbar = () => {
        setShowSnackbar(false)
    }

    const checkGraphicsAmount = () => {
        let tokensAvailable = (state.messiTokensAvailable / 100000000000000000000).toFixed(2)
        let tokensNeeded = state.tokenAmmount
        if (tokensNeeded == ''){
            setMessage('Hubo un problema para obtener la cantidad de tokens necesarios para acceder a las graficas!')
            setShowSnackbar(true)
        }else{
            if (tokensAvailable >= parseInt(tokensNeeded)){
                    setOpenDialogGraphics(true)
            }else{
                setMessage('Para poder acceder a las graficas debes poseer al menos ' + tokensNeeded + ' $messi')
                setShowSnackbar(true)
            }
        }
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
                                    {buttonLabel !== "" && <Button onClick={id == 'liveStreams' ? checkTokenAmmount : checkGraphicsAmount}
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
                {openDialogGraphics && <AlertDialogGraphics closePopUp={() => setOpenDialogGraphics(false)} />}

            </InfoContainer>
        </>
    )
}

export default InfoSection
