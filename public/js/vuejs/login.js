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
  methods: {
    login() {
      axios
        .post("/api/login", this.form)
        .then((res) => {
          if (res.data.auth == true) {
            this.form.email = ""
            this.form.password = ""
            // localStorage.clear()
            // localStorage.setItem("token", res.data.token)
            window.location.href = "operations.html"
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
