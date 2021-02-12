import React from 'react'
import { Header } from '../components/fixed'
import { Page, DashboardContent, CardArea } from '../styles'
import Card from '@material-ui/core/Card'

function Dashboard () {
  return (
    <Page>
      <Header />
        <DashboardContent>
        <CardArea>
          <h2>Adesão</h2>
          <body>
            <Card>Adicionar despesa</Card>
            <Card>Alterar informação</Card>
            <Card>Adicionar receita</Card>
          </body>
        </CardArea>
        <CardArea>
          <h2>Acompanhamento</h2>
          <body>
            <Card>Gráficos</Card>
            <Card>saldo</Card>
            <Card>histórico</Card>
          </body>
        </CardArea>
        </DashboardContent>
    </Page>
  )
}

export default Dashboard
