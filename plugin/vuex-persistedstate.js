import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) { return }
  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({
        key: 'stamprally2',
        paths: [
          'clientId',
          'isRegister',
          'name',
          'userColor',
          'invitedLink',
          'teamStatus',
          'team',
          'bookmarked'
        ]
      })(store)
    })
  }
}
