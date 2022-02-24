<template>
  <div v-if="!master.testopen">
    <b-row class="d-flex text-center align-items-center">
      <b-col style="margin-top: 200px">
        <b-card class="m-4 shadow-sm" style="border: none">
          <h3>{{ master.message }}</h3>
          <h4>しばらくお待ちください。</h4>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <b-container fluid class="mt-lg-5">
      <b-row class="my-3">
        <b-col class="d-flex flex-column justify-content-center">
          <template v-if="teamAdded === 1 && teamStatus === 2">
            <h3>すでに別のチームに所属しています。</h3>
          </template>
          <template v-else-if="teamAdded === 2">
            <h3>すでにこのチームに所属しています。</h3>
          </template>
          <template v-else>
            <h3>チームに招待されています。</h3>
            <b-button pill class="btn-hover color-1 mx-auto" @click="joinTeam()">
              参加する
            </b-button>
            <b-modal id="join" centered hide-footer>
              <template #modal-title>
                チームに参加する
              </template>
              <template v-if="loaded === 1">
                <div class="d-block text-center">
                  <h6>4桁の番号を入力してください。</h6>
                  <div class="mx-auto mt-3 mb-2" style="text-align: center">
                    <input
                      v-model="inputPass"
                      type="number"
                      class="form-control mx-auto"
                      size="lg"
                      style="font-size: 25px; width: 100px; text-align: center"
                    >
                  </div>
                  <div class="mb-2">
                    <b-button variant="primary" @click="numCheck()">
                      確定
                    </b-button>
                  </div>
                  <h6 v-if="alert === 1" style="color: red">
                    認証コードが一致していないか、このチームは存在しません。
                  </h6>
                  <h6 v-if="alert === 2" style="color: red">
                    認証コードの期限が切れています。もう一度発行して下さい。
                  </h6>
                </div>
              </template>
              <template v-if="loaded === 0">
                <div class="d-block text-center">
                  <b-spinner variant="primary" class="my-3" label="loading..." style="width: 3rem; height: 3rem" />
                </div>
              </template>
            </b-modal>
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from '~/plugin/firebase'
import 'firebase/firestore'

export default {
  data () {
    return {
      clientId: '0',
      db: firebase.firestore(),
      userInfo: {},
      teamAdded: 0,
      teamStatus: this.$store.state.teamStatus,
      teamId: '',
      teamInfo: {},
      inputPass: '',
      loaded: 1,
      alert: 0,
      master: {}
    }
  },
  watch: {
    inputPass (inputPass) {
      this.inputPass = this.passLimit(inputPass)
    }
  },
  async created () {
    const _this = this
    await this.checkError()
    if (this.$store.state.clientId) {
      this.clientId = this.$store.state.clientId
    }
    await this.db
      .collection('demo-users')
      .doc(this.clientId)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          _this.userInfo = doc.data()
          if (_this.userInfo.team !== '') {
            if (_this.userInfo.team === (_this.$route.params.id).toString()) {
              _this.teamAdded = 2
              // ほんとは2ね
            } else { _this.teamAdded = 1 }
          }
          console.log(_this.userInfo)
          // _this.$store.dispatch('setUserInfo', _this.userInfo)
          // console.log(_this.$store.state.userInfo)
        } else {
          console.log('not registered')
          _this.$store.dispatch('setRegister', 0)
          _this.$router.redirect({ path: '/home' })
        }
      })
  },
  mounted () {
    this.inputPass = ''
    this.teamInfo = {}
    console.log(this.$route.params.id)
    this.teamId = this.$route.params.id
    // this.userCheck()
  },
  methods: {
    // userCheck () {
    //   if (this.$store.state.isRegister === 0) {
    //     this.$router.push('../home')
    //   }
    // },
    joinTeam () {
      this.alert = 0
      this.loaded = 1
      const _this = this
      this.db
        .collection('teams')
        .doc(this.teamId)
        .onSnapshot(function (doc) {
          if (doc.exists) {
            _this.teamInfo = doc.data()
            _this.teamInfo.members.push(_this.clientId)
            console.log(_this.teamInfo)
          } else {
            _this.alert = 1
            _this.loaded = 1
          }
        })
      this.$bvModal.show('join')
    },
    passLimit (inputPass) {
      // if (inputPass.length >= 4) { this.numCheck() }
      return inputPass.length > 4 ? inputPass.slice(0, -1) : inputPass
    },
    numCheck () {
      const _this = this
      this.alert = 0
      this.loaded = 0
      const now = new Date()
      const limit = new Date(this.teamInfo.passLimit.seconds * 1000)
      console.log(now, limit)
      const diff = Math.abs((limit.getTime() - now.getTime()) / (60 * 1000))
      console.log(diff)
      if (Number(this.inputPass) === this.teamInfo.pass) {
        if (diff <= 30) {
          this.db
            .collection('teams')
            .doc(this.teamId).set({
              members: _this.teamInfo.members,
              number: firebase.firestore.FieldValue.increment(1)
            }, { merge: true }).then(() => {
              this.db
                .collection('demo-users')
                .doc(this.clientId).update({
                  team: _this.teamId
                })
              this.$store.dispatch('setTeam', this.teamId)
              this.$router.push('../team')
            }).catch((error) => {
              console.log('失敗', error)
            })
        } else {
          this.alert = 2
          this.loaded = 1
        }
      } else {
        this.alert = 1
        this.loaded = 1
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

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance:textfield;
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
</style>
