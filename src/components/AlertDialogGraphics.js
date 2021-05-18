import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import YoutubeEmbed from './YoutubeEmbed';
import { StoreContext } from '../Context/Store'
import { Divider, Grid, Typography } from '@material-ui/core';
import { apiCalls } from '../api/apiCalls';


const useStyles = makeStyles( {
    title: {
        fontSize: '50px',
        fontWeight: 'bold',
        color: '#000',
        paddingLeft: '50px'
    },
    description: {
        fontSize: '20px',
        fontWeight: 'light',
        color: '#000',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    },
    dateTime: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#000',
        alignItems: 'center',
        textAlign: 'right',
        justifyContent: 'center'
    },
} );

const Transition = React.forwardRef( function Transition ( props, ref ) {
    return <Slide direction="up" ref={ref} {...props} />;
} );

export default function AlertDialogVideo ( { closePopUp, showId } ) {

    const { state, dispatch } = React.useContext( StoreContext )
    const [open, setOpen] = React.useState( true );
    const [showEmpty, setShowEmpty] = React.useState( false );
    const [graphicsData, setGraphicsData] = React.useState( [] )

    const classes = useStyles();

    React.useEffect( () => {
        getGraphicsData()
    }, [] )

    const handleClose = () => {
        setOpen( false );
        closePopUp()
    };

    const getGraphicsData = () => {
        apiCalls.getGraphicsData( {
            coin: 'messi'
        } )
            .then( ( res ) => {
                setGraphicsData( res.data )
                if (res.data.length == 0 ){
                    setShowEmpty(true)
                }else{
                    setShowEmpty(false)
                }
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    };

    const drawimages = (img) => {
        return img.map( i =>
            <>
                <img height='450px' width='60%' src={i.imgBase64} alt="Graphics" className='alignItems' /> 

            </>

        )        
    }

    const deleteImage = (id) => {
        apiCalls.deleteImage(id).then((res) => getGraphicsData())
    } 

    const drawImagesWithX = (img) => {
        return img.map( i =>
            <>
                <Grid container direction='row'  >
                    <Grid item xs={11} md={11} lg={11} style={{ padding: '30px 0px' }}>
                        <img height='450px' width='60%' src={i.imgBase64} alt="Graphics" className='alignItems' /> 
                    </Grid>
                    <Grid item xs={1} md={1} lg={1} style={{ padding: '30px 0px' }}>
                        <h1 onClick={() => deleteImage(i.id)}>X</h1>
                    </Grid>

                </Grid>
            </>

        )        
    }

    

    const drawGraphics = () => {
        return graphicsData.map( (g,i) =>
            <>
                <div style={{ padding: '20px', width: '100%',  }}>
                    <Grid container direction='row'  >
                        {showId && <Grid item xs={1} md={1} lg={1} style={{ padding: '30px 0px' }}>
                            <Typography className={classes.title}>#{g.id}</Typography>
                        </Grid>}
                        <Grid item xs={8} md={8} lg={8} style={{ padding: '30px 0px' }}>
                            <Typography className={classes.title}>{g.coinAnalyzed}</Typography>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} style={{ padding: '30px 0px' }}>
                            <Typography className={classes.dateTime}>{g.fechaHora}</Typography>

                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ padding: '30px 0px' }}>
                            <Typography className={classes.description}>{g.description}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} className='alignItems' style={{ padding: '30px 0px' }}>
                            {showId ? drawImagesWithX(g.imgBase64) :drawimages(g.imgBase64)}
                        </Grid>
                        
                    </Grid>
                </div>
                <Divider/>
            </>

        )

    }



    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth='lg' // set width according to defined material ui breakpoints
            onClose={handleClose}
        >
            <Divider/>
            <DialogContent className='scrollbar' style={{ height: '80vh', border: '10px solid #4b4b4b', background: 'linear-gradient(108deg, #64b3f4, #c2e59c)',  }}>
                <Typography className={classes.title}> Análisis Gráfico</Typography>
                {drawGraphics()}
                {showEmpty && <h2 style={{padding: '100px 40px'}}>Aun no hay graficos subidos para visualizar</h2>}

            </DialogContent>
        </Dialog>
    );
}