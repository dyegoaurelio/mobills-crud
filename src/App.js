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

import firebase from './util/firebase'
const teste = async () => {
  const db = await firebase.firestore()
  // console.log(data.exists)
  const docRef = db.collection('users').doc('teste')

  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log('Document data:', doc.data())
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }).catch(function (error) {
    console.log('Error getting document:', error)
  })
}
function App () {
  const dispatch = useDispatch()
  dispatch(addUrlPath('dashboard', '/'))
  dispatch(addUrlPath('not-found-page', '/404'))
  dispatch(setUser('usuarioTESTE'))
  teste()
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
