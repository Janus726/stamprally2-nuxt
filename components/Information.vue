<template>
  <div class="mb-3">
    <h5 v-if="Object.entries(information).length <= 0" class="mt-3">現在、関連情報はありません</h5>
    <div v-else>
      <b-card
        v-for="info in information"
        :key="info.id"
        class="shadow-sm my-3"
        style="border: none"
        button
        @click="openModal(info.id)"
      >
        <div class="d-flex">
          <div>
            <h4 class="my-auto">
              {{ info.title }}
            </h4>
            <h6 class="mr-auto mt-4">
              開催日程：<br>
              {{ info.start }} ~ {{ info.end }}
            </h6>
          </div>
          <div v-if="info.thumbnail" class="ml-auto my-auto col-5" >
            <b-card-img-lazy
              :src="info.thumbnail"
              alt="image"
            />
          </div>
        </div>
      </b-card>
      <b-modal id="event" centered hide-footer>
        <template #modal-title>イベント詳細</template>
        <b-card no-body class="m-0" style="border: none; max-height: 520px; overflow: auto">
          <b-card-img-lazy
            :src="eventRef"
            alt="image"
            img-top
          />
          <b-card-body>
            <b-card-title>{{ modalTitle }}</b-card-title>
            <b-card-text>{{ modalStart }} から {{ modalEnd }} まで</b-card-text>
            <b-card-text>{{ modalText }}</b-card-text>
            <br>
          </b-card-body>
        </b-card>
        <div class="d-flex align-items-center">
          <b-button
            v-if="URL"
            class="ml-auto shadow"
            style="position: absolute; right: 10px; bottom: 10px; width: 60px; height: 60px; border-radius: 50px; z-index: 1; background-color: #e58900; border: none"
            @click="openURL()"
          >
            <fa :icon="faExternalLinkAlt" style="font-size: 24px" />
            <p style="font-size: 12px">HPへ</p>
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import firebase from '~/plugin/firebase'
import 'firebase/firestore'

export default {
  name: 'Information',
  data () {
    return {
      slide: 0,
      sliding: null,
      db: firebase.firestore(),
      information: {},
      modalTitle: '',
      modalText: '',
      modalStart: '',
      modalEnd: '',
      eventRef: '',
      URL: ''
    }
  },
  computed: {
    faExternalLinkAlt () {
      return faExternalLinkAlt
    }
  },
  created () {
    const _this = this
    this.db
      .collection('information')
      .orderBy('start')
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // if (doc.data().isSample && doc.data().end.seconds * 1000 > new Date().getTime()) {  // debug
          if (!doc.data().isSample && doc.data().end.seconds * 1000 > new Date().getTime()) {
            _this.$set(_this.information, doc.id, doc.data())
            const createdAt = _this.timeConverter(doc.data().start.seconds * 1000)
            const createdAt2 = _this.timeConverter(doc.data().end.seconds * 1000)
            _this.$set(_this.information[doc.id], 'start', createdAt)
            _this.$set(_this.information[doc.id], 'end', createdAt2)
          }
        })
      })
    console.log(this.information)
  },
  methods: {
    openModal (id) {
      this.modalTitle = this.information[id].title
      this.modalText = this.information[id].text
      this.modalStart = this.information[id].start
      this.modalEnd = this.information[id].end
      if (this.information[id].image) {
        this.eventRef = this.information[id].image
      }
      if (this.information[id].url) {
        this.URL = this.information[id].url
      }
      this.$bvModal.show('event')
    },
    openURL () {
      window.open(this.URL, '_blank')
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    timeConverter (time) {
      const Time = new Date(time)
      return Time.getFullYear() + '年' + (Time.getMonth() + 1) + '月' + Time.getDate() + '日'
    }
  }
}
</script>

<style scoped>

</style>
