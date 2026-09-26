// Service worker: permite abrir o app sem internet depois do primeiro acesso.
// Ao mudar os arquivos do app, aumente a versão para forçar a atualização do cache.
const CACHE = 'app-gastos-v1';
const CHART_JS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png', CHART_JS];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      // Um item que falhar (ex.: CDN fora do ar) não impede a instalação.
      Promise.all(ASSETS.map(url => cache.add(url).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && req.url !== CHART_JS) return;

  if (req.mode === 'navigate' || (sameOrigin && url.pathname.endsWith('.html'))) {
    // Página: tenta a rede primeiro (para receber atualizações) e usa o cache se estiver offline.
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Demais arquivos: cache primeiro, rede como reserva.
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
