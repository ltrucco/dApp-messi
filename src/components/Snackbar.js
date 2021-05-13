import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
        borderRadius:'20px'
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        borderRadius:'20px'
    },
    info: {
        backgroundColor: '#004c2d',
        borderRadius:'20px'
    },
    warning: {
        backgroundColor: amber[700],
        borderRadius:'20px'
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        color: '#fafafa'
    },
}));

CustomSnackbar.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    timer: PropTypes.number,
};

  function CustomSnackbar(props) {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const { className, message, onClose, variant , timer} = props;
    const Icon = variantIcon[variant];

    function handleClose(event, reason) {
        if (reason === 'clickaway')
            return;

        setOpen(false);
        onClose();
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={timer}
                onClose={handleClose}
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                className={clsx(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
            />
        </div>
    );
};
   



export default CustomSnackbar;