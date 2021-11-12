import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core'
import Controls from './Controls'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import { useDispatch, useSelector } from 'react-redux'
import { closePopUp } from '../../redux/ducks/notifications'
import { handleDelete } from '../../pages/WatchList'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))

export default function ConfirmDialog ({ handleDelete }) {
  // const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { confirmationDialog } = useSelector(state => state.notifications)

  return (
    <Dialog
      open={confirmationDialog.isOpen}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{confirmationDialog.title}</Typography>
        <Typography variant='subtitle2'>
          {confirmationDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text='No'
          color='default'
          // onClick={() => setconfirmationDialog({ ...confirmationDialog, isOpen: false })}\
          onClick={() => dispatch(closePopUp())}
        />
        <Controls.Button
          text='Yes'
          color='secondary'
          // onClick={confirmationDialog.onConfirm}
          onClick={() => {
            handleDelete(confirmationDialog.item.symbol)
            dispatch(closePopUp())
          }}
        />
      </DialogActions>
    </Dialog>
  )
}
