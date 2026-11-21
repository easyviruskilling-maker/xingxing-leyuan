/* Loaded by the generated service worker. The previous app only called
   skipWaiting after a SKIP_WAITING message, so an open page never let the
   new version activate. This script activates itself and reloads open pages. */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((key) => key.startsWith('xingxing-audio') && key !== 'xingxing-audio-v3')
          .map((key) => caches.delete(key)),
      )
      await self.clients.claim()
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      await Promise.all(
        windows.map(async (client) => {
          if (!client.url) return
          try {
            await client.navigate(client.url)
          } catch {
            client.postMessage({ type: 'RELOAD' })
          }
        }),
      )
    })(),
  )
})
