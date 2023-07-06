(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/[next]_entry_app-renderer_tsx_0deed2._.js", {

"[next]/entry/app/manifest.ts (ecmascript, ssr)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "createManifests": ()=>createManifests,
    "installRequireAndChunkLoad": ()=>installRequireAndChunkLoad
});
function createManifests() {
    const proxyMethodsForModule = (id)=>{
        return {
            get (_target, prop) {
                return {
                    id,
                    chunks: JSON.parse(id)[1],
                    name: prop
                };
            }
        };
    };
    const availableModules = new Set();
    const toPath = (chunk)=>typeof chunk === 'string' ? chunk : chunk.path;
    const filterAvailable = (chunk)=>{
        if (typeof chunk === 'string') {
            return true;
        } else {
            let includedList = chunk.included || [];
            if (includedList.length === 0) {
                return true;
            }
            let needed = false;
            for (const item of includedList){
                if (!availableModules.has(item)) {
                    availableModules.add(item);
                    needed = true;
                }
            }
            return needed;
        }
    };
    const proxyMethodsNested = (type)=>{
        return {
            get (_target, key) {
                if (type === 'ssrModuleMapping') {
                    return new Proxy({}, proxyMethodsForModule(key));
                }
                if (type === 'clientModules') {
                    const pos = key.lastIndexOf('#');
                    let id = key;
                    let name = '';
                    if (pos !== -1) {
                        id = key.slice(0, pos);
                        name = key.slice(pos + 1);
                    } else {
                        throw new Error('keys need to be formatted as {file}#{name}');
                    }
                    return {
                        id,
                        name,
                        chunks: JSON.parse(id)[1]
                    };
                }
                if (type === 'entryCSSFiles') {
                    const cssChunks = JSON.parse(key);
                    return cssChunks.filter(filterAvailable).map(toPath);
                }
            }
        };
    };
    const proxyMethods = ()=>{
        const clientModulesProxy = new Proxy({}, proxyMethodsNested('clientModules'));
        const ssrModuleMappingProxy = new Proxy({}, proxyMethodsNested('ssrModuleMapping'));
        const entryCSSFilesProxy = new Proxy({}, proxyMethodsNested('entryCSSFiles'));
        return {
            get (_target, prop) {
                if (prop === 'ssrModuleMapping') {
                    return ssrModuleMappingProxy;
                }
                if (prop === 'clientModules') {
                    return clientModulesProxy;
                }
                if (prop === 'entryCSSFiles') {
                    return entryCSSFilesProxy;
                }
            }
        };
    };
    const clientReferenceManifest = new Proxy({}, proxyMethods());
    return {
        clientReferenceManifest
    };
}
function installRequireAndChunkLoad() {
    globalThis.__next_require__ = (data)=>{
        const [, , ssr_id] = JSON.parse(data);
        return __turbopack_require__(ssr_id);
    };
    globalThis.__next_chunk_load__ = ()=>Promise.resolve();
}

})()),
"[next]/entry/app/hydrate.tsx (ecmascript, chunk group files, ssr)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname }) => (() => {

__turbopack_export_value__([
  "static/chunks/_5654f9._.js",
  "static/chunks/[next]_overlay_client_ts_f72f0e._.js",
  "static/chunks/[next]_dev_2185c6._.js",
  "static/chunks/[next]_compiled_platform_index_a1e4df.js",
  "static/chunks/[next]_compiled_css_escape_index_04d239.js",
  "static/chunks/[next]_compiled_strip-ansi_index_a31030.js",
  "static/chunks/[next]_compiled_stacktrace-parser_index_ae8931.js",
  "static/chunks/[next]_compiled_anser_index_f39a28.js",
  "static/chunks/[next]_entry_app_hydrate_tsx_b53fce._.js",
  "static/chunks/[turbopack]_dev_client_3861d9._.js",
  "static/chunks/[next]_entry_app_hydrate_tsx_5771e1._.js",
  "static/chunks/[next]_entry_app_hydrate_tsx_a5464f._.js"
]);

})()),
"[next]/entry/app-renderer.tsx/(APP_ENTRY)/[next]/entry/app-entry.tsx/(COMPONENT_0)/[project]/src/app/page.tsx (ecmascript, client chunks, with chunking context scope)/(COMPONENT_1)/[project]/src/app/layout.tsx (ecmascript, client chunks, with chunking context scope)/(METADATA_2)/[project]/src/app/favicon.ico.mjs/(IMAGE)/[project]/src/app/favicon.ico (static) (structured image object, ecmascript) (ecmascript, client chunks, with chunking context scope)/(APP_BOOTSTRAP)/[next]/entry/app/hydrate.tsx (ecmascript, chunk group files) (ecmascript, ssr)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$operation$2d$stream$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/operation-stream.ts (ecmascript, ssr)");
var __TURBOPACK__imported__module__$5b$next$5d2f$polyfill$2f$app$2d$polyfills$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/polyfill/app-polyfills.ts (ecmascript, ssr)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$app$2d$render$2e$js__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/app-render/app-render.js (ecmascript, ssr)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/app-router-headers.js (ecmascript, ssr)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/headers.ts (ecmascript, ssr)");
var __TURBOPACK__external__node$3a$querystring__ = __turbopack_external_require__("node:querystring", true);
var __TURBOPACK__external__node$3a$stream__ = __turbopack_external_require__("node:stream", true);
var __TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2d$entry$2e$tsx$2f28$COMPONENT_0$292f5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$28$ecmascript$2c$__client__chunks$2c$__with__chunking__context__scope$292f28$COMPONENT_1$292f5b$project$5d2f$src$2f$app$2f$layout$2e$tsx__$28$ecmascript$2c$__client__chunks$2c$__with__chunking__context__scope$292f28$METADATA_2$292f5b$project$5d2f$src$2f$app$2f$favicon$2e$ico$2e$mjs$2f28$IMAGE$292f5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static$29$__$28$structured__image__object$2c$__ecmascript$29$__$28$ecmascript$2c$__client__chunks$2c$__with__chunking__context__scope$29$__ = __turbopack_import__("[next]/entry/app-entry.tsx/(COMPONENT_0)/[project]/src/app/page.tsx (ecmascript, client chunks, with chunking context scope)/(COMPONENT_1)/[project]/src/app/layout.tsx (ecmascript, client chunks, with chunking context scope)/(METADATA_2)/[project]/src/app/favicon.ico.mjs/(IMAGE)/[project]/src/app/favicon.ico (static) (structured image object, ecmascript) (ecmascript, client chunks, rsc)");
var __TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2f$hydrate$2e$tsx__$28$ecmascript$2c$__chunk__group__files$29$__ = __turbopack_import__("[next]/entry/app/hydrate.tsx (ecmascript, chunk group files, ssr)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$http$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/http.ts (ecmascript, ssr)");
var __TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2f$manifest$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[next]/entry/app/manifest.ts (ecmascript, ssr)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
'TURBOPACK { chunking-type: isolatedParallel }';
;
;
;
;
__TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2f$manifest$2e$ts__$28$ecmascript$29$__["installRequireAndChunkLoad"]();
process.env.__NEXT_NEW_LINK_BEHAVIOR = 'true';
const MIME_TEXT_HTML_UTF8 = 'text/html; charset=utf-8';
__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$operation$2d$stream$2e$ts__$28$ecmascript$29$__["default"](async (renderData, respond)=>{
    const result = await runOperation(renderData);
    if (result == null) {
        throw new Error('no html returned');
    }
    const channel = respond({
        status: result.statusCode,
        headers: result.headers
    });
    for await (const chunk of result.body){
        channel.chunk(chunk);
    }
    channel.end();
});
async function runOperation(renderData) {
    const { clientReferenceManifest } = __TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2f$manifest$2e$ts__$28$ecmascript$29$__["createManifests"]();
    const req = {
        url: renderData.originalUrl,
        method: renderData.method,
        headers: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["initProxiedHeaders"](__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$headers$2e$ts__$28$ecmascript$29$__["headersFromEntries"](renderData.rawHeaders), renderData.data?.serverInfo)
    };
    const res = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$http$2e$ts__$28$ecmascript$29$__["createServerResponse"](req, renderData.path);
    const query = __TURBOPACK__external__node$3a$querystring__["parse"](renderData.rawQuery);
    const renderOpt = {
        buildId: 'development',
        params: renderData.params,
        supportsDynamicHTML: true,
        dev: true,
        buildManifest: {
            polyfillFiles: [],
            rootMainFiles: __TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2f$hydrate$2e$tsx__$28$ecmascript$2c$__chunk__group__files$29$__["default"].filter((path)=>path.endsWith('.js')),
            devFiles: [],
            ampDevFiles: [],
            lowPriorityFiles: [],
            pages: {
                '/_app': []
            },
            ampFirstPages: []
        },
        ComponentMod: {
            ...__TURBOPACK__imported__module__$5b$next$5d2f$entry$2f$app$2d$entry$2e$tsx$2f28$COMPONENT_0$292f5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$28$ecmascript$2c$__client__chunks$2c$__with__chunking__context__scope$292f28$COMPONENT_1$292f5b$project$5d2f$src$2f$app$2f$layout$2e$tsx__$28$ecmascript$2c$__client__chunks$2c$__with__chunking__context__scope$292f28$METADATA_2$292f5b$project$5d2f$src$2f$app$2f$favicon$2e$ico$2e$mjs$2f28$IMAGE$292f5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static$29$__$28$structured__image__object$2c$__ecmascript$29$__$28$ecmascript$2c$__client__chunks$2c$__with__chunking__context__scope$29$__["default"],
            __next_app__: {
                require: __next_require__,
                loadChunk: __next_chunk_load__
            },
            pages: [
                'page.js'
            ]
        },
        clientReferenceManifest,
        runtime: 'nodejs',
        serverComponents: true,
        assetPrefix: '',
        pageConfig: {},
        reactLoadableManifest: {},
        nextConfigOutput: renderData.data?.nextConfigOutput
    };
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$app$2d$render$2e$js__$28$ecmascript$29$__["renderToHTMLOrFlight"](req, res, renderData.path, query, renderOpt);
    if (!result || result.isNull) throw new Error('rendering was not successful');
    const body = new __TURBOPACK__external__node$3a$stream__["PassThrough"]();
    if (result.isDynamic) {
        result.pipe(body);
    } else {
        body.write(result.toUnchunkedString());
    }
    return {
        statusCode: res.statusCode,
        headers: [
            [
                'Content-Type',
                result.contentType ?? MIME_TEXT_HTML_UTF8
            ],
            [
                'Vary',
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$app$2d$router$2d$headers$2e$js__$28$ecmascript$29$__["RSC_VARY_HEADER"]
            ]
        ],
        body
    };
}

})()),
}]);

//# sourceMappingURL=[next]_entry_app-renderer_tsx_0deed2._.js.map