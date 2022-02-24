import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCrrnV8MA8UQU6vQKZX82i309pcZqeHnec',
    authDomain: 'stamprally2-6632c.firebaseapp.com',
    projectId: 'stamprally2-6632c',
    storageBucket: 'stamprally2-6632c.appspot.com',
    messagingSenderId: '173580424138',
    appId: '1:173580424138:web:59ac3afe64d1a9a3873533',
    measurementId: 'G-JKG7RZNFMC'
  })
  firebase.functions()

  const isSupported = firebase.messaging.isSupported()

  const publicVapidKey = 'BOSdnKmmOMwl4-9txGO6pRD3C9SuTwafqjN319ZyM6nTPzWBn7BFAb7CIFd5PBfeZBLeH--E3jhsybz_ddoVQd0'

  if (isSupported) {
    (async () => {
      const messaging = firebase.messaging()
      messaging.usePublicVapidKey(publicVapidKey)

      // @nuxtjs/pwaが生成する sw.js を指定する
      await navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          messaging.useServiceWorker(registration)
          console.log('Registration: ', registration)
        })
        .catch(err => console.error(err))

      await navigator.serviceWorker.ready

      // await messaging
      //   .getToken()
      //   .then((token) => {
      //     this.$store.dispatch('setToken', token)
      //     console.log('token: ', token)
      //   })
      //   .catch(error =>
      //     console.log('An error occurred while retrieving token: ', error)
      //   )
      // messaging.onTokenRefresh(async (_) => {
      //   await messaging
      //     .getToken()
      //     .then(token => console.log('token: ', token))
      //     .catch(error =>
      //       console.log('An error occurred while retrieving token: ', error)
      //     )
      // })
      //
      messaging.onMessage((payload) => {
        console.log('notification coming')
        this.$bvToast.toast(payload.notification.body, {
          title: payload.notification.title,
          autoHideDelay: 5000
        })
      })
    })()
  }
}

export default firebase
