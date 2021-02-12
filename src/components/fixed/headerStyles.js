import { withTheme } from '@material-ui/core'
import appBar from '@material-ui/core/AppBar'
import toolBar from '@material-ui/core/Toolbar'
import drawer from '@material-ui/core/Drawer'
import listItem from '@material-ui/core/ListItem'

import styled from 'styled-components'

const drawerWidth = '240px'

export const Toolbar = withTheme(styled(toolBar)`
  margin-right: 36;
`)

export const AppBar = withTheme(styled(appBar)`
  && {
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
    transition: ${({ theme }) =>
      theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })};
    background-color: ${({ theme }) => theme.palette.background.default};
    ${({ open, theme }) =>
      open &&
      ` {
            margin-left: ${drawerWidth};
            width: calc( 100% - ${drawerWidth});
             transition: ${theme.transitions.create(['width', 'margin'], {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.enteringScreen
             })};
        }
        `}
  }
`)

export const AppBarRoot = styled.div`
  display: flex;
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  height: 68px;
`

export const Drawer = withTheme(styled(drawer)`
  && {
    grid-column: 1 / 2;
    width: ${drawerWidth};
    flex-shrink: 0;
    white-space: nowrap;

    ${({ open, theme }) => {
      const openDrawerProperties = ` width: ${drawerWidth};
        transition: ${theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })};
    `

      const closedDrawerProperties = `transition: ${theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
      )};
          overflow-x: hidden;
          width: ${theme.spacing(9) + 1}px;
      
          ${theme.breakpoints.up('sm')} : { 
              width: 25px;
          }`

      return (
        (open &&
          `
        ${openDrawerProperties}

        .MuiDrawer-paper{
            ${openDrawerProperties}
        }

        `) ||
        `
        ${closedDrawerProperties}

        .MuiDrawer-paper{
            ${closedDrawerProperties}
        }
    
    `
      )
    }}
  }
`)

export const ToolbarDiv = withTheme(styled.div` 

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing(0, 1)}; 

`)

export const DrawerItem = withTheme(styled(listItem)`
  &&{
    width: inherit;
    align-items: center;
  justify-content: center;
    display: flex;
    padding: 15px;
  }
  .MuiListItemText-root{
    ${({ open }) => (!open ? 'display: none;' : null)}
    flex: none;
 }

 .MuiListItemIcon-root{
  align-items: center;
  justify-content: center;
    display: flex;
 }
`
)
