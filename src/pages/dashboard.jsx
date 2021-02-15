import React, { useState } from 'react'
import { Header } from '../components/fixed'
import Popup from '../components/popup'
import RegisterTransaction from '../components/registerTransactionComponent'
import { Page, DashboardContent, CardArea } from '../styles'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import { useReadBalance, useReadTransactionsHistory, deleteTransaction } from '../util/firestoreFunctions'
import { useSelector } from 'react-redux'

function Dashboard () {
  const [balance, updateBalance] = useReadBalance()
  const [showPopUp, setShowPopUp] = useState(false)
  const [debtClicked, setDebtClicked] = useState(false)
  const [transactions, updateTransactions] = useReadTransactionsHistory()
  const closePopup = () => {
    setShowPopUp(false)
  }
  const openPopUp = (action) => {
    switch (action) {
      case 'debt':
        setDebtClicked(true)
        break
      case 'income':
        setDebtClicked(false)
        break
    }

    setShowPopUp(true)
  }
  return (
    <Page>
      {showPopUp
        ? (
        <Popup closePopup={() => { closePopup(); updateBalance(true); updateTransactions(true) }} >
          <RegisterTransaction variant={ debtClicked ? 'debt' : 'income' }/>
        </Popup>
          )
        : null}
      <Header />
      <DashboardContent>
        <CardArea>
          <h2>Adesão</h2>
          <body>
            <Card>Adicionar despesa
              <Button variant="contained"
              onClick={() => { openPopUp('debt') }}
              style={{ backgroundColor: '#F31B2D', color: 'white' }}
              >Adicionar</Button>
            </Card>
            <Card>Alterar informação</Card>
            <Card>Adicionar receita
            <Button variant="contained"
            onClick={() => { openPopUp('income') }}
            style={{ backgroundColor: '#AACAE2', color: 'black' }}
            >Adicionar</Button>
            </Card>
          </body>
        </CardArea>
        <CardArea>
          <h2>Acompanhamento</h2>
          <body>
            <Card>Gráficos</Card>
            <Card>
              saldo: {!balance.loading ? 'R$ ' + balance.data : 'carregando'}
            </Card>
            <Card>histórico</Card>
          </body>
        </CardArea>
      </DashboardContent>
    </Page>
  )
}

export default Dashboard
