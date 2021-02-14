import React, { useState, useEffect } from 'react'
import { MoneyInputField } from './componentsStyles'
import { useSelector } from 'react-redux'
import { useReadBalance, writeTransaction } from '../util/firestoreFunctions'
import Button from '@material-ui/core/Button'

export default function AddIncome ({ aftherSubmit: handleSubmit, render }) {
  const balance = useReadBalance()
  const id = useSelector(({ userId }) => userId)
  const [fields, setFields] = useState({
    amount: '',
    tags: []
  })
  useEffect(() => {
    // will clear state every re render
  }, render)
  const submit = async (e) => {
    e.preventDefault()
    await writeTransaction(id, parseFloat(fields.amount), fields.tags)
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

  return (
  <form onSubmit={submit}>
    <MoneyInputField
      name="amount"
      value={fields.amount}
      onChange={handleAmountChange}
      label={'teste'}
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
    >Escrever</Button>
    <div>
    saldo: {balance.data ? ('R$ ' + balance.data) : 'carregando'}
    </div>
  </form>
  )
}
