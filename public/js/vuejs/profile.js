var app = new Vue({
  el: "#_profile",
  data() {
    return {
      message: "",
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
    this.getUser()
  },
  methods: {
    getUser() {
      console.log("mounted@")
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
