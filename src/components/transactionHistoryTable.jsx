import React, { Component } from 'react'
import { HistoryTable, Tr } from './componentsStyles'
import { useReadTransactionsHistory } from '../util/firestoreFunctions'

function Table () {
  const [transactionData, updateTransactionData] = useReadTransactionsHistory()
  return (
      <HistoryTable>
          <h2 id="title">Histórico de transações</h2>
          <table id="transacoes">
            <tr key="base">
                <th>Valor</th>
                <th>Data</th>
            </tr>
            { transactionData.loading
              ? 'carregando ...'
              : (
                  transactionData.data.map(
                    (doc, index) => {
                      const data = doc.data()
                      const timestamp = new Date(data.timestamp)
                      return (
                          <Tr key={index} variant={() => {
                            if (data.value >= 0) {
                              return 'POSITIVE'
                            } else {
                              return 'NEGATIVE'
                            }
                          }}>
                              <td>{Math.abs(data.value)}</td>
                              <td>{ `${('0' + timestamp.getDate()).slice(-2)}/${('0' + (timestamp.getMonth() + 1)).slice(-2)}/${timestamp.getFullYear()}` }</td>
                          </Tr>
                      )
                    }
                  )

                )

            }
          </table>
      </HistoryTable>
  )
}

export default Table
