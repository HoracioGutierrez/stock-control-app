import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { BackgroundSyncQueue, CacheFirst, Serwist } from "serwist";
import PouchDB from 'pouchdb-browser';


declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    /* {
      matcher: ({ url }) => url.pathname.includes("/api/stock"),
      handler: new CacheFirst()
    } */
  ],
});

serwist.addEventListeners();
//const queue = new BackgroundSyncQueue("cashRegisterQueue");

/* self.addEventListener("activate", (event) => {
  self.clients.claim();
  serwist.handleActivate(event);
}); */

/* self.addEventListener("fetch", (event) => {

  const url = new URL(event.request.url);

  if (event.request.method === "POST" && url.origin === location.origin && url.pathname === "/stock") {

    const getBody = async () => {

      try {
        var db = new PouchDB('cashRegisters');
        const eventClone = event.request.clone();
        const body = await eventClone.json();
        if (body.length === 0) {
          const response = await db.allDocs();
          console.log(response)
          return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } })
        } else {
          const newId = crypto.randomUUID();
          body[0]._id = newId;

          await db.put({ ...body[0] });
          const request = new Request("/api/stock", {
            method: "POST",
            body: JSON.stringify({ data: body[0], userId: body[1] }),
            headers: { "Content-Type": "application/json" }
          });
          await queue.pushRequest({ request })
          return new Response(body._id)
        }
      } catch (error) {
        return Response.error()
      }

    }

    return event.respondWith(getBody())
  }

  if (event.request.method === "GET" && url.origin === location.origin && url.pathname === "/api/stock") {

    const getAllCashRegisters = async () => {

      try {
        var db = new PouchDB('cashRegisters');
        const response = await db.allDocs();
        console.log(response)
        return new Response("got all cash registers")
      } catch (error) {
        console.log(error)
        return Response.error()
      }

    }
    return event.respondWith(getAllCashRegisters())
  }

  serwist.handleFetch(event)
}) */