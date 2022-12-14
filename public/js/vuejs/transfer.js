/*
    curl --request POST \
    --url http://localhost:3333/api/operations \
    --header 'Content-Type: application/json' \
    --cookie auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYW5pY2VjYWxkZWlyYUBnbWFpbC5jb20iLCJpYXQiOjE2NjM5MzUzNDcsImV4cCI6MTY2NDAyMTc0N30.HsJuJJCKZYVGcyZse7a4-Je4secBgQ3TgERWSEr2G-4 \
    --data '{
        "type": "credit",
        "value": 150
    }'
*/

const app = new Vue({
  el: "#profileMain",
  data() {
    return {
      standingVal: 0,
      transferCompleted: false,
      result: {
        balance: 0,
        newBalance: 0,
        value: 0,
      },
      transfer: {
        type: "debit",
        value: 0,
        dest: "",
      },
    }
  },
  created() {
    this.getStandingValue()
  },
  methods: {
    getStandingValue() {
      axios.get(`/api/user`).then((res) => {
        const user = res.data[0]
        axios.get(`/api/client/account/${user.id}`).then((res) => {
          this.standingVal = res.data[0].accounts[0].balance
        })
      })
    },
    doTransfer() {
      axios
        .post("/api/operations", this.transfer)
        .then((res) => {
          this.transferCompleted = true
          this.result.balance = res.data.balance
          this.result.newBalance = res.data.newBalance
          // balance: account.balance,
          // newBalance: newBalance,
          // value: req.body.value
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
})
