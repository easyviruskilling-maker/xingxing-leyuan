/* Loaded by the generated service worker. The previous app only called
   skipWaiting after a SKIP_WAITING message, so an open page never let the
   new version activate. This script activates itself and reloads open pages. */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

/* WebKit fails large zip fetches with "access control checks" when a service
   worker responds to them (CacheFirst / Range). Let the page load audio itself. */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (url.pathname.includes('/audio/')) event.stopImmediatePropagation()
})

const APP_VERSION = 'xingxing-v7'

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((key) => !key.includes(APP_VERSION)).map((key) => caches.delete(key)))
      await self.clients.claim()
    })(),
  )
})
