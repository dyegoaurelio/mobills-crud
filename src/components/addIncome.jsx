import React, { useState, useEffect } from 'react'
import { MoneyInputField, InputTagsArea } from './componentsStyles'
import { useSelector } from 'react-redux'
import { useReadBalance, writeTransaction } from '../util/firestoreFunctions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function AddIncome ({ aftherSubmit: handleSubmit, render }) {
  const balance = useReadBalance()
  const id = useSelector(({ userId }) => userId)
  const initialState = ({
    amount: '',
    tags: ['']
  })
  const [fields, setFields] = useState(initialState)
  useEffect(() => {
    // will clear state every time this form is called
  }, render)
  const submit = async (e) => {
    console.log('chou no de cima')
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
      label={'teste'}
      onKeyUp={({ key }) => {
        if (key === 'Enter') {
          console.log('enter no de cima')
        }
      }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={submit}
    >Escrever</Button>
    <div>
    saldo: {balance.data ? ('R$ ' + balance.data) : 'carregando'}
    </div>
    <InputTagsArea>
    {
      fields.tags.map(
        (tag, index) => (
          <TextField
          key={index}
          value={tag}
          onChange={ (e) => handleTagsChange(e, index)}
          label={'teste'}
          />
        )
      )
    }
    </InputTagsArea>
      <Button onClick={addTag} >adicionar categoria</Button>
    </div>
  )
}
