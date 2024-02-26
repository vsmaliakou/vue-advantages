import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { onUnmounted, ref } from 'vue'

const config = {
  apiKey: 'AIzaSyDnQwb40R-256VoJlzPNkCX5Phuz8nVWLM',
  authDomain: 'vue-firebase-c9e7c.firebaseapp.com',
  projectId: 'vue-firebase-c9e7c',
  storageBucket: 'vue-firebase-c9e7c.appspot.com',
  messagingSenderId: '616180271734',
  appId: '1:616180271734:web:2b94d6b112a05894afad57'
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
