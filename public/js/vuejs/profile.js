var app = new Vue({
  el: "#_profile",
  data() {
    return {
      message: "",
      password: "",
      form: {
        name: "",
        lastname: "",
        email: "",
        legalId: "",
        birth: "",
      },
      authUser: {},
    }
  },
  computed: {
    fullname() {
      return this.authUser.name + " " + this.authUser.lastname
    },
  },
  created: function () {
    const auth = Cookies.get("auth")
    if (!auth) {
      window.location.href = "/"
    }
    this.getUser()
  },
  methods: {
    profile() {
      if (
        typeof this.password === "string" &&
        this.password.trim().length !== 0
      ) {
        this.form = { ...this.form, ...{ password: this.password } }
      } else {
        delete this.form.password
      }

      axios
        .put(`/api/client/${this.form.id}`, this.form)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.error(err))
    },
    getUser() {
      axios
        .get("/api/user")
        .then((res) => {
          //   console.log(res.data)
          this.authUser = res.data
          this.form = res.data
          //   console.log(this.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
