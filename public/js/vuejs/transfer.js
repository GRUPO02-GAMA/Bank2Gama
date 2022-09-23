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
      transferCompleted: false,
      transfer: {
        type: "credit",
        value: 435,
        dest: "45312349011",
      },
    }
  },
  methods: {
    doTransfer() {
      axios
        .post("/api/operations", this.transfer)
        .then((res) => {
          this.transferCompleted = true
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
})