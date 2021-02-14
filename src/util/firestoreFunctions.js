import firebase from './firebase'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const db = firebase.firestore()

class Transaction {
/**
 *
 * @param {number} value
 * @param {Array<string>} tags
 */
  constructor (value, tags) {
    this.value = value
    this.timestamp = new Date().getTime()
    this.tags = tags
  }

  parse () {
    return { ...this }
  }
}

/**
 * will return all user's transactions since specified date
 *
 * if no date specified, returns all transactions
 * @param {number?} date minimum timestamp to fetch data
 * @returns {Array<object>}
 */
export async function readTransactions (date) {
  const id = useSelector(({ userId }) => userId)
  const docRef = db.collection('users').doc(id).collection('transactions')
  let snapshot

  if (typeof date === 'number') {
    snapshot = await docRef.where('timestamp', '>', date).get()
    return snapshot.docs.map(doc => doc.data())
  }

  snapshot = await docRef.get()
  return snapshot.docs.map((doc) => doc.data())
}

/**
 * will check current user balance
 *
 * if cant find user returns null
 * @param {string} id username id
 * @returns {Promise<number | null>}
 */
export async function readBalance (id) {
  // const id = useSelector(({ userId }) => userId)
  const docRef = db.collection('users').doc(id)
  let balance
  try {
    balance = (await docRef.get()).data().balance
  } catch {
    return null
  }
  return balance
}

/**
 * will check current user balance
 * @typedef {Object} state
 * @property {boolean} loading
 * @property {number | null} data
 * @returns {state}
 */
export const useReadBalance = () => {
  const id = useSelector(({ userId }) => userId)
  const state = useHook(readBalance(id))

  return state
}

/**
 * will write a transiction to database
 * @param {number} value transaction's value
 * @param {Array<string>} tags an array of selected tags of the transation
 */
export async function writeTransaction (value, tags) {
  if (typeof value !== 'number') {
    throw new Error('invalid value')
  }
  const id = useSelector(({ userId }) => userId)
  const docRef = db.collection('users').doc(id)
  const transactions = docRef.collection('transactions')

  const currentBalance = await readBalance()
  await docRef.update({
    balance: currentBalance + value
  })

  await transactions.add(new Transaction(value, tags).parse())
}

/**
 * will translate a promise to a hook
 * @param {Promise} promise
 */
const useHook = promise => {
  const [state, setState] = useState({ data: null, loading: true })

  useEffect(() => {
    setState(
      state => ({ data: state.data, loading: true })
    )
    promise.then(
      res => setState({ data: res, loading: false })
    )
  }, [promise, state]
  )
  return state
}
