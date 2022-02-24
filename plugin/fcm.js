// [START background_handler]
// import firebase from 'firebase/app'
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCrrnV8MA8UQU6vQKZX82i309pcZqeHnec',
  authDomain: 'stamprally2-6632c.firebaseapp.com',
  projectId: 'stamprally2-6632c',
  storageBucket: 'stamprally2-6632c.appspot.com',
  messagingSenderId: '173580424138',
  appId: '1:173580424138:web:59ac3afe64d1a9a3873533',
  measurementId: 'G-JKG7RZNFMC'
})

const isSupported = firebase.messaging.isSupported()
if (isSupported) {
  // const showPushNotification = (datum, swRegistration) => {
  //   console.log('  Start showing a notification')
  //   const options = {
  //     title: datum.notification.title,
  //     body: datum.notification.body,
  //     icon: datum.notification.image,
  //     tag: datum.notification.tag,
  //     data: {
  //       destination: datum.data.destination
  //     }
  //   }
  //   swRegistration
  //     .showNotification(datum.notification.title, options)
  //     .then((_) => {
  //       console.log('  options: ', options)
  //       console.log('  used-data: ', datum)
  //     })
  //     .catch(error => console.error(error.messaging))
  // }
  //
  // const setEventListeners = (sw) => {
  //   sw.addEventListener('install', (event) => {
  //     console.log('ServiceWorker event: ', event.type)
  //     sw.skipWaiting().then(_ => console.log('    skipped waiting.'))
  //   })
  //
  //   sw.addEventListener('activate', (event) => {
  //     console.log('ServiceWorker event: ', event.type)
  //     event.waitUntil(sw.clients.claim().then(_ => console.log('    claimed.')))
  //   })
  //
  //   sw.addEventListener('push', (event) => {
  //     console.log('ServiceWorker event: ', event.type)
  //     try {
  //       const datum = JSON.parse(event.data.text())
  //       console.log('  event.data: ', datum)
  //       console.log('  sw.registration: ', sw.registration)
  //       showPushNotification(datum, sw.registration)
  //     } catch (error) {
  //       console.error(error.message)
  //     }
  //   })
  //
  //   sw.addEventListener('notificationclick', async (event) => {
  //     console.log('ServiceWorker event: ', event.type)
  //     console.log('  ', event)
  //     event.notification.close()
  //     let destination = event.notification.data.destination
  //     if (event.notification.data.FCM_MSG) {
  //       destination = event.notification.data.FCM_MSG.data.destination
  //     }
  //     if (!destination) {
  //       return
  //     }
  //
  //     await event.waitUntil(
  //       // eslint-disable-next-line no-undef
  //       clients
  //         .matchAll()
  //         .then(async (clientList) => {
  //           console.log('  clientList:', clientList)
  //           let shouldOpen = true
  //           await Promise.all(
  //             clientList.map(async (client) => {
  //               if (client.url === destination && 'focus' in client) {
  //                 shouldOpen = false
  //                 return await client
  //                   .focus()
  //                   .then(_ => console.log('    client:', client.url))
  //               }
  //             })
  //           )
  //           // eslint-disable-next-line no-undef
  //           if (shouldOpen && 'openWindow' in clients) {
  //             console.log('  destination: ', destination)
  //             // eslint-disable-next-line no-undef
  //             await clients.openWindow(destination)
  //           }
  //           event.notification.close()
  //         })
  //         .catch(error => console.error('  ', error.toString()))
  //     )
  //   })
  // }
  //
  // setEventListeners(self)
  const messaging = firebase.messaging()
  messaging.setBackgroundMessageHandler((payload) => {
    console.log('ServiceWorker event:  BackgroundMessage', payload)
    const notTitle = payload.notification.title
    const notOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    }
    return self.registration.showNotification(notTitle, notOptions)
  })

  console.log('Hello from ServiceWorker.')
}
