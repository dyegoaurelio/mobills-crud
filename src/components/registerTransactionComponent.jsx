import React, { useState, useEffect } from 'react'
import { MoneyInputField, InputTagsArea } from './componentsStyles'
import { useSelector } from 'react-redux'
import { useReadBalance, writeTransaction } from '../util/firestoreFunctions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
/**
 * @param {Object} param0
 * @param {'income' | 'debt'} param0.variant teste
 * @param {boolean} param0.reset
 */
export default function AddTransiction ({ aftherSubmit: handleSubmit, variant }) {
  const id = useSelector(({ userId }) => userId)
  const initialState = ({
    amount: '',
    tags: ['']
  })
  const [fields, setFields] = useState(initialState)
  const submit = async (e) => {
    e.preventDefault()
    let amount = parseFloat(fields.amount)
    if (amount) {
      if (variant === 'debt') {
        amount = -amount
      }
      setFields(initialState)
      await writeTransaction(id, amount, fields.tags)
      if (handleSubmit) {
        handleSubmit(fields)
      }
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
    {variant === 'debt' ? 'Insira a Despesa' : 'Insira a Receita'}
    <br />
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
    <InputTagsArea>
    <Button onClick={addTag} variant="outlined" color="primary" size="small" >+ tag</Button>
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
    </InputTagsArea>
    <Button
      variant="contained"
      color="primary"
      onClick={submit}
    >Escrever</Button>
    </div>
  )
}
