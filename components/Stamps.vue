<template>
  <b-container fluid style="margin-top: 15px; margin-bottom: 180px">
    <b-row>
      <b-col>
        <h3 class="mb-3">
          スタンプカード
        </h3>
      </b-col>
    </b-row>
    <b-row class="d-flex my-3">
      <b-col class="col-4">
        <b-dropdown class="shadow-sm" :text="selectedStamps" variant="outline-primary">
          <b-dropdown-item @click="selectedStamps = 'すべて'">
            すべて
          </b-dropdown-item>
          <b-dropdown-item @click="selectedStamps = 'エリアごと'">
            エリアごと
          </b-dropdown-item>
          <b-dropdown-item @click="selectedStamps = 'コースごと'">
            コースごと
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <div v-if="selectedStamps === '並び替え' || selectedStamps === 'すべて'">
      <h4>すべて</h4>
      <b-row class="d-flex mx-0 shadow-sm" style="border-radius: 8px">
        <b-col
          v-for="stamp in stampInfo"
          :key="stamp.id"
          cols="4"
          class="m-0 p-2"
        >
          <div
            class="m-0 p-1"
            style="width: 90%; height: 90%; border: none; border-radius: 8px"
            @click="openModal(stamp.id)"
          >
            <img v-if="got(stamp.id) && stamp.thumbnail" :src="stamp.thumbnail" alt="" style="border-radius: 8px; width: 100%">
            <div
              v-else
              class="m-0 mb-1"
              :style="{backgroundColor: stColor(stamp.id)}"
              style="border-radius: 8px; width: 100%; padding-top: 100%"
            />
            <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
              {{ stamp.name }}
            </h6>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="selectedStamps === 'エリアごと'">
      <h4>小城市</h4>
      <b-row class="d-flex mx-0 shadow-sm mb-3" style="border-radius: 8px">
        <b-col
          v-for="stamp in sortStampsByArea('小城市')"
          :key="stamp.id"
          cols="4"
          class="m-0 p-2"
        >
          <div
            class="m-0 p-1"
            style="width: 90%; height: 90%; border: none; border-radius: 8px"
            @click="openModal(stamp.id)"
          >
            <img v-if="got(stamp.id) && stamp.thumbnail" :src="stamp.thumbnail" alt="" style="border-radius: 8px; width: 100%">
            <div
              v-else
              class="m-0 mb-1"
              :style="{backgroundColor: stColor(stamp.id)}"
              style="border-radius: 8px; width: 100%; padding-top: 100%"
            />
            <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
              {{ stamp.name }}
            </h6>
          </div>
        </b-col>
      </b-row>
      <h4>神埼市</h4>
      <b-row class="d-flex mx-0 shadow-sm mb-3" style="border-radius: 8px">
        <b-col
          v-for="stamp in sortStampsByArea('神埼市')"
          :key="stamp.id"
          cols="4"
          class="m-0 p-2"
        >
          <div
            class="m-0 p-1"
            style="width: 90%; height: 90%; border: none; border-radius: 8px"
            @click="openModal(stamp.id)"
          >
            <img v-if="got(stamp.id) && stamp.thumbnail" :src="stamp.thumbnail" alt="" style="border-radius: 8px; width: 100%">
            <div
              v-else
              class="m-0 mb-1"
              :style="{backgroundColor: stColor(stamp.id)}"
              style="border-radius: 8px; width: 100%; padding-top: 100%"
            />
            <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
              {{ stamp.name }}
            </h6>
          </div>
        </b-col>
      </b-row>
      <h4>佐賀市</h4>
      <b-row class="d-flex mx-0 shadow-sm mb-3" style="border-radius: 8px">
        <b-col
          v-for="stamp in sortStampsByArea('佐賀市')"
          :key="stamp.id"
          cols="4"
          class="m-0 p-2"
        >
          <div
            class="m-0 p-1"
            style="width: 90%; height: 90%; border: none; border-radius: 8px"
            @click="openModal(stamp.id)"
          >
            <img v-if="got(stamp.id) && stamp.thumbnail" :src="stamp.thumbnail" alt="" style="border-radius: 8px; width: 100%">
            <div
              v-else
              class="m-0 mb-1"
              :style="{backgroundColor: stColor(stamp.id)}"
              style="border-radius: 8px; width: 100%; padding-top: 100%"
            />
            <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
              {{ stamp.name }}
            </h6>
          </div>
        </b-col>
      </b-row>
      <h4>多久市</h4>
      <b-row class="d-flex mx-0 shadow-sm mb-3" style="border-radius: 8px">
        <b-col
          v-for="stamp in sortStampsByArea('多久市')"
          :key="stamp.id"
          cols="4"
          class="m-0 p-2"
        >
          <div
            class="m-0 p-1"
            style="width: 90%; height: 90%; border: none; border-radius: 8px"
            @click="openModal(stamp.id)"
          >
            <img v-if="got(stamp.id) && stamp.thumbnail" :src="stamp.thumbnail" alt="" style="border-radius: 8px; width: 100%">
            <div
              v-else
              class="m-0 mb-1"
              :style="{backgroundColor: stColor(stamp.id)}"
              style="border-radius: 8px; width: 100%; padding-top: 100%"
            />
            <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
              {{ stamp.name }}
            </h6>
          </div>
        </b-col>
      </b-row>
      <h4>吉野ヶ里町</h4>
      <b-row class="d-flex mx-0 shadow-sm mb-3" style="border-radius: 8px">
        <b-col
          v-for="stamp in sortStampsByArea('吉野ヶ里町')"
          :key="stamp.id"
          cols="4"
          class="m-0 p-2"
        >
          <div
            class="m-0 p-1"
            style="width: 90%; height: 90%; border: none; border-radius: 8px"
            @click="openModal(stamp.id)"
          >
            <img v-if="got(stamp.id) && stamp.thumbnail" :src="stamp.thumbnail" alt="" style="border-radius: 8px; width: 100%">
            <div
              v-else
              class="m-0 mb-1"
              :style="{backgroundColor: stColor(stamp.id)}"
              style="border-radius: 8px; width: 100%; padding-top: 100%"
            />
            <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
              {{ stamp.name }}
            </h6>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="selectedStamps === 'コースごと'">
      <div
        v-for="course in sortStampsByCourse()"
        :key="course.id"
      >
        <h4>{{ course.name }}</h4>
        <b-row class="d-flex mx-0 shadow-sm mb-3" style="border-radius: 8px">
          <b-col
            v-for="stamp in course.stamps"
            :key="stamp.index"
            cols="4"
            class="m-0 p-2"
          >
            <div
              class="m-0 p-1"
              style="width: 90%; height: 90%; border: none; border-radius: 8px"
              @click="openModal(stamp)"
            >
              <img v-if="got(stamp) && stampInfo[stamp].thumbnail" :src="stampInfo[stamp].thumbnail" alt="" style="border-radius: 8px; width: 100%">
              <div
                v-else
                class="m-0 mb-1"
                :style="{backgroundColor: stColor(stamp)}"
                style="border-radius: 8px; width: 100%; padding-top: 100%"
              />
              <h6 class="ml-auto mb-0" style="font-size: 13px; font-weight: bold">
                {{ stampInfo[stamp].name }}
              </h6>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal id="description" class="p-0" centered hide-header hide-footer>
      <b-overlay
        :show="loading"
        variant="transparent"
        opacity="1.0"
        blur="2px"
        spinner-type="grow"
        style="border-radius: 13px"
      >
        <b-card no-body class="m-0" style="border: none; max-height: 520px; overflow: auto">
          <b-card-img-lazy
            :src="spotRef"
            alt="image"
            img-top
          />
          <b-card-body>
            <b-card-title>{{ modalTitle }}</b-card-title>
            <b-card-text>{{ modalText }}</b-card-text>
            <b-card-img-lazy
              v-if="spotRef2"
              :src="spotRef2"
              alt="image"
              class="mb-2"
              img-top
            />
            <div class="d-flex align-items-center">
              <h6>{{ stDate }}</h6>
            </div>
          </b-card-body>
        </b-card>
<!--        <b-card-->
<!--          :title="modalTitle"-->
<!--          :img-src="spotRef"-->
<!--          img-alt="image"-->
<!--          img-top-->
<!--          class="m-0"-->
<!--          style="border: none; max-height: 520px; overflow: auto"-->
<!--        >-->
<!--          <b-card-text>-->
<!--            {{ modalText }}-->
<!--          </b-card-text>-->
<!--          <div class="d-flex align-items-center">-->
<!--            <h6>{{ stDate }}</h6>-->
<!--          </div>-->
<!--        </b-card>-->
        <div class="d-flex align-items-center">
          <b-button
            v-if="stURL"
            class="ml-auto shadow"
            style="position: absolute; right: 0; bottom: 0; width: 60px; height: 60px; border-radius: 50px; z-index: 1; background-color: #e58900; border: none; padding-top: 10px"
            @click="openURL()"
          >
            <fa :icon="faExternalLinkAlt" style="font-size: 24px" />
            <p style="font-size: 12px">HPへ</p>
          </b-button>
        </div>
<!--        <div style="max-height: 520px; overflow: auto">-->
<!--          <h2>-->
<!--            {{ modalTitle }}-->
<!--          </h2>-->
<!--          <img :src="spotRef" style="width: 100%; border-radius: 6px" alt="">-->
<!--          <h5 class="mt-3">-->
<!--            {{ modalText }}-->
<!--          </h5>-->
<!--          <h6 class="mt-3">-->
<!--            {{ stDate }}-->
<!--          </h6>-->
<!--        </div>-->
      </b-overlay>
    </b-modal>
  </b-container>
</template>

<script>
import { faGlobeEurope, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Stamps',
  data () {
    return {
      loading: false,
      userInfo: {},
      clientId: this.$store.state.clientId,
      ownedStamps: {},
      dateInfo: {},
      stampInfo: {},
      ownedStampsList: [],
      courseList: this.$store.getters.course,
      modalTitle: '',
      stDate: '',
      modalText: '',
      spotRef: '',
      spotRef2: null,
      stURL: null,
      selectedStamps: '並び替え'
    }
  },
  async created () {
    await this.getStampInfo()
    await this.getUserInfo()
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
    this.$store.watch((state, getters) => getters.course.course,
      (newValue) => {
        this.courseList = newValue
      }
    )
  },
  computed: {
    faGlobeEurope () {
      return faGlobeEurope
    },
    faExternalLinkAlt () {
      return faExternalLinkAlt
    }
  },
  methods: {
    openModal (id) {
      this.spotRef = this.stampInfo[id].image
      if (this.stampInfo[id].image2) {
        this.spotRef2 = this.stampInfo[id].image2
      } else {
        this.spotRef2 = null
      }
      this.modalTitle = this.stampInfo[id].name
      this.stDate = this.stStatus(id)
      this.modalText = this.stampInfo[id].description
      if (this.stampInfo[id].URL !== '') {
        this.stURL = this.stampInfo[id].URL
      } else { this.stURL = null }
      this.$bvModal.show('description')
    },
    openURL () {
      window.open(this.stURL, '_blank')
    },
    stColor (id) {
      for (let i = 0; i < this.ownedStampsList.length; i++) {
        if (this.ownedStampsList[i].id === id) {
          // return this.stampInfo[id].color
          return '#e54400'
        }
      }
      return '#696969'
    },
    got (id) {
      for (let i = 0; i < this.ownedStampsList.length; i++) {
        if (this.ownedStampsList[i].id === id) {
          return true
        }
      }
      return false
    },
    stStatus (id) {
      for (let i = 0; i < this.ownedStampsList.length; i++) {
        if (this.ownedStampsList[i].id === id) {
          const getday = new Date(this.ownedStampsList[i].date)
          return getday.getFullYear() + '年' + (getday.getMonth() + 1) + '月' + getday.getDate() + '日に取得'
        }
      }
      return '未取得'
    },
    getStampInfo () {
      this.stampInfo = this.$store.state.stampInfo.stamps
      console.log('2', this.stampInfo)
    },
    getUserInfo () {
      this.userInfo = this.$store.state.userInfo.user
      this.dateInfo = this.$store.state.userInfo.user.stGetDate
      for (let i = 0; i < this.userInfo.ownedStamps.length; i++) {
        this.ownedStampsList.push({
          id: this.userInfo.ownedStamps[i],
          date: this.dateInfo[i].seconds * 1000
        })
      }
    },
    sortStampsByArea (area) {
      const sorted = []
      const stamps = Object.entries(this.stampInfo)
      for (let i = 0; i < stamps.length; i++) {
        if (stamps[i][1].area === area) {
          sorted.push(stamps[i][1])
        }
      }
      return sorted
    },
    sortStampsByCourse () {
      const sorted = []
      const course = Object.entries(this.courseList)
      for (let i = 0; i < course.length; i++) {
        sorted.push(course[i][1])
      }
      return sorted
    }
  }
}
</script>

<style scoped>

</style>
