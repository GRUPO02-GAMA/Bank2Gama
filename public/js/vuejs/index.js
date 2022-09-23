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
        name: "Victor",
        lastname: "Tame",
        birth: "",
        legalId: "64132277020",
        email: "vmtame@gmail.com",
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
