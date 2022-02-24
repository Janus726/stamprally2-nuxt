const functions = require('firebase-functions')
// eslint-disable-next-line no-unused-vars
const admin = require('firebase-admin')
admin.initializeApp()

// eslint-disable-next-line require-await
exports.SendPush = functions.region('asia-northeast1').https.onCall((data) => {
  const Msg = 'success'
  const Token = data.token.split(',')
  // const Token = 'eoALV197BdJIVe6LTPFX7Z:APA91bH3ATgY-t7mLBG678_a54bjQcQ5t1n43odj-RjilrvjMmSV1Q6O5GYIkF9UW61euZHzRKA4ezAtYGOkgPaojVuVctyprtER7bBJpcmMH6Tg5KfA4k7RInERre6Tdf3llpgqK_HG'
  const senderName = data.name
  const Title = 'イマドコ通知'
  const Body = senderName + ' さんが、現在地を知りたがっています。'
  const Icon = ''
  const Link = 'https://stamprally2-6632c.web.app/team'

  for (let i = 0; i < Token.length; i++) {
    const message = {
      token: (Token[i]).toString(),
      notification: {
        title: Title,
        body: Body
      },
      webpush: {
        notification: {
          icon: Icon
        },
        fcmOptions: {
          link: Link
        }
      }
    }

    admin.messaging().send(message)
      .then(() => {
        console.log('messages success')
        return { msg: Msg }
      }).catch((error) => {
        console.log('error sending message', error)
      })
  }
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
