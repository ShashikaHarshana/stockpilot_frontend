import React, { useState } from 'react'
import ConfirmDialog from './controls/ConfirmDialog'

const Test = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: true,
    title: 'Do you want to Delete',
    subTitle: 'There is no going back once you delete'
  })

  return (
    <div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}

export default Test
