(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/[next]_internal_operation-stream_ts_22fa49._.js", {

"[next]/internal/operation-stream.ts (ecmascript, ssr)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "default": ()=>startHandler
});
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/index.ts (ecmascript, ssr)");
var __TURBOPACK__external__node$3a$buffer__ = __turbopack_external_require__("node:buffer", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function startHandler(createOperation) {
    const ipc = __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$28$ecmascript$29$__["IPC"];
    (async ()=>{
        while(true){
            let operation;
            {
                const msg = await ipc.recv();
                switch(msg.type){
                    case 'headers':
                        {
                            operation = await createOperation(msg.data, (data)=>{
                                ipc.send({
                                    type: 'headers',
                                    data
                                });
                                return {
                                    chunk: (buf)=>{
                                        return ipc.send({
                                            type: 'bodyChunk',
                                            data: buf.toJSON().data
                                        });
                                    },
                                    end: ()=>{
                                        return ipc.send({
                                            type: 'bodyEnd'
                                        });
                                    }
                                };
                            }, (error)=>{
                                return ipc.sendError(error instanceof Error ? error : new Error(`an unknown error occurred: ${error}`));
                            });
                            break;
                        }
                    default:
                        {
                            console.error('unexpected message type', msg.type);
                            process.exit(1);
                        }
                }
            }
            if (operation) {
                if (operation.streamRequest) {
                    loop: while(true){
                        const msg = await ipc.recv();
                        switch(msg.type){
                            case 'bodyChunk':
                            case 'bodyText':
                                {
                                    await operation.onChunk?.(__TURBOPACK__external__node$3a$buffer__["Buffer"].from(msg.data));
                                    break;
                                }
                            case 'bodyEnd':
                                {
                                    await operation.onEnd?.();
                                    break loop;
                                }
                            default:
                                {
                                    console.error('unexpected message type', msg.type);
                                    process.exit(1);
                                }
                        }
                    }
                } else {
                    let body = __TURBOPACK__external__node$3a$buffer__["Buffer"].alloc(0);
                    loop: while(true){
                        const msg = await ipc.recv();
                        switch(msg.type){
                            case 'bodyChunk':
                            case 'bodyText':
                                {
                                    body = __TURBOPACK__external__node$3a$buffer__["Buffer"].concat([
                                        body,
                                        __TURBOPACK__external__node$3a$buffer__["Buffer"].from(msg.data)
                                    ]);
                                    break;
                                }
                            case 'bodyEnd':
                                {
                                    await operation.onBody?.(body);
                                    break loop;
                                }
                            default:
                                {
                                    console.error('unexpected message type', msg.type);
                                    process.exit(1);
                                }
                        }
                    }
                }
            }
        }
    })().catch((err)=>{
        ipc.sendError(err);
    });
}

})()),
}]);

//# sourceMappingURL=[next]_internal_operation-stream_ts_22fa49._.js.map