import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'
import { readTransactionsHistory, deleteTransaction } from '../util/firestoreFunctions'
import { MoneyInputField, InputTagsArea } from './componentsStyles'
/**
 * @param {Object} param0
 * @param {'income' | 'debt'} param0.variant
 * @param {boolean} param0.reset
 */
export default function ChangeTransaction ({ aftherSubmit: handleSubmit, variant }) {
  const id = useSelector(({ userId }) => userId)
  const [selectedValue, setSelectedValue] = useState(null)
  const [loading, setLoading] = useState(false)
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

  useEffect(
    () => {
      if (selectedValue) {
        const newAmount = selectedValue.data().value
        const newTags = selectedValue.data().tags
        setFields({
          amount: newAmount,
          tags: newTags
        })
      }
    }, [selectedValue]
  )

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
    <h2>Escolha a Transação que deseja alterar</h2>
    <br />
    <SelectTransactionsDropDown setSelectedValue={setSelectedValue}/>
    {
        selectedValue

          ? (
          <>
          <br/>
          <Button style={{ color: 'red' }} variant="outlined"
            onClick={async () => {
              const value = selectedValue
              setSelectedValue(null)
              setLoading(true)
              await deleteTransaction(id, value)
              setLoading(false)
            }}
            >Deletar Transação
          </Button>
          <br/>
          <h2>Alterar Informações</h2>
          <MoneyInputField
            name="amount"
            value={fields.amount}
            onChange={handleAmountChange}
            label={'Quantidade'}
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
    >Alterar</Button>
          </>
            )

          : null
    }
    {
      loading ? (<><br/><br/>carregando...</>) : null
    }
    </div>
  )
}

function SelectTransactionsDropDown ({ setSelectedValue }) {
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
              name: `R$ ${item.data().value} : data ${date.getDate()}/${date.getMonth() + 1}`,
              ref: item
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
      id="transaction-picker"
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
      onChange={(event, value) => setSelectedValue(value ? value.ref : null)}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Transação"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}
