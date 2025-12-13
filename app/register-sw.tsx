'use client'

import { useEffect } from 'react'

export function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/',
        })
        .then((registration) => {
          console.log('[SW] Service Worker registered:', registration.scope)

          // Pre-cache critical API endpoints when online
          if (navigator.onLine && registration.active) {
            const criticalAPIs = [
              '/api/dashboard/stats',
              '/api/items',
              '/api/purchases',
              '/api/production',
              '/api/recipes',
            ]
            
            criticalAPIs.forEach((apiUrl) => {
              fetch(apiUrl)
                .then((response) => {
                  if (response.ok && registration.active) {
                    registration.active.postMessage({
                      type: 'CACHE_API',
                      url: apiUrl,
                    })
                  }
                })
                .catch((err) => {
                  console.log('[SW] Failed to pre-cache:', apiUrl, err)
                })
            })
          }

          // Check for updates every hour
          setInterval(() => {
            registration.update()
          }, 60 * 60 * 1000)

          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, prompt user to reload
                  if (confirm('New version available! Reload to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error)
        })

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          console.log('[SW] Service worker updated')
        }
      })

      // Handle service worker controller change (page reload after update)
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })

      // Pre-cache API responses when online
      const preCacheAPIs = () => {
        if (navigator.onLine) {
          const apis = ['/api/dashboard/stats', '/api/items', '/api/purchases', '/api/production', '/api/recipes']
          apis.forEach((url) => {
            fetch(url).catch(() => {
              // Ignore errors, just try to cache
            })
          })
        }
      }

      // Pre-cache on load
      preCacheAPIs()

      // Pre-cache when coming back online
      window.addEventListener('online', preCacheAPIs)
    }
  }, [])

  return null
}

