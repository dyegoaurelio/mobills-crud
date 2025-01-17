import React, { useState } from 'react'
import { Header } from '../components/fixed'
import Popup from '../components/popup'
import ChangeTransaction from '../components/registerChangeTransaction'
import RegisterTransaction from '../components/registerTransactionComponent'
import { Page, DashboardContent, CardArea } from '../styles'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import {
  useReadBalance,
  useReadTransactionsHistory
} from '../util/firestoreFunctions'
import { useHistory } from 'react-router-dom'
import HistoryTable from '../components/transactionHistoryTable'

function Dashboard () {
  const history = useHistory()
  const [balance, updateBalance] = useReadBalance()
  const [showPopUp, setShowPopUp] = useState(false)
  const [popupAction, setpopAction] = useState('')
  const [transactions, updateTransactions] = useReadTransactionsHistory()
  const closePopup = () => {
    setShowPopUp(false)
    setpopAction('')
  }
  /**
   *
   * @param {'DEBT' | 'INCOME' | 'CHANGE'} action
   */
  const openPopUp = (action) => {
    // TEMPORÁRIO
    if (action === 'CHANGE') {
      history.push('/alterar-transacao')
    }
    setpopAction(action)
    setShowPopUp(true)
  }
  return (
    <Page>
      {showPopUp
        ? (
        <Popup
          closePopup={() => {
            closePopup()
            updateBalance(true)
            updateTransactions(true)
          }}
        >
          {popupAction === 'CHANGE'
            ? <ChangeTransaction />
            : <RegisterTransaction variant={popupAction} />
              }
        </Popup>
          )
        : null}
      <Header />
      <DashboardContent>
        <CardArea>
          <h2>Adesão</h2>
          <div className="cards">
            <Card>
              <h2>Adicionar despesa</h2>
              <Button
                variant="contained"
                onClick={() => {
                  openPopUp('DEBT')
                }}
                style={{ backgroundColor: '#e2aaaa', color: 'black' }}
              >
                Adicionar
              </Button>
            </Card>
            <Card>
              <h2>Alterar informação</h2>
              <Button
                variant="contained"
                onClick={() => {
                  openPopUp('CHANGE')
                }}
                style={{ backgroundColor: '#AACAE2', color: 'black' }}
              >
                Alterar
              </Button>
            </Card>
            <Card>
              <h2>Adicionar receita</h2>
              <Button
                variant="contained"
                onClick={() => {
                  openPopUp('INCOME')
                }}
                style={{ backgroundColor: '#b0e2aa', color: 'black' }}
              >
                Adicionar
              </Button>
            </Card>
          </div>
        </CardArea>
        <CardArea>
          <h2>Acompanhamento</h2>
          <div className="cards">
            <Card>Gráficos</Card>
            <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2>saldo: {!balance.loading ? 'R$ ' + balance.data : 'carregando'} </h2>
            </Card>
            <Card>
                <HistoryTable transactions={transactions} />
            </Card>
          </div>
        </CardArea>
      </DashboardContent>
    </Page>
  )
}

export default Dashboard
