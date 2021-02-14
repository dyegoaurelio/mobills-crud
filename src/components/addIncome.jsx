import React, { useState, useEffect } from 'react'
import { MoneyInputField, InputTagsArea } from './componentsStyles'
import { useSelector } from 'react-redux'
import { useReadBalance, writeTransaction } from '../util/firestoreFunctions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function AddIncome ({ aftherSubmit: handleSubmit, reset }) {
  const balance = useReadBalance()
  const id = useSelector(({ userId }) => userId)
  const initialState = ({
    amount: '',
    tags: ['']
  })
  const [fields, setFields] = useState(initialState)
  useEffect(() => {
    if (reset === true) {
      setFields(initialState)
    }
  }, reset)
  const submit = async (e) => {
    e.preventDefault()
    if (fields.amount) {
      await writeTransaction(id, parseFloat(fields.amount), fields.tags)
    }
    if (handleSubmit) {
      handleSubmit(fields)
    }
  }

  const handleAmountChange = (e) => {
    setFields(
      fields => ({
        ...fields,
        [e.target.name]: e.target.value
      })
    )
  }
  const handleTagsChange = (e, key) => {
    setFields(
      fields => {
        fields.tags[key] = e.target.value
        return ({
          ...fields
        })
      }
    )
  }

  const addTag = () => {
    setFields(
      state => {
        state.tags.push('')
        return ({ ...state })
      }
    )
  }

  return (
    <div>
    <MoneyInputField
      name="amount"
      value={fields.amount}
      onChange={handleAmountChange}
      label={'Quantidade'}
      onKeyUp={({ key }) => {
        if (key === 'Enter') {
          console.log('enter no de cima')
        }
      }}
    />
    <div>
    saldo: {balance.data ? ('R$ ' + balance.data) : 'carregando'}
    </div>
    <InputTagsArea>
      <div className="tags-area">
    {
      fields.tags.map(
        (tag, index) => (
          <TextField
          key={index}
          value={tag}
          onChange={ (e) => handleTagsChange(e, index)}
          label={'Categoria ' + (index + 1) }
          />
        )
      )
    }
      </div>
      <Button onClick={addTag} variant="outlined" color="primary" size="small" >+</Button>
    </InputTagsArea>
    <Button
      variant="contained"
      color="primary"
      onClick={submit}
    >Escrever</Button>
    </div>
  )
}
