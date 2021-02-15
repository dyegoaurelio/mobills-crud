import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addUrlPath, setUser } from './util/reducers'

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import { Dashboard, NotFoundPage } from './pages'
import ChangeTransaction from './components/registerChangeTransaction'
import { Header } from './components/fixed'
import { Page, Content } from './styles'
import Table from './components/transactionHistoryTable'
function App () {
  const dispatch = useDispatch()
  dispatch(addUrlPath('dashboard', '/'))
  dispatch(addUrlPath('not-found-page', '/404'))
  dispatch(addUrlPath('registerChangeTransaction', '/alterar-transacao'))
  dispatch(setUser('teste'))

  return (
      <Router>
        <Switch>
          <Route exact path={useSelector(state => state.urls['dashboard'])} component={Dashboard}/>
          <Route exact path={useSelector(state => state.urls['registerChangeTransaction'])} component={
            () => (<Page>
                    <Header/>
                    <Content><ChangeTransaction /></Content>
                    </Page>)} />
          <Route exact path={useSelector(state => state.urls['not-found-page'])} component={NotFoundPage}/>
          <Route exact path="/teste" component={Table}/>
           <Redirect to={useSelector(state => state.urls['not-found-page'])}/>
        </Switch>
      </Router>
  )
}

export default App
