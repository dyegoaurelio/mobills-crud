import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, AppBarRoot, Drawer, ToolbarDiv, DrawerItem } from './headerStyles'
import AddTransactionPopup from '../addTransactionPopup'
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

const MainListItems = ({ dashboardPath, open }) => (
  <div>
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
    <AddTransactionPopup open={open}/>
  </div>
)

/**
 * Will render a header component
 * should be placed inside a <Page> element
 * @param {Object} param
 * @param {Boolean} param.drawer whether drawer is avaliable
 * @param {JSX.Element} param.secondaryListItems buttons wich will be placed bellow first divider
 */
export default function Header ({ drawer, secondaryListItems }) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
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
          >
            <MenuIcon />
          </IconButton>
            : null }
          <Typography variant="h6" noWrap color="textPrimary">
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
          <MainListItems dashboardPath={paths['dashboard']} open={open} />
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
        : null}
    </>
  )
}
