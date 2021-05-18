import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { apiCalls } from '../../api/apiCalls'
import { Container, FormContent, FormH1, FormLabel, FormWrap, Icon, Form, FormInput, FormButton, Text, CardWrapper, ButtonConfirm, ButtonViewGraphics } from './SigninElements'
import { StoreContext } from '../../Context/Store';
import CustomSnackbar from '../Snackbar'
import ImageUploader from 'react-images-upload';
import AlertDialogGraphics from '../AlertDialogGraphics'

const Signin = () => {

    const [username, setUsername] = React.useState( '' )
    const [password, setPassword] = React.useState( '' )
    const [showSnackbar, setShowSnackbar] = React.useState( false );
    const [graphicsData, setGraphicsData] = React.useState([])
    const [message, setMessage] = React.useState( '' )
    const [linkUrl, setLinkUrl] = React.useState( '' )
    const [tokenQuantity, setTokenQuantity] = React.useState( '' )
    const [coinAnalyzed, setCoinAnalyzed] = React.useState( '' )
    const [description, setDescription] = React.useState( '' )
    const [coinAnalyzedCreate, setCoinAnalyzedCreate] = React.useState( '' )
    const [descriptionCreate, setDescriptionCreate] = React.useState( '' )
    const [picturesCreate, setPicturesCreate] = React.useState( [] )
    const [id, setId] = React.useState( '' )
    const [openDialogGraphics, setOpenDialogGraphics] = React.useState( false )
    const [pictures, setPictures] = React.useState( [] )
    const [snackbarType, setSnackbarType] = React.useState('info')

    const { state, dispatch } = React.useContext( StoreContext )

    React.useEffect( () => {
    },[])

    const onDrop = ( picture ) => {
        let picturesAux = JSON.parse( JSON.stringify( pictures ) )
        var reader = new FileReader();
        reader.readAsDataURL( picture[0] );
        reader.onload = function () {
            picturesAux.push( { imgBase64: reader.result } )
            setPictures( picturesAux )
        };
        reader.onerror = function ( error ) {
            console.log( 'Error: ', error );
        };

    }

    const onDropCreate = ( picture ) => {
        let picturesAux = JSON.parse( JSON.stringify( picturesCreate ) )
        var reader = new FileReader();
        reader.readAsDataURL( picture[0] );
        reader.onload = function () {
            picturesAux.push( { imgBase64: reader.result } )
            setPicturesCreate( picturesAux )
        };
        reader.onerror = function ( error ) {
            console.log( 'Error: ', error );
        };

    }

    const logIn = () => {
        if ( username == '' ) {
            setMessage( 'Debe completar el campo Usuario' )
            setSnackbarType('warning')
            setShowSnackbar( true )
        } else if ( password == '' ) {
            setMessage( 'Debe completar el campo Contraseña' )
            setSnackbarType('warning')
            setShowSnackbar( true )
        } else {
            let password64 = btoa( btoa( btoa( btoa( password ) ) ) )
            apiCalls.logIn( {
                username: username,
                password: password64
            } )
                .then( ( res ) => {
                    if ( res.data ) {
                        dispatch( {
                            type: 'LOG_IN',
                            isLogged: true
                        } )
                        getGraphicsData()
                    } else {
                        setMessage( 'Usuario o contraseña incorrectos' )
                        setSnackbarType('error')
                        setShowSnackbar( true )
                    }
                } )
        }

    }

    const getGraphicsData = () => {
        apiCalls.getGraphicsData( {
            coin: 'messi'
        } )
            .then( ( res ) => {
                setGraphicsData( res.data )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    };

    const closeSnackbar = () => {
        setShowSnackbar( false )
    }

    const changeLiveUrl = () => {
        if (linkUrl !== ''){
            apiCalls.changeLive( linkUrl, { coin: 'messi' } )
            .then( ( res ) => {
                setMessage( 'Se cambio la URL del vivo correctamente' )
                setSnackbarType('success')
                setShowSnackbar( true )
                setLinkUrl('')
            } )
            .catch( ( err ) => {
                setMessage( 'Hubo un error para cambiar la url del vivo' )
                setSnackbarType('error')
                setShowSnackbar( true )

            } )
        }else{
            setMessage( 'El campo de direccion de enlace no puede estar vacio' )
            setSnackbarType('warning')
            setShowSnackbar( true )
        }
        
    }

    const changeTokensQuantity = () => {
        if (tokenQuantity !== ''){
            apiCalls.patchCoin( tokenQuantity )
            .then( ( res ) => {
                console.log( res.data )
                setMessage( 'Se cambio la cantidad de tokens requeridos para ver el vivo correctamente (' + tokenQuantity + ' tokens)' )
                setSnackbarType('success')
                setShowSnackbar( true )
                setTokenQuantity('')
            } )
            .catch( ( err ) => {
                setMessage( 'Hubo un error para cambiar la cantidad de tokens para poder ver el vivo' )
                setSnackbarType('error')
                setShowSnackbar( true )
            } )
        }else{
            setMessage( 'El campo de cantidad de tokens no puede estar vacio' )
            setSnackbarType('warning')
            setShowSnackbar( true )
        }
        
    }

    const drawURLSection = () => {
        return (
            <div className={"cardStyles"}>
                <h1 className='titleCards'>Editar enlace del vivo</h1>
                <p className='pCards'>Solo colocar lo que esta luego del =.Por ejemplo, si el link es: https://www.youtube.com/watch?v=__clpN2rkps, , colocar __clpN2rkps</p>
                <Grid container style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label={'Link URL'} placeholder={'Link URL'} value={linkUrl} onChange={( e ) => setLinkUrl( e.target.value )} style={{ width: '80%', padding: '20px' }}></TextField>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2}>
                        <ButtonConfirm onClick={() => changeLiveUrl()} >Enviar</ButtonConfirm>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const drawTokenQuantitySection = () => {
        return (
            <div className={"cardStyles"}>
                <h1 className='titleCards'>Editar tokens requeridos para el vivo</h1>
                <p className='pCards'>Simplemente poner la cantidad de tokens</p>
                <Grid container style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label={'Cantidad del token'} placeholder={'Cantidad del token'} value={tokenQuantity} onChange={( e ) => setTokenQuantity( e.target.value )} style={{ width: '80%', padding: '20px' }}></TextField>
                    </Grid>

                    <Grid item xs={2} lg={2} md={2}>
                        <ButtonConfirm onClick={() => changeTokensQuantity()} >Enviar</ButtonConfirm>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const changeGraphicsData = () => {
        if (id !== '' && coinAnalyzed !== '' && description !== ''){
            if(coinAnalyzed !== 'No existe un analisis con ese ID' && description !== 'No existe un analisis con ese ID'){
                let fecha = new Date()
                let minutes = fecha.getMinutes()
                let horas = fecha.getHours()
                let mes = fecha.getMonth()
                let dia = fecha.getDate()
                dia = dia < 10 ? '0' + dia : dia
                mes = mes < 10 ? '0' + mes : mes
                horas = horas < 10 ? '0' + horas : horas
                minutes = minutes < 10 ? '0' + minutes : minutes
                let fechaString = dia + '/' + mes + '/' + fecha.getFullYear() + ' ' + horas + ':' + minutes
        
                apiCalls.putGraphic( {
                    id: id,
                    coinAnalyzed: coinAnalyzed,
                    description: description,
                    imgBase64: pictures,
                    fechaHora: fechaString,
                    coin: 'messi'
                } ).then( ( res ) => {
                    setMessage( 'El grafico ID:' + id + '  ' + coinAnalyzed + ' se modifico correctamente' )
                    setSnackbarType('success')
                    setShowSnackbar( true )
                    setId('')
                    setCoinAnalyzed('')
                    setDescription('')
                    setPictures({})
        
                } ).catch( ( err ) => {
                    setMessage( 'Hubo un error al modificar el grafico' )
                    setSnackbarType('error')
                    setShowSnackbar( true )
                } )
            }else{
                setMessage( 'No se puede modificar un grafico inexistente' )
                setSnackbarType('warning')
                setShowSnackbar( true )
            }
            
        }else{
            setMessage( 'Para modificar un grafico debe completar todos los campos' )
            setSnackbarType('warning')
            setShowSnackbar( true )
        }
        
    }
    
    const changeIdSelected = (id) => {
        setId(id)
        let graphicSelected = graphicsData.find(g => g.id == id)
        if (graphicSelected){
            setCoinAnalyzed(graphicSelected.coinAnalyzed)
            setDescription(graphicSelected.description)
        }else{
            setCoinAnalyzed('No existe un analisis con ese ID')
            setDescription('No existe un analisis con ese ID')
        }
    }

    const drawEditGraphicsData = () => {
        return (
            <div className={"cardStyles"}>
                <h1 className='titleCards'>Editar Analisis</h1>
                <p className='pCards'>Elegi el id de un grafico y modifica los datos que posee, tene en cuenta que si agregas imagenes, van a pisarse las que ya contiene, y si
                    no agregas ninguna, se van a mantener las previas de este analisis</p>
                <ButtonViewGraphics onClick={() => setOpenDialogGraphics( true )} >Ver graficos existentes</ButtonViewGraphics>
                <Grid container style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label='ID' placeholder='ID del analisis que vayas a cambiar' value={id} onChange={( e ) => changeIdSelected( e.target.value )} style={{ width: '80%', padding: '10px 0px' }}></TextField>
                    </Grid>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label='Titulo' placeholder='Titulo del analisis' value={coinAnalyzed} onChange={( e ) => setCoinAnalyzed( e.target.value )} style={{ width: '80%', padding: '10px 0px' }}></TextField>
                    </Grid>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label='Descripcion' placeholder='Descripcion del analisis' value={description} onChange={( e ) => setDescription( e.target.value )} style={{ width: '80%', padding: '10px 0px' }}></TextField>
                    </Grid>
                    <Grid item xs={10} lg={10} md={10}>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif',]}
                            maxFileSize={5242880}
                        />
                    </Grid>

                    <Grid item xs={2} lg={2} md={2}>
                        <ButtonConfirm onClick={() => changeGraphicsData()} >Enviar</ButtonConfirm>
                    </Grid>
                    <Grid item xs={9} lg={9} md={9}>
                        {pictures.length >= 1 &&
                            <h2>
                                {pictures.length + ( pictures.length > 1 ? ' imagenes para subir' : ' imagen para subir' )}
                            </h2>}
                    </Grid>

                </Grid>
            </div>
        )
    }

    const createGraphicsData = () => {
        if ( coinAnalyzedCreate !== '' && descriptionCreate !== '' && picturesCreate.length > 0){
            let fecha = new Date()
            let minutes = fecha.getMinutes()
            let horas = fecha.getHours()
            let mes = fecha.getMonth()
            let dia = fecha.getDate()
            dia = dia < 10 ? '0' + dia : dia
            mes = mes < 10 ? '0' + mes : mes
            horas = horas < 10 ? '0' + horas : horas
            minutes = minutes < 10 ? '0' + minutes : minutes
            let fechaString = dia + '/' + mes + '/' + fecha.getFullYear() + ' ' + horas + ':' + minutes

            apiCalls.postGraphicsData( {
                coinAnalyzed: coinAnalyzedCreate,
                description: descriptionCreate,
                imgBase64: picturesCreate,
                fechaHora: fechaString,
                coin: 'messi'
            } ).then( ( res ) => {
                setMessage( 'El grafico  ' + coinAnalyzedCreate + ' se modifico correctamente' )
                setSnackbarType('success')
                setShowSnackbar( true )
                setCoinAnalyzedCreate('')
                setDescriptionCreate('')
                setPicturesCreate([])
                getGraphicsData()
            } ).catch( ( err ) => {
                setMessage( 'Hubo un error al añadir el grafico' )
                setSnackbarType('error')
                setShowSnackbar( true )
            } )
        }else{
            setMessage('Para añadir un grafico debe completar todos los campos y subir al menos una imagen')
            setSnackbarType('warning')
            setShowSnackbar( true )
        }

    }


    const drawCreateGraphicsData = () => {
        return (
            <div className={"cardStyles"}>
                <h1 className='titleCards'>Añadir Analisis</h1>
                <Grid container style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label='Titulo' placeholder='Titulo del analisis' value={coinAnalyzedCreate} onChange={( e ) => setCoinAnalyzedCreate( e.target.value )} style={{ width: '80%', padding: '10px 0px' }}></TextField>
                    </Grid>
                    <Grid item xs={10} lg={10} md={10}>
                        <TextField label='Descripcion' placeholder='Descripcion del analisis' value={descriptionCreate} onChange={( e ) => setDescriptionCreate( e.target.value )} style={{ width: '80%', padding: '10px 0px' }}></TextField>
                    </Grid>
                    <Grid item xs={10} lg={10} md={10}>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDropCreate}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                    </Grid>

                    <Grid item xs={2} lg={2} md={2}>
                        <ButtonConfirm onClick={() => createGraphicsData()} >Enviar</ButtonConfirm>
                    </Grid>
                    <Grid item xs={9} lg={9} md={9}>
                        {picturesCreate.length >= 1 &&
                            <h2>
                                {picturesCreate.length + ( picturesCreate.length > 1 ? ' imagenes para subir' : ' imagen para subir' )}
                            </h2>}
                    </Grid>
                </Grid>
            </div>
        )
    }

    const drawSections = () => {
        return (
            <Grid container className="containerCards">
                <Grid item xs={6} lg={6} md={6}>
                    {drawURLSection()}
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    {drawTokenQuantitySection()}
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    {drawCreateGraphicsData()}
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    {drawEditGraphicsData()}
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Messi Finance</Icon>
                    {!state.isLogged && <FormContent>
                        <Form>
                            <FormH1>Sign in to your account</FormH1>
                            <TextField id="filled-basic" label="Username" value={username} onChange={( e ) => setUsername( e.target.value )} variant="filled" className="textfieldSignIn" />
                            <   TextField id="filled-basic" label="Password" type='password' value={password} onChange={( e ) => setPassword( e.target.value )} variant="filled" className="textfieldSignIn" />

                            <FormButton onClick={() => logIn()} >Sign in</FormButton>
                        </Form>
                    </FormContent>}
                    {state.isLogged && <div>
                        {drawSections()}
                    </div>}
                </FormWrap>
                {openDialogGraphics && <AlertDialogGraphics showId={true} closePopUp={() => setOpenDialogGraphics( false )} />}
                {showSnackbar && <CustomSnackbar onClose={() => closeSnackbar()} variant={snackbarType} message={message} timer={5000} />}
            </Container>
        </>
    )
}

export default Signin
