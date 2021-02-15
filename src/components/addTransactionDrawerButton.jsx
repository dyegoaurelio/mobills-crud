import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import { AddButton } from './componentsStyles'

export default function SimplePopover ({ open: drawerOpen, openPopUp }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center' }}
    >

        <AddButton expanded={drawerOpen}
        onClick={handleClick}
        >
          Adicionar
        </AddButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <div style={{ display: 'grid' }}>
          <Button style={{ color: '#dd4444' }}
            // onClick={openPopUp('DEBT')}
          >Adicionar Despesa</Button>
          <Button style={{ color: '#41e02f' }}
            // onClick={openPopUp('INCOME')}
          >Adicionar Receita</Button>
        </div>
      </Popover>
    </div>
  )
}
