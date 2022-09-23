var app = new Vue({
  el: "#_extract",
  data() {
    return {
      message: "hello from Vue!",
      transactions: [],
    }
  },
  computed: {
    total: function () {
      return 200
      //   const ttl = this.transactions.reduce(function (prev, item) {
      //     return (sum += item.price)
      //   }, 0)
    },
  },
  filters: {
    toCurrency: function (val) {
      if (typeof val != "number") return val
      let fmt = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      return fmt.format(val)
    },
  },
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
