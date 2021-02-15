import React from 'react'
import { withTheme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import NumberFormat from 'react-number-format'
import MaterialTextField from '@material-ui/core/TextField'

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

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props

  return (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          name: props.name,
          value: values.value
        }
      })
    }}
    thousandSeparator
    isNumericString
    decimalScale={2}
    allowedDecimalSeparators={[',', '.']}
    prefix="R$ "
    allowNegative={false}
  />
  )
}

export const MoneyInputField = ({ mask, onChange: handleChange, value, label, name, ...otherProps }) => {
  return (
  <MaterialTextField
  {...otherProps}
  label={label}
  value={value}
  onChange={handleChange}
  name={name}
  InputProps={
    { inputComponent: NumberFormatCustom }
  }
  />
  )
}

export const InputTagsArea = styled.div`
  margin-top: 10px;
  
    .MuiInput-root{
      padding: 5px;
      margin: 15px;
    }
`

export const PopupDiv = styled.div` 
position: fixed;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
z-index: 5000;
background-color: rgba(0,0,0, 0.5);

.popup-inner {
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: 5px;
  padding: 5px;
  border-radius: 20px;
  background: white;
  overflow: auto;

  .popup-close{
    padding: 5px;
    margin-top: 5px;
  }
}
`
