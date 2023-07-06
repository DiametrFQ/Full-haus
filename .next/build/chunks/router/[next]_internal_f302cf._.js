(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/router/[next]_internal_f302cf._.js", {

"[next]/internal/headers.ts (ecmascript, router)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "headersFromEntries": ()=>headersFromEntries,
    "initProxiedHeaders": ()=>initProxiedHeaders,
    "toPairs": ()=>toPairs
});
function headersFromEntries(entries) {
    const headers = Object.create(null);
    for (const [key, value] of entries){
        if (key in headers) {
            const prevValue = headers[key];
            if (typeof prevValue === 'string') {
                headers[key] = [
                    prevValue,
                    value
                ];
            } else {
                prevValue.push(value);
            }
        } else {
            headers[key] = value;
        }
    }
    return headers;
}
function toPairs(arr) {
    if (arr.length % 2 !== 0) {
        throw new Error('toPairs: expected an even number of elements');
    }
    const pairs = [];
    for(let i = 0; i < arr.length; i += 2){
        pairs.push([
            arr[i],
            arr[i + 1]
        ]);
    }
    return pairs;
}
function initProxiedHeaders(headers, proxiedFor) {
    const hostname = proxiedFor?.hostname || 'localhost';
    const port = String(proxiedFor?.port || 3000);
    headers['x-forwarded-for'] = proxiedFor?.ip || '::1';
    headers['x-forwarded-host'] = `${hostname}:${port}`;
    headers['x-forwarded-port'] = port;
    headers['x-forwarded-proto'] = proxiedFor?.protocol || 'http';
    return headers;
}

})()),
"[next]/internal/server.ts (ecmascript, router)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "createServer": ()=>createServer,
    "makeRequest": ()=>makeRequest
});
var __TURBOPACK__external__node$3a$http__ = __turbopack_external_require__("node:http", true);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/headers.ts (ecmascript, router)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function createServer() {
    return new Promise((resolve)=>{
        const server = __TURBOPACK__external__node$3a$http__["default"].createServer();
        server.listen(0, ()=>{
            resolve(server);
        });
    });
}
function makeRequest(server, method, path, rawQuery, rawHeaders, proxiedFor) {
    return new Promise((resolve, reject)=>{
        let clientResponseResolve;
        let clientResponseReject;
        const clientResponsePromise = new Promise((resolve, reject)=>{
            clientResponseResolve = resolve;
            clientResponseReject = reject;
        });
        const errorListener = (err)=>{
            server.removeListener('request', requestListener);
            reject(err);
        };
        const requestListener = (req, res)=>{
            server.removeListener('error', errorListener);
            resolve({
                clientRequest,
                clientResponsePromise,
                serverRequest: req,
                serverResponse: res
            });
        };
        server.once('request', requestListener);
        server.once('error', errorListener);
        const address = server.address();
        const headers = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["headersFromEntries"](rawHeaders ?? []);
        __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["initProxiedHeaders"](headers, proxiedFor);
        const clientRequest = __TURBOPACK__external__node$3a$http__["default"].request({
            host: 'localhost',
            port: address.port,
            method,
            path: rawQuery?.length ? `${path}?${rawQuery}` : path,
            headers
        });
        clientRequest.flushHeaders();
        const clientResponseErrorListener = (err)=>{
            clientRequest.removeListener('response', responseListener);
            clientResponseReject(err);
        };
        const responseListener = (res)=>{
            clientRequest.removeListener('error', clientResponseErrorListener);
            clientResponseResolve(res);
        };
        clientRequest.once('response', responseListener);
        clientRequest.once('error', clientResponseErrorListener);
    });
}

})()),
}]);

//# sourceMappingURL=[next]_internal_f302cf._.js.map