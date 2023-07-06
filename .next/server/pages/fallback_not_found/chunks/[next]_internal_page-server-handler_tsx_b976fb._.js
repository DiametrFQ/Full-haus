(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[next]_internal_page-server-handler_tsx_b976fb._.js", {

"[next]/internal/http.ts (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "createServerResponse": ()=>createServerResponse
});
class ServerResponseShim {
    headersSent = false;
    #headers = new Map();
    #statusCode = 200;
    req;
    constructor(req){
        this.req = req;
    }
    setHeader(name, value) {
        this.#headers.set(name.toLowerCase(), value);
        return this;
    }
    getHeader(name) {
        return this.#headers.get(name.toLowerCase());
    }
    getHeaderNames() {
        return Array.from(this.#headers.keys());
    }
    getHeaders() {
        return Object.fromEntries(this.#headers);
    }
    hasHeader(name) {
        return this.#headers.has(name.toLowerCase());
    }
    removeHeader(name) {
        this.#headers.delete(name.toLowerCase());
    }
    get statusCode() {
        return this.#statusCode;
    }
    set statusCode(code) {
        this.#statusCode = code;
    }
    get statusMessage() {
        throw new Error('statusMessage is not implemented');
    }
    set statusMessage(message) {
        throw new Error('set statusMessage is not implemented');
    }
    get socket() {
        throw new Error('socket is not implemented');
    }
    get sendDate() {
        throw new Error('sendDate is not implemented');
    }
    flushHeaders() {
        throw new Error('flushHeaders is not implemented');
    }
    end() {
        throw new Error('end is not implemented');
    }
    cork() {
        throw new Error('cork is not implemented');
    }
    uncork() {
        throw new Error('uncork is not implemented');
    }
    addTrailers() {
        throw new Error('addTrailers is not implemented');
    }
    setTimeout(_msecs, _callback) {
        throw new Error('setTimeout is not implemented');
    }
    get writableEnded() {
        throw new Error('writableEnded is not implemented');
    }
    get writableFinished() {
        throw new Error('writableFinished is not implemented');
    }
    write(_chunk, _encoding, _callback) {
        throw new Error('write is not implemented');
    }
    writeContinue() {
        throw new Error('writeContinue is not implemented');
    }
    writeHead(_statusCode, _statusMessage, _headers) {
        throw new Error('writeHead is not implemented');
    }
    writeProcessing() {
        throw new Error('writeProcessing is not implemented');
    }
}
function getStatusCodeForPath(pathname) {
    if (pathname === '/404' || pathname === '/_error') {
        return 404;
    }
    return 200;
}
function createServerResponse(req, pathname) {
    const statusCode = getStatusCodeForPath(pathname);
    const res = new ServerResponseShim(req);
    res.statusCode = statusCode;
    return res;
}

})()),
"[next]/internal/headers.ts (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

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
"[next]/internal/shims.ts (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__, m: module, e: exports }) { !function() {

process.env.__NEXT_REACT_ROOT = 'true';

}.call(this) }),
"[next]/internal/page-server-handler.tsx (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "default": ()=>startHandler
});
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/index.ts (ecmascript)");
var __TURBOPACK__external__next$2f$dist$2f$server$2f$node$2d$polyfill$2d$fetch$2e$js__ = __turbopack_external_require__("next/dist/server/node-polyfill-fetch.js", true);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$shims$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/shims.ts (ecmascript)");
var __TURBOPACK__external__next$2f$dist$2f$server$2f$render__ = __turbopack_external_require__("next/dist/server/render", true);
var __TURBOPACK__external__next$2f$dist$2f$lib$2f$redirect$2d$status__ = __turbopack_external_require__("next/dist/lib/redirect-status", true);
var __TURBOPACK__external__next$2f$dist$2f$shared$2f$lib$2f$constants__ = __turbopack_external_require__("next/dist/shared/lib/constants", true);
var __TURBOPACK__external__next$2f$dist$2f$build$2f$utils__ = __turbopack_external_require__("next/dist/build/utils", true);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/headers.ts (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$http$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/http.ts (ecmascript)");
var __TURBOPACK__external__node$3a$querystring__ = __turbopack_external_require__("node:querystring", true);
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
;
const ipc = __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$28$ecmascript$29$__["IPC"];
const MIME_APPLICATION_JAVASCRIPT = 'application/javascript';
const MIME_TEXT_HTML_UTF8 = 'text/html; charset=utf-8';
function startHandler({ isDataReq, App, Document, mod, chunkGroup }) {
    (async ()=>{
        while(true){
            const msg = await ipc.recv();
            let renderData;
            switch(msg.type){
                case 'headers':
                    {
                        renderData = msg.data;
                        break;
                    }
                default:
                    {
                        console.error('unexpected message type', msg.type);
                        process.exit(1);
                    }
            }
            const { Component, namespace } = await mod();
            const res = await runOperation(renderData, Component, namespace);
            ipc.send(res);
        }
    })().catch((err)=>{
        ipc.sendError(err);
    });
    async function runOperation(renderData, Component, namespace) {
        if ('getStaticPaths' in namespace) {
            const { paths: prerenderRoutes, fallback: prerenderFallback, encodedPaths: _encodedPrerenderRoutes } = await __TURBOPACK__external__next$2f$dist$2f$build$2f$utils__["buildStaticPaths"]({
                page: renderData.path,
                getStaticPaths: namespace.getStaticPaths,
                configFileName: 'next.config.js'
            });
            let resolvedPath = new URL(renderData.url, 'next://').pathname;
            if (isDataReq) {
                resolvedPath = resolvedPath.replace(/^\/_next\/data\/development(.+).json$/, '$1');
            }
            if (prerenderFallback === false && !prerenderRoutes.includes(resolvedPath)) {
                return createNotFoundResponse(isDataReq);
            }
        }
        const buildManifest = {
            pages: {
                '/_app': [],
                [renderData.path]: chunkGroup || []
            },
            devFiles: [],
            ampDevFiles: [],
            polyfillFiles: [],
            lowPriorityFiles: [
                'static/development/_buildManifest.js'
            ],
            rootMainFiles: [],
            ampFirstPages: []
        };
        const comp = typeof Component === 'undefined' || typeof Component === 'object' && Object.keys(Component).length === 0 ? ()=>null : Component;
        const renderOpts = {
            strictNextHead: false,
            Component: comp,
            App,
            Document,
            pageConfig: {},
            buildManifest,
            reactLoadableManifest: createReactLoadableManifestProxy(),
            ComponentMod: {
                default: comp,
                ...namespace
            },
            pathname: renderData.path,
            buildId: 'development',
            isDataReq,
            runtimeConfig: {},
            assetPrefix: '',
            canonicalBase: '',
            previewProps: {
                previewModeId: '',
                previewModeEncryptionKey: '',
                previewModeSigningKey: ''
            },
            params: renderData.params,
            basePath: '',
            nextExport: true,
            nextConfigOutput: renderData.data?.nextConfigOutput,
            resolvedUrl: renderData.url,
            optimizeFonts: false,
            optimizeCss: false,
            nextScriptWorkers: false,
            supportsDynamicHTML: true,
            images: {
                deviceSizes: [],
                imageSizes: [],
                loader: 'default',
                path: '',
                loaderFile: '',
                domains: [],
                disableStaticImages: false,
                minimumCacheTTL: 0,
                formats: [],
                dangerouslyAllowSVG: false,
                contentSecurityPolicy: '',
                contentDispositionType: 'inline',
                remotePatterns: [],
                unoptimized: true
            }
        };
        if ('getStaticPaths' in namespace) {
            renderOpts.getStaticPaths = namespace.getStaticPaths;
        }
        if ('getStaticProps' in namespace) {
            renderOpts.getStaticProps = namespace.getStaticProps;
        }
        if ('getServerSideProps' in namespace) {
            renderOpts.getServerSideProps = namespace.getServerSideProps;
        }
        const req = {
            url: renderData.url,
            method: 'GET',
            headers: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["initProxiedHeaders"](__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["headersFromEntries"](renderData.rawHeaders), renderData.data?.serverInfo)
        };
        const res = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$http$2e$ts__$28$ecmascript$29$__["createServerResponse"](req, renderData.path);
        const parsedQuery = __TURBOPACK__external__node$3a$querystring__["parse"](renderData.rawQuery);
        const query = {
            ...parsedQuery,
            ...renderData.params
        };
        const renderResult = await __TURBOPACK__external__next$2f$dist$2f$server$2f$render__["renderToHTML"](req, res, renderData.path, query, renderOpts);
        const { metadata: { isNotFound, isRedirect } } = renderResult;
        if (isNotFound) {
            return createNotFoundResponse(isDataReq);
        }
        if (isRedirect && !isDataReq) {
            const { metadata: { pageData: { pageProps } } } = renderResult;
            const redirect = {
                destination: pageProps.__N_REDIRECT,
                statusCode: pageProps.__N_REDIRECT_STATUS,
                basePath: pageProps.__N_REDIRECT_BASE_PATH
            };
            const statusCode = __TURBOPACK__external__next$2f$dist$2f$lib$2f$redirect$2d$status__["getRedirectStatus"](redirect);
            const headers = [
                [
                    'Location',
                    redirect.destination
                ]
            ];
            if (statusCode === __TURBOPACK__external__next$2f$dist$2f$shared$2f$lib$2f$constants__["PERMANENT_REDIRECT_STATUS"]) {
                headers.push([
                    'Refresh',
                    `0;url=${redirect.destination}`
                ]);
            }
            return {
                type: 'response',
                statusCode,
                headers,
                body: redirect.destination
            };
        }
        if (isDataReq) {
            const { metadata: { pageData } } = renderResult;
            return {
                type: 'response',
                statusCode: res.statusCode,
                headers: [
                    [
                        'Content-Type',
                        MIME_APPLICATION_JAVASCRIPT
                    ]
                ],
                body: JSON.stringify(pageData === undefined ? {} : pageData)
            };
        }
        if (!renderResult || renderResult.isNull) {
            throw new Error('no render result returned');
        }
        const body = renderResult.toUnchunkedString();
        return {
            type: 'response',
            statusCode: res.statusCode,
            headers: [
                [
                    'Content-Type',
                    renderResult.contentType ?? MIME_TEXT_HTML_UTF8
                ]
            ],
            body
        };
    }
}
function createNotFoundResponse(isDataReq) {
    if (isDataReq) {
        return {
            type: 'response',
            statusCode: 404,
            body: '{"notFound":true}',
            headers: [
                [
                    'Content-Type',
                    MIME_APPLICATION_JAVASCRIPT
                ]
            ]
        };
    }
    return {
        type: 'rewrite',
        path: '/_next/404'
    };
}
function createReactLoadableManifestProxy() {
    return new Proxy({}, {
        get: (_target, prop, _receiver)=>{
            const { id, chunks } = JSON.parse(prop);
            return {
                id,
                files: chunks.map((chunk)=>{
                    let path = typeof chunk === 'string' ? chunk : chunk.path;
                    if (path.startsWith('_next/')) {
                        path = path.slice('_next/'.length);
                    }
                    return path;
                })
            };
        }
    });
}

})()),
}]);

//# sourceMappingURL=[next]_internal_page-server-handler_tsx_b976fb._.js.map