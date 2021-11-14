// import React, { useState } from 'react'
// import InputBase from '@material-ui/core/InputBase'
// import { alpha, makeStyles } from '@material-ui/core/styles'
// import SearchIcon from '@material-ui/icons/Search'
// import { Cancel} from '@material-ui/icons'
//
// const useStyles = makeStyles(theme => ({
//   search: {
//     position: 'relative',
//     borderRadius: '30px',
//     boxShadow: `2px 3px 5px ${alpha('#000000', 0.16)}`,
//     backgroundColor: alpha('#fff', 1),
//     '&:hover': {
//       backgroundColor: alpha('#fff', 1)
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       width: 'auto'
//     },
//     [theme.breakpoints.down('sm')]: {
//       display: props => (props.open ? 'flex' : 'none'),
//       width: '80%',
//       transform: 'translateX(20px)'
//     }
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     color: '#A6A4A4',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//
//   cancelIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     [theme.breakpoints.up('sm')]: {
//       display: 'none'
//     }
//   },
//
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     color: '#A6A4A4',
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '80%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch'
//       }
//     }
//   }
// }))
//
// export default function SearchAppBar ({ open, setOpen }) {
//   const classes = useStyles({ open })
//
//   return (
//     <div className={classes.search}>
//       <div className={classes.searchIcon}>
//         <SearchIcon />
//       </div>
//       <InputBase
//         placeholder='Search…'
//         classes={{
//           root: classes.inputRoot,
//           input: classes.inputInput
//         }}
//         inputProps={{ 'aria-label': 'search' }}
//       />
//       <div className={classes.cancelIcon}>
//         <Cancel onClick={() => setOpen(false)} />
//       </div>
//     </div>
//   )
// }
