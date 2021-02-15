import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, AppBarRoot, Drawer, ToolbarDiv, DrawerItem } from './headerStyles'
import AddTransactionPopup from '../addTransactionDrawerButton'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DashboardIcon from '@material-ui/icons/Dashboard'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Popup from '../popup'
import ChangeTransaction from '../registerChangeTransaction'
import RegisterTransaction from '../registerTransactionComponent'

const MainListItems = ({ dashboardPath, open, openPopup }) => {
  return (
  <div>
    <AddTransactionPopup open={open} openPopup={openPopup}/>
    <DrawerItem button
    component={Link}
    to={dashboardPath}
    open={open}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </DrawerItem>
  </div>
  )
}

/**
 * Will render a header component
 * should be placed inside a <Page> element
 * @param {Object} param
 * @param {Boolean} param.drawer whether drawer is avaliable
 * @param {JSX.Element} param.secondaryListItems buttons wich will be placed bellow first divider
 */
export default function Header ({ drawer, secondaryListItems }) {
  const theme = useTheme()
  const closePopup = () => {
    setShowPopUp(false)
    setpopAction('')
  }

  const [open, setOpen] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [popupAction, setpopAction] = useState('')
  const paths = {
    'dashboard': useSelector(({ urls }) => urls['dashboard'])
  }
  const toggleDrawerOpen = () => {
    setOpen(
      current => !current
    )
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const openPopUpFunc = (action) => {
    // TEMPORÁRIO
    if (action === 'CHANGE') {
      history.push('/alterar-transacao')
    }
    setpopAction(action)
    setShowPopUp(true)
  }

  return (
    <>
    <AppBarRoot>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
      >
        <Toolbar>
          { drawer !== false
            ? <IconButton
            aria-label="open drawer"
            onClick={toggleDrawerOpen}
            edge="start"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
            : null }
          <Typography variant="h6" noWrap>
            Mobills
          </Typography>
        </Toolbar>
      </AppBar>
    </AppBarRoot>
      { drawer !== false
        ? <Drawer
        variant="permanent"
        open={open}
      >
        <ToolbarDiv>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </ToolbarDiv>
        <Divider />
        <List>
          <MainListItems dashboardPath={paths['dashboard']} open={open} openPopUpFunc={openPopUpFunc} />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
        : null}
        {showPopUp
          ? (
        <Popup
          closePopup={() => {
            closePopup()
          }}
        >
          {popupAction === 'CHANGE'
            ? <ChangeTransaction />
            : <RegisterTransaction variant={popupAction} />
              }
        </Popup>
            )
          : null}
    </>
  )
}
