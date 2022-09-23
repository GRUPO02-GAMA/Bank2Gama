var app = new Vue({
  el: "#_login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    }
  },
  created() {
    const auth = Cookies.get("auth")
    if (auth != undefined && auth.length !== 0) {
      window.location.href = "operations.html"
    }
  },
  methods: {
    login() {
      axios
        .post("/api/login", this.form)
        .then((res) => {
          if (res.data.auth == true) {
            this.form.email = ""
            this.form.password = ""
            const redirectTo = localStorage.getItem("redirectTo")
            if (typeof redirectTo === "string" && redirectTo.length > 0) {
              localStorage.removeItem("redirectTo")
              window.location.href = redirectTo
            } else {
              window.location.href = "operations.html"
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
