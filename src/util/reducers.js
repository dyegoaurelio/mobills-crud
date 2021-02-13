import { combineReducers } from 'redux'
const urlsReducer = (state = {}, action) => {
  const currentPayload = {}
  switch (action.type) {
    case 'ADD':
      currentPayload.name = action.payload.name
      currentPayload.path = action.payload.path
      state[currentPayload.name] = currentPayload.path
      return state
    default:
      return state
  }
}

export const addUrlPath = (name, path) => {
  return {
    type: 'ADD',
    payload: {
      name: name,
      path: path
    }
  }
}

const userIdReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      state = action.payload
      return state
    case 'DELETE':
      state = action.payload
      return state
    default:
      return state
  }
}

export const setUser = (id) => {
  return {
    type: 'SET',
    payload: id
  }
}

export const unauthorizeUser = () => {
  return {
    type: 'DELETE',
    payload: ''
  }
}

export const allReducers = combineReducers({
  urls: urlsReducer,
  userId: userIdReducer
})
