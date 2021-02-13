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

function App () {
  const dispatch = useDispatch()
  dispatch(addUrlPath('dashboard', '/'))
  dispatch(addUrlPath('not-found-page', '/404'))
  dispatch(setUser('teste'))

  return (
      <Router>
        <Switch>
          <Route exact path={useSelector(state => state.urls['dashboard'])} component={Dashboard}/>
          <Route exact path={useSelector(state => state.urls['not-found-page'])} component={NotFoundPage}/>
           <Redirect to={useSelector(state => state.urls['not-found-page'])}/>
        </Switch>
      </Router>
  )
}

export default App
