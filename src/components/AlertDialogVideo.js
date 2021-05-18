import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import YoutubeEmbed from './YoutubeEmbed';
import { StoreContext } from '../Context/Store'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogVideo({closePopUp, }) {

  const { state, dispatch } = React.useContext( StoreContext )
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
          <div >
            <YoutubeEmbed embedId={state.liveUrl} />

          </div>
      
      </Dialog>
  );
}