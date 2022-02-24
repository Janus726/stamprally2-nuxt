<template>
  <div>
    <b-button class="btn-hover color-11" style="position: fixed; right: 0px; bottom: 70px" @click="openModal()">
      <QR2 style="fill: white; height: 95%; width: 95%; position: relative" />
    </b-button>
    <b-modal id="reader" size="sm" centered hide-footer>
      <template #modal-title>
        チェックイン
      </template>
      <b-tabs pills align="center">
        <b-tab title="QRコードを読み取って取得" active>
          <div class="d-block text-center">
            <b-overlay
              :show="loading || !QRloaded"
              variant="transparent"
              opacity="1.0"
              blur="2px"
              spinner-type="grow"
              style="border-radius: 10px"
              :style="{color: $store.state.userInfo.color}"
            >
              <div class="mx-auto mt-2 mb-3">
                <qrcode-stream
                  :track="paintOutline"
                  class="mx-auto"
                  style="overflow: hidden; border-radius: 8px; width: 200px; height: 200px;"
                  @decode="onDecode"
                  @init="onInit"
                />
              </div>
            </b-overlay>
            <template v-if="errorNo === 0 && displayMsg">
              QRコードが画面内に収まるようにかざしてください。
            </template>
            <h6 v-if="errorNo === 1 && displayMsg" style="color: red">
              無効なQRコードです。
            </h6>
            <h6 v-if="errorNo === 2 && displayMsg" style="color: red">
              現在地を取得できませんでした。
            </h6>
            <h6 v-if="errorNo === 3 && displayMsg" style="color: red">
              スタンプから離れすぎています。
            </h6>
            <h6 v-if="errorNo === 4 && displayMsg" style="color: red">
              取得済みのスタンプです。
            </h6>
            <template v-if="success === 1">
              {{ stampInfo.name }}
            </template>
          </div>
        </b-tab>
        <b-tab title="GPS情報で取得">
          <div class="d-block text-center">
            <b-overlay
              :show="loading"
              variant="transparent"
              opacity="1.0"
              blur="2px"
              spinner-type="grow"
              style="border-radius: 10px"
              :style="{color: $store.state.userInfo.color}"
            >
              <div class="mx-auto mt-3 mb-3">
                <b-button variant="danger" class="my-2 shadow" style="width: 80px; height: 80px; border-radius: 50px" @click="getPlace(2)">
                  <fa :icon="faSearchLocation" class="iconSize-s" />
                </b-button>
              </div>
            </b-overlay>
            <template v-if="errorNo === 0 && displayMsg">
              スタンプの近くまで行き，ボタンを押してください。
            </template>
            <h6 v-if="errorNo === 2 && displayMsg" style="color: red">
              現在地を取得できませんでした。
            </h6>
            <h6 v-if="errorNo === 3 && displayMsg" style="color: red">
              スタンプから離れすぎています。
            </h6>
            <h6 v-if="errorNo === 4 && displayMsg" style="color: red">
              取得済みのスタンプです。
            </h6>
            <h6 v-if="errorNo === 5 && displayMsg" style="color: red">
              この場所のスタンプを取得するにはQRコードを読み取ってください。
            </h6>
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
    <b-modal id="success" centered hide-header hide-footer>
      <div class="d-block text-center my-auto">
        <h4>スタンプ獲得</h4>
        <img v-if="displayImg" :src="displayImg" alt="image" style="width: 100%" />
        <h2 class="mt-3">
          {{ displayStampName }}
        </h2>
      </div>
      <b-button class="mt-3" block variant="primary" @click="function () {$bvModal.hide('success')}">
        閉じる
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/app'
import QR from '~/assets/image/qrcode.svg'
import QR2 from '~/assets/image/checkin2.svg'
import 'firebase/firestore'

export default {
  name: 'QrReader',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    QR, QR2
  },
  data () {
    return {
      loading: false,
      QRloaded: false,
      db: firebase.firestore(),
      userInfo: this.$store.getters.userInfo,
      stampInfo: this.$store.getters.stampInfo,
      ownedStamps: [],
      errorNo: 0,
      success: 0,
      displayMsg: true,
      displayImg: null,
      geoOption: {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
      },
      location: { lng: 0, lat: 0 },
      displayStampName: '',
      dist: 0
    }
  },
  computed: {
    faSearchLocation () {
      return faSearchLocation
    }
  },
  mounted () {
    this.$store.watch((state, getters) => getters.userInfo.user,
      (newValue) => {
        this.userInfo = newValue
      }
    )
    this.$store.watch((state, getters) => getters.stampInfo.stamps,
      (newValue) => {
        this.stampInfo = newValue
      }
    )
    this.$store.watch((state, getters) => getters.ownedStamps,
      (newValue) => {
        this.ownedStamps = newValue
      }
    )
    console.log(this.ownedStamps, this.stampInfo)
  },
  methods: {
    RAD (deg) {
      return deg * Math.PI / 180
    },
    openModal () {
      this.ownedStamps = this.$store.getters.ownedStamps
      this.errorNo = 0
      this.success = 0
      this.QRloaded = false
      this.$bvModal.show('reader')
    },
    onDecode (result) {
      // const _this = this
      this.errorNo = 0
      this.displayMsg = false
      this.loading = true
      if (result.length === 59) {
        // this.$router.replace(result)
        document.location.href = result
      } else if (result.length === 28) {
        const stampId = result.slice(8)
        console.log(stampId, this.$store.state.stampInfo.stamps)
        if (this.ownedStamps && this.ownedStamps.includes(stampId)) {
          console.log('got')
          this.errorNo = 4
          this.displayMsg = true
          this.loading = false
          return
        }
        this.getPlace(stampId)
        // // this.db.collection('stamps')
        // //   .doc(this.result)
        // //   .onSnapshot(function (doc) {
        // //     if (doc.exists) {
        // //       _this.stampInfo = doc.data()
        // //       console.log(_this.stampInfo)
        // //       _this.getPlace()
        // //     } else {
        // //       _this.errorNo = 1
        // //     }
        // //   })
        // if (this.$store.state.ownedStamps.stamps) {
        //   if (this.$store.state.ownedStamps.stamps.includes(stampId)) {
        //     this.errorNo = 4
        //     this.displayMsg = true
        //     this.loading = false
        //     return
        //   }
        // }
        // if (this.$store.state.stampInfo.stamps[stampId]) {
        //   await this.getSuccess(stampId)
        // } else {
        //   this.errorNo = 1
        //   this.loading = false
        //   this.displayMsg = true
        // }
      } else {
        this.errorNo = 1
        this.loading = false
        this.displayMsg = true
      }
    },
    async onInit (promise) {
      try {
        await promise
        this.QRloaded = true
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          console.log('許可できてない')
          this.QRloaded = true
        } else if (error.name === 'NotFoundError') {
          console.log('カメラない')
          this.QRloaded = true
        } else if (error.name === 'NotSupportedError') {
          console.log('ERROR: secure context required (HTTPS, localhost)')
          this.QRloaded = true
        } else if (error.name === 'NotReadableError') {
          console.log('ERROR: is the camera already in use?')
          this.QRloaded = true
        } else if (error.name === 'OverconstrainedError') {
          console.log('ERROR: installed cameras are not suitable')
          this.QRloaded = true
        } else if (error.name === 'StreamApiNotSupportedError') {
          console.log('ERROR: Stream API is not supported in this browser')
          this.QRloaded = true
        }
      }
    },
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'blue'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const {
          x,
          y
        } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },
    getPlace (num) {
      this.errorNo = 0
      this.displayMsg = false
      this.loading = true
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            this.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          },
          () => {
            console.log('error')
            this.errorNo = 2
            this.loading = false
          }, this.geoOption
        )
        setTimeout(() => {
          navigator.geolocation.clearWatch(watchId)
          if (num === 2) {
            this.computeDistanceGPS()
          } else {
            this.computeDistanceQR(num)
          }
        }, 3000)
        // navigator.geolocation.getCurrentPosition(
        //   async (position) => {
        //     this.location = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     }
        //     console.log(this.location)
        //     await this.computeDistance()
        //   },
        //   () => {
        //     console.log('error')
        //     this.errorNo = 2
        //     this.loading = false
        //   }, this.geoOption
        // )
      } else {
        alert('ブラウザがGPSをサポートしていません')
        this.loading = false
        this.displayMsg = true
      }
    },
    computeDistanceGPS () {
      const stamps = Object.entries(this.stampInfo)
      console.log(stamps)
      let dist = 0.0
      const e = 6378137.0
      for (let i = 0; i < stamps.length; i++) {
        const rad = stamps[i][1].radius
        const lat2 = stamps[i][1].location._lat
        const lng2 = stamps[i][1].location._long
        dist = e * Math.acos(Math.cos(this.RAD(this.location.lat)) *
          Math.cos(this.RAD(lat2)) * Math.cos(this.RAD(lng2) - this.RAD(this.location.lng)) +
          Math.sin(this.RAD(this.location.lat)) * Math.sin(this.RAD(lat2)))
        console.log(dist)
        this.dist = dist
        if (dist <= rad) {
          console.log(this.ownedStamps, stamps[i][1].id)
          if (stamps[i][1].type === 'GPS') {
            if (this.ownedStamps && this.ownedStamps.includes(stamps[i][1].id)) {
              console.log('got')
              this.errorNo = 4
              this.displayMsg = true
              this.loading = false
              return
            }
            this.success = 1
            this.getSuccess(stamps[i][1].id)
          } else {
            this.errorNo = 5
            this.displayMsg = true
            this.loading = false
            return
          }
        }
      }
      console.log('失敗')
      this.errorNo = 3
      this.loading = false
      this.displayMsg = true
    },
    computeDistanceQR (stampId) {
      let dist = 0.0
      const e = 6378137.0
      const rad = this.stampInfo[stampId].radius
      const lat2 = this.stampInfo[stampId].location._lat
      const lng2 = this.stampInfo[stampId].location._long
      dist = e * Math.acos(Math.cos(this.RAD(this.location.lat)) *
        Math.cos(this.RAD(lat2)) * Math.cos(this.RAD(lng2) - this.RAD(this.location.lng)) +
        Math.sin(this.RAD(this.location.lat)) * Math.sin(this.RAD(lat2)))
      console.log(dist)
      this.dist = dist
      if (dist <= rad) {
        console.log(this.stampInfo[stampId].name)
        this.success = 1
        this.getSuccess(stampId)
      } else {
        console.log('失敗')
        this.errorNo = 3
        this.loading = false
        this.displayMsg = true
      }
    },
    async getSuccess (stampId) {
      this.displayStampName = this.stampInfo[stampId].name
      if (this.stampInfo[stampId].thumbnail) {
        this.displayImg = this.stampInfo[stampId].thumbnail
      } else { this.displayImg = null }
      const getDate = new Date()
      await this.db
        .collection('demo-users')
        .doc(this.$store.state.clientId).update({
          ownedStamps: firebase.firestore.FieldValue.arrayUnion(stampId),
          stGetDate: firebase.firestore.FieldValue.arrayUnion(getDate)
        })
      await this.db
        .collection('demo-locationLog')
        .doc(this.$store.state.clientId)
        .update({
          location: firebase.firestore.FieldValue.arrayUnion({ lat: this.location.lat, lng: this.location.lng }),
          date: firebase.firestore.FieldValue.arrayUnion(getDate)
        })
      // if (this.userInfo.ownedStamps) {
      //   this.userInfo.ownedStamps.push(stampId)
      // }
      // this.userInfo.stGetDate.push(getDate)
      // await this.$store.dispatch('setUserInfo', this.userInfo)
      this.loading = false
      this.displayMsg = true
      this.$bvModal.hide('reader')
      this.$bvModal.show('success')
      this.$bvToast.toast('スタンプを獲得しました！', {
        variant: 'info'
      })
    }
  }
}
</script>

<style scoped>
.iconSize-s {
  font-size: 40px;
}
.btn-hover {
  width: 75px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 75px;
  text-align:center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}
.btn-hover.color-11 {
  background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
}

</style>
