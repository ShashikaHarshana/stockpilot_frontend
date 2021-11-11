// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCBpY9ZyWuDYPwkJTpZNhQxu99iigWuyHo',
  authDomain: 'stock-pilot-front-end.firebaseapp.com',
  projectId: 'stock-pilot-front-end',
  storageBucket: 'stock-pilot-front-end.appspot.com',
  messagingSenderId: '226781281560',
  appId: '1:226781281560:web:0b5b40c4b03504387ef26d'
}

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()
messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  }

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
