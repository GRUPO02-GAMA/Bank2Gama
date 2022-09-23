function logout() {
  fetch("/api/logout", {
    method: "POST",
  })
    .then((res) => {
      window.location.href = "/"
    })
    .catch((err) => {
      console.error(err)
    })
}
