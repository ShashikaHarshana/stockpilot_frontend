import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import useTable from '../components/hooks/useTable'
import NavBar from '../components/NavBar'
import Controls from '../components/controls/Controls'
import CloseIcon from '@material-ui/icons/Close'

const headCells = [
  //   { id: 'no', label: 'No', disableSorting: true },

  { id: 'symbol', label: 'Symbol' },

  { id: 'price', label: 'Price' },
  { id: 'change', label: 'Change%' },
  { id: 'high', label: 'High' },
  { id: 'low', label: 'Low' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({})

const WatchList = () => {
  const classes = useStyles()
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })

  const records = [
    {
      id: 1,

      symbol: 'BBTCD',
      price: '$3000',
      change: '0.024565',
      high: '0.3525',
      low: '0.2321'
    },
    {
      id: 2,

      symbol: 'AAPL',
      price: '$3000',
      change: '0.024565',
      high: '0.3525',
      low: '0.2321'
    }
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn)

  return (
    <div>
      <NavBar />
      <Paper>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                {/* <TableCell>{item.id}</TableCell> */}
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.change}</TableCell>
                <TableCell>{item.high}</TableCell>
                <TableCell>{item.low}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color='secondary'
                    // onClick={() => {
                    //   setConfirmDialog({
                    //     isOpen: true,
                    //     title: 'Are you sure to delete this record?',
                    //     subTitle: "You can't undo this operation",
                    //     onConfirm: () => {
                    //       onDelete(item.id)
                    //     }
                    //   })
                    // }}
                  >
                    <CloseIcon fontSize='small' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
    </div>
  )
}

export default WatchList
