import React from 'react'
const headCells = [
  //   { id: 'no', label: 'No', disableSorting: true },
  { id: 'symbol', label: 'Symbol' },
  { id: 'type', label: 'Message', disableSorting: true },
  { id: 'open', label: 'Open Price' },
  { id: 'peak', label: 'Current Peak' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

function NotificationModal () {
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  const { TblContainer, TblHead } = useTable(records, headCells, filterFn)

  return (
    <>
      <Paper>
        <TblContainer>
          <TblHead />
          {/* <TableRow>
              <TableCell>Crypto</TableCell>
              <TableCell>Crypto</TableCell>
              <TableCell>Crypto</TableCell>
              <TableCell>Crypto</TableCell>
            </TableRow> */}
          <TableBody>
            {notifications &&
              newNotifications.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item[1].symbol}</TableCell>
                  <TableCell>{item[1].type}</TableCell>
                  <TableCell>
                    {parseFloat(item[1]['open price']).toFixed(4)}
                  </TableCell>
                  <TableCell>{item[1]['current peak price']}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color='secondary'
                      onClick={() => handleDelete(item[0])}
                    >
                      <CloseIcon fontSize='small' />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TblContainer>
      </Paper>
    </>
  )
}

export default NotificationModal
