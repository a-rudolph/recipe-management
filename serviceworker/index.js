self.addEventListener(
  'notificationclick',
  function (event) {
    console.log('onClick@')

    clients.openWindow('/')
  },
  false
)
