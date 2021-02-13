import firebase from './firebase'
import { useSelector } from 'react-redux'

const db = firebase.firestore()

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
 * @returns {Promise<number | null>}
 */
export async function readBalance () {
  const id = useSelector(({ userId }) => userId)
  const docRef = db.collection('users').doc(id)
  let balance
  try {
    balance = (await docRef.get()).data().balance
  } catch {
    return null
  }
  return balance
}
