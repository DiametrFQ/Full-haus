(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/[next]_internal_headers_ts_d49dce._.js", {

"[next]/internal/headers.ts (ecmascript, ssr)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

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
}]);

//# sourceMappingURL=[next]_internal_headers_ts_d49dce._.js.map