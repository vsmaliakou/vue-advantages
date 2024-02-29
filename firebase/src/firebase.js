import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { onUnmounted, ref } from 'vue'
import env from '@/env'

const config = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const userCollection = db.collection('users')

export const createUser = async user => {
  return userCollection.add(user)
}

export const getUser = async id => {
  const user = await userCollection.doc(id).get()

  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return userCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return userCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = userCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })

  onUnmounted(close)

  return users
}
