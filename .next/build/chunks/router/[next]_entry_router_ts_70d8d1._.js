(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/router/[next]_entry_router_ts_70d8d1._.js", {

"[next]/entry/router.ts/(MIDDLEWARE_CHUNK_GROUP)/[project]/middleware.js (ecmascript)/(MIDDLEWARE_CONFIG)/[project]/middleware_config.js (ecmascript) (ecmascript, router)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "default": ()=>route
});
var __TURBOPACK__external__node$3a$buffer__ = __turbopack_external_require__("node:buffer", true);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$server$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/server.ts (ecmascript, router)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/headers.ts (ecmascript, router)");
var __TURBOPACK__external__next$2f$dist$2f$server$2f$lib$2f$route$2d$resolver__ = __turbopack_external_require__("next/dist/server/lib/route-resolver", true);
var __TURBOPACK__external__next$2f$dist$2f$server$2f$config__ = __turbopack_external_require__("next/dist/server/config", true);
var __TURBOPACK__external__next$2f$dist$2f$shared$2f$lib$2f$constants__ = __turbopack_external_require__("next/dist/shared/lib/constants", true);
var __TURBOPACK__external__next$2f$dist$2f$server$2f$node$2d$polyfill$2d$fetch$2e$js__ = __turbopack_external_require__("next/dist/server/node-polyfill-fetch.js", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$js__$28$ecmascript$29$__ = __turbopack_import__("[project]/middleware.js (ecmascript, router)");
var __TURBOPACK__imported__module__$5b$project$5d2f$middleware_config$2e$js__$28$ecmascript$29$__ = __turbopack_import__("[project]/middleware_config.js (ecmascript, router)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
let resolveRouteMemo;
async function getResolveRoute(dir, serverInfo) {
    const nextConfig = await __TURBOPACK__external__next$2f$dist$2f$server$2f$config__["default"](__TURBOPACK__external__next$2f$dist$2f$shared$2f$lib$2f$constants__["PHASE_DEVELOPMENT_SERVER"], process.cwd(), undefined, undefined, true);
    const middlewareCfg = {
        files: __TURBOPACK__imported__module__$5b$project$5d2f$middleware$2e$js__$28$ecmascript$29$__["default"].filter((f)=>/\.[mc]?js$/.test(f)),
        matcher: __TURBOPACK__imported__module__$5b$project$5d2f$middleware_config$2e$js__$28$ecmascript$29$__["default"].matcher
    };
    return await __TURBOPACK__external__next$2f$dist$2f$server$2f$lib$2f$route$2d$resolver__["makeResolver"](dir, nextConfig, middlewareCfg, serverInfo);
}
async function route(ipc, routerRequest, dir, serverInfo) {
    const [resolveRoute, server] = await Promise.all([
        resolveRouteMemo ??= getResolveRoute(dir, serverInfo),
        __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$server$2e$ts__$28$ecmascript$29$__["createServer"]()
    ]);
    try {
        const { clientRequest, clientResponsePromise, serverRequest, serverResponse } = await __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$server$2e$ts__$28$ecmascript$29$__["makeRequest"](server, routerRequest.method, routerRequest.pathname, routerRequest.rawQuery, routerRequest.rawHeaders, serverInfo);
        const body = __TURBOPACK__external__node$3a$buffer__["Buffer"].concat(routerRequest.body.map((arr)=>__TURBOPACK__external__node$3a$buffer__["Buffer"].from(arr)));
        clientRequest.end(body);
        const routePromise = resolveRoute(serverRequest, serverResponse);
        const middlewarePromise = clientResponsePromise.then((c)=>handleMiddlewareResponse(ipc, c));
        const [routeResult] = await Promise.all([
            routePromise,
            middlewarePromise
        ]);
        server.close();
        if (routeResult) {
            switch(routeResult.type){
                case 'none':
                case 'error':
                    return routeResult;
                case 'rewrite':
                    return {
                        type: 'rewrite',
                        data: {
                            url: routeResult.url,
                            headers: Object.entries(routeResult.headers).filter(([, val])=>val != null).map(([name, value])=>[
                                    name,
                                    value.toString()
                                ])
                        }
                    };
                default:
                    throw new Error(`unknown route result type: ${data.type}`);
            }
        }
    } catch (e) {
        ipc.sendError(e);
    }
}
async function handleMiddlewareResponse(ipc, clientResponse) {
    if (clientResponse.headers['x-nextjs-route-result']) {
        return;
    }
    const responseHeaders = {
        statusCode: clientResponse.statusCode,
        headers: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["toPairs"](clientResponse.rawHeaders)
    };
    await ipc.send({
        type: 'value',
        data: JSON.stringify({
            type: 'middleware-headers',
            data: responseHeaders
        })
    });
    for await (const chunk of clientResponse){
        await ipc.send({
            type: 'value',
            data: JSON.stringify({
                type: 'middleware-body',
                data: chunk.toJSON().data
            })
        });
    }
}

})()),
}]);

//# sourceMappingURL=[next]_entry_router_ts_70d8d1._.js.map