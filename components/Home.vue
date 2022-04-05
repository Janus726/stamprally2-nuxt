<template>
  <b-container fluid style="margin-top: 15px; margin-bottom: 180px">
    <b-row v-if="loaded">
      <b-col>
        <h3 class="mb-3">
          ホーム
        </h3>
<!--        <div class="mb-3">-->
<!--          <b-carousel-->
<!--            id="carousel-1"-->
<!--            v-model="slide"-->
<!--            :interval="6000"-->
<!--            controls-->
<!--            indicators-->
<!--            background="#696969"-->
<!--            img-height="35"-->
<!--            img-width="100%"-->
<!--            class="shadow-sm"-->
<!--            style="overflow: hidden; border-radius: 13px; z-index: 1; text-shadow: 1px 1px 2px #333"-->
<!--            @sliding-start="onSlideStart"-->
<!--            @sliding-end="onSlideEnd"-->
<!--          >-->
<!--            <b-carousel-slide-->
<!--              img-blank-->
<!--            >-->
<!--              <h5 @click="openModal()">コースのご案内</h5>-->
<!--            </b-carousel-slide>-->
<!--            <b-carousel-slide-->
<!--              v-for="course in recommendCourse"-->
<!--              :key="course.id"-->
<!--              img-blank-->
<!--            >-->
<!--              <h6>おすすめコース</h6>-->
<!--              <h5>{{ course[1].name }}</h5>-->
<!--            </b-carousel-slide>-->
<!--          </b-carousel>-->
<!--          <b-modal id="course" centered hide-footer>-->
<!--            <template #modal-title>-->
<!--              5つのコース-->
<!--            </template>-->
<!--            <div class="my-3 d-flex">-->
<!--              <h6>-->
<!--                「まんなか佐賀 ぐるっとスタンプラリー」は，約30箇所のスタンプがありますが、どのように回ればいいか悩んでしまう方もいるでしょう。<br>-->
<!--                そこで、テーマ別に5つのコースをご用意しました。<br><br>-->
<!--                佐賀各地の温泉や滝をまわる<h5 style="color: #3f82bb">温泉・滝めぐりコース</h5>地域特有のものに触れながらまわる<h5 style="color: #3f82bb">特産品さがしコース</h5>-->
<!--                各地の公園で自然を楽しむ<h5 style="color: #3f82bb">公園めぐりコース</h5>歴史や文化に触れられる<h5 style="color: #3f82bb">歴史すきコース</h5>-->
<!--                佐賀ならではの自然や景観を楽しむ<h5 style="color: #3f82bb">景観・体験コース</h5><br>-->
<!--                これらのコースに沿って行くもよし、自分で順番を決めてまわるのもよし、楽しみ方はさまざま。ぜひコンプリートを目指しましょう！-->
<!--              </h6>-->
<!--            </div>-->
<!--          </b-modal>-->
<!--        </div>-->
        <b-overlay
          :show="!loaded"
          variant="transparent"
          opacity="1.0"
          blur="2px"
          spinner-type="grow"
          style="border-radius: 13px"
        >
          <GmapMap
            v-if="loaded"
            ref="gMap"
            map-type-id="roadmap"
            :center="initialLocation"
            :zoom="zoom"
            :style="styleMap"
            :options="mapOptions"
            style="overflow: hidden; border-radius: 13px; z-index: 1"
          >
            <GmapPolyline
              :path.sync="path"
              :options="{
                strokeColor: courseColor,
                strokeWeight: 6
              }"
            />
            <GmapInfoWindow
              :position="infoWindowPos"
              :options="{pixelOffset: {width: 0, height: -45}}"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen=false"
            >
              <div class="mb-auto mr-auto">
                <h6>{{ displayName }}</h6>
                <b-img-lazy :src="displayImage" class="my-1 mx-auto" style="width: 100%; border-radius: 6px" alt="" />
                {{ getStatus }}
              </div>
              <div class="d-flex align-items-center">
                <b-button
                  v-if="displayURL"
                  class="ml-auto shadow"
                  style="position: absolute; right: 5px; bottom: 5px; width: 48px; height: 48px; border-radius: 50px; z-index: 1; background-color: #e58900; border: none; padding-top: 4px"
                  @click="openURL()"
                >
                  <fa :icon="faExternalLinkAlt" style="font-size: 16px" />
                  <p class="m-0" style="font-size: 10px">HPへ</p>
                </b-button>
              </div>
            </GmapInfoWindow>
            <GmapCluster />
            <gmap-custom-marker
              v-for="stamp in stampInfo"
              :key="stamp.id"
              :marker="{lat: stamp.location._lat, lng: stamp.location._long}"
              :offset-y="20"
              @click.native="toggleInfoSt(stamp)"
            >
              <div v-if="courseCheck(stamp.id)" class="iconCircle" :style="{backgroundColor: stampColor(stamp.id)}">
                <fa :icon="faStamp" class="iconSize-s" :style="{color: '#fff'}" />
<!--                <p class="iconSize-s" style="color: #fff">{{ stamp.type }}</p>-->
              </div>
            </gmap-custom-marker>
            <gmap-custom-marker
              :marker="location"
              style="z-index: 100"
            >
              <!--                  <b-avatar size="32px" :style="{backgroundColor: userInfo.color}" />-->
              <fa :icon="faUserCircle" class="iconSize-m" style="background-color: white; border-radius: 50px; z-index: 100" :style="{color: $store.getters.userInfo.color}" />
            </gmap-custom-marker>
            <div slot="visible" class="mt-2 ml-2">
              <b-dropdown id="selectCourse" class="shadow" :text="selectedCourse" variant="outline-primary" style="width: 200px; background-color: white; border-radius: 7px">
                <b-dropdown-item @click="switchRoute2(0)">
                  全てのスタンプ
                </b-dropdown-item>
                <b-dropdown-item
                  v-for="course in openCheck"
                  :key="course.id"
                  @click="switchRoute2(course[1].id)"
                >
                  {{ course[1].name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </GmapMap>
        </b-overlay>
        <h4 class="mt-4">
          関連イベント情報
        </h4>
        <Information />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import firebase from 'firebase/app'
import { faUserCircle, faBell, faStamp, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { gmapApi } from 'vue2-google-maps'
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'
// import gmaps from '~/plugin/vue2-google-maps'
import Information from '~/components/Information'
import firebase from '~/plugin/firebase'
import 'firebase/firestore'
// eslint-disable-next-line import/order

export default {
  name: 'Home',
  components: { Information, 'gmap-custom-marker': GmapCustomMarker, GmapCluster },
  data () {
    return {
      loaded: false,
      clientId: '',
      db: firebase.firestore(),
      //
      userInfo: this.$store.getters.userInfo,
      teamUrl: 'https://stamprally2-6632c.web.app/invite/',
      teamStatus: this.$store.state.teamStatus,
      location: { lat: 33, lng: 130 },
      initialLocation: { lat: 33, lng: 130 },
      zoom: 13,
      styleMap: {
        width: '100%',
        // height: (window.innerHeight - 253) + 'px'
        height: '500px'
      },
      geoOption: {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0
      },
      mapOptions: {
        disableDefaultUi: true,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
        styles: []
      },
      infoWindowPos: { lat: 0, lng: 0 },
      infoWinOpen: false,
      displayName: '',
      displayImage: '',
      getStatus: '',
      stampInfo: this.$store.getters.stampInfo,
      ownedStamps: {},
      courseList: this.$store.getters.course,
      selectedCourse: '表示するコースを選択',
      courseNum: 0,
      courseColor: '#696969',
      DS: '',
      DR: '',
      routeResult: {},
      routeTime: '',
      routeDist: '',
      displayRoute: false,
      displayURL: null,
      path: [],
      slide: 0,
      sliding: null
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
    faStamp () {
      return faStamp
    },
    faExternalLinkAlt () {
      return faExternalLinkAlt
    },
    newCourse () {
      return Object.entries(this.courseList).filter((course) => {
        return course[1].category === 'new'
      })
    },
    recommendCourse () {
      return Object.entries(this.courseList).filter((course) => {
        return course[1].category === 'recommend'
      })
    },
    openCheck () {
      return Object.entries(this.courseList).filter(async (course) => {
        let now
        await axios.head(location.href).then((res) => {
          now = new Date(res.headers.date)
        }).catch(() => {
          now = new Date()
        })
        const open = new Date(course[1].open.seconds * 1000)
        const close = new Date(course[1].close.seconds * 1000)
        const diff1 = now.getTime() - open.getTime()
        const diff2 = close.getTime() - now.getTime()
        console.log(diff1, diff2)
        return (diff1 >= 0 && diff2 > 0)
      })
    },
    google: gmapApi
  },
  // watch: {
  //   master (val) {
  //     if (!val.testopen) {
  //       console.log('error!')
  //     }
  //   }
  // },
  async created () {
    await this.getId()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.initialLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        },
        () => {
          this.$bvToast.toast('位置情報の取得に失敗しました。もう一度読み込んでください。', {
            variant: 'danger',
            solid: true
          })
        }, this.geoOption
      )
    }
    // await this.getUserInfo()
    // await this.getStampInfo()
    await this.$nextTick(() => {
      this.getPlace()
    })
    this.loaded = true
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
    this.$store.watch((state, getters) => getters.userInfo.user,
      (newValue) => {
        this.userInfo = newValue
        this.loaded = false
        this.$nextTick(() => (this.loaded = true))
      }
    )
    this.$store.watch((state, getters) => getters.stampInfo.stamps,
      (newValue) => {
        this.stampInfo = newValue
      }
    )
    this.$store.watch((state, getters) => getters.course.course,
      (newValue) => {
        this.courseList = newValue
      }
    )
    this.$store.watch((state, getters) => getters.ownedStamps.stamps,
      (newValue) => {
        this.loaded = false
        this.ownedStamps = newValue
        this.$nextTick(() => (this.loaded = true))
      }
    )
    console.log(this.clientId + ',' + this.$store.state.isRegister)
  },
  methods: {
    openURL () {
      window.open(this.displayURL, '_blank')
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
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
    getPlace () {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            this.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          },
          () => {
            console.log('cannot get location')
          }, this.geoOption
        )
      } else {
        alert('ブラウザがGPSをサポートしていません')
      }
    },
    toggleInfoSt (stamp) {
      this.infoWindowPos = { lat: stamp.location._lat, lng: stamp.location._long }
      this.displayName = stamp.name
      this.displayImage = stamp.image
      if (stamp.URL) {
        this.displayURL = stamp.URL
      } else { this.displayURL = null }
      this.getStatus = this.haveOrNot(stamp.id)
      this.infoWinOpen = true
    },
    openModal () {
      this.$bvModal.show('course')
    },
    recenterMap (loc) {
      this.location = loc
    },
    stampColor (id) {
      if (this.userInfo.ownedStamps) {
        for (let i = 0; i < this.$store.getters.ownedStamps.length; i++) {
          if (this.$store.getters.ownedStamps[i] === id) {
            return this.stampInfo[id].color
          }
        }
      }
      return '#696969'
    },
    haveOrNot (id) {
      if (this.userInfo.ownedStamps) {
        for (let i = 0; i < this.$store.state.ownedStamps.stamps.length; i++) {
          if (this.$store.state.ownedStamps.stamps[i] === id) {
            return '取得済み'
          }
        }
      }
      return '未取得'
    },
    switchRoute2 (courseId) {
      this.path = []
      this.courseNum = courseId
      if (courseId === 0) {
        this.selectedCourse = '全てのスタンプ'
      } else {
        this.selectedCourse = this.courseList[this.courseNum].name
      }
      const waypoints = []
      if (courseId !== 0) {
        for (let i = 0; i < this.courseList[courseId].path.length; i++) {
          waypoints.push({ lat: this.courseList[courseId].path[i]._lat, lng: this.courseList[courseId].path[i]._long })
        }
        console.log(waypoints)
        this.path = waypoints
        // this.path = await gmaps.sanpToRoad(waypoints)
      }
      if (courseId !== 0) {
        this.courseColor = this.courseList[courseId].color
      }
      this.displayRoute = true
    },
    courseCheck (course) {
      if (this.courseNum === 0) {
        return true
      } else if ((this.stampInfo[course].course).includes(this.courseNum)) {
        return true
      } else {
        return false
      }
    },
    routeDisplaySwitch () {
      if (!this.path) {
        this.DR.setMap(this.$refs.gMap.$mapObject)
        this.DR.setDirections(this.routeResult)
        this.displayRoute = true
      } else {
        this.DR.setMap(null)
        this.displayRoute = false
      }
    },
    async getStampInfo () {
      this.stampInfo = this.$store.getters.stampInfo
      console.log('2', this.stampInfo)
      await this.getCourseInfo()
    },
    getUserInfo () {
      this.userInfo = this.$store.getters.userInfo
      console.log(this.userInfo)
    },
    getCourseInfo () {
      this.courseList = this.$store.getters.course
      console.log('2', this.courseList)
    },
    getId () {
      this.clientId = this.$store.state.clientId
    }
  }
}
</script>
<style>
#app {
  min-height: 100%;
}
.btn-hover {
  width: 150px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
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
