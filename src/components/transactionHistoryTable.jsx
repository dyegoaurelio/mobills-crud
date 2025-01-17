import React from 'react'
import { HistoryTable, Tr } from './componentsStyles'
import { useReadTransactionsHistory } from '../util/firestoreFunctions'

function Table ({ transactions }) {
  //   const [transactionData, updateTransactionData] = useReadTransactionsHistory()
  return (
    <HistoryTable>
      <h2 id="title">Histórico de transações</h2>
      <table id="transacoes">
        <thead>
          <tr key="base">
            <th>Valor</th>
            <th>Data</th>
          </tr>
          {transactions.loading
            ? (<tr id="loading"><th>carregando</th><th>...</th></tr>)
            : transactions.data.map((doc, index) => {
              const data = doc.data()
              const timestamp = new Date(data.timestamp)
              return (
                  <Tr
                    key={index}
                    variant={() => {
                      if (data.value >= 0) {
                        return 'POSITIVE'
                      } else {
                        return 'NEGATIVE'
                      }
                    }}
                  >
                    <td>{Math.abs(data.value)}</td>
                    <td>{`${('0' + timestamp.getDate()).slice(-2)}/${(
                      '0' +
                      (timestamp.getMonth() + 1)
                    ).slice(-2)}/${timestamp.getFullYear()}`}</td>
                  </Tr>
              )
            })}
        </thead>
      </table>
    </HistoryTable>
  )
}

export default Table
