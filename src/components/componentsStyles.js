import React from 'react'
import { withTheme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import styled from 'styled-components'

export const AddButton = withTheme(
  styled(({ theme, expanded, ...otherProps }) =>
    expanded
      ? (
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddIcon color="inherit" />}
        {...otherProps}
      />
        )
      : (
      <IconButton style={{ backgroundColor: theme.palette.primary.main }}
      {...otherProps}
      >
        <AddIcon style={{ color: theme.palette.common.white }} />
      </IconButton>
        )
  )`
    && {
      margin-top: 8px;
      color:${({ theme }) => (`color: ${theme.palette.background.default};`)} 
      ${({ expanded }) => (expanded ? 'border-radius: 20px;' : null)}
    }
  `
)
