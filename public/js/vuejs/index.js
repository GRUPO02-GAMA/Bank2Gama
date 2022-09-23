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
      form: {
        name: "",
        lastname: "",
        birth: "",
        legalId: "",
        email: "",
      },
      message: "hello",
    }
  },
  methods: {
    register() {
      axios
        .post("/api/client", this.form)
        .then((res) => {
          window.location.href = "/login.html"
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
