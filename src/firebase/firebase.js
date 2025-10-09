import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyC8ULqYcZ0JDkPtM1PBjiXeTHmKQs-6iFo',
	authDomain: 'walletly-aeba0.firebaseapp.com',
	projectId: 'walletly-aeba0',
	storageBucket: 'walletly-aeba0.firebasestorage.app',
	messagingSenderId: '416782568869',
	appId: '1:416782568869:web:9b55c271a6aff1015d2c4c',
	measurementId: 'G-JZNHP624XY',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
