// import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// // import notifications from '../../utils/data'
// import useTable from '../hooks/useTable'
// import Controls from '../controls/Controls'
// import CloseIcon from '@material-ui/icons/Close'
// import { deleteNotification } from '../../redux/ducks/notifications'
//
// const headCells = [
//   //   { id: 'no', label: 'No', disableSorting: true },
//   { id: 'symbol', label: 'Symbol' },
//   { id: 'type', label: 'Message', disableSorting: true },
//   { id: 'open', label: 'Open Price' },
//   { id: 'peak', label: 'Current Peak' },
//   { id: 'actions', label: 'Actions', disableSorting: true }
// ]
//
// function NotificationModal () {
//   const notificationsNum = 1
//   const [filterFn, setFilterFn] = useState({
//     fn: items => {
//       return items
//     }
//   })
//   const { notifications } = useSelector(state => state.notifications)
//   const { TblContainer, TblHead } = useTable(notifications, headCells, filterFn)
//   const dispatch = useDispatch()
//
//   const handleDelete = time => {
//     dispatch(deleteNotification(time))
//   }
//
//   return (
//     <>
//       {notifications.length === 0 ? (
//         <h1 data-testid="notifModel">No new Notifications</h1>
//       ) : (
//         <Paper >
//           <TblContainer>
//             <TblHead />
//
//             <TableBody>
//               {notifications &&
//                 notifications.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item[1].symbol}</TableCell>
//                     <TableCell>{item[1].type}</TableCell>
//                     <TableCell data-testid='open'>
//                       {parseFloat(item[1]['open price']).toFixed(4)}
//                     </TableCell>
//                     <TableCell>{item[1]['current peak price']}</TableCell>
//                     <TableCell >
//                       <Controls.ActionButton
//                         color='secondary'
//                         onClick={() => handleDelete(item[0])}
//                       >
//                         <CloseIcon fontSize='small' />
//                       </Controls.ActionButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </TblContainer>
//         </Paper>
//       )}
//     </>
//   )
// }
//
// export default NotificationModal
