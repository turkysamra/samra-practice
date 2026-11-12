self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
/* app shell: page = network first (2.5 s) then cache; library & fonts = cache first */
self.addEventListener('fetch',e=>{const q=e.request,u=q.url;if(q.method!=='GET')return;
  if(u.startsWith('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@')||u.startsWith('https://fonts.googleapis.com/')||u.startsWith('https://fonts.gstatic.com/')){
    e.respondWith(caches.open('static-v1').then(async c=>{const hit=await c.match(q);if(hit)return hit;const n=await fetch(q);if(n.ok||n.type==='opaque')c.put(q,n.clone());return n}));return}
  if(q.mode==='navigate'&&new URL(u).origin===self.location.origin){
    e.respondWith((async()=>{const c=await caches.open('page-v1');const net=fetch(q).then(n=>{if(n.ok)c.put('./',n.clone());return n});
      try{return await Promise.race([net,new Promise((_,j)=>setTimeout(()=>j('slow'),2500))])}catch(x){const hit=await c.match('./');return hit||net}})())}});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={title:'سمراء',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'سمراء',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',dir:'auto',tag:d.tag||'samraa',renotify:true}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil((async()=>{const cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const c of cs){if('focus' in c){try{await c.navigate(self.registration.scope)}catch(x){}return c.focus()}}return self.clients.openWindow(self.registration.scope)})())});
