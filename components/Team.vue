<template>
  <b-container fluid class="m-lg-5" style="margin-top: 15px; margin-bottom: 120px">
    <template v-if="teamStatus === 0 || teamStatus === 1">
      <b-row class="my-3">
        <b-col class="justify-content-center">
          <h3>
            まだチームがありません
          </h3>
        </b-col>
      </b-row>
    </template>
    <template v-else>
      <b-row>
        <b-col>
          <div class="d-flex mb-2">
            <h3>あなたのチーム</h3>
            <b-button variant="primary" class="ml-auto shadow-sm" @click="openModal()">
              <fa :icon="faBell" class="iconSize-s mt-auto" />
            </b-button>
            <b-modal id="imadoko" centered hide-footer>
              <template #modal-title>
                イマドコ通知
              </template>
              <div class="d-block text-center">
                <h6 class="my-3">
                  チームメイトに通知を送信して、通知をタップしたユーザの現在の位置を知ることができます。（Android端末のみ有効）
                </h6>
                <b-button v-if="notificationSent === 0" block variant="primary" class="my-3" @click="sendPush()">
                  送信する
                </b-button>
                <h5 v-else-if="notificationSent === 1">
                  送信しました。
                </h5>
              </div>
            </b-modal>
          </div>
          <b-overlay
            :show="!loaded"
            variant="transparent"
            opacity="1.0"
            blur="2px"
            spinner-type="grow"
            style="border-radius: 13px"
          >
            <GmapMap
              map-type-id="roadmap"
              :center="location"
              :zoom="zoom"
              :style="styleMap"
              :options="mapOptions"
              style="overflow: hidden; border-radius: 13px; z-index: 1"
            >
              <GmapInfoWindow
                :position="infoWindowPos"
                :options="{pixelOffset: {width: 0, height: -35}}"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen=false"
              >
                <h6 class="mb-auto">
                  {{ displayName }}
                </h6>
              </GmapInfoWindow>
              <gmap-custom-marker
                v-for="user in users"
                :key="user.id"
                :marker="{lat: user.location.lat, lng: user.location.lng}"
                @click.native="toggleInfo(user)"
              >
                <fa :icon="faUserCircle" class="iconSize-m" style="background-color: white; border-radius: 50px; border: none" :style="{color: user.color}" />
              </gmap-custom-marker>
            </GmapMap>
          </b-overlay>
        </b-col>
      </b-row>
      <b-row class="my-4">
        <b-col class="justify-content-center">
          <b-card v-for="user in users" :key="user.id" class="my-2 shadow-sm" style="border-radius: 10px; border: none">
            <div class="d-flex">
              <div>
                <b-card-title class="my-auto">
                  {{ user.name }}
                </b-card-title>
                <span class="mr-auto my-auto">最終ログイン：{{ user.logined }}</span>
              </div>
              <!--                  <b-avatar class="ml-auto my-auto" size="44px" :style="{backgroundColor: user.color}" button @click="recenterMap(user.location)" />-->
              <b-button pill class="ml-auto my-auto" style="padding: 0; background-color: white; border: none" @click="recenterMap(user.location)">
                <fa :icon="faUserCircle" :style="{color: user.color, fontSize: '47px'}" />
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </template>
    <b-row class="my-3">
      <b-col class="d-flex justify-content-center">
        <b-row class="my-3">
          <b-col class="d-flex justify-content-center">
            <b-button pill class="btn-hover color-1" @click="addTeam()">
              招待する
            </b-button>
            <!--          <b-button @click="Delete()" />-->
            <b-modal id="show-url" centered hide-footer>
              <template #modal-title>
                招待用URL
              </template>
              <div class="d-block text-center">
                <h6 class="my-2">
                  このURLと認証コードを招待したい人に共有してください。(リンクまたは専用のQRコード)
                </h6>
                <h6>コードは30分間有効です。</h6>
                <nuxt-link v-if="linkOrNot" class="my-2" :to="{ name: 'invite-id', params: { id: team } }" target="_blank">
                  {{ teamUrl }}{{ team }}
                </nuxt-link>
                <qrcode v-else :value="teamUrl + team" :options="{width: 150}" />
                <h2 class="my-3">
                  {{ teamPass }}
                </h2>
                <div class="mb-3" style="display: inline-flex">
                  <b-button v-if="linkOrNot" class="mx-2" style="background-color: white; border: none; padding: 0" @click="switchLink()">
                    <fa :icon="faQrcode" class="iconSize-s" style="color: dimgray" button />
                  </b-button>
                  <b-button v-else class="mx-2" style="background-color: white; border: none; padding: 0" @click="switchLink()">
                    <fa :icon="faLink" class="iconSize-s" style="color: dimgray" button />
                  </b-button>
                  <b-button class="mx-2" style="background-color: white; border: none; padding: 0" @click="copyToClipboard()">
                    <fa :icon="faCopy" class="iconSize-s" style="color: dimgray" button />
                  </b-button>
                </div>
              </div>
            </b-modal>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { faUserCircle, faBell, faQrcode, faLink } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import firebase from '~/plugin/firebase'
import 'firebase/firestore'
import 'firebase/functions'
// eslint-disable-next-line import/order
import GmapCustomMarker from 'vue2-gmap-custom-marker'

export default {
  name: 'Team',
  components: { 'gmap-custom-marker': GmapCustomMarker },
  data () {
    return {
      loaded: false,
      clientId: this.$store.state.clientId,
      db: firebase.firestore(),
      userInfo: '',
      team: this.$store.state.team,
      users: {},
      teamList: {},
      teamPass: '',
      teamPassLimit: '',
      teamUrl: 'https://stamprally2-6632c.web.app/invite/',
      teamStatus: 0,
      location: { lng: 0, lat: 0 },
      zoom: 14,
      styleMap: {
        width: '100%',
        height: (window.innerHeight - 200) + 'px'
      },
      geoOption: {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0
      },
      mapOptions: {
        mapId: '63195e970b363d97',
        disableDefaultUi: true,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        styles: []
      },
      mToken: [],
      notificationSent: 0,
      infoWindowPos: { lat: 0, lng: 0 },
      infoWinOpen: false,
      displayName: '',
      linkOrNot: true
    }
  },
  computed: {
    faUserCircle () {
      return faUserCircle
    },
    faBell () {
      return faBell
    },
    faCopy () {
      return faCopy
    },
    faQrcode () {
      return faQrcode
    },
    faLink () {
      return faLink
    }
  },
  async created () {
    const _this = this
    if (this.$store.state.team !== '') {
      await this.db
        .collection('users')
        .where('team', '==', this.$store.state.team)
        .onSnapshot(function (snapshot) {
          snapshot.forEach(function (doc) {
            _this.$set(_this.users, doc.id, doc.data())
            const createdAt = _this.timeConverter(
              doc.data().login.seconds * 1000
            )
            _this.$set(_this.users[doc.id], 'logined', createdAt)
          })
        })
      // this.mToken = tokens.filter(function (a, i, self) {
      //   return self.indexOf(a) === i
      // })
      console.log(this.users)
      await this.db
        .collection('teams')
        .doc(this.$store.state.team)
        .onSnapshot(function (doc) {
          if (doc.exists) {
            _this.teamList = doc.data()
            console.log(_this.teamList)
            if (_this.$store.state.team !== '') {
              if (_this.teamList.number <= 1) {
                _this.teamStatus = 1
                _this.$store.dispatch('setTeamStatus', _this.teamStatus)
              } else {
                _this.teamStatus = 2
                _this.$store.dispatch('setTeamStatus', _this.teamStatus)
              }
            } else {
              _this.teamStatus = 0
              _this.$store.dispatch('setTeamStatus', _this.teamStatus)
            }
          } else {
            console.log('error')
          }
        })
    }
    await this.getUserInfo()
    await this.$nextTick(() => {
      if (this.$store.state.teamStatus === 2) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
              this.loaded = true
              console.log(this.location)
            },
            () => {
              this.$bvToast.toast('位置情報の取得に失敗しました。もう一度読み込んでください。', {
                variant: 'danger',
                solid: true
              })
              this.loaded = true
            }, this.geoOption
          )
        } else {
          alert('ブラウザがGPSをサポートしていません')
          this.loaded = true
        }
      }
    })
    this.loaded = true
  },
  mounted () {
    this.$store.watch((state, getters) => getters.userInfo.user,
      (newValue) => {
        this.userInfo = newValue
      }
    )
  },
  methods: {
    toggleInfo (user) {
      this.infoWindowPos = user.location
      this.displayName = user.name
      this.infoWinOpen = true
    },
    async addTeam () {
      if (this.teamStatus === 0) {
        const length = 18
        const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let r = ''
        for (let i = 0; i < length; i++) {
          r += c[Math.floor(Math.random() * c.length)]
        }
        this.team = r
        await this.db
          .collection('teams')
          .doc(this.team)
          .set({
            members: [this.clientId],
            number: 1,
            pass: this.randomNumber(),
            passLimit: this.teamPassLimit
          }).then(() => {
            this.db
              .collection('demo-users')
              .doc(this.clientId).set({
                team: this.team
              }, { merge: true })
            this.teamStatus = 1
            this.$store.dispatch('setTeam', this.team)
            this.$store.dispatch('setTeamsStatus', this.teamStatus)
            this.userInfo.team = this.team
            this.$store.dispatch('setUserInfo', this.userInfo)
            this.$bvModal.show('show-url')
          }).catch((error) => {
            console.log('失敗', error)
          })
        console.log(this.team)
      } else {
        await this.db
          .collection('teams')
          .doc(this.team).set({
            pass: this.randomNumber(),
            passLimit: this.teamPassLimit
          }, { merge: true })
        this.$bvModal.show('show-url')
        console.log(this.team)
      }
    },
    randomNumber () {
      let Num = 0
      const d1 = Math.floor(Math.random() * 9) + 1
      const d2 = Math.floor(Math.random() * 9) + 1
      const d3 = Math.floor(Math.random() * 9) + 1
      const d4 = Math.floor(Math.random() * 9) + 1
      Num = d1 * 1000 + d2 * 100 + d3 * 10 + d4
      this.teamPass = Num
      this.teamPassLimit = new Date()
      console.log(this.teamPassLimit)
      return Num
    },
    timeConverter (time) {
      const from = new Date(time)
      const diff = new Date().getTime() - from.getTime()
      const elapsed = new Date(diff)
      if (elapsed.getUTCFullYear() - 1970) {
        return elapsed.getFullYear() - 1970 + ' 年前'
      } else if (elapsed.getUTCMonth()) {
        return elapsed.getUTCMonth() + ' ヶ月前'
      } else if (elapsed.getUTCDate() - 1) {
        return elapsed.getUTCDate() - 1 + ' 日前'
      } else if (elapsed.getUTCHours()) {
        return elapsed.getUTCHours() + ' 時間前'
      } else if (elapsed.getUTCMinutes()) {
        return elapsed.getUTCMinutes() + ' 分前'
      } else {
        return 'たった今'
      }
      // const dateTime = new Date(time)
      // return dateTime.toLocaleString()
    },
    async sendPush () {
      this.mToken = []
      const Functions = firebase.app().functions('asia-northeast1')
        .httpsCallable('SendPush')
      const users = Object.entries(this.users)
      for (let i = 0; i < users.length; i++) {
        if (users[i][0] !== this.clientId && users[i][1].token !== '') {
          this.mToken.push(users[i][1].token)
        }
      }
      console.log((this.mToken).toString())
      const res = await Functions({ token: (this.mToken).toString(), name: this.userInfo.name })
        .then(() => {
          this.notificationSent = 1
        })
      console.log(res)
    },
    openModal () {
      this.notificationSent = 0
      this.$bvModal.show('imadoko')
    },
    copyToClipboard () {
      const _this = this
      navigator.clipboard.writeText('以下のURLからチームに参加できます！\n' + this.teamUrl + this.team + '\n認証コードは ' + this.teamPass + ' です。')
        .then(() => {
          _this.$bvToast.toast('コピーしました。')
          console.log('copied')
        })
        .catch((e) => {
          console.error(e)
        })
    },
    recenterMap (loc) {
      this.location = loc
    },
    switchLink () {
      this.linkOrNot = !this.linkOrNot
    },
    getUserInfo () {
      this.userInfo = this.$store.state.userInfo.user
    }
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
}
.btn-hover {
  width: 180px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 60px;
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

.btn-hover.color-1 {
  background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-3 {
  background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7);
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.iconSize-s {
  font-size: 24px;
}
.iconSize-m {
  font-size: 34px;
}

</style>
