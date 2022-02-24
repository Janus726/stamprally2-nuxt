<template>
  <header>
    <b-navbar class="fixed-top shadow-sm" style="background-color: white">
<!--      <b-navbar-brand class="mr-auto" @click="$router.push('home')">-->
<!--        スタンプラリー-->
<!--      </b-navbar-brand>-->
      <b-img src="../assets/image/title-only.png" class="mr-auto" height="28" @click="$router.push({path: '/home'})"></b-img>
      <template>
        <div class="d-flex align-items-center">
          <span class="mr-2"> {{ userName }}</span>
          <b-button id="popover-target" pill class="mt-1" style="padding: 0; background-color: white; border: none">
            <fa :icon="faUserCircle" class="userIcon" :style="{color: userColor}" />
          </b-button>
          <b-popover target="popover-target" triggers="click blur" placement="bottomleft">
            <template #title>
              ニックネームの変更
            </template>
            <b-form class="form-inline">
              <div class="form-row mx-auto">
                <div class="col-8">
                  <b-form-input v-model="inputName" class="form-control" type="text" placeholder="最大10文字" @submit.prevent />
                </div>
                <div class="col">
                  <b-button @click="nameSubmit()" variant="primary" @submit.prevent>
                    変更
                  </b-button>
                </div>
              </div>
            </b-form>
          </b-popover>
        </div>
      </template>
    </b-navbar>
  </header>
</template>

<script>
import firebase from '~/plugin/firebase'
import 'firebase/firestore'
import 'firebase/messaging'
// eslint-disable-next-line import/order
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Navbar',
  data () {
    return {
      clientId: this.$store.state.clientId,
      db: firebase.firestore(),
      userName: this.$store.state.name,
      userColor: this.$store.state.userColor,
      inputName: '',
      stampInfo: {},
      userInfo: {}
    }
  },
  computed: {
    faUserCircle () {
      return faUserCircle
    }
  },
  watch: {
    inputName (inputName) {
      this.inputName = this.nameLimit(inputName)
    }
  },
  async created () {
    // await this.getId()
    // await this.getUserInfo()
    // await this.getStampInfo()
  },
  methods: {
    nameSubmit () {
      const _this = this
      this.userName = this.inputName
      this.$store.dispatch('setUserName', this.userName)
      this.db
        .collection('users')
        .doc(this.clientId).update({
          name: this.inputName
        }).then(() => {
          console.log('success')
          console.log(_this.$store.state.name)
        }).catch((error) => {
          console.log(error)
        })
    },
    nameLimit (inputName) {
      return inputName.length > 10 ? inputName.slice(0, -1) : inputName
    }
  }
}
</script>

<style scoped>
.iconSize-m {
  font-size: 35px;
}
.userIcon {
  background-color: white;
  font-size: 42px;
  border-radius: 50px;
}
</style>
