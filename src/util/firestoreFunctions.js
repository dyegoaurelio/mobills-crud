// TODAS ESSAS FUNÇÕES DEVERIAM SER FEITAS NO BACKEND

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
 * @param {string} id username id
 * @param {number?} date minimum timestamp to fetch data
 * @returns {Promise<Array<object>>}
 */
export async function readTransactionsHistory (id, date) {
  const docRef = db.collection('users').doc(id).collection('transactions')
  let snapshot

  if (typeof date === 'number') {
    snapshot = await docRef.where('timestamp', '>', date).get()
    return snapshot.docs
  }

  snapshot = await docRef.get()
  return snapshot.docs
}

/**
 * @param {number?} date minimum timestamp to fetch data
 * @returns {[state: { data: [{}]| null, loading: boolean}, setUpdate: React.Dispatch<React.SetStateAction<boolean>>]}
 */
export const useReadTransactionsHistory = (date) => {
  const id = useSelector(({ userId }) => userId)
  const state = useHook(readTransactionsHistory, [id, date])

  return state
}

/**
 * will check current user balance
 *
 * if cant find user returns null
 * @param {string} id username id
 * @returns {Promise<number | null>}
 */
export async function readBalance (id) {
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
 * @returns {[state: { data: string | null, loading: boolean}, setUpdate: React.Dispatch<React.SetStateAction<boolean>>]}
 */
export const useReadBalance = () => {
  const id = useSelector(({ userId }) => userId)
  const state = useHook(readBalance, [id])

  return state
}

/**
 * will write a transiction to database
 * @param {string} id username id
 * @param {number} value transaction's value
 * @param {Array<string>} tags an array of selected tags of the transation
 */
export async function writeTransaction (id, value, tags) {
  if (typeof value !== 'number') {
    throw new Error('invalid value')
  }
  if (value || value === 0) {
    const docRef = db.collection('users').doc(id)
    const transactions = docRef.collection('transactions')

    const currentBalance = await readBalance(id)
    await docRef.update({
      balance: currentBalance + value
    })

    await transactions.add(new Transaction(value, tags).parse())
  } else {
    throw new Error('invalid value')
  }
}

/**
 * will translate a async function to a hook
 * @param {Function} func
 * @param {array} args
 * @typedef {{myNumber: Number, myString: String, myArray: Array}[]} AsyncHook
 * @returns {[state: { data: any | null, loading: boolean}, setUpdate: React.Dispatch<React.SetStateAction<boolean>>]}
 */
const useHook = (func, args) => {
  const [state, setState] = useState({ data: null, loading: true })
  const [update, setUpdate] = useState(false)
  const funcArgs = args || []

  useEffect(() => {
    setState(
      state => ({ data: state.data, loading: true })
    )
    func(...funcArgs).then(
      res => setState({ data: res, loading: false })
    )

    return () => {
      setUpdate(false)
    }
  }, [update]
  )
  return [state, setUpdate]
}

/**
 *
 * @param {string} userId
 * @param {firebase.firestore.QueryDocumentSnapshot} snapshot
 * @returns {'OK' | 'FAILED'}
 */
export async function deleteTransaction (userId, snapshot) {
  const userRef = db.collection('users').doc(userId)
  const transactionValue = snapshot.data().value

  try {
    await userRef.collection('transactions')
      .doc(snapshot.id).delete()
  } catch (err) {
    console.error(err)
    return 'FAILED'
  }

  try {
    const currentBalance = await readBalance(userId)
    await userRef.update({
      balance: currentBalance - transactionValue
    })
  } catch (err) {
    console.error(err)
    return 'FAILED'
  }

  return 'OK'
}
