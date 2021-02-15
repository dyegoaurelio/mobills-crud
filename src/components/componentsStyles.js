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
  margin: 15px;
  padding: 15px;
  border-radius: 20px;
  background: white;
  overflow: auto;

  .popup-close{
    padding: 5px;
    margin-top: 5px;
  }
}
`

export const HistoryTable = styled.div`
#title {
  text-align: center;
  font-family: arial, sans-serif;
}

#transacoes {
  text-align: center;
  border-collapse: collapse;
  border: 3px solid #ddd;
  width: 100%;
}

#transacoes td, #transacoes th {
  border: 1px solid #ddd;
  padding: 8px;
}

#transacoes tr:nth-child(even){
  }
#transacoes tr:nth-child(odd){
  }

#transacoes tr:hover {background-color: #ddd;}

#transacoes th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #AACAE2;
  color: black;
}

`

export const Tr = styled.tr` 
 background-color: ${({ variant }) => {
    if (variant() === 'POSITIVE') {
      return '#B0E2AA'
    } else {
      return '#E2AAAA'
    }
  }};
`
