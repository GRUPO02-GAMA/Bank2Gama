var app = new Vue({
  el: "#_extract",
  data() {
    return {
      message: "hello from Vue!",
      transactions: [],
    }
  },
  computed: {},
  created: function () {
    this.loadTransactions()
  },
  methods: {
    loadTransactions() {
      axios
        .get("/api/operations")
        .then((res) => {
          this.transactions = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
