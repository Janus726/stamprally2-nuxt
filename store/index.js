export const strict = false
export const state = () => ({
  clientId: null,
  isRegister: 0,
  name: '',
  team: '',
  userColor: '',
  token: '',
  teamStatus: 0,
  stampInfo: {},
  ownedStamps: {},
  stGetDate: {},
  userInfo: {},
  course: {},
  bookmarked: false
})

export const mutations = {
  setClientId (state, cid) {
    state.clientId = cid
  },
  setRegister (state, register) {
    state.isRegister = register
  },
  setUserName (state, name) {
    state.name = name
  },
  setTeam (state, team) {
    state.team = team
  },
  setUserColor (state, color) {
    state.userColor = color
  },
  setToken (state, token) {
    state.token = token
  },
  setTeamStatus (state, status) {
    state.teamStatus = status
  },
  setStampInfo (state, stamps) {
    state.stampInfo = {
      ...state.stampInfo,
      stamps
    }
  },
  setOwnedStamps (state, stamps) {
    state.ownedStamps = {
      ...state.ownedStamps,
      stamps
    }
  },
  setGetDate (state, date) {
    state.stGetDate = {
      ...state.stGetDate,
      date
    }
  },
  setUserInfo (state, user) {
    state.userInfo = {
      ...state.userInfo,
      user
    }
  },
  setCourse (state, course) {
    state.course = {
      ...state.course,
      course
    }
  },
  setBookmark (state, done) {
    state.bookmarked = done
  }
}

export const actions = {
  nuxtClientInit ({ commit }, context) {
    const data = JSON.parse(localStorage.getItem('stamprally2')) || []
    if (data) {
      commit('setClientId', data.clientId)
      commit('setRegister', data.isRegister)
      commit('setUserName', data.name)
      commit('setTeam', data.team)
      commit('setUserColor', data.userColor)
      commit('setToken', data.token)
      commit('setTeamStatus', data.teamStatus)
      commit('setStampInfo', data.stampInfo)
      commit('setOwnedStamps', data.ownedStamps)
      commit('setGetDate', data.stGetDate)
      commit('setUserInfo', data.userInfo)
      commit('setCourse', data.course)
      commit('setBookmark', data.bookmarked)
    }
  },
  setClientId ({ commit }, cid) {
    commit('setClientId', cid)
  },
  setRegister ({ commit }, register) {
    commit('setRegister', register)
  },
  setUserName ({ commit }, name) {
    commit('setUserName', name)
  },
  setTeam ({ commit }, team) {
    commit('setTeam', team)
  },
  setUserColor ({ commit }, color) {
    commit('setUserColor', color)
  },
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setTeamStatus ({ commit }, status) {
    commit('setTeamStatus', status)
  },
  setStampInfo ({ commit }, stamps) {
    commit('setStampInfo', stamps)
  },
  setOwnedStamps ({ commit }, stamps) {
    commit('setOwnedStamps', stamps)
  },
  setGetDate ({ commit }, date) {
    commit('setGetDate', date)
  },
  setUserInfo ({ commit }, user) {
    commit('setUserInfo', user)
  },
  setCourse ({ commit }, course) {
    commit('setCourse', course)
  },
  setBookmark ({ commit }, done) {
    commit('setBookmark', done)
  }
}

export const getters = {
  cID: (state) => {
    return state.clientId
  },
  userInfo: (state) => {
    return state.userInfo.user
  },
  stampInfo: (state) => {
    return state.stampInfo.stamps
  },
  course: (state) => {
    return state.course.course
  },
  ownedStamps: (state) => {
    return state.ownedStamps.stamps
  },
  stGetDate: (state) => {
    return state.stGetDate.date
  }
}
