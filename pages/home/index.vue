<template>
  <div style="max-width: 800px; margin: 0 auto">
    <div v-if="!master.testopen" style="background-color: #fafafa">
      <b-row class="d-flex text-center align-items-center">
        <b-col style="margin-top: 200px">
          <b-card class="m-4 shadow-sm" style="border: none">
            <h3>{{ master.message }}</h3>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div v-else id="app" style="background-color: #fafafa">
      <Navbar />
      <body v-if="loaded" class="mx-1" style="padding-top: 60px">
        <template>
          <Home v-if="state === 'home'" />
          <Stamps v-else-if="state === 'stamps'" />
          <Team v-else-if="state === 'team'" />
          <Info v-else-if="state === 'info'" />
          <Apply v-else-if="state === 'apply'" />
        </template>
      </body>
      <div id="menu" class="fixed-bottom">
        <QrReader />
        <b-button-group size="lg" style="width: 100%; height: 80px; box-shadow: 0 -6px 15px 0 rgba(0, 0, 0, .13); border-radius: 20px 20px 0 0">
          <b-button
            class="menubtn col-3"
            style="border-radius: 20px 0 0 0"
            @click="selectMenu('home')"
          >
            <h6 v-if="state === 'home'" class="menuText" style="font-size: 14px">
              <fa :icon="faHome" class="mb-1" style="margin: 0; font-size: 20px; color: #8ab72c" /><br>
              ホーム
            </h6>
            <fa v-else :icon="faHome" class="iconSize-ms" style="margin: 0" />
          </b-button>
          <b-button
            squared
            class="menubtn col-3"
            @click="selectMenu('stamps')"
          >
            <h6 v-if="state === 'stamps'" class="menuText" style="font-size: 14px">
              <fa :icon="faStamp" style="transform: rotate(40deg); font-size: 19px; margin-bottom: 6px; color: #e7930f" /><br>
              スタンプ
            </h6>
            <fa v-else :icon="faStamp" class="iconSize-ms" style="transform: rotate(40deg); font-size: 26px; margin-bottom: 6px" />
          </b-button>
          <!--        <b-button-->
          <!--          squared-->
          <!--          class="menubtn col-3"-->
          <!--          @click="state='team'"-->
          <!--        >-->
          <!--          <h6 v-if="state === 'team'" class="menuText">-->
          <!--            <fa :icon="faUserFriends" class="mb-1" style="font-size: 20px; margin: 0" /><br>-->
          <!--            チーム-->
          <!--          </h6>-->
          <!--          <fa v-else :icon="faUserFriends" class="iconSize-ms" />-->
          <!--        </b-button>-->
          <b-button
            class="menubtn col-3"
            squared
            @click="selectMenu('apply')"
          >
            <h6 v-if="state === 'apply'" class="menuText" style="font-size: 14px">
              <fa :icon="faGift" class="mb-1" style="font-size: 20px; margin: 0; color: #c73728" /><br>
              応募
            </h6>
            <fa v-else :icon="faGift" class="iconSize-ms" />
          </b-button>
          <!--        <b-button-->
          <!--          class="menubtn col-3"-->
          <!--          @click="selectMenu('team')"-->
          <!--        >-->
          <!--          <h6 v-if="state === 'team'" class="menuText" style="font-size: 14px">-->
          <!--            <fa :icon="faUserFriends" class="mb-1" style="font-size: 20px; margin: 0; color: #036e38" /><br>-->
          <!--            チーム-->
          <!--          </h6>-->
          <!--          <fa v-else :icon="faUserFriends" class="iconSize-ms" />-->
          <!--        </b-button>-->
          <b-button
            style="border-radius: 0 20px 0 0"
            class="menubtn col-3"
            @click="selectMenu('info')"
          >
            <h6 v-if="state === 'info'" class="menuText" style="font-size: 14px">
              <fa :icon="faInfoCircle" class="mb-1" style="font-size: 20px; margin: 0; color: #3f82bb" /><br>
              インフォ
            </h6>
            <fa v-else :icon="faInfoCircle" class="iconSize-ms" />
          </b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase/app'
import { faHome, faStamp, faUserFriends, faGift, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import QrReader from '~/components/QrReader'
import Stamps from '~/components/Stamps'
import Home from '~/components/Home'
import Team from '~/components/Team'
import Navbar from '~/components/Navbar'
import Apply from '~/components/Apply'
import Info from '~/components/Info'
import firebase from '~/plugin/firebase'
import 'firebase/firestore'
// eslint-disable-next-line import/order

export default {
  components: { Home, Navbar, QrReader, Stamps, Apply, Team, Info },
  data () {
    return {
      loaded: false,
      state: '',
      clientId: '',
      db: firebase.firestore(),
      userInfo: {
        color: '#696969'
      },
      teamUrl: 'https://stamprally2-6632c.web.app/invite/',
      teamStatus: this.$store.state.teamStatus,
      location: { lng: 0, lat: 0 },
      geoOption: {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0
      },
      stampInfo: {},
      ownedStamps: {},
      courseList: {},
      master: {}
    }
  },
  computed: {
    faHome () {
      return faHome
    },
    faStamp () {
      return faStamp
    },
    faUserFriends () {
      return faUserFriends
    },
    faGift () {
      return faGift
    },
    faInfoCircle () {
      return faInfoCircle
    }
  },
  // watch: {
  //   master (val) {
  //     if (!val.testopen) {
  //       console.log('error!')
  //     }
  //   }
  // },
  async created () {
    await this.checkError()
    await this.getId()
    await this.getUserInfo()
    await this.getStampInfo()
    await this.$nextTick(() => {
      this.state = 'home'
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            this.userInfo.location = this.location
            this.$store.dispatch('setUserInfo', this.userInfo)
            this.latestLogin()
            console.log(this.location)
          },
          () => {
            this.$bvToast.toast('位置情報の取得に失敗しました。もう一度読み込んでください。', {
              variant: 'danger',
              solid: true
            })
          }, this.geoOption
        )
      } else {
        alert('ブラウザがGPSをサポートしていません')
        this.loaded = true
      }
    })
    setTimeout(() => {
      this.loaded = true
    }, 1000)
  },
  mounted () {
    this.checkBrowser()
    if (!this.$store.state.bookmarked) {
      this.$bvToast.toast('ブックマークに追加していただくと，次回以降のアクセスが楽になります。', {
        title: 'ようこそ！',
        variant: 'info',
        solid: true,
        noAutoHide: true
      })
      this.$store.dispatch('setBookmark', true)
    }
    // this.$store.watch((state, getters) => getters.userInfo.user,
    //   (newValue) => {
    //     this.userInfo = newValue
    //     this.loaded = false
    //     this.$nextTick(() => (this.loaded = true))
    //   }
    // )
    console.log(this.clientId + ',' + this.$store.state.isRegister)
  },
  methods: {
    loadComplete () {
      this.loaded = true
    },
    selectMenu (state) {
      this.state = state
      const elem = document.activeElement
      elem.blur()
    },
    checkBrowser () {
      const agent = window.navigator.userAgent.toLowerCase()
      if ((agent.includes('chrome')) && (!agent.includes('edge')) && (!agent.includes('opr'))) {
        console.log('chrome')
      } else if ((agent.includes('safari')) && (!agent.includes('chrome'))) {
        console.log('safari')
      } else {
        this.$bvToast.toast('お使いのブラウザではうまく動作しない可能性があります。\nChromeまたはSafariを使用することをお勧めします。', {
          variant: 'danger',
          solid: true
        })
      }
    },
    timeConverter (open, close) {
      const now = new Date()
      const openTime = new Date(open)
      const closeTime = new Date(close)
      const diff1 = now.getTime() - openTime.getTime()
      const diff2 = closeTime.getTime() - now.getTime()
      console.log(diff1, diff2)
      if (diff1 >= 0 && diff2 > 0) {
        return true
      } else {
        return false
      }
    },
    async latestLogin () {
      const _this = this
      await this.db
        .collection('demo-users')
        .doc(this.clientId)
        .update({
          location: { lat: _this.location.lat, lng: _this.location.lng },
          login: new Date()
        })
      await this.db
        .collection('demo-locationLog')
        .doc(this.clientId)
        .update({
          location: firebase.firestore.FieldValue.arrayUnion({ lat: _this.location.lat, lng: _this.location.lng }),
          date: firebase.firestore.FieldValue.arrayUnion(new Date())
        })
    },
    async getStampInfo () {
      const _this = this
      await this.db
        .collection('stamps')
        .where('display', '==', 1)
      // .orderBy('order')
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            _this.$set(_this.stampInfo, doc.id, doc.data())
          })
        })
      await this.$store.dispatch('setStampInfo', this.stampInfo)
      console.log('1', this.stampInfo)
      await this.getCourseInfo()
    },
    async getUserInfo () {
      const _this = this
      await this.db
        .collection('demo-users')
        .doc(this.clientId)
        .onSnapshot(function (doc) {
          if (doc.exists) {
            _this.userInfo = doc.data()
            console.log(_this.userInfo)
            _this.$store.dispatch('setUserInfo', _this.userInfo)
            _this.$store.dispatch('setUserColor', _this.userInfo.color)
            _this.$store.dispatch('setOwnedStamps', _this.userInfo.ownedStamps)
            _this.$store.dispatch('setGetDate', _this.userInfo.stGetDate)
            _this.$store.dispatch('setUserName', _this.userInfo.name)
            // console.log(_this.$store.state.userInfo)
          } else {
            _this.$store.dispatch('setRegister', 0)
            _this.$router.push('/')
          }
        })
    },
    async getCourseInfo () {
      const _this = this
      await this.db
        .collection('course')
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            _this.$set(_this.courseList, doc.id, doc.data())
            console.log('1', _this.courseList)
          })
        })
      await this.$store.dispatch('setCourse', this.courseList)
      console.log('1', this.courseList)
    },
    getId () {
      if (this.$store.state.clientId) {
        this.clientId = this.$store.state.clientId
      } else {
        const cidPromise = new Promise((resolve) => {
          this.$gtag('get', 'G-JKG7RZNFMC', 'client_id', resolve)
          console.log('ID')
        })
        cidPromise.then((cid) => {
          this.clientId = cid
          this.$store.dispatch('setClientId', cid)
          // eslint-disable-next-line no-console
          console.log(this.clientId)
        })
      }
    },
    checkError () {
      const _this = this
      this.db
        .collection('master')
        .doc('masterData')
        .onSnapshot(function (doc) {
          _this.master = doc.data()
        })
    }
  }
}
</script>
<style>
#app {
  min-height: 100%;
}
#menu {
  margin-top: auto;
}
.menubtn {
  background-color: white;
  color: dimgray;
  border: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  cursor: pointer;
  outline: none;
}
.menubtn:active,
.menubtn:hover,
.menubtn:focus {
  background-color: white;
  outline: none;
}
.iconSize-ms {
  font-size: 28px;
}
.menuText {
  margin: 0;
  font-weight: bold;
  color: dimgray;
}
.iconSize-s {
  font-size: 17px;
}
.iconSize-m {
  font-size: 34px;
}
.iconSize-l {
  font-size: 44px;
}
.iconCircle {
  width: 34px;
  height: 34px;
  border-radius: 50px;
  border-color: white;
  text-align: center;
  line-height: 36px;
}
</style>
