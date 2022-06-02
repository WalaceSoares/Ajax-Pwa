if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      const = url = "https://walacesoares.github.io/Ajax-Pwa/"
      navigator.serviceWorker
        .register(url+"/sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }