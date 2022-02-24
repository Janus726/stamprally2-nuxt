export default function ({ redirect, store, route }) {
  const user = store.state.isRegister
  if (user === 0 && route.path !== '/') {
    redirect({ path: '/' })
  }
  if (user === 1 && route.path === '/') {
    redirect({ path: '/home' })
  }
}
