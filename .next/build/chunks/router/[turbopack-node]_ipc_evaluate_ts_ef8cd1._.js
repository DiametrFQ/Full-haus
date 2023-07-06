(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/router/[turbopack-node]_ipc_evaluate_ts_ef8cd1._.js", {

"[turbopack-node]/ipc/error.ts (ecmascript, router)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "default": ()=>isError,
    "getProperError": ()=>getProperError
});
function isError(err) {
    return typeof err === "object" && err !== null && "name" in err && "message" in err;
}
function getProperError(err) {
    if (isError(err)) {
        return err;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof err === "undefined") {
            return new Error("`undefined` was thrown instead of a real error");
        }
        if (err === null) {
            return new Error("`null` was thrown instead of a real error");
        }
    }
    return new Error(isPlainObject(err) ? JSON.stringify(err) : err + "");
}
function getObjectClassLabel(value) {
    return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
    if (getObjectClassLabel(value) !== "[object Object]") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype.hasOwnProperty("isPrototypeOf");
}

})()),
"[turbopack-node]/ipc/index.ts (ecmascript, router)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "IPC": ()=>IPC,
    "structuredError": ()=>structuredError
});
var __TURBOPACK__external__node$3a$net__ = __turbopack_external_require__("node:net", true);
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/compiled/stacktrace-parser/index.js (ecmascript, router)");
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$error$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/error.ts (ecmascript, router)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function structuredError(e) {
    e = __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$error$2e$ts__$28$ecmascript$29$__["getProperError"](e);
    return {
        name: e.name,
        message: e.message,
        stack: typeof e.stack === "string" ? __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$28$ecmascript$29$__["parse"](e.stack) : []
    };
}
function createIpc(port) {
    const socket = __TURBOPACK__external__node$3a$net__["createConnection"](port, "127.0.0.1");
    const packetQueue = [];
    const recvPromiseResolveQueue = [];
    function pushPacket(packet) {
        const recvPromiseResolve = recvPromiseResolveQueue.shift();
        if (recvPromiseResolve != null) {
            recvPromiseResolve(JSON.parse(packet.toString("utf8")));
        } else {
            packetQueue.push(packet);
        }
    }
    let state = {
        type: "waiting"
    };
    let buffer = Buffer.alloc(0);
    socket.once("connect", ()=>{
        socket.on("data", (chunk)=>{
            buffer = Buffer.concat([
                buffer,
                chunk
            ]);
            loop: while(true){
                switch(state.type){
                    case "waiting":
                        {
                            if (buffer.length >= 4) {
                                const length = buffer.readUInt32BE(0);
                                buffer = buffer.subarray(4);
                                state = {
                                    type: "packet",
                                    length
                                };
                            } else {
                                break loop;
                            }
                            break;
                        }
                    case "packet":
                        {
                            if (buffer.length >= state.length) {
                                const packet = buffer.subarray(0, state.length);
                                buffer = buffer.subarray(state.length);
                                state = {
                                    type: "waiting"
                                };
                                pushPacket(packet);
                            } else {
                                break loop;
                            }
                            break;
                        }
                }
            }
        });
    });
    socket.once("close", ()=>{
        process.exit(0);
    });
    function send(message) {
        const packet = Buffer.from(JSON.stringify(message), "utf8");
        const length = Buffer.alloc(4);
        length.writeUInt32BE(packet.length);
        socket.write(length);
        return new Promise((resolve, reject)=>{
            socket.write(packet, (err)=>{
                process.stderr.write(`TURBOPACK_OUTPUT_D\n`);
                process.stdout.write(`TURBOPACK_OUTPUT_D\n`);
                if (err != null) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    return {
        async recv () {
            const packet = packetQueue.shift();
            if (packet != null) {
                return JSON.parse(packet.toString("utf8"));
            }
            const result = await new Promise((resolve)=>{
                recvPromiseResolveQueue.push((result)=>{
                    resolve(result);
                });
            });
            return result;
        },
        send (message) {
            return send(message);
        },
        async sendError (error) {
            try {
                await send({
                    type: "error",
                    ...structuredError(error)
                });
            } catch (err) {
                console.error("failed to send error back to rust:", err);
                process.exit(1);
            }
            process.exit(0);
        }
    };
}
const PORT = process.argv[2];
const IPC = createIpc(parseInt(PORT, 10));
process.on("uncaughtException", (err)=>{
    IPC.sendError(err);
});
const improveConsole = (name, stream, addStack)=>{
    const original = console[name];
    const stdio = process[stream];
    console[name] = (...args)=>{
        stdio.write(`TURBOPACK_OUTPUT_B\n`);
        original(...args);
        if (addStack) {
            const stack = new Error().stack?.replace(/^.+\n.+\n/, "") + "\n";
            stdio.write("TURBOPACK_OUTPUT_S\n");
            stdio.write(stack);
        }
        stdio.write("TURBOPACK_OUTPUT_E\n");
    };
};
improveConsole("error", "stderr", true);
improveConsole("warn", "stderr", true);
improveConsole("count", "stdout", true);
improveConsole("trace", "stderr", false);
improveConsole("log", "stdout", true);
improveConsole("group", "stdout", true);
improveConsole("groupCollapsed", "stdout", true);
improveConsole("table", "stdout", true);
improveConsole("debug", "stdout", true);
improveConsole("info", "stdout", true);
improveConsole("dir", "stdout", true);
improveConsole("dirxml", "stdout", true);
improveConsole("timeEnd", "stdout", true);
improveConsole("timeLog", "stdout", true);
improveConsole("timeStamp", "stdout", true);
improveConsole("assert", "stderr", true);

})()),
"[turbopack-node]/ipc/evaluate.ts (ecmascript, router)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_cjs__, g: global, __dirname, x: __turbopack_external_require__, k: __turbopack_refresh__ }) => (() => {

__turbopack_esm__({
    "run": ()=>run
});
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/ipc/index.ts (ecmascript, router)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const ipc = __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$ipc$2f$index$2e$ts__$28$ecmascript$29$__["IPC"];
const run = async (getValue)=>{
    while(true){
        const msg = await ipc.recv();
        switch(msg.type){
            case "evaluate":
                {
                    try {
                        const value = await getValue(ipc, ...msg.args);
                        await ipc.send({
                            type: "end",
                            data: value === undefined ? undefined : JSON.stringify(value, null, 2)
                        });
                    } catch (e) {
                        await ipc.sendError(e);
                    }
                    break;
                }
            default:
                {
                    console.error("unexpected message type", msg.type);
                    process.exit(1);
                }
        }
    }
};

})()),
}]);

//# sourceMappingURL=[turbopack-node]_ipc_evaluate_ts_ef8cd1._.js.map