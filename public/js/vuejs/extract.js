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
      let sum = 0
      for (let i = 0; i < this.transactions.length; i++) {
        sum += this.transactions[i].value
      }
      return sum
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
    frmDate(val) {
      return moment(val).format("DD/MM/YY hh:mm")
    },
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
