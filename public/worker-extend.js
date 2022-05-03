console.log('RUNNING')

self.addEventListener(
  'notificationclick',
  function (event) {
    console.log('onClick@')

    event.notification.close()
    if (event.action === 'archive') {
      silentlyArchiveEmail()
    } else {
      clients.openWindow('/')
    }
  },
  false
)
