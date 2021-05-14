import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import YoutubeEmbed from './YoutubeEmbed';
import ReactLivestream from 'react-livestream'
import ReactTwitchEmbedVideo from "react-twitch-embed-video"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogVideo({closePopUp, }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    closePopUp()
  };



  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
          {/* <div className='pointerEventNone' style={{position: 'absolute', width:'100%', height:'50%', background:'red', top:0, left: 0, pointerEvents: 'none', opacity: '10%', zIndex:'9999999999999'}}> */}
          {/* </div> */}
            {/* <YoutubeEmbed embedId="CSqX8TQvRVA" /> */}
            <ReactTwitchEmbedVideo channel="PeinateCarlitos" />
          
      
      </Dialog>
  );
}