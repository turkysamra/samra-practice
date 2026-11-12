self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={title:'سمراء',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'سمراء',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',dir:'auto',tag:d.tag||'samraa',renotify:true}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil((async()=>{const cs=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const c of cs){if('focus' in c){try{await c.navigate(self.registration.scope)}catch(x){}return c.focus()}}return self.clients.openWindow(self.registration.scope)})())});
