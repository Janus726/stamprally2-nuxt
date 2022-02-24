<template>
  <div id="menu" class="fixed-bottom">
    <QrReader />
    <b-button-group size="lg" style="width: 100%; height: 80px; box-shadow: 0 -6px 15px 0 rgba(0, 0, 0, .13); border-radius: 20px 20px 0 0">
      <b-button
        class="menubtn col-3"
        style="border-radius: 20px 0 0 0"
        @click="$router.push({name: 'home'})"
      >
        <h6 v-if="state === '/home'" class="menuText">
          <fa :icon="faHome" class="mb-1" style="margin: 0; font-size: 20px"/><br>
          ホーム
        </h6>
        <fa v-else :icon="faHome" class="iconSize-s" style="margin: 0"/>
      </b-button>
      <b-button
        squared
        class="menubtn col-3"
        @click="$router.push({name: 'stamps'})"
      >
        <h6 v-if="state === '/stamps'" class="menuText">
          <fa :icon="faStamp" style="transform: rotate(40deg); font-size: 19px; margin-bottom: 6px" /><br>
          スタンプ<br>カード</h6>
        <fa v-else :icon="faStamp" class="iconSize-s" style="transform: rotate(40deg); font-size: 26px; margin-bottom: 6px" />
      </b-button>
      <b-button
        squared
        class="menubtn col-3"
        @click="$router.push({name: 'team'})"
      >
        <h6 v-if="state === '/team'" class="menuText">
          <fa :icon="faUserFriends" class="mb-1" style="font-size: 20px; margin: 0" /><br>
          チーム
        </h6>
        <fa v-else :icon="faUserFriends" class="iconSize-s" />
      </b-button>
      <b-button
        class="menubtn col-3"
        style="border-radius: 0 20px 0 0"
        @click="$router.push({name: 'apply'})"
      >
        <h6 v-if="state === '/apply'" class="menuText">
          <fa :icon="faGift" class="mb-1" style="font-size: 20px; margin: 0" /><br>
          景品<br>応募
        </h6>
        <fa v-else :icon="faGift" class="iconSize-s" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
import { faHome, faStamp, faUserFriends, faGift } from '@fortawesome/free-solid-svg-icons'
import QrReader from './QrReader'
import firebase from '~/plugin/firebase'
import 'firebase/firestore'

export default {
  name: 'Menu',
  components: {
    QrReader
  },
  data () {
    return {
      db: firebase.firestore(),
      state: this.$route.path,
      stampInfo: {}
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
    }
  },
  created () {
    console.log(this.state)
  }
}
</script>

<style scoped>

#menu {
  margin-top: auto;
}
.menubtn {
  background-color: white;
  color: dimgray;
  border: none;
}
.iconSize-s {
  font-size: 28px;
}
.menuText {
  margin: 0;
  font-weight: bold;
}
.btn-hover {
  width: 70px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 70px;
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
