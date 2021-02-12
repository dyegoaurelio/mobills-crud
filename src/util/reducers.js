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

export const allReducers = combineReducers({
  urls: urlsReducer
})
