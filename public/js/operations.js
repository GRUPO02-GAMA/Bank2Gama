const auth = Cookies.get("auth")
let id

if (!auth) {
  localStorage.setItem("redirectTo", "operations.html")
  window.location.href = "/login.html"
}

fetch("/api/user")
  .then((response) => response.json())
  .then((res) => {
    id = res[0].id
  })

if (!id) {
  id = 1
}

function formatValue(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

fetch(`/api/client/account/${id}`)
  .then((response) => response.json())
  .then((res) => {
    const balance = formatValue(res[0].accounts[0].balance)
    document.getElementById("hello-name").innerText = res[0].name + "!"
    document.getElementById("money").innerText = balance
  })

function formatDate(date) {
  return (
    date.substring(8, 10) +
    "/" +
    date.substring(5, 7) +
    "/" +
    date.substring(0, 4) +
    " " +
    date.substring(11, 13) +
    ":" +
    date.substring(14, 16)
  )
}

fetch(`/api/client/login/${id}`)
  .then((response) => response.json())
  .then((res) => {
    const date = formatDate(res[0].lastLogin)
    document.getElementById("last-login").innerText = date
  })
