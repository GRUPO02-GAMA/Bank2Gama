var app = new Vue({
  el: "#_profile",
  data() {
    return {
      user: {},
    }
  },
  computed: {
    fullname() {
      return this.user.name + " " + this.user.last_name
    },
  },
  methods: {
    login() {
      axios
        .post("/api/user", this.form)
        .then((res) => {
          this.user = { ...res.data }
          console.log(this.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
