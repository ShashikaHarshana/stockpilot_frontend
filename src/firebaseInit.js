// import firebase from 'firebase/app'
// import 'firebase/messaging'
// import { postFirebaseToken } from './redux/ducks/notifications'
//
// const firebaseConfig = {
//   apiKey: 'AIzaSyCBpY9ZyWuDYPwkJTpZNhQxu99iigWuyHo',
//   authDomain: 'stock-pilot-front-end.firebaseapp.com',
//   projectId: 'stock-pilot-front-end',
//   storageBucket: 'stock-pilot-front-end.appspot.com',
//   messagingSenderId: '226781281560',
//   appId: '1:226781281560:web:0b5b40c4b03504387ef26d'
// }
// // const dispatch = useDispatch()
// firebase.initializeApp(firebaseConfig)
//
// const messaging = firebase.messaging()
//
// const publicKey =
//   'BEC76Yi-7q9hJzC8brXjf0IoKtVlEbixPMVcPFqsmkn07hiYxXvzo5mBYxqHlZjL5eiEHG-cv-UzOz752xSYn2c'
//
// export const getToken = async (setTokenFound, dispatch) => {
//   let currentToken = ''
//
//   try {
//     currentToken = await messaging.getToken({ vapidKey: publicKey })
//     if (currentToken) {
//       setTokenFound(true)
//       dispatch(postFirebaseToken(currentToken))
//       console.log('token', currentToken)
//     } else {
//       setTokenFound(false)
//     }
//   } catch (error) {
//     console.log('An error occurred while retrieving token. ', error)
//   }
//
//   return currentToken
// }
//
// export const onMessageListener = () =>
//   new Promise(resolve => {
//     messaging.onMessage(payload => {
//       resolve(payload)
//     })
//   })
