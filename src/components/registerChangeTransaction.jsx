import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'
import { readTransactionsHistory, writeTransaction } from '../util/firestoreFunctions'
import { MoneyInputField, InputTagsArea } from './componentsStyles'
/**
 * @param {Object} param0
 * @param {'income' | 'debt'} param0.variant
 * @param {boolean} param0.reset
 */
export default function ChangeTransaction ({ aftherSubmit: handleSubmit, variant }) {
  const id = useSelector(({ userId }) => userId)
  const [selectedValue, setSelectedValue] = useState({})
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
      // await writeTransaction(id, amount, fields.tags)
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
    Escolha a Transação que deseja alterar
    <br />
    <br />
    <SelectTransactionsDropDown />
    <Button
      variant="contained"
      color="primary"
      onClick={submit}
    >Escrever</Button>
    </div>
  )
}

function SelectTransactionsDropDown () {
  const id = useSelector(({ userId }) => userId)
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      const res = await readTransactionsHistory(id)

      if (active) {
        setOptions(res.map(
          item => {
            const date = new Date(item.data().timestamp)
            return ({
              name: `R$ ${item.data().value} : data ${date.getDate()}/${date.getMonth() + 1}`
            }
            )
          }
        ))
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}
