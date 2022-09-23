const app = new Vue({
  el: "#_index",
  computed: {
    loggedIn: () => {
      const auth = Cookies.get("auth")
      return auth !== undefined && auth.length !== 0
    },
  },
  data: () => {
    return {
      message: "hello",
    }
  },
})
