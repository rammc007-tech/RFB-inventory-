// Service Worker for RFB Inventory PWA - Enhanced Offline Support
const CACHE_NAME = 'rfb-inventory-v5'
const STATIC_CACHE = 'rfb-static-v5'
const API_CACHE = 'rfb-api-v5'

// Static assets to cache on install - All critical pages
const staticAssets = [
  '/',
  '/dashboard',
  '/login',
  '/purchases',
  '/purchases/new',
  '/production',
  '/production/new',
  '/items',
  '/items/raw-material',
  '/items/essence',
  '/recipes',
  '/recipes/new',
  '/reports/stock',
  '/reports/production-cost',
  '/settings',
  '/settings/users',
  '/settings/access',
  '/settings/backup',
  '/settings/reset',
  '/trash',
  '/manifest.json',
  '/offline.html',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v5...')
  event.waitUntil(
    Promise.all([
      // Cache static pages
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(staticAssets).catch((err) => {
          console.warn('[SW] Some static assets failed to cache:', err)
          // Continue even if some assets fail
          return Promise.resolve()
        })
      }),
      // Pre-cache critical API endpoints (will be populated on first visit)
      caches.open(API_CACHE).then((cache) => {
        console.log('[SW] API cache initialized')
        return Promise.resolve()
      })
    ])
  )
  self.skipWaiting() // Activate immediately
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim() // Take control of all pages
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle static assets with cache-first strategy
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname.startsWith('/_next/static/')
  ) {
    event.respondWith(cacheFirstStrategy(request))
    return
  }

  // Handle HTML pages with network-first, fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithCacheFallback(request))
    return
  }

  // Default: try cache first, then network
  event.respondWith(cacheFirstStrategy(request))
})

// Network-first strategy for API calls with aggressive caching
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    
    // Cache ALL successful GET responses (purchases, items, recipes, production, etc.)
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(API_CACHE)
      // Clone response before caching (responses can only be read once)
      const responseToCache = networkResponse.clone()
      // Cache with both exact URL and pathname-only key for better matching
      await Promise.all([
        cache.put(request, responseToCache).catch((err) => {
          console.warn('[SW] Failed to cache API response:', err)
        }),
        // Also cache by pathname for query param variations
        cache.put(new Request(new URL(request.url).pathname), responseToCache.clone()).catch(() => {
          // Ignore errors for pathname-only cache
        })
      ])
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url)
    
    // Try exact match first
    let cachedResponse = await caches.match(request)
    
    // If no exact match, try matching by URL path (ignore query params)
    if (!cachedResponse) {
      const url = new URL(request.url)
      const cache = await caches.open(API_CACHE)
      
      // Try pathname match
      cachedResponse = await cache.match(new Request(url.pathname))
      
      // If still no match, try finding any key with same pathname
      if (!cachedResponse) {
        const keys = await cache.keys()
        const matchingKey = keys.find(key => {
          try {
            const keyUrl = new URL(key.url)
            return keyUrl.pathname === url.pathname
          } catch {
            return false
          }
        })
        if (matchingKey) {
          cachedResponse = await cache.match(matchingKey)
        }
      }
    }
    
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url)
      // Return cached response with proper headers
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: cachedResponse.headers,
      })
    }
    
    // Return offline response for API calls only if truly no cache
    if (request.url.includes('/api/')) {
      console.log('[SW] No cache available, returning offline response')
      return new Response(
        JSON.stringify({ 
          error: 'Offline', 
          message: 'You are currently offline. Cached data will be shown when available.',
          offline: true 
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
    
    throw error
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Return offline page for navigation requests
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlinePage = await caches.match('/offline.html')
      if (offlinePage) {
        return offlinePage
      }
    }
    
    throw error
  }
}

// Network-first with cache fallback for HTML pages
async function networkFirstWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      // Cache the response for offline use
      cache.put(request, networkResponse.clone()).catch((err) => {
        console.warn('[SW] Failed to cache page:', err)
      })
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed for page, trying cache:', request.url)
    
    // Try exact match first
    let cachedResponse = await caches.match(request)
    
    // If no exact match, try pathname match
    if (!cachedResponse) {
      const url = new URL(request.url)
      cachedResponse = await caches.match(new Request(url.pathname))
    }
    
    if (cachedResponse) {
      console.log('[SW] Serving cached page:', request.url)
      return cachedResponse
    }
    
    // Return offline page as last resort
    const offlinePage = await caches.match('/offline.html')
    if (offlinePage) {
      console.log('[SW] Serving offline page')
      return offlinePage
    }
    
    // If even offline page is not cached, return a basic offline response
    return new Response(
      '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(event.data.urls)
      })
    )
  }
  
  // Pre-cache API endpoints on demand
  if (event.data && event.data.type === 'CACHE_API') {
    event.waitUntil(
      fetch(event.data.url).then((response) => {
        if (response.ok) {
          const cache = caches.open(API_CACHE)
          return cache.then((c) => c.put(event.data.url, response.clone()))
        }
      }).catch((err) => {
        console.warn('[SW] Failed to pre-cache API:', err)
      })
    )
  }
})
