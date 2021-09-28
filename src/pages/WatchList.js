import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import useTable from '../components/hooks/useTable'
import NavBar from '../components/NavBar'
import Controls from '../components/controls/Controls'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core'
import {authUser} from "../redux/ducks/auth";
import {useDispatch, useSelector} from "react-redux";
import {removeFromWatchlist, viewWatchlist} from "../redux/ducks/watchlist";
import {login} from "../redux/sagas/serviceSaga";


const headCells = [
  //   { id: 'no', label: 'No', disableSorting: true },
  { id: 'symbol', label: 'Symbol' },
  { id: 'price', label: 'Price' },
  { id: 'high', label: 'High' },
  { id: 'low', label: 'Low' },
  { id: 'volume', label: 'volume' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

const useStyles = makeStyles({})

const WatchList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [records, setRecords] = useState([])
  const [records1, setRecords1] = useState(new Map())
  const [highVal, setHighVal] = useState(0)
  const token = useSelector(state => state.auth.token)
  let brands = useSelector(state => state.watchlist.brands)

  if (brands === null){
    dispatch(viewWatchlist(token))
  }

  useEffect(() => {
    if (brands !== null) {
      for (let i in brands) {
        let eventSource = new EventSource('http://localhost:5000/binance/listen/' + brands[i] + '/1d')
        eventSource.addEventListener(
            'message',
            function (e) {
              let parsedData = JSON.parse(e.data)
              let object = {
                id: i,
                symbol: brands[i],
                price: parsedData.k.c,
                high: parsedData.k.h,
                low: parsedData.k.l,
                volume: parsedData.k.v
              }
              setHighVal(parsedData.k.h)
              let tempRecords = records1;
              tempRecords.set(brands[i], object)
              setRecords1(tempRecords)
            },
            false
        )
      }
    }
  }, [brands])

  console.log(brands)
  console.log(records1)
  console.log(records)

  useEffect(() => {
    if (brands !== null && records1.size >= brands.length){
      let temp = []
      for (let i in brands) {
        temp.push(records1.get(brands[i]))
      }
      setRecords(temp)
    }
  }, [highVal])



  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn)

  const handleDelete = (symbol) => {
    dispatch(removeFromWatchlist({"token": token, "brands": symbol}))
    let tempRecords1 = records1;
    tempRecords1.delete(symbol)
    setRecords1(tempRecords1)
  }

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
                <TableCell>{item.high}</TableCell>
                <TableCell>{item.low}</TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color='secondary'
                    onClick={() => handleDelete(item.symbol)}
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
