import { n as Socket, t as Presence } from "../_libs/supabase__phoenix.mjs";
import { t as IcebergRestCatalog } from "../_libs/iceberg-js.mjs";
import { t as AuthClient } from "../_libs/supabase__auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dist-DtePOooj.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var EXTRACTOR_KEY = Symbol.for("@supabase/supabase-js.traceContextExtractor");
/**
* The currently registered trace context extractor, if any.
*/
function getTraceContextExtractor() {
	return globalThis[EXTRACTOR_KEY];
}
var { __extends, __assign, __rest, __decorate, __param, __esDecorate, __runInitializers, __propKey, __setFunctionName, __metadata, __awaiter, __generator, __exportStar, __createBinding, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet, __classPrivateFieldIn, __addDisposableResource, __disposeResources, __rewriteRelativeImportExtension } = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/******************************************************************************
	Copyright (c) Microsoft Corporation.
	
	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.
	
	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	var __extends;
	var __assign;
	var __rest;
	var __decorate;
	var __param;
	var __esDecorate;
	var __runInitializers;
	var __propKey;
	var __setFunctionName;
	var __metadata;
	var __awaiter;
	var __generator;
	var __exportStar;
	var __values;
	var __read;
	var __spread;
	var __spreadArrays;
	var __spreadArray;
	var __await;
	var __asyncGenerator;
	var __asyncDelegator;
	var __asyncValues;
	var __makeTemplateObject;
	var __importStar;
	var __importDefault;
	var __classPrivateFieldGet;
	var __classPrivateFieldSet;
	var __classPrivateFieldIn;
	var __createBinding;
	var __addDisposableResource;
	var __disposeResources;
	var __rewriteRelativeImportExtension;
	(function(factory) {
		var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
		if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(exports$1) {
			factory(createExporter(root, createExporter(exports$1)));
		});
		else if (typeof module === "object" && typeof module.exports === "object") factory(createExporter(root, createExporter(module.exports)));
		else factory(createExporter(root));
		function createExporter(exports$2, previous) {
			if (exports$2 !== root) {
				if (typeof Object.create === "function") Object.defineProperty(exports$2, "__esModule", { value: true });
				else exports$2.__esModule = true;
			}
			return function(id, v) {
				return exports$2[id] = previous ? previous(id, v) : v;
			};
		}
	})(function(exporter) {
		var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		__extends = function(d, b) {
			if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		__rest = function(s, e) {
			var t = {};
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
			if (s != null && typeof Object.getOwnPropertySymbols === "function") {
				for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
			}
			return t;
		};
		__decorate = function(decorators, target, key, desc) {
			var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
			if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
			else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
			return c > 3 && r && Object.defineProperty(target, key, r), r;
		};
		__param = function(paramIndex, decorator) {
			return function(target, key) {
				decorator(target, key, paramIndex);
			};
		};
		__esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
			function accept(f) {
				if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
				return f;
			}
			var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
			var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
			var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
			var _, done = false;
			for (var i = decorators.length - 1; i >= 0; i--) {
				var context = {};
				for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
				for (var p in contextIn.access) context.access[p] = contextIn.access[p];
				context.addInitializer = function(f) {
					if (done) throw new TypeError("Cannot add initializers after decoration has completed");
					extraInitializers.push(accept(f || null));
				};
				var result = (0, decorators[i])(kind === "accessor" ? {
					get: descriptor.get,
					set: descriptor.set
				} : descriptor[key], context);
				if (kind === "accessor") {
					if (result === void 0) continue;
					if (result === null || typeof result !== "object") throw new TypeError("Object expected");
					if (_ = accept(result.get)) descriptor.get = _;
					if (_ = accept(result.set)) descriptor.set = _;
					if (_ = accept(result.init)) initializers.unshift(_);
				} else if (_ = accept(result)) {
					if (kind === "field") initializers.unshift(_);
					else descriptor[key] = _;
				}
			}
			if (target) Object.defineProperty(target, contextIn.name, descriptor);
			done = true;
		};
		__runInitializers = function(thisArg, initializers, value) {
			var useValue = arguments.length > 2;
			for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
			return useValue ? value : void 0;
		};
		__propKey = function(x) {
			return typeof x === "symbol" ? x : "".concat(x);
		};
		__setFunctionName = function(f, name, prefix) {
			if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
			return Object.defineProperty(f, "name", {
				configurable: true,
				value: prefix ? "".concat(prefix, " ", name) : name
			});
		};
		__metadata = function(metadataKey, metadataValue) {
			if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
		};
		__awaiter = function(thisArg, _arguments, P, generator) {
			function adopt(value) {
				return value instanceof P ? value : new P(function(resolve) {
					resolve(value);
				});
			}
			return new (P || (P = Promise))(function(resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch (e) {
						reject(e);
					}
				}
				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch (e) {
						reject(e);
					}
				}
				function step(result) {
					result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
				}
				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
		};
		__generator = function(thisArg, body) {
			var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: []
			}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
			return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
				return this;
			}), g;
			function verb(n) {
				return function(v) {
					return step([n, v]);
				};
			}
			function step(op) {
				if (f) throw new TypeError("Generator is already executing.");
				while (g && (g = 0, op[0] && (_ = 0)), _) try {
					if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
					if (y = 0, t) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return {
								value: op[1],
								done: false
							};
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
				if (op[0] & 5) throw op[1];
				return {
					value: op[0] ? op[1] : void 0,
					done: true
				};
			}
		};
		__exportStar = function(m, o) {
			for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
		};
		__createBinding = Object.create ? (function(o, m, k, k2) {
			if (k2 === void 0) k2 = k;
			var desc = Object.getOwnPropertyDescriptor(m, k);
			if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
				enumerable: true,
				get: function() {
					return m[k];
				}
			};
			Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
			if (k2 === void 0) k2 = k;
			o[k2] = m[k];
		});
		__values = function(o) {
			var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
			if (m) return m.call(o);
			if (o && typeof o.length === "number") return { next: function() {
				if (o && i >= o.length) o = void 0;
				return {
					value: o && o[i++],
					done: !o
				};
			} };
			throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
		};
		__read = function(o, n) {
			var m = typeof Symbol === "function" && o[Symbol.iterator];
			if (!m) return o;
			var i = m.call(o), r, ar = [], e;
			try {
				while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
			} catch (error) {
				e = { error };
			} finally {
				try {
					if (r && !r.done && (m = i["return"])) m.call(i);
				} finally {
					if (e) throw e.error;
				}
			}
			return ar;
		};
		/** @deprecated */
		__spread = function() {
			for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
			return ar;
		};
		/** @deprecated */
		__spreadArrays = function() {
			for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
			for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
			return r;
		};
		__spreadArray = function(to, from, pack) {
			if (pack || arguments.length === 2) {
				for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i);
					ar[i] = from[i];
				}
			}
			return to.concat(ar || Array.prototype.slice.call(from));
		};
		__await = function(v) {
			return this instanceof __await ? (this.v = v, this) : new __await(v);
		};
		__asyncGenerator = function(thisArg, _arguments, generator) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var g = generator.apply(thisArg, _arguments || []), i, q = [];
			return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
				return this;
			}, i;
			function awaitReturn(f) {
				return function(v) {
					return Promise.resolve(v).then(f, reject);
				};
			}
			function verb(n, f) {
				if (g[n]) {
					i[n] = function(v) {
						return new Promise(function(a, b) {
							q.push([
								n,
								v,
								a,
								b
							]) > 1 || resume(n, v);
						});
					};
					if (f) i[n] = f(i[n]);
				}
			}
			function resume(n, v) {
				try {
					step(g[n](v));
				} catch (e) {
					settle(q[0][3], e);
				}
			}
			function step(r) {
				r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
			}
			function fulfill(value) {
				resume("next", value);
			}
			function reject(value) {
				resume("throw", value);
			}
			function settle(f, v) {
				if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
			}
		};
		__asyncDelegator = function(o) {
			var i = {}, p;
			return verb("next"), verb("throw", function(e) {
				throw e;
			}), verb("return"), i[Symbol.iterator] = function() {
				return this;
			}, i;
			function verb(n, f) {
				i[n] = o[n] ? function(v) {
					return (p = !p) ? {
						value: __await(o[n](v)),
						done: false
					} : f ? f(v) : v;
				} : f;
			}
		};
		__asyncValues = function(o) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var m = o[Symbol.asyncIterator], i;
			return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
				return this;
			}, i);
			function verb(n) {
				i[n] = o[n] && function(v) {
					return new Promise(function(resolve, reject) {
						v = o[n](v), settle(resolve, reject, v.done, v.value);
					});
				};
			}
			function settle(resolve, reject, d, v) {
				Promise.resolve(v).then(function(v) {
					resolve({
						value: v,
						done: d
					});
				}, reject);
			}
		};
		__makeTemplateObject = function(cooked, raw) {
			if (Object.defineProperty) Object.defineProperty(cooked, "raw", { value: raw });
			else cooked.raw = raw;
			return cooked;
		};
		var __setModuleDefault = Object.create ? (function(o, v) {
			Object.defineProperty(o, "default", {
				enumerable: true,
				value: v
			});
		}) : function(o, v) {
			o["default"] = v;
		};
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o) {
				var ar = [];
				for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		__importStar = function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
		__importDefault = function(mod) {
			return mod && mod.__esModule ? mod : { "default": mod };
		};
		__classPrivateFieldGet = function(receiver, state, kind, f) {
			if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
			if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
			return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
		};
		__classPrivateFieldSet = function(receiver, state, value, kind, f) {
			if (kind === "m") throw new TypeError("Private method is not writable");
			if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
			if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
			return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
		};
		__classPrivateFieldIn = function(state, receiver) {
			if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
			return typeof state === "function" ? receiver === state : state.has(receiver);
		};
		__addDisposableResource = function(env, value, async) {
			if (value !== null && value !== void 0) {
				if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
				var dispose, inner;
				if (async) {
					if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
					dispose = value[Symbol.asyncDispose];
				}
				if (dispose === void 0) {
					if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
					dispose = value[Symbol.dispose];
					if (async) inner = dispose;
				}
				if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
				if (inner) dispose = function() {
					try {
						inner.call(this);
					} catch (e) {
						return Promise.reject(e);
					}
				};
				env.stack.push({
					value,
					dispose,
					async
				});
			} else if (async) env.stack.push({ async: true });
			return value;
		};
		var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
			var e = new Error(message);
			return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
		};
		__disposeResources = function(env) {
			function fail(e) {
				env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
				env.hasError = true;
			}
			var r, s = 0;
			function next() {
				while (r = env.stack.pop()) try {
					if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
					if (r.dispose) {
						var result = r.dispose.call(r.value);
						if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
							fail(e);
							return next();
						});
					} else s |= 1;
				} catch (e) {
					fail(e);
				}
				if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
				if (env.hasError) throw env.error;
			}
			return next();
		};
		__rewriteRelativeImportExtension = function(path, preserveJsx) {
			if (typeof path === "string" && /^\.\.?\//.test(path)) return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
				return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
			});
			return path;
		};
		exporter("__extends", __extends);
		exporter("__assign", __assign);
		exporter("__rest", __rest);
		exporter("__decorate", __decorate);
		exporter("__param", __param);
		exporter("__esDecorate", __esDecorate);
		exporter("__runInitializers", __runInitializers);
		exporter("__propKey", __propKey);
		exporter("__setFunctionName", __setFunctionName);
		exporter("__metadata", __metadata);
		exporter("__awaiter", __awaiter);
		exporter("__generator", __generator);
		exporter("__exportStar", __exportStar);
		exporter("__createBinding", __createBinding);
		exporter("__values", __values);
		exporter("__read", __read);
		exporter("__spread", __spread);
		exporter("__spreadArrays", __spreadArrays);
		exporter("__spreadArray", __spreadArray);
		exporter("__await", __await);
		exporter("__asyncGenerator", __asyncGenerator);
		exporter("__asyncDelegator", __asyncDelegator);
		exporter("__asyncValues", __asyncValues);
		exporter("__makeTemplateObject", __makeTemplateObject);
		exporter("__importStar", __importStar);
		exporter("__importDefault", __importDefault);
		exporter("__classPrivateFieldGet", __classPrivateFieldGet);
		exporter("__classPrivateFieldSet", __classPrivateFieldSet);
		exporter("__classPrivateFieldIn", __classPrivateFieldIn);
		exporter("__addDisposableResource", __addDisposableResource);
		exporter("__disposeResources", __disposeResources);
		exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension);
	});
	0 && (module.exports = {
		__extends,
		__assign,
		__rest,
		__decorate,
		__param,
		__esDecorate,
		__runInitializers,
		__propKey,
		__setFunctionName,
		__metadata,
		__awaiter,
		__generator,
		__exportStar,
		__createBinding,
		__values,
		__read,
		__spread,
		__spreadArrays,
		__spreadArray,
		__await,
		__asyncGenerator,
		__asyncDelegator,
		__asyncValues,
		__makeTemplateObject,
		__importStar,
		__importDefault,
		__classPrivateFieldGet,
		__classPrivateFieldSet,
		__classPrivateFieldIn,
		__addDisposableResource,
		__disposeResources,
		__rewriteRelativeImportExtension
	});
})))())).default;
var resolveFetch$2 = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
/**
* Base error for Supabase Edge Function invocations.
*
* @example
* ```ts
* import { FunctionsError } from '@supabase/functions-js'
*
* throw new FunctionsError('Unexpected error invoking function', 'FunctionsError', {
*   requestId: 'abc123',
* })
* ```
*/
var FunctionsError = class extends Error {
	constructor(message, name = "FunctionsError", context) {
		super(message);
		this.name = name;
		this.context = context;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			context: this.context
		};
	}
};
/**
* Error thrown when the network request to an Edge Function fails.
*
* @example
* ```ts
* import { FunctionsFetchError } from '@supabase/functions-js'
*
* throw new FunctionsFetchError({ requestId: 'abc123' })
* ```
*/
var FunctionsFetchError = class extends FunctionsError {
	constructor(context) {
		super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
	}
};
/**
* Error thrown when the Supabase relay cannot reach the Edge Function.
*
* @example
* ```ts
* import { FunctionsRelayError } from '@supabase/functions-js'
*
* throw new FunctionsRelayError({ region: 'us-east-1' })
* ```
*/
var FunctionsRelayError = class extends FunctionsError {
	constructor(context) {
		super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
	}
};
/**
* Error thrown when the Edge Function returns a non-2xx status code.
*
* @example
* ```ts
* import { FunctionsHttpError } from '@supabase/functions-js'
*
* throw new FunctionsHttpError({ status: 500 })
* ```
*/
var FunctionsHttpError = class extends FunctionsError {
	constructor(context) {
		super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
	}
};
var FunctionRegion;
(function(FunctionRegion) {
	FunctionRegion["Any"] = "any";
	FunctionRegion["ApNortheast1"] = "ap-northeast-1";
	FunctionRegion["ApNortheast2"] = "ap-northeast-2";
	FunctionRegion["ApSouth1"] = "ap-south-1";
	FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
	FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
	FunctionRegion["CaCentral1"] = "ca-central-1";
	FunctionRegion["EuCentral1"] = "eu-central-1";
	FunctionRegion["EuWest1"] = "eu-west-1";
	FunctionRegion["EuWest2"] = "eu-west-2";
	FunctionRegion["EuWest3"] = "eu-west-3";
	FunctionRegion["SaEast1"] = "sa-east-1";
	FunctionRegion["UsEast1"] = "us-east-1";
	FunctionRegion["UsWest1"] = "us-west-1";
	FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));
/**
* Client for invoking Supabase Edge Functions.
*/
var FunctionsClient = class {
	/**
	* Creates a new Functions client bound to an Edge Functions URL.
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.functions.invoke('hello-world')
	* ```
	*
	* @category Edge Functions
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { FunctionsClient, FunctionRegion } from '@supabase/functions-js'
	*
	* const functions = new FunctionsClient('https://xyzcompany.supabase.co/functions/v1', {
	*   headers: { apikey: 'your-publishable-key' },
	*   region: FunctionRegion.UsEast1,
	* })
	* ```
	*/
	constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
		this.url = url;
		this.headers = headers;
		this.region = region;
		this.fetch = resolveFetch$2(customFetch);
	}
	/**
	* Updates the authorization header
	* @param token - the new jwt token sent in the authorisation header
	*
	* @category Edge Functions
	*
	* @example Setting the authorization header
	* ```ts
	* functions.setAuth(session.access_token)
	* ```
	*/
	setAuth(token) {
		this.headers.Authorization = `Bearer ${token}`;
	}
	/**
	* Invokes a function
	* @param functionName - The name of the Function to invoke.
	* @param options - Options for invoking the Function.
	* @example
	* ```ts
	* const { data, error } = await functions.invoke('hello-world', {
	*   body: { name: 'Ada' },
	* })
	* ```
	*
	* @category Edge Functions
	*
	* @remarks
	* - The API key is sent in the `apikey` header. The `Authorization` header is reserved
	*   for the signed-in user's JWT (or a custom auth token) — when there is no session, a
	*   new-format API key (`sb_publishable_…` / `sb_secret_…`) is not sent as a Bearer token.
	* - Invoke params generally match the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) spec.
	* - When you pass in a body to your function, we automatically attach the Content-Type header for `Blob`, `ArrayBuffer`, `File`, `FormData` and `String`. If it doesn't match any of these types we assume the payload is `json`, serialize it and attach the `Content-Type` header as `application/json`. You can override this behavior by passing in a `Content-Type` header of your own.
	* - Responses are automatically parsed as `json`, `blob` and `form-data` depending on the `Content-Type` header sent by your function. Responses are parsed as `text` by default.
	*
	* @example Basic invocation
	* ```js
	* const { data, error } = await supabase.functions.invoke('hello', {
	*   body: { foo: 'bar' }
	* })
	* ```
	*
	* @exampleDescription Error handling
	* A `FunctionsHttpError` error is returned if your function throws an error, `FunctionsRelayError` if the Supabase Relay has an error processing your function and `FunctionsFetchError` if there is a network error in calling your function. Log the full error object so fields like `name`, `context`, and any structured body aren't hidden.
	*
	* @example Error handling
	* ```js
	* import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from "@supabase/supabase-js";
	*
	* const { data, error } = await supabase.functions.invoke('hello', {
	*   headers: {
	*     "my-custom-header": 'my-custom-header-value'
	*   },
	*   body: { foo: 'bar' }
	* })
	*
	* if (error instanceof FunctionsHttpError) {
	*   const errorMessage = await error.context.json()
	*   console.error('Function returned an error', errorMessage)
	* } else if (error instanceof FunctionsRelayError) {
	*   console.error('Relay error:', error)
	* } else if (error instanceof FunctionsFetchError) {
	*   console.error('Fetch error:', error)
	* }
	* ```
	*
	* @exampleDescription Passing custom headers
	* You can pass custom headers to your function. Note: supabase-js automatically passes the `Authorization` header with the signed in user's JWT.
	*
	* @example Passing custom headers
	* ```js
	* const { data, error } = await supabase.functions.invoke('hello', {
	*   headers: {
	*     "my-custom-header": 'my-custom-header-value'
	*   },
	*   body: { foo: 'bar' }
	* })
	* ```
	*
	* @exampleDescription Calling with DELETE HTTP verb
	* You can also set the HTTP verb to `DELETE` when calling your Edge Function.
	*
	* @example Calling with DELETE HTTP verb
	* ```js
	* const { data, error } = await supabase.functions.invoke('hello', {
	*   headers: {
	*     "my-custom-header": 'my-custom-header-value'
	*   },
	*   body: { foo: 'bar' },
	*   method: 'DELETE'
	* })
	* ```
	*
	* @exampleDescription Invoking a Function in the UsEast1 region
	* Here are the available regions:
	* - `FunctionRegion.Any`
	* - `FunctionRegion.ApNortheast1`
	* - `FunctionRegion.ApNortheast2`
	* - `FunctionRegion.ApSouth1`
	* - `FunctionRegion.ApSoutheast1`
	* - `FunctionRegion.ApSoutheast2`
	* - `FunctionRegion.CaCentral1`
	* - `FunctionRegion.EuCentral1`
	* - `FunctionRegion.EuWest1`
	* - `FunctionRegion.EuWest2`
	* - `FunctionRegion.EuWest3`
	* - `FunctionRegion.SaEast1`
	* - `FunctionRegion.UsEast1`
	* - `FunctionRegion.UsWest1`
	* - `FunctionRegion.UsWest2`
	*
	* @example Invoking a Function in the UsEast1 region
	* ```js
	* import { createClient, FunctionRegion } from '@supabase/supabase-js'
	*
	* const { data, error } = await supabase.functions.invoke('hello', {
	*   body: { foo: 'bar' },
	*   region: FunctionRegion.UsEast1
	* })
	* ```
	*
	* @exampleDescription Calling with GET HTTP verb
	* You can also set the HTTP verb to `GET` when calling your Edge Function.
	*
	* @example Calling with GET HTTP verb
	* ```js
	* const { data, error } = await supabase.functions.invoke('hello', {
	*   headers: {
	*     "my-custom-header": 'my-custom-header-value'
	*   },
	*   method: 'GET'
	* })
	* ```
	*
	* @example Standalone client invoke
	* ```ts
	* const { data, error } = await functions.invoke('hello-world', {
	*   body: { name: 'Ada' },
	* })
	* ```
	*/
	invoke(functionName_1) {
		return __awaiter(this, arguments, void 0, function* (functionName, options = {}) {
			var _a, _b;
			let timeoutId;
			let timeoutController;
			let onAbort;
			try {
				const { headers, method, body: functionArgs, signal, timeout } = options;
				let _headers = {};
				let { region } = options;
				if (!region) region = this.region;
				const url = new URL(`${this.url}/${functionName}`);
				if (region && region !== "any") {
					_headers["x-region"] = region;
					url.searchParams.set("forceFunctionRegion", region);
				}
				let body;
				const hasContentTypeHeader = !!headers && Object.keys(headers).some((key) => key.toLowerCase() === "content-type");
				if (functionArgs && !hasContentTypeHeader) {
					if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
						_headers["Content-Type"] = "application/octet-stream";
						body = functionArgs;
					} else if (typeof functionArgs === "string") {
						_headers["Content-Type"] = "text/plain";
						body = functionArgs;
					} else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) body = functionArgs;
					else {
						_headers["Content-Type"] = "application/json";
						body = JSON.stringify(functionArgs);
					}
				} else if (functionArgs && typeof functionArgs !== "string" && !(typeof Blob !== "undefined" && functionArgs instanceof Blob) && !(functionArgs instanceof ArrayBuffer) && !(typeof FormData !== "undefined" && functionArgs instanceof FormData)) body = JSON.stringify(functionArgs);
				else body = functionArgs;
				let effectiveSignal = signal;
				if (timeout) {
					timeoutController = new AbortController();
					timeoutId = setTimeout(() => timeoutController.abort(), timeout);
					if (signal) {
						effectiveSignal = timeoutController.signal;
						onAbort = () => timeoutController.abort();
						signal.addEventListener("abort", onAbort);
					} else effectiveSignal = timeoutController.signal;
				}
				const response = yield this.fetch(url.toString(), {
					method: method || "POST",
					headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
					body,
					signal: effectiveSignal
				}).catch((fetchError) => {
					throw new FunctionsFetchError(fetchError);
				});
				const isRelayError = response.headers.get("x-relay-error");
				if (isRelayError && isRelayError === "true") throw new FunctionsRelayError(response);
				if (!response.ok) throw new FunctionsHttpError(response);
				let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim().toLowerCase();
				let data;
				if (responseType === "application/json") data = yield response.json();
				else if (responseType === "application/octet-stream" || responseType === "application/pdf") data = yield response.blob();
				else if (responseType === "text/event-stream") data = response;
				else if (responseType === "multipart/form-data") data = yield response.formData();
				else data = yield response.text();
				return {
					data,
					error: null,
					response
				};
			} catch (error) {
				return {
					data: null,
					error,
					response: error instanceof FunctionsHttpError || error instanceof FunctionsRelayError ? error.context : void 0
				};
			} finally {
				if (timeoutId) clearTimeout(timeoutId);
				if (onAbort) (_b = options.signal) === null || _b === void 0 || _b.removeEventListener("abort", onAbort);
			}
		});
	}
};
/**
* Error format
*
* Returned by every PostgREST request that fails. When something fails, the
* single most useful field is usually `hint` — Postgres often returns the
* actionable fix there, not in `message`. Always log the full object (e.g.
* `console.error(error)`); logging only `error.message` hides the hint.
*
* Read the fields in roughly this order of usefulness:
*
* - `hint` — actionable guidance from the database when available. For
*   permission-denied errors (`42501`), this is the literal SQL to fix the
*   problem, e.g.
*   `"Grant the required privileges to the current role with: GRANT SELECT ON public.users TO anon;"`.
*   Missing column? `hint` suggests the column you probably meant. Whenever
*   Postgres knows the fix, it puts it in `hint`.
* - `code` — stable error code from PostgREST (e.g. `PGRST301`) or Postgres
*   (e.g. `42501`). Branch on this rather than on `message` text.
* - `details` — extra context, often the offending value, key, or row.
* - `message` — human-readable summary. Useful in UI strings; less useful
*   for debugging.
*
* {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
*/
var PostgrestError = class extends Error {
	/**
	* @example
	* ```ts
	* import PostgrestError from '@supabase/postgrest-js'
	*
	* throw new PostgrestError({
	*   message: 'Row level security prevented the request',
	*   details: 'RLS denied the insert',
	*   hint: 'Check your policies',
	*   code: 'PGRST301',
	* })
	* ```
	*/
	constructor(context) {
		super(context.message);
		this.name = "PostgrestError";
		this.details = context.details;
		this.hint = context.hint;
		this.code = context.code;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			details: this.details,
			hint: this.hint,
			code: this.code
		};
	}
};
/**
* Default number of retry attempts.
*/
var DEFAULT_MAX_RETRIES = 3;
/**
* Default exponential backoff delay function.
* Delays: 1s, 2s, 4s, 8s, ... (max 30s)
*
* @param attemptIndex - Zero-based index of the retry attempt
* @returns Delay in milliseconds before the next retry
*/
var getRetryDelay = (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4);
/**
* Status codes that are safe to retry.
* 520 = Cloudflare timeout/connection errors (transient)
* 503 = PostgREST schema cache not yet loaded (transient, signals retry via Retry-After header)
*/
var RETRYABLE_STATUS_CODES = [520, 503];
/**
* HTTP methods that are safe to retry (idempotent operations).
*/
var RETRYABLE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
function _typeof$2(o) {
	"@babel/helpers - typeof";
	return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$2(o);
}
function toPrimitive$2(t, r) {
	if ("object" != _typeof$2(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$2(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey$2(t) {
	var i = toPrimitive$2(t, "string");
	return "symbol" == _typeof$2(i) ? i : i + "";
}
function _defineProperty$2(e, r, t) {
	return (r = toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r$1) {
			_defineProperty$2(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
/**
* Sleep for a given number of milliseconds.
* If an AbortSignal is provided, the sleep resolves early when the signal is aborted.
*/
function sleep(ms, signal) {
	return new Promise((resolve) => {
		if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
			resolve();
			return;
		}
		const id = setTimeout(() => {
			signal === null || signal === void 0 || signal.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		function onAbort() {
			clearTimeout(id);
			resolve();
		}
		signal === null || signal === void 0 || signal.addEventListener("abort", onAbort);
	});
}
/**
* Check if a request should be retried based on method and status code.
*/
function shouldRetry(method, status, attemptCount, retryEnabled) {
	if (!retryEnabled || attemptCount >= DEFAULT_MAX_RETRIES) return false;
	if (!RETRYABLE_METHODS.includes(method)) return false;
	if (!RETRYABLE_STATUS_CODES.includes(status)) return false;
	return true;
}
/**
* Perform a request with the retry policy shared by every PostgREST call.
*
* Idempotent methods (GET, HEAD, OPTIONS) are retried up to
* `DEFAULT_MAX_RETRIES` times when the fetch rejects or the server answers
* with a retryable status (503, 520). The wait honours the `Retry-After`
* header when present and backs off exponentially otherwise. Retried
* attempts carry an `X-Retry-Count` header. Aborted requests and
* non-idempotent methods are never retried: their rejection propagates
* unchanged. A response body is drained before its request is retried.
*/
async function fetchWithRetry(fetchImpl, url, request, retryEnabled) {
	let attemptCount = 0;
	while (true) {
		const headers = _objectSpread2$2({}, request.headers);
		if (attemptCount > 0) headers["X-Retry-Count"] = String(attemptCount);
		let res;
		try {
			res = await fetchImpl(url, {
				method: request.method,
				headers,
				body: request.body,
				signal: request.signal
			});
		} catch (fetchError) {
			if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") throw fetchError;
			if (!RETRYABLE_METHODS.includes(request.method)) throw fetchError;
			if (retryEnabled && attemptCount < DEFAULT_MAX_RETRIES) {
				const delay = getRetryDelay(attemptCount);
				attemptCount++;
				await sleep(delay, request.signal);
				continue;
			}
			throw fetchError;
		}
		if (shouldRetry(request.method, res.status, attemptCount, retryEnabled)) {
			var _res$headers$get, _res$headers;
			const retryAfterHeader = (_res$headers$get = (_res$headers = res.headers) === null || _res$headers === void 0 ? void 0 : _res$headers.get("Retry-After")) !== null && _res$headers$get !== void 0 ? _res$headers$get : null;
			const delay = retryAfterHeader !== null ? Math.max(0, parseInt(retryAfterHeader, 10) || 0) * 1e3 : getRetryDelay(attemptCount);
			await res.text();
			attemptCount++;
			await sleep(delay, request.signal);
			continue;
		}
		return res;
	}
}
var PostgrestBuilder = class {
	/**
	* Creates a builder configured for a specific PostgREST request.
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.from('users').select('*')
	* ```
	*
	* @category Database
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { PostgrestQueryBuilder } from '@supabase/postgrest-js'
	*
	* const builder = new PostgrestQueryBuilder(
	*   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
	*   { headers: new Headers({ apikey: 'your-publishable-key' }) }
	* )
	* ```
	*/
	constructor(builder) {
		var _builder$shouldThrowO, _builder$isMaybeSingl, _builder$shouldStripN, _builder$urlLengthLim, _builder$retry;
		this.shouldThrowOnError = false;
		this.retryEnabled = true;
		this.method = builder.method;
		this.url = builder.url;
		this.headers = new Headers(builder.headers);
		this.schema = builder.schema;
		this.body = builder.body;
		this.shouldThrowOnError = (_builder$shouldThrowO = builder.shouldThrowOnError) !== null && _builder$shouldThrowO !== void 0 ? _builder$shouldThrowO : false;
		this.signal = builder.signal;
		this.isMaybeSingle = (_builder$isMaybeSingl = builder.isMaybeSingle) !== null && _builder$isMaybeSingl !== void 0 ? _builder$isMaybeSingl : false;
		this.shouldStripNulls = (_builder$shouldStripN = builder.shouldStripNulls) !== null && _builder$shouldStripN !== void 0 ? _builder$shouldStripN : false;
		this.urlLengthLimit = (_builder$urlLengthLim = builder.urlLengthLimit) !== null && _builder$urlLengthLim !== void 0 ? _builder$urlLengthLim : 8e3;
		this.retryEnabled = (_builder$retry = builder.retry) !== null && _builder$retry !== void 0 ? _builder$retry : true;
		if (builder.fetch) this.fetch = builder.fetch;
		else this.fetch = fetch;
	}
	/**
	* If there's an error with the query, throwOnError will reject the promise by
	* throwing the error instead of returning it as part of a successful response.
	*
	* {@link https://github.com/supabase/supabase-js/issues/92}
	*
	* @category Database
	* @subcategory Using modifiers
	*/
	throwOnError() {
		this.shouldThrowOnError = true;
		return this;
	}
	/**
	* Strip null values from the response data. Properties with `null` values
	* will be omitted from the returned JSON objects.
	*
	* Requires PostgREST 11.2.0+.
	*
	* {@link https://docs.postgrest.org/en/stable/references/api/resource_representation.html#stripped-nulls}
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .stripNulls()
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text, bio text);
	*
	* insert into
	*   characters (id, name, bio)
	* values
	*   (1, 'Luke', null),
	*   (2, 'Leia', 'Princess of Alderaan');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Luke"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Leia",
	*       "bio": "Princess of Alderaan"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	stripNulls() {
		if (this.headers.get("Accept") === "text/csv") throw new Error("stripNulls() cannot be used with csv()");
		this.shouldStripNulls = true;
		return this;
	}
	/**
	* Set an HTTP header on this single PostgREST request, overriding any header
	* with the same name set on the client.
	*
	* This is an advanced escape hatch for one-off needs (passing a custom
	* `Authorization` for a single query, attaching a tracing header, etc.).
	* Most callers do not need it: configure client-wide headers via the
	* `headers` option when constructing the client, and authentication via
	* Supabase Auth.
	*
	* @param name - HTTP header name
	* @param value - HTTP header value
	*
	* @category Database
	* @subcategory Using modifiers
	*/
	setHeader(name, value) {
		this.headers = new Headers(this.headers);
		this.headers.set(name, value);
		return this;
	}
	/**
	* @category Database
	* @subcategory Using modifiers
	*
	* Configure retry behavior for this request.
	*
	* By default, retries are enabled for idempotent requests (GET, HEAD, OPTIONS)
	* that fail with network errors or specific HTTP status codes (503, 520).
	* Retries use exponential backoff (1s, 2s, 4s) with a maximum of 3 attempts.
	*
	* @param enabled - Whether to enable retries for this request
	*
	* @example
	* ```ts
	* // Disable retries for a specific query
	* const { data, error } = await supabase
	*   .from('users')
	*   .select()
	*   .retry(false)
	* ```
	*/
	retry(enabled) {
		this.retryEnabled = enabled;
		return this;
	}
	then(onfulfilled, onrejected) {
		var _this = this;
		if (this.schema === void 0) {} else if (["GET", "HEAD"].includes(this.method)) this.headers.set("Accept-Profile", this.schema);
		else this.headers.set("Content-Profile", this.schema);
		if (this.method !== "GET" && this.method !== "HEAD") this.headers.set("Content-Type", "application/json");
		if (this.shouldStripNulls) {
			const currentAccept = this.headers.get("Accept");
			if (currentAccept === "application/vnd.pgrst.object+json") this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped");
			else if (!currentAccept || currentAccept === "application/json") this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
		}
		const _fetch = this.fetch;
		const executeWithRetry = async () => {
			const headers = {};
			_this.headers.forEach((value, key) => {
				headers[key] = value;
			});
			const res$1 = await fetchWithRetry(_fetch, _this.url.toString(), {
				method: _this.method,
				headers,
				body: JSON.stringify(_this.body, (_, value) => typeof value === "bigint" ? value.toString() : value),
				signal: _this.signal
			}, _this.retryEnabled);
			return await _this.processResponse(res$1);
		};
		let res = executeWithRetry();
		if (!this.shouldThrowOnError) res = res.catch((fetchError) => {
			var _fetchError$name2;
			let errorDetails = "";
			let hint = "";
			let code = "";
			const cause = fetchError === null || fetchError === void 0 ? void 0 : fetchError.cause;
			if (cause) {
				var _cause$message, _cause$code, _fetchError$name, _cause$name;
				const causeMessage = (_cause$message = cause === null || cause === void 0 ? void 0 : cause.message) !== null && _cause$message !== void 0 ? _cause$message : "";
				const causeCode = (_cause$code = cause === null || cause === void 0 ? void 0 : cause.code) !== null && _cause$code !== void 0 ? _cause$code : "";
				errorDetails = `${(_fetchError$name = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name !== void 0 ? _fetchError$name : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`;
				errorDetails += `\n\nCaused by: ${(_cause$name = cause === null || cause === void 0 ? void 0 : cause.name) !== null && _cause$name !== void 0 ? _cause$name : "Error"}: ${causeMessage}`;
				if (causeCode) errorDetails += ` (${causeCode})`;
				if (cause === null || cause === void 0 ? void 0 : cause.stack) errorDetails += `\n${cause.stack}`;
			} else {
				var _fetchError$stack;
				errorDetails = (_fetchError$stack = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _fetchError$stack !== void 0 ? _fetchError$stack : "";
			}
			const urlLength = this.url.toString().length;
			if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") {
				code = "";
				hint = "Request was aborted (timeout or manual cancellation)";
				if (urlLength > this.urlLengthLimit) hint += `. Note: Your request URL is ${urlLength} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`;
			} else if ((cause === null || cause === void 0 ? void 0 : cause.name) === "HeadersOverflowError" || (cause === null || cause === void 0 ? void 0 : cause.code) === "UND_ERR_HEADERS_OVERFLOW") {
				code = "";
				hint = "HTTP headers exceeded server limits (typically 16KB)";
				if (urlLength > this.urlLengthLimit) hint += `. Your request URL is ${urlLength} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`;
			}
			return {
				success: false,
				error: {
					message: `${(_fetchError$name2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name2 !== void 0 ? _fetchError$name2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
					details: errorDetails,
					hint,
					code
				},
				data: null,
				count: null,
				status: 0,
				statusText: ""
			};
		});
		return res.then(onfulfilled, onrejected);
	}
	/**
	* Process a fetch response and return the standardized postgrest response.
	*/
	async processResponse(res) {
		var _this2 = this;
		let error = null;
		let data = null;
		let count = null;
		let status = res.status;
		let statusText = res.statusText;
		if (res.ok) {
			var _this$headers$get2, _res$headers$get;
			if (_this2.method !== "HEAD") {
				var _this$headers$get;
				const body = await res.text();
				if (body === "") {} else if (_this2.headers.get("Accept") === "text/csv") data = body;
				else if (_this2.headers.get("Accept") && ((_this$headers$get = _this2.headers.get("Accept")) === null || _this$headers$get === void 0 ? void 0 : _this$headers$get.includes("application/vnd.pgrst.plan+text"))) data = body;
				else try {
					data = JSON.parse(body);
				} catch (_unused) {
					error = { message: body };
					data = null;
					if (_this2.shouldThrowOnError) throw new PostgrestError({
						message: body,
						details: "",
						hint: "",
						code: ""
					});
				}
			}
			const countHeader = (_this$headers$get2 = _this2.headers.get("Prefer")) === null || _this$headers$get2 === void 0 ? void 0 : _this$headers$get2.match(/count=(exact|planned|estimated)/);
			const contentRange = (_res$headers$get = res.headers.get("content-range")) === null || _res$headers$get === void 0 ? void 0 : _res$headers$get.split("/");
			if (countHeader && contentRange && contentRange.length > 1) count = parseInt(contentRange[1]);
			if (_this2.isMaybeSingle && Array.isArray(data)) if (data.length > 1) {
				error = {
					code: "PGRST116",
					details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
					hint: null,
					message: "JSON object requested, multiple (or no) rows returned"
				};
				data = null;
				count = null;
				status = 406;
				statusText = "Not Acceptable";
				if (_this2.shouldThrowOnError) {
					var _error$hint;
					throw new PostgrestError(_objectSpread2$2(_objectSpread2$2({}, error), {}, { hint: (_error$hint = error.hint) !== null && _error$hint !== void 0 ? _error$hint : "" }));
				}
			} else if (data.length === 1) data = data[0];
			else data = null;
		} else {
			const body = await res.text();
			try {
				error = JSON.parse(body);
				if (Array.isArray(error) && res.status === 404) {
					data = [];
					error = null;
					status = 200;
					statusText = "OK";
				}
			} catch (_unused2) {
				if (res.status === 404 && body === "") {
					status = 204;
					statusText = "No Content";
				} else error = { message: body };
			}
			if (error && _this2.shouldThrowOnError) throw new PostgrestError(error);
		}
		return {
			success: error === null,
			error,
			data,
			count,
			status,
			statusText
		};
	}
	/**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*
	* @category Database
	* @subcategory Using modifiers
	*/
	returns() {
		/* istanbul ignore next */
		return this;
	}
	/**
	* Override the type of the returned `data` field in the response.
	*
	* @typeParam NewResult - The new type to cast the response data to
	* @typeParam Options - Optional type configuration (defaults to { merge: true })
	* @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
	* @example
	* ```typescript
	* // Merge with existing types (default behavior)
	* const query = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ custom_field: string }>()
	*
	* // Replace existing types completely
	* const replaceQuery = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ id: number; name: string }, { merge: false }>()
	* ```
	* @returns A PostgrestBuilder instance with the new type
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example Complete Override type of successful response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .overrideTypes<Array<MyType>, { merge: false }>()
	* ```
	*
	* @exampleResponse Complete Override type of successful response
	* ```ts
	* let x: typeof data // MyType[]
	* ```
	*
	* @example Complete Override type of object response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .maybeSingle()
	*   .overrideTypes<MyType, { merge: false }>()
	* ```
	*
	* @exampleResponse Complete Override type of object response
	* ```ts
	* let x: typeof data // MyType | null
	* ```
	*
	* @example Partial Override type of successful response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .overrideTypes<Array<{ status: "A" | "B" }>>()
	* ```
	*
	* @exampleResponse Partial Override type of successful response
	* ```ts
	* let x: typeof data // Array<CountryRowProperties & { status: "A" | "B" }>
	* ```
	*
	* @example Partial Override type of object response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .maybeSingle()
	*   .overrideTypes<{ status: "A" | "B" }>()
	* ```
	*
	* @exampleResponse Partial Override type of object response
	* ```ts
	* let x: typeof data // CountryRowProperties & { status: "A" | "B" } | null
	* ```
	*
	* @example Merge vs replace existing types
	* ```typescript
	* // Merge with existing types (default behavior)
	* const query = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ custom_field: string }>()
	*
	* // Replace existing types completely
	* const replaceQuery = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ id: number; name: string }, { merge: false }>()
	* ```
	*/
	overrideTypes() {
		return this;
	}
};
var PostgrestTransformBuilder = class extends PostgrestBuilder {
	throwOnError() {
		return super.throwOnError();
	}
	/**
	* Perform a SELECT on the query result.
	*
	* By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
	* return modified rows. By calling this method, modified rows are returned in
	* `data`.
	*
	* @param columns - The columns to retrieve, separated by commas
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `upsert()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .upsert({ id: 1, name: 'Han Solo' })
	*   .select()
	* ```
	*
	* @exampleSql With `upsert()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Han');
	* ```
	*
	* @exampleResponse With `upsert()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Han Solo"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*/
	select(columns) {
		let quoted = false;
		const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
			if (/\s/.test(c) && !quoted) return "";
			if (c === "\"") quoted = !quoted;
			return c;
		}).join("");
		this.url.searchParams.set("select", cleanedColumns);
		this.headers.append("Prefer", "return=representation");
		return this;
	}
	/**
	* Order the query result by `column`.
	*
	* You can call this method multiple times to order by multiple columns.
	*
	* You can order referenced tables, but it only affects the ordering of the
	* parent table if you use `!inner` in the query.
	*
	* @param column - The column to order by
	* @param options - Named parameters
	* @param options.ascending - If `true`, the result will be in ascending order
	* @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
	* `null`s appear last.
	* @param options.referencedTable - Set this to order a referenced table by
	* its columns
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('id, name')
	*   .order('id', { ascending: false })
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 3,
	*       "name": "Han"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Leia"
	*     },
	*     {
	*       "id": 1,
	*       "name": "Luke"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription On a referenced table
	* Ordering with `referencedTable` doesn't affect the ordering of the
	* parent table.
	*
	* @example On a referenced table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('orchestral_sections')
	*     .select(`
	*       name,
	*       instruments (
	*         name
	*       )
	*     `)
	*     .order('name', { referencedTable: 'instruments', ascending: false })
	*
	* ```
	*
	* @exampleSql On a referenced table
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 1, 'harp'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse On a referenced table
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         },
	*         {
	*           "name": "harp"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "instruments": []
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Order parent table by a referenced table
	* Ordering with `referenced_table(col)` affects the ordering of the
	* parent table.
	*
	* @example Order parent table by a referenced table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('instruments')
	*     .select(`
	*       name,
	*       section:orchestral_sections (
	*         name
	*       )
	*     `)
	*     .order('section(name)', { ascending: true })
	*
	* ```
	*
	* @exampleSql Order parent table by a referenced table
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Order parent table by a referenced table
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "violin",
	*       "orchestral_sections": {"name": "strings"}
	*     },
	*     {
	*       "name": "flute",
	*       "orchestral_sections": {"name": "woodwinds"}
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
		const key = referencedTable ? `${referencedTable}.order` : "order";
		const existingOrder = this.url.searchParams.get(key);
		this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
		return this;
	}
	/**
	* Limit the query result by `rows`.
	*
	* @param rows - The maximum number of rows to return
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .limit(1)
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Luke"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example On a referenced table
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments (
	*       name
	*     )
	*   `)
	*   .limit(1, { referencedTable: 'instruments' })
	* ```
	*
	* @exampleSql On a referenced table
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 1, 'harp'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse On a referenced table
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	limit(rows, { foreignTable, referencedTable = foreignTable } = {}) {
		const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
		this.url.searchParams.set(key, `${rows}`);
		return this;
	}
	/**
	* Limit the query result by starting at an offset `from` and ending at the offset `to`.
	* Only records within this range are returned.
	* This respects the query order and if there is no order clause the range could behave unexpectedly.
	* The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
	* and fourth rows of the query.
	*
	* @param from - The starting index from which to limit the result
	* @param to - The last index to which to limit the result
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .range(0, 1)
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Luke"
	*     },
	*     {
	*       "name": "Leia"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
		const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
		const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
		this.url.searchParams.set(keyOffset, `${from}`);
		this.url.searchParams.set(keyLimit, `${to - from + 1}`);
		return this;
	}
	/**
	* Set the AbortSignal for the fetch request.
	*
	* @param signal - The AbortSignal to use for the fetch request
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @remarks
	* You can use this to set a timeout for the request.
	*
	* @exampleDescription Aborting requests in-flight
	* You can use an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to abort requests.
	* Note that `status` and `statusText` don't mean anything for aborted requests as the request wasn't fulfilled.
	*
	* @example Aborting requests in-flight
	* ```ts
	* const ac = new AbortController()
	*
	* const { data, error } = await supabase
	*   .from('very_big_table')
	*   .select()
	*   .abortSignal(ac.signal)
	*
	* // Abort the request after 100 ms
	* setTimeout(() => ac.abort(), 100)
	* ```
	*
	* @exampleResponse Aborting requests in-flight
	* ```json
	*   {
	*     "error": {
	*       "message": "AbortError: The user aborted a request.",
	*       "details": "",
	*       "hint": "The request was aborted locally via the provided AbortSignal.",
	*       "code": ""
	*     },
	*     "status": 0,
	*     "statusText": ""
	*   }
	*
	* ```
	*
	* @example Set a timeout
	* ```ts
	* const { data, error } = await supabase
	*   .from('very_big_table')
	*   .select()
	*   .abortSignal(AbortSignal.timeout(1000 /* ms *\/))
	* ```
	*
	* @exampleResponse Set a timeout
	* ```json
	*   {
	*     "error": {
	*       "message": "FetchError: The user aborted a request.",
	*       "details": "",
	*       "hint": "",
	*       "code": ""
	*     },
	*     "status": 0,
	*     "statusText": ""
	*   }
	*
	* ```
	*/
	abortSignal(signal) {
		this.signal = signal;
		return this;
	}
	/**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be one row (e.g. using `.limit(1)`), otherwise this
	* returns an error.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .limit(1)
	*   .single()
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": {
	*     "name": "Luke"
	*   },
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	single() {
		this.headers.set("Accept", "application/vnd.pgrst.object+json");
		return this;
	}
	/**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
	* this returns an error.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .eq('name', 'Katniss')
	*   .maybeSingle()
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	maybeSingle() {
		this.isMaybeSingle = true;
		return this;
	}
	/**
	* Return `data` as a string in CSV format.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @exampleDescription Return data as CSV
	* By default, the data is returned in JSON format, but can also be returned as Comma Separated Values.
	*
	* @example Return data as CSV
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .csv()
	* ```
	*
	* @exampleSql Return data as CSV
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Return data as CSV
	* ```json
	* {
	*   "data": "id,name\n1,Luke\n2,Leia\n3,Han",
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	csv() {
		this.headers.set("Accept", "text/csv");
		return this;
	}
	/**
	* Return `data` as an object in [GeoJSON](https://geojson.org) format.
	*
	* @category Database
	* @subcategory Using modifiers
	*/
	geojson() {
		this.headers.set("Accept", "application/geo+json");
		return this;
	}
	/**
	* Return `data` as the EXPLAIN plan for the query.
	*
	* You need to enable the
	* [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
	* setting before using this method.
	*
	* @param options - Named parameters
	*
	* @param options.analyze - If `true`, the query will be executed and the
	* actual run time will be returned
	*
	* @param options.verbose - If `true`, the query identifier will be returned
	* and `data` will include the output columns of the query
	*
	* @param options.settings - If `true`, include information on configuration
	* parameters that affect query planning
	*
	* @param options.buffers - If `true`, include information on buffer usage
	*
	* @param options.wal - If `true`, include information on WAL record generation
	*
	* @param options.format - The format of the output, can be `"text"` (default)
	* or `"json"`
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @exampleDescription Get the execution plan
	* By default, the data is returned in TEXT format, but can also be returned as JSON by using the `format` parameter.
	*
	* @example Get the execution plan
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .explain()
	* ```
	*
	* @exampleSql Get the execution plan
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Get the execution plan
	* ```js
	* Aggregate  (cost=33.34..33.36 rows=1 width=112)
	*   ->  Limit  (cost=0.00..18.33 rows=1000 width=40)
	*         ->  Seq Scan on characters  (cost=0.00..22.00 rows=1200 width=40)
	* ```
	*
	* @exampleDescription Get the execution plan with analyze and verbose
	* By default, the data is returned in TEXT format, but can also be returned as JSON by using the `format` parameter.
	*
	* @example Get the execution plan with analyze and verbose
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .explain({analyze:true,verbose:true})
	* ```
	*
	* @exampleSql Get the execution plan with analyze and verbose
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Get the execution plan with analyze and verbose
	* ```js
	* Aggregate  (cost=33.34..33.36 rows=1 width=112) (actual time=0.041..0.041 rows=1 loops=1)
	*   Output: NULL::bigint, count(ROW(characters.id, characters.name)), COALESCE(json_agg(ROW(characters.id, characters.name)), '[]'::json), NULLIF(current_setting('response.headers'::text, true), ''::text), NULLIF(current_setting('response.status'::text, true), ''::text)
	*   ->  Limit  (cost=0.00..18.33 rows=1000 width=40) (actual time=0.005..0.006 rows=3 loops=1)
	*         Output: characters.id, characters.name
	*         ->  Seq Scan on public.characters  (cost=0.00..22.00 rows=1200 width=40) (actual time=0.004..0.005 rows=3 loops=1)
	*               Output: characters.id, characters.name
	* Query Identifier: -4730654291623321173
	* Planning Time: 0.407 ms
	* Execution Time: 0.119 ms
	* ```
	*/
	explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
		var _this$headers$get;
		const options = [
			analyze ? "analyze" : null,
			verbose ? "verbose" : null,
			settings ? "settings" : null,
			buffers ? "buffers" : null,
			wal ? "wal" : null
		].filter(Boolean).join("|");
		const forMediatype = (_this$headers$get = this.headers.get("Accept")) !== null && _this$headers$get !== void 0 ? _this$headers$get : "application/json";
		this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
		if (format === "json") return this;
		else return this;
	}
	/**
	* Dry-run this request: execute the query but discard the changes.
	*
	* Server-side, PostgREST runs the query inside a transaction and rolls it back
	* instead of committing. The response still contains the data that *would* have
	* been returned — `RETURNING` clauses execute and RLS, triggers, and constraints
	* are all evaluated — but no row is actually inserted, updated, or deleted.
	*
	* This affects only the single request it is chained to. The JS caller has no
	* handle on the transaction: supabase-js does not group multiple queries into
	* one transaction. For multi-statement transactional logic, use a database
	* function (`supabase.rpc(...)`).
	*
	* Sets the `Prefer: tx=rollback` header. See PostgREST's docs on transaction
	* preferences for the underlying mechanism.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example Validate an insert without persisting
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .insert({ name: 'France' })
	*   .select()
	*   .rollback()
	* // `data` shows what would have been inserted; nothing is saved.
	* ```
	*/
	rollback() {
		this.headers.append("Prefer", "tx=rollback");
		return this;
	}
	/**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @remarks
	* - Deprecated: use overrideTypes method instead
	*
	* @example Override type of successful response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .returns<Array<MyType>>()
	* ```
	*
	* @exampleResponse Override type of successful response
	* ```js
	* let x: typeof data // MyType[]
	* ```
	*
	* @example Override type of object response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .maybeSingle()
	*   .returns<MyType>()
	* ```
	*
	* @exampleResponse Override type of object response
	* ```js
	* let x: typeof data // MyType | null
	* ```
	*/
	returns() {
		return this;
	}
	/**
	* Set the maximum number of rows that can be affected by the query.
	* Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
	*
	* @param rows - The maximum number of rows that can be affected
	*
	* @category Database
	* @subcategory Using modifiers
	*/
	maxAffected(rows) {
		this.headers.append("Prefer", "handling=strict");
		this.headers.append("Prefer", `max-affected=${rows}`);
		return this;
	}
};
var PostgrestReservedCharsRegexp$1 = /* @__PURE__ */ new RegExp("[,()]");
var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
	throwOnError() {
		return super.throwOnError();
	}
	/**
	* Match only rows where `column` is equal to `value`.
	*
	* To check if the value of `column` is NULL, you should use `.is()` instead.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*
	* @category Database
	* @subcategory Using filters
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .eq('name', 'Leia')
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 2,
	*       "name": "Leia"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	eq(column, value) {
		this.url.searchParams.append(column, `eq.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is not equal to `value`.
	*
	* This filter does not include rows where `column` is `NULL`. To match null
	* values, use `.is(column, null)` instead.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*
	* @category Database
	* @subcategory Using filters
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .neq('name', 'Leia')
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Luke"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Han"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	neq(column, value) {
		this.url.searchParams.append(column, `neq.${value}`);
		return this;
	}
	gt(column, value) {
		this.url.searchParams.append(column, `gt.${value}`);
		return this;
	}
	gte(column, value) {
		this.url.searchParams.append(column, `gte.${value}`);
		return this;
	}
	lt(column, value) {
		this.url.searchParams.append(column, `lt.${value}`);
		return this;
	}
	lte(column, value) {
		this.url.searchParams.append(column, `lte.${value}`);
		return this;
	}
	like(column, pattern) {
		this.url.searchParams.append(column, `like.${pattern}`);
		return this;
	}
	likeAllOf(column, patterns) {
		this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
		return this;
	}
	likeAnyOf(column, patterns) {
		this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
		return this;
	}
	ilike(column, pattern) {
		this.url.searchParams.append(column, `ilike.${pattern}`);
		return this;
	}
	ilikeAllOf(column, patterns) {
		this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
		return this;
	}
	ilikeAnyOf(column, patterns) {
		this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
		return this;
	}
	regexMatch(column, pattern) {
		this.url.searchParams.append(column, `match.${pattern}`);
		return this;
	}
	regexIMatch(column, pattern) {
		this.url.searchParams.append(column, `imatch.${pattern}`);
		return this;
	}
	is(column, value) {
		this.url.searchParams.append(column, `is.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` IS DISTINCT FROM `value`.
	*
	* Unlike `.neq()`, this treats `NULL` as a comparable value. Two `NULL` values
	* are considered equal (not distinct), and comparing `NULL` with any non-NULL
	* value returns true (distinct).
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/
	isDistinct(column, value) {
		this.url.searchParams.append(column, `isdistinct.${value}`);
		return this;
	}
	/**
	* Match only rows where `column` is included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*
	* @category Database
	* @subcategory Using filters
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .in('name', ['Leia', 'Han'])
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 2,
	*       "name": "Leia"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Han"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	in(column, values) {
		const cleanedValues = Array.from(new Set(values)).map((s) => {
			if (typeof s === "string" && PostgrestReservedCharsRegexp$1.test(s)) return `"${s}"`;
			else return `${s}`;
		}).join(",");
		this.url.searchParams.append(column, `in.(${cleanedValues})`);
		return this;
	}
	/**
	* Match only rows where `column` is NOT included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*/
	notIn(column, values) {
		const cleanedValues = Array.from(new Set(values)).map((s) => {
			if (typeof s === "string" && PostgrestReservedCharsRegexp$1.test(s)) return `"${s}"`;
			else return `${s}`;
		}).join(",");
		this.url.searchParams.append(column, `not.in.(${cleanedValues})`);
		return this;
	}
	contains(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `cs.${value}`);
		else if (Array.isArray(value)) this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
		else this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
		return this;
	}
	containedBy(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `cd.${value}`);
		else if (Array.isArray(value)) this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
		else this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
		return this;
	}
	rangeGt(column, range) {
		this.url.searchParams.append(column, `sr.${range}`);
		return this;
	}
	rangeGte(column, range) {
		this.url.searchParams.append(column, `nxl.${range}`);
		return this;
	}
	rangeLt(column, range) {
		this.url.searchParams.append(column, `sl.${range}`);
		return this;
	}
	rangeLte(column, range) {
		this.url.searchParams.append(column, `nxr.${range}`);
		return this;
	}
	rangeAdjacent(column, range) {
		this.url.searchParams.append(column, `adj.${range}`);
		return this;
	}
	overlaps(column, value) {
		if (typeof value === "string") this.url.searchParams.append(column, `ov.${value}`);
		else this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
		return this;
	}
	textSearch(column, query, { config, type } = {}) {
		let typePart = "";
		if (type === "plain") typePart = "pl";
		else if (type === "phrase") typePart = "ph";
		else if (type === "websearch") typePart = "w";
		const configPart = config === void 0 ? "" : `(${config})`;
		this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
		return this;
	}
	match(query) {
		Object.entries(query).filter(([_, value]) => value !== void 0).forEach(([column, value]) => {
			this.url.searchParams.append(column, `eq.${value}`);
		});
		return this;
	}
	/**
	* Match only rows which doesn't satisfy the filter.
	*
	* Unlike most filters, `opearator` and `value` are used as-is and need to
	* follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure they are properly sanitized.
	*
	* @param column - The column to filter on
	* @param operator - The operator to be negated to filter with, following
	* PostgREST syntax
	* @param value - The value to filter with, following PostgREST syntax
	*
	* @category Database
	* @subcategory Using filters
	*
	* @remarks
	* not() expects you to use the raw PostgREST syntax for the filter values.
	*
	* ```ts
	* .not('id', 'in', '(5,6,7)')  // Use `()` for `in` filter
	* .not('arraycol', 'cs', '{"a","b"}')  // Use `cs` for `contains()`, `{}` for array values
	* ```
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .select()
	*   .not('name', 'is', null)
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'null'),
	*   (2, null);
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	*   {
	*     "data": [
	*       {
	*         "id": 1,
	*         "name": "null"
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*
	* ```
	*/
	not(column, operator, value) {
		this.url.searchParams.append(column, `not.${operator}.${value}`);
		return this;
	}
	/**
	* Match only rows which satisfy at least one of the filters.
	*
	* Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure it's properly sanitized.
	*
	* It's currently not possible to do an `.or()` filter across multiple tables.
	*
	* @param filters - The filters to use, following PostgREST syntax
	* @param options - Named parameters
	* @param options.referencedTable - Set this to filter on referenced tables
	* instead of the parent table
	* @param options.foreignTable - Deprecated, use `referencedTable` instead
	*
	* @category Database
	* @subcategory Using filters
	*
	* @remarks
	* or() expects you to use the raw PostgREST syntax for the filter names and values.
	*
	* ```ts
	* .or('id.in.(5,6,7), arraycol.cs.{"a","b"}')  // Use `()` for `in` filter, `{}` for array values and `cs` for `contains()`.
	* .or('id.in.(5,6,7), arraycol.cd.{"a","b"}')  // Use `cd` for `containedBy()`
	* ```
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .or('id.eq.2,name.eq.Han')
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Leia"
	*     },
	*     {
	*       "name": "Han"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Use `or` with `and`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .or('id.gt.3,and(id.eq.1,name.eq.Luke)')
	* ```
	*
	* @exampleSql Use `or` with `and`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Use `or` with `and`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Luke"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Use `or` on referenced tables
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments!inner (
	*       name
	*     )
	*   `)
	*   .or('section_id.eq.1,name.eq.guzheng', { referencedTable: 'instruments' })
	* ```
	*
	* @exampleSql Use `or` on referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Use `or` on referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
		const key = referencedTable ? `${referencedTable}.or` : "or";
		this.url.searchParams.append(key, `(${filters})`);
		return this;
	}
	filter(column, operator, value) {
		this.url.searchParams.append(column, `${operator}.${value}`);
		return this;
	}
};
var PostgrestQueryBuilder = class {
	/**
	* Creates a query builder scoped to a Postgres table or view.
	*
	* @category Database
	*
	* @param url - The URL for the query
	* @param options - Named parameters
	* @param options.headers - Custom headers
	* @param options.schema - Postgres schema to use
	* @param options.fetch - Custom fetch implementation
	* @param options.urlLengthLimit - Maximum URL length before warning
	* @param options.retry - Enable automatic retries for transient errors (default: true)
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.from('users').select('*')
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { PostgrestQueryBuilder } from '@supabase/postgrest-js'
	*
	* const query = new PostgrestQueryBuilder(
	*   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
	*   { headers: { apikey: 'your-publishable-key' }, retry: true }
	* )
	* ```
	*/
	constructor(url, { headers = {}, schema, fetch: fetch$1, urlLengthLimit = 8e3, retry }) {
		this.url = url;
		this.headers = new Headers(headers);
		this.schema = schema;
		this.fetch = fetch$1;
		this.urlLengthLimit = urlLengthLimit;
		this.retry = retry;
	}
	/**
	* Clone URL and headers to prevent shared state between operations.
	*/
	cloneRequestState() {
		return {
			url: new URL(this.url.toString()),
			headers: new Headers(this.headers)
		};
	}
	/**
	* Perform a SELECT query on the table or view.
	*
	* @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
	*
	* @param options - Named parameters
	*
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	*
	* @param options.count - Count algorithm to use to count rows in the table or view.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @remarks
	* When using `count` with `.range()` or `.limit()`, the returned `count` is the total number of rows
	* that match your filters, not the number of rows in the current page. Use this to build pagination UI.
	
	* - By default, Supabase projects return a maximum of 1,000 rows. This setting can be changed in your project's [API settings](/dashboard/project/_/settings/api). It's recommended that you keep it low to limit the payload size of accidental or malicious requests. You can use `range()` queries to paginate through your data.
	* - `select()` can be combined with [Filters](/docs/reference/javascript/using-filters)
	* - `select()` can be combined with [Modifiers](/docs/reference/javascript/using-modifiers)
	* - `apikey` is a reserved keyword if you're using the [Supabase Platform](/docs/guides/platform) and [should be avoided as a column name](https://github.com/supabase/supabase/issues/5465). *
	* @category Database
	*
	* @example Getting your data
	* ```js
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	* ```
	*
	* @exampleSql Getting your data
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Harry'),
	*   (2, 'Frodo'),
	*   (3, 'Katniss');
	* ```
	*
	* @exampleResponse Getting your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Harry"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Frodo"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Katniss"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* The most useful field on a Postgres error is usually `hint` — when the database knows the fix, it puts the literal SQL there. For example, a permission-denied error (`code: '42501'`) arrives with a `hint` like `"Grant the required privileges to the current role with: GRANT SELECT ON public.characters TO anon;"`. Log the full `error` object so the hint isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { data, error } = await supabase.from('characters').select()
	* if (error) {
	*   // Logs the full error: message, code, details, and hint.
	*   console.error(error)
	*   return
	* }
	* ```
	*
	* @exampleResponse Handling errors
	* ```json
	* {
	*   "error": {
	*     "code": "42501",
	*     "details": null,
	*     "hint": "Grant the required privileges to the current role with: GRANT SELECT ON public.characters TO anon;",
	*     "message": "permission denied for table characters"
	*   },
	*   "status": 401,
	*   "statusText": ""
	* }
	* ```
	*
	* @example Selecting specific columns
	* ```js
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	* ```
	*
	* @exampleSql Selecting specific columns
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Frodo'),
	*   (2, 'Harry'),
	*   (3, 'Katniss');
	* ```
	*
	* @exampleResponse Selecting specific columns
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Frodo"
	*     },
	*     {
	*       "name": "Harry"
	*     },
	*     {
	*       "name": "Katniss"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables
	* If your database has foreign key relationships, you can query related tables too.
	*
	* @example Query referenced tables
	* ```js
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments (
	*       name
	*     )
	*   `)
	* ```
	*
	* @exampleSql Query referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Query referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "instruments": [
	*         {
	*           "name": "flute"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables with spaces in their names
	* If your table name contains spaces, you must use double quotes in the `select` statement to reference the table.
	*
	* @example Query referenced tables with spaces in their names
	* ```js
	* const { data, error } = await supabase
	*   .from('orchestral sections')
	*   .select(`
	*     name,
	*     "musical instruments" (
	*       name
	*     )
	*   `)
	* ```
	*
	* @exampleSql Query referenced tables with spaces in their names
	* ```sql
	* create table
	*   "orchestral sections" (id int8 primary key, name text);
	* create table
	*   "musical instruments" (
	*     id int8 primary key,
	*     section_id int8 not null references "orchestral sections",
	*     name text
	*   );
	*
	* insert into
	*   "orchestral sections" (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   "musical instruments" (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Query referenced tables with spaces in their names
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "musical instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "musical instruments": [
	*         {
	*           "name": "flute"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables through a join table
	* If you're in a situation where your tables are **NOT** directly
	* related, but instead are joined by a _join table_, you can still use
	* the `select()` method to query the related data. The join table needs
	* to have the foreign keys as part of its composite primary key.
	*
	* @example Query referenced tables through a join table
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .select(`
	*     name,
	*     teams (
	*       name
	*     )
	*   `)
	*   
	* ```
	*
	* @exampleSql Query referenced tables through a join table
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text
	*   );
	* create table
	*   teams (
	*     id int8 primary key,
	*     name text
	*   );
	* -- join table
	* create table
	*   users_teams (
	*     user_id int8 not null references users,
	*     team_id int8 not null references teams,
	*     -- both foreign keys must be part of a composite primary key
	*     primary key (user_id, team_id)
	*   );
	*
	* insert into
	*   users (id, name)
	* values
	*   (1, 'Kiran'),
	*   (2, 'Evan');
	* insert into
	*   teams (id, name)
	* values
	*   (1, 'Green'),
	*   (2, 'Blue');
	* insert into
	*   users_teams (user_id, team_id)
	* values
	*   (1, 1),
	*   (1, 2),
	*   (2, 2);
	* ```
	*
	* @exampleResponse Query referenced tables through a join table
	* ```json
	*   {
	*     "data": [
	*       {
	*         "name": "Kiran",
	*         "teams": [
	*           {
	*             "name": "Green"
	*           },
	*           {
	*             "name": "Blue"
	*           }
	*         ]
	*       },
	*       {
	*         "name": "Evan",
	*         "teams": [
	*           {
	*             "name": "Blue"
	*           }
	*         ]
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*   
	* ```
	*
	* @exampleDescription Query the same referenced table multiple times
	* If you need to query the same referenced table twice, use the name of the
	* joined column to identify which join to use. You can also give each
	* column an alias.
	*
	* @example Query the same referenced table multiple times
	* ```ts
	* const { data, error } = await supabase
	*   .from('messages')
	*   .select(`
	*     content,
	*     from:sender_id(name),
	*     to:receiver_id(name)
	*   `)
	*
	* // To infer types, use the name of the table (in this case `users`) and
	* // the name of the foreign key constraint.
	* const { data, error } = await supabase
	*   .from('messages')
	*   .select(`
	*     content,
	*     from:users!messages_sender_id_fkey(name),
	*     to:users!messages_receiver_id_fkey(name)
	*   `)
	* ```
	*
	* @exampleSql Query the same referenced table multiple times
	* ```sql
	*  create table
	*  users (id int8 primary key, name text);
	*
	*  create table
	*    messages (
	*      sender_id int8 not null references users,
	*      receiver_id int8 not null references users,
	*      content text
	*    );
	*
	*  insert into
	*    users (id, name)
	*  values
	*    (1, 'Kiran'),
	*    (2, 'Evan');
	*
	*  insert into
	*    messages (sender_id, receiver_id, content)
	*  values
	*    (1, 2, '👋');
	*  ```
	* ```
	*
	* @exampleResponse Query the same referenced table multiple times
	* ```json
	* {
	*   "data": [
	*     {
	*       "content": "👋",
	*       "from": {
	*         "name": "Kiran"
	*       },
	*       "to": {
	*         "name": "Evan"
	*       }
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query nested foreign tables through a join table
	* You can use the result of a joined table to gather data in
	* another foreign table. With multiple references to the same foreign
	* table you must specify the column on which to conduct the join.
	*
	* @example Query nested foreign tables through a join table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('games')
	*     .select(`
	*       game_id:id,
	*       away_team:teams!games_away_team_fkey (
	*         users (
	*           id,
	*           name
	*         )
	*       )
	*     `)
	*   
	* ```
	*
	* @exampleSql Query nested foreign tables through a join table
	* ```sql
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text
	*   );
	* create table
	*   teams (
	*     id int8 primary key,
	*     name text
	*   );
	* -- join table
	* create table
	*   users_teams (
	*     user_id int8 not null references users,
	*     team_id int8 not null references teams,
	*
	*     primary key (user_id, team_id)
	*   );
	* create table
	*   games (
	*     id int8 primary key,
	*     home_team int8 not null references teams,
	*     away_team int8 not null references teams,
	*     name text
	*   );
	*
	* insert into users (id, name)
	* values
	*   (1, 'Kiran'),
	*   (2, 'Evan');
	* insert into
	*   teams (id, name)
	* values
	*   (1, 'Green'),
	*   (2, 'Blue');
	* insert into
	*   users_teams (user_id, team_id)
	* values
	*   (1, 1),
	*   (1, 2),
	*   (2, 2);
	* insert into
	*   games (id, home_team, away_team, name)
	* values
	*   (1, 1, 2, 'Green vs Blue'),
	*   (2, 2, 1, 'Blue vs Green');
	* ```
	*
	* @exampleResponse Query nested foreign tables through a join table
	* ```json
	*   {
	*     "data": [
	*       {
	*         "game_id": 1,
	*         "away_team": {
	*           "users": [
	*             {
	*               "id": 1,
	*               "name": "Kiran"
	*             },
	*             {
	*               "id": 2,
	*               "name": "Evan"
	*             }
	*           ]
	*         }
	*       },
	*       {
	*         "game_id": 2,
	*         "away_team": {
	*           "users": [
	*             {
	*               "id": 1,
	*               "name": "Kiran"
	*             }
	*           ]
	*         }
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*   
	* ```
	*
	* @exampleDescription Filtering through referenced tables
	* If the filter on a referenced table's column is not satisfied, the referenced
	* table returns `[]` or `null` but the parent table is not filtered out.
	* If you want to filter out the parent table rows, use the `!inner` hint
	*
	* @example Filtering through referenced tables
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .select('name, orchestral_sections(*)')
	*   .eq('orchestral_sections.name', 'percussion')
	* ```
	*
	* @exampleSql Filtering through referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Filtering through referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "flute",
	*       "orchestral_sections": null
	*     },
	*     {
	*       "name": "violin",
	*       "orchestral_sections": null
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying referenced table with count
	* You can get the number of rows in a related table by using the
	* **count** property.
	*
	* @example Querying referenced table with count
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`*, instruments(count)`)
	* ```
	*
	* @exampleSql Querying referenced table with count
	* ```sql
	* create table orchestral_sections (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text
	* );
	*
	* create table characters (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text,
	*   "section_id" "uuid" references public.orchestral_sections on delete cascade
	* );
	*
	* with section as (
	*   insert into orchestral_sections (name)
	*   values ('strings') returning id
	* )
	* insert into instruments (name, section_id) values
	* ('violin', (select id from section)),
	* ('viola', (select id from section)),
	* ('cello', (select id from section)),
	* ('double bass', (select id from section));
	* ```
	*
	* @exampleResponse Querying referenced table with count
	* ```json
	* [
	*   {
	*     "id": "693694e7-d993-4360-a6d7-6294e325d9b6",
	*     "name": "strings",
	*     "instruments": [
	*       {
	*         "count": 4
	*       }
	*     ]
	*   }
	* ]
	* ```
	*
	* @exampleDescription Querying with count option
	* You can get the number of rows by using the
	* [count](/docs/reference/javascript/select#parameters) option.
	*
	* @example Querying with count option
	* ```ts
	* const { count, error } = await supabase
	*   .from('characters')
	*   .select('*', { count: 'exact', head: true })
	* ```
	*
	* @exampleSql Querying with count option
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Querying with count option
	* ```json
	* {
	*   "count": 3,
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying JSON data
	* You can select and filter data inside of
	* [JSON](/docs/guides/database/json) columns. Postgres offers some
	* [operators](/docs/guides/database/json#query-the-jsonb-data) for
	* querying JSON data.
	*
	* @example Querying JSON data
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .select(`
	*     id, name,
	*     address->city
	*   `)
	* ```
	*
	* @exampleSql Querying JSON data
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text,
	*     address jsonb
	*   );
	*
	* insert into
	*   users (id, name, address)
	* values
	*   (1, 'Frodo', '{"city":"Hobbiton"}');
	* ```
	*
	* @exampleResponse Querying JSON data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Frodo",
	*       "city": "Hobbiton"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying referenced table with inner join
	* If you don't want to return the referenced table contents, you can leave the parenthesis empty.
	* Like `.select('name, orchestral_sections!inner()')`.
	*
	* @example Querying referenced table with inner join
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .select('name, orchestral_sections!inner(name)')
	*   .eq('orchestral_sections.name', 'woodwinds')
	*   .limit(1)
	* ```
	*
	* @exampleSql Querying referenced table with inner join
	* ```sql
	* create table orchestral_sections (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text
	* );
	*
	* create table instruments (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text,
	*   "section_id" "uuid" references public.orchestral_sections on delete cascade
	* );
	*
	* with section as (
	*   insert into orchestral_sections (name)
	*   values ('woodwinds') returning id
	* )
	* insert into instruments (name, section_id) values
	* ('flute', (select id from section)),
	* ('clarinet', (select id from section)),
	* ('bassoon', (select id from section)),
	* ('piccolo', (select id from section));
	* ```
	*
	* @exampleResponse Querying referenced table with inner join
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "flute",
	*       "orchestral_sections": {"name": "woodwinds"}
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Switching schemas per query
	* In addition to setting the schema during initialization, you can also switch schemas on a per-query basis.
	* Make sure you've set up your [database privileges and API settings](/docs/guides/api/using-custom-schemas).
	*
	* @example Switching schemas per query
	* ```ts
	* const { data, error } = await supabase
	*   .schema('myschema')
	*   .from('mytable')
	*   .select()
	* ```
	*
	* @exampleSql Switching schemas per query
	* ```sql
	* create schema myschema;
	*
	* create table myschema.mytable (
	*   id uuid primary key default gen_random_uuid(),
	*   data text
	* );
	*
	* insert into myschema.mytable (data) values ('mydata');
	* ```
	*
	* @exampleResponse Switching schemas per query
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": "4162e008-27b0-4c0f-82dc-ccaeee9a624d",
	*       "data": "mydata"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	select(columns, options) {
		const { head = false, count } = options !== null && options !== void 0 ? options : {};
		const method = head ? "HEAD" : "GET";
		let quoted = false;
		const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
			if (/\s/.test(c) && !quoted) return "";
			if (c === "\"") quoted = !quoted;
			return c;
		}).join("");
		const { url, headers } = this.cloneRequestState();
		url.searchParams.set("select", cleanedColumns);
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	/**
	* Perform an INSERT into the table or view.
	*
	* By default, inserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to insert. Pass an object to insert a single row
	* or an array to insert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count inserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. Only applies for bulk
	* inserts.
	*
	* @category Database
	*
	* @example Create a record
	* ```ts
	* const { error } = await supabase
	*   .from('countries')
	*   .insert({ id: 1, name: 'Mordor' })
	* ```
	*
	* @exampleSql Create a record
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Create a record
	* ```json
	* {
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT INSERT ON public.countries TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { error } = await supabase.from('countries').insert({ id: 1, name: 'Mordor' })
	* if (error) console.error(error)
	* ```
	*
	* @example Create a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .insert({ id: 1, name: 'Mordor' })
	*   .select()
	* ```
	*
	* @exampleSql Create a record and return it
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Create a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Mordor"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Bulk create
	* A bulk create operation is handled in a single transaction.
	* If any of the inserts fail, none of the rows are inserted.
	*
	* @example Bulk create
	* ```ts
	* const { error } = await supabase
	*   .from('countries')
	*   .insert([
	*     { id: 1, name: 'Mordor' },
	*     { id: 1, name: 'The Shire' },
	*   ])
	* ```
	*
	* @exampleSql Bulk create
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Bulk create
	* ```json
	* {
	*   "error": {
	*     "code": "23505",
	*     "details": "Key (id)=(1) already exists.",
	*     "hint": null,
	*     "message": "duplicate key value violates unique constraint \"countries_pkey\""
	*   },
	*   "status": 409,
	*   "statusText": ""
	* }
	* ```
	*/
	insert(values, { count, defaultToNull = true } = {}) {
		var _this$fetch;
		const method = "POST";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		if (!defaultToNull) headers.append("Prefer", `missing=default`);
		if (Array.isArray(values)) {
			const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
			if (columns.length > 0) {
				const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
				url.searchParams.set("columns", uniqueColumns.join(","));
			}
		}
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	/**
	* Perform an UPSERT on the table or view. Depending on the column(s) passed
	* to `onConflict`, `.upsert()` allows you to perform the equivalent of
	* `.insert()` if a row with the corresponding `onConflict` columns doesn't
	* exist, or if it does exist, perform an alternative action depending on
	* `ignoreDuplicates`.
	*
	* By default, upserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to upsert with. Pass an object to upsert a
	* single row or an array to upsert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
	* duplicate rows are determined. Two rows are duplicates if all the
	* `onConflict` columns are equal.
	*
	* @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
	* `false`, duplicate rows are merged with existing rows.
	*
	* @param options.count - Count algorithm to use to count upserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. This only applies when
	* inserting new rows, not when merging with existing rows under
	* `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
	*
	* @example Upsert a single row using a unique key
	* ```ts
	* // Upserting a single row, overwriting based on the 'username' unique column
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ username: 'supabot' }, { onConflict: 'username' })
	*
	* // Example response:
	* // {
	* //   data: [
	* //     { id: 4, message: 'bar', username: 'supabot' }
	* //   ],
	* //   error: null
	* // }
	* ```
	*
	* @example Upsert with conflict resolution and exact row counting
	* ```ts
	* // Upserting and returning exact count
	* const { data, error, count } = await supabase
	*   .from('users')
	*   .upsert(
	*     {
	*       id: 3,
	*       message: 'foo',
	*       username: 'supabot'
	*     },
	*     {
	*       onConflict: 'username',
	*       count: 'exact'
	*     }
	*   )
	*
	* // Example response:
	* // {
	* //   data: [
	* //     {
	* //       id: 42,
	* //       handle: "saoirse",
	* //       display_name: "Saoirse"
	* //     }
	* //   ],
	* //   count: 1,
	* //   error: null
	* // }
	* ```
	*
	* @category Database
	*
	* @remarks
	* - Primary keys must be included in `values` to use upsert.
	*
	* @example Upsert your data
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .upsert({ id: 1, name: 'piano' })
	*   .select()
	* ```
	*
	* @exampleSql Upsert your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Upsert your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT INSERT, UPDATE ON public.instruments TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { data, error } = await supabase.from('instruments').upsert({ id: 1, name: 'piano' }).select()
	* if (error) console.error(error)
	* ```
	*
	* @example Bulk Upsert your data
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .upsert([
	*     { id: 1, name: 'piano' },
	*     { id: 2, name: 'harp' },
	*   ])
	*   .select()
	* ```
	*
	* @exampleSql Bulk Upsert your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Bulk Upsert your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     },
	*     {
	*       "id": 2,
	*       "name": "harp"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Upserting into tables with constraints
	* In the following query, `upsert()` implicitly uses the `id`
	* (primary key) column to determine conflicts. If there is no existing
	* row with the same `id`, `upsert()` inserts a new row, which
	* will fail in this case as there is already a row with `handle` `"saoirse"`.
	* Using the `onConflict` option, you can instruct `upsert()` to use
	* another column with a unique constraint to determine conflicts.
	*
	* @example Upserting into tables with constraints
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ id: 42, handle: 'saoirse', display_name: 'Saoirse' })
	*   .select()
	* ```
	*
	* @exampleSql Upserting into tables with constraints
	* ```sql
	* create table
	*   users (
	*     id int8 generated by default as identity primary key,
	*     handle text not null unique,
	*     display_name text
	*   );
	*
	* insert into
	*   users (id, handle, display_name)
	* values
	*   (1, 'saoirse', null);
	* ```
	*
	* @exampleResponse Upserting into tables with constraints
	* ```json
	* {
	*   "error": {
	*     "code": "23505",
	*     "details": "Key (handle)=(saoirse) already exists.",
	*     "hint": null,
	*     "message": "duplicate key value violates unique constraint \"users_handle_key\""
	*   },
	*   "status": 409,
	*   "statusText": ""
	* }
	* ```
	*/
	upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
		var _this$fetch2;
		const method = "POST";
		const { url, headers } = this.cloneRequestState();
		headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
		if (onConflict !== void 0) url.searchParams.set("on_conflict", onConflict);
		if (count) headers.append("Prefer", `count=${count}`);
		if (!defaultToNull) headers.append("Prefer", "missing=default");
		if (Array.isArray(values)) {
			const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
			if (columns.length > 0) {
				const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
				url.searchParams.set("columns", uniqueColumns.join(","));
			}
		}
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== void 0 ? _this$fetch2 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	/**
	* Perform an UPDATE on the table or view.
	*
	* By default, updated rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param values - The values to update with
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count updated rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @category Database
	*
	* @remarks
	* - `update()` should always be combined with [Filters](/docs/reference/javascript/using-filters) to target the item(s) you wish to update.
	*
	* @example Updating your data
	* ```ts
	* const { error } = await supabase
	*   .from('instruments')
	*   .update({ name: 'piano' })
	*   .eq('id', 1)
	* ```
	*
	* @exampleSql Updating your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Updating your data
	* ```json
	* {
	*   "status": 204,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT UPDATE ON public.instruments TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { error } = await supabase.from('instruments').update({ name: 'piano' }).eq('id', 1)
	* if (error) console.error(error)
	* ```
	*
	* @example Update a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .update({ name: 'piano' })
	*   .eq('id', 1)
	*   .select()
	* ```
	*
	* @exampleSql Update a record and return it
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Update a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Updating JSON data
	* Postgres offers some
	* [operators](/docs/guides/database/json#query-the-jsonb-data) for
	* working with JSON data. Currently, it is only possible to update the entire JSON document.
	*
	* @example Updating JSON data
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .update({
	*     address: {
	*       street: 'Melrose Place',
	*       postcode: 90210
	*     }
	*   })
	*   .eq('address->postcode', 90210)
	*   .select()
	* ```
	*
	* @exampleSql Updating JSON data
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text,
	*     address jsonb
	*   );
	*
	* insert into
	*   users (id, name, address)
	* values
	*   (1, 'Michael', '{ "postcode": 90210 }');
	* ```
	*
	* @exampleResponse Updating JSON data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Michael",
	*       "address": {
	*         "street": "Melrose Place",
	*         "postcode": 90210
	*       }
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	update(values, { count } = {}) {
		var _this$fetch3;
		const method = "PATCH";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			body: values,
			fetch: (_this$fetch3 = this.fetch) !== null && _this$fetch3 !== void 0 ? _this$fetch3 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	/**
	* Perform a DELETE on the table or view.
	*
	* By default, deleted rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count deleted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @category Database
	*
	* @remarks
	* - `delete()` should always be combined with [filters](/docs/reference/javascript/using-filters) to target the item(s) you wish to delete.
	* - If you use `delete()` with filters and you have
	*   [RLS](/docs/learn/auth-deep-dive/auth-row-level-security) enabled, only
	*   rows visible through `SELECT` policies are deleted. Note that by default
	*   no rows are visible, so you need at least one `SELECT`/`ALL` policy that
	*   makes the rows visible.
	* - When using `delete().in()`, specify an array of values to target multiple rows with a single query. This is particularly useful for batch deleting entries that share common criteria, such as deleting users by their IDs. Ensure that the array you provide accurately represents all records you intend to delete to avoid unintended data removal.
	*
	* @example Delete a single record
	* ```ts
	* const response = await supabase
	*   .from('countries')
	*   .delete()
	*   .eq('id', 1)
	* ```
	*
	* @exampleSql Delete a single record
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Mordor');
	* ```
	*
	* @exampleResponse Delete a single record
	* ```json
	* {
	*   "status": 204,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT DELETE ON public.countries TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { error } = await supabase.from('countries').delete().eq('id', 1)
	* if (error) console.error(error)
	* ```
	*
	* @example Delete a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .delete()
	*   .eq('id', 1)
	*   .select()
	* ```
	*
	* @exampleSql Delete a record and return it
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Mordor');
	* ```
	*
	* @exampleResponse Delete a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Mordor"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Delete multiple records
	* ```ts
	* const response = await supabase
	*   .from('countries')
	*   .delete()
	*   .in('id', [1, 2, 3])
	* ```
	*
	* @exampleSql Delete multiple records
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Rohan'), (2, 'The Shire'), (3, 'Mordor');
	* ```
	*
	* @exampleResponse Delete multiple records
	* ```json
	* {
	*   "status": 204,
	*   "statusText": ""
	* }
	* ```
	*/
	delete({ count } = {}) {
		var _this$fetch4;
		const method = "DELETE";
		const { url, headers } = this.cloneRequestState();
		if (count) headers.append("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schema,
			fetch: (_this$fetch4 = this.fetch) !== null && _this$fetch4 !== void 0 ? _this$fetch4 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
};
/**
* Build the error for a failed OpenAPI request. PostgREST answers with a JSON
* error object when it produced the failure itself; proxies and disabled
* OpenAPI output answer with plain text or an empty body, in which case the
* body (or, failing that, the status text) becomes the message.
*/
function toOpenApiError(body, statusText) {
	try {
		const parsed = JSON.parse(body);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
			var _parsed$message, _parsed$details, _parsed$hint, _parsed$code;
			return new PostgrestError({
				message: String((_parsed$message = parsed.message) !== null && _parsed$message !== void 0 ? _parsed$message : body),
				details: (_parsed$details = parsed.details) !== null && _parsed$details !== void 0 ? _parsed$details : "",
				hint: (_parsed$hint = parsed.hint) !== null && _parsed$hint !== void 0 ? _parsed$hint : "",
				code: (_parsed$code = parsed.code) !== null && _parsed$code !== void 0 ? _parsed$code : ""
			});
		}
	} catch (_unused) {}
	return new PostgrestError({
		message: body || statusText,
		details: "",
		hint: "",
		code: ""
	});
}
/**
* Build the response for a request that yielded no readable body: the fetch
* itself rejected (no status is known, so it is 0), or the body stream failed
* while being read (the response status is preserved).
*/
function toTransportFailure(cause, status, statusText) {
	var _err$name;
	const err = cause;
	return {
		success: false,
		error: new PostgrestError({
			message: `${(_err$name = err === null || err === void 0 ? void 0 : err.name) !== null && _err$name !== void 0 ? _err$name : "FetchError"}: ${err === null || err === void 0 ? void 0 : err.message}`,
			details: "",
			hint: "",
			code: ""
		}),
		data: null,
		count: null,
		status,
		statusText
	};
}
/**
* PostgREST client.
*
* @typeParam Database - Types for the schema from the [type
* generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
*
* @typeParam SchemaName - Postgres schema to switch to. Must be a string
* literal, the same one passed to the constructor. If the schema is not
* `"public"`, this must be supplied manually.
*/
var PostgrestClient = class PostgrestClient {
	/**
	* Creates a PostgREST client.
	*
	* @param url - URL of the PostgREST endpoint
	* @param options - Named parameters
	* @param options.headers - Custom headers
	* @param options.schema - Postgres schema to switch to
	* @param options.fetch - Custom fetch
	* @param options.timeout - Optional timeout in milliseconds for all requests. When set, requests will automatically abort after this duration to prevent indefinite hangs.
	* @param options.urlLengthLimit - Maximum URL length in characters before warnings/errors are triggered. Defaults to 8000.
	* @param options.retry - Enable or disable automatic retries for transient errors.
	*   When enabled, idempotent requests (GET, HEAD, OPTIONS) that fail with network
	*   errors or HTTP 503/520 responses will be automatically retried up to 3 times
	*   with exponential backoff (1s, 2s, 4s). Defaults to `true`.
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.from('profiles').select('*')
	* ```
	*
	* @category Database
	*
	* @remarks
	* - A `timeout` option (in milliseconds) can be set to automatically abort requests that take too long.
	* - A `urlLengthLimit` option (default: 8000) can be set to control when URL length warnings are included in error messages for aborted requests.
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { PostgrestClient } from '@supabase/postgrest-js'
	*
	* const postgrest = new PostgrestClient('https://xyzcompany.supabase.co/rest/v1', {
	*   headers: { apikey: 'your-publishable-key' },
	*   schema: 'public',
	*   timeout: 30000, // 30 second timeout
	* })
	* ```
	*/
	constructor(url, { headers = {}, schema, fetch: fetch$1, timeout, urlLengthLimit = 8e3, retry } = {}) {
		this.url = url;
		this.headers = new Headers(headers);
		this.schemaName = schema;
		this.urlLengthLimit = urlLengthLimit;
		const originalFetch = fetch$1 !== null && fetch$1 !== void 0 ? fetch$1 : globalThis.fetch;
		if (timeout !== void 0 && timeout > 0) this.fetch = (input, init) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);
			const existingSignal = init === null || init === void 0 ? void 0 : init.signal;
			if (existingSignal) {
				if (existingSignal.aborted) {
					clearTimeout(timeoutId);
					return originalFetch(input, init);
				}
				const abortHandler = () => {
					clearTimeout(timeoutId);
					controller.abort();
				};
				existingSignal.addEventListener("abort", abortHandler, { once: true });
				return originalFetch(input, _objectSpread2$2(_objectSpread2$2({}, init), {}, { signal: controller.signal })).finally(() => {
					clearTimeout(timeoutId);
					existingSignal.removeEventListener("abort", abortHandler);
				});
			}
			return originalFetch(input, _objectSpread2$2(_objectSpread2$2({}, init), {}, { signal: controller.signal })).finally(() => clearTimeout(timeoutId));
		};
		else this.fetch = originalFetch;
		this.retry = retry;
	}
	from(relation) {
		if (!relation || typeof relation !== "string" || relation.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
		return new PostgrestQueryBuilder(new URL(`${this.url}/${relation}`), {
			headers: new Headers(this.headers),
			schema: this.schemaName,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	/**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*
	* @category Database
	*/
	schema(schema) {
		return new PostgrestClient(this.url, {
			headers: this.headers,
			schema,
			fetch: this.fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
	/**
	* Fetch the OpenAPI description PostgREST publishes for this client's schema.
	*
	* The document lists only the tables, views and functions the caller's role
	* holds privileges on; PostgREST applies that filtering server-side. The
	* schema is the one this client was created with, so call `.schema()` first
	* to describe a different one. Transient failures are retried according to
	* the client's `retry` option, like any other idempotent request.
	*
	* @example
	* ```ts
	* const { data, error } = await supabase.getOpenApiSpec()
	* ```
	*
	* @example Describe a schema other than the client default
	* ```ts
	* const { data, error } = await supabase.schema('billing').getOpenApiSpec()
	* ```
	*
	* @category Database
	*/
	async getOpenApiSpec() {
		var _this = this;
		var _this$fetch;
		const headers = new Headers(_this.headers);
		headers.set("Accept", "application/openapi+json");
		if (_this.schemaName) headers.set("Accept-Profile", _this.schemaName);
		const requestHeaders = {};
		headers.forEach((value, key) => {
			requestHeaders[key] = value;
		});
		const fetchImpl = (_this$fetch = _this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : globalThis.fetch;
		let res;
		try {
			var _this$retry;
			res = await fetchWithRetry(fetchImpl, `${_this.url}/`, {
				method: "GET",
				headers: requestHeaders
			}, (_this$retry = _this.retry) !== null && _this$retry !== void 0 ? _this$retry : true);
		} catch (fetchError) {
			return toTransportFailure(fetchError, 0, "");
		}
		let body;
		try {
			body = await res.text();
		} catch (readError) {
			return toTransportFailure(readError, res.status, res.statusText);
		}
		if (res.ok) try {
			return {
				success: true,
				error: null,
				data: JSON.parse(body),
				count: null,
				status: res.status,
				statusText: res.statusText
			};
		} catch (_unused2) {}
		return {
			success: false,
			error: toOpenApiError(body, res.statusText),
			data: null,
			count: null,
			status: res.status,
			statusText: res.statusText
		};
	}
	/**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @example
	* ```ts
	* // For cross-schema functions where type inference fails, use overrideTypes:
	* const { data } = await supabase
	*   .schema('schema_b')
	*   .rpc('function_a', {})
	*   .overrideTypes<{ id: string; user_id: string }[]>()
	* ```
	*
	* @category Database
	*
	* @example Call a Postgres function without arguments
	* ```ts
	* const { data, error } = await supabase.rpc('hello_world')
	* ```
	*
	* @exampleSql Call a Postgres function without arguments
	* ```sql
	* create function hello_world() returns text as $$
	*   select 'Hello world';
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a Postgres function without arguments
	* ```json
	* {
	*   "data": "Hello world",
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Call a Postgres function with arguments
	* ```ts
	* const { data, error } = await supabase.rpc('echo', { say: '👋' })
	* ```
	*
	* @exampleSql Call a Postgres function with arguments
	* ```sql
	* create function echo(say text) returns text as $$
	*   select say;
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a Postgres function with arguments
	* ```json
	*   {
	*     "data": "👋",
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*
	* ```
	*
	* @exampleDescription Bulk processing
	* You can process large payloads by passing in an array as an argument.
	*
	* @example Bulk processing
	* ```ts
	* const { data, error } = await supabase.rpc('add_one_each', { arr: [1, 2, 3] })
	* ```
	*
	* @exampleSql Bulk processing
	* ```sql
	* create function add_one_each(arr int[]) returns int[] as $$
	*   select array_agg(n + 1) from unnest(arr) as n;
	* $$ language sql;
	* ```
	*
	* @exampleResponse Bulk processing
	* ```json
	* {
	*   "data": [
	*     2,
	*     3,
	*     4
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Call a Postgres function with filters
	* Postgres functions that return tables can also be combined with [Filters](/docs/reference/javascript/using-filters) and [Modifiers](/docs/reference/javascript/using-modifiers).
	*
	* @example Call a Postgres function with filters
	* ```ts
	* const { data, error } = await supabase
	*   .rpc('list_stored_countries')
	*   .eq('id', 1)
	*   .single()
	* ```
	*
	* @exampleSql Call a Postgres function with filters
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Rohan'),
	*   (2, 'The Shire');
	*
	* create function list_stored_countries() returns setof countries as $$
	*   select * from countries;
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a Postgres function with filters
	* ```json
	* {
	*   "data": {
	*     "id": 1,
	*     "name": "Rohan"
	*   },
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Call a read-only Postgres function
	* ```ts
	* const { data, error } = await supabase.rpc('hello_world', undefined, { get: true })
	* ```
	*
	* @exampleSql Call a read-only Postgres function
	* ```sql
	* create function hello_world() returns text as $$
	*   select 'Hello world';
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a read-only Postgres function
	* ```json
	* {
	*   "data": "Hello world",
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/
	rpc(fn, args = {}, { head = false, get = false, count } = {}) {
		var _this$fetch2;
		let method;
		const url = new URL(`${this.url}/rpc/${fn}`);
		let body;
		const _isObject = (v) => v !== null && typeof v === "object" && (!Array.isArray(v) || v.some(_isObject));
		const _hasObjectArg = head && Object.values(args).some(_isObject);
		if (_hasObjectArg) {
			method = "POST";
			body = args;
		} else if (head || get) {
			method = head ? "HEAD" : "GET";
			Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
				url.searchParams.append(name, value);
			});
		} else {
			method = "POST";
			body = args;
		}
		const headers = new Headers(this.headers);
		if (_hasObjectArg) headers.set("Prefer", count ? `count=${count},return=minimal` : "return=minimal");
		else if (count) headers.set("Prefer", `count=${count}`);
		return new PostgrestFilterBuilder({
			method,
			url,
			headers,
			schema: this.schemaName,
			body,
			fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== void 0 ? _this$fetch2 : fetch,
			urlLengthLimit: this.urlLengthLimit,
			retry: this.retry
		});
	}
};
/**
* Utilities for creating WebSocket instances across runtimes.
*/
var WebSocketFactory = class {
	/**
	* Static-only utility – prevent instantiation.
	*/
	constructor() {}
	static detectEnvironment() {
		var _a;
		if (typeof WebSocket !== "undefined") return {
			type: "native",
			wsConstructor: WebSocket
		};
		const gt = globalThis;
		if (typeof globalThis !== "undefined" && typeof gt.WebSocket !== "undefined") return {
			type: "native",
			wsConstructor: gt.WebSocket
		};
		const gl = typeof global !== "undefined" ? global : void 0;
		if (gl && typeof gl.WebSocket !== "undefined") return {
			type: "native",
			wsConstructor: gl.WebSocket
		};
		if (typeof globalThis !== "undefined" && typeof gt.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") return {
			type: "cloudflare",
			error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
			workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
		};
		if (typeof globalThis !== "undefined" && gt.EdgeRuntime || typeof navigator !== "undefined" && ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes("Vercel-Edge"))) return {
			type: "unsupported",
			error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
			workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
		};
		const _process = globalThis["process"];
		if (_process) {
			const processVersions = _process["versions"];
			if (processVersions && processVersions["node"]) return {
				type: "unsupported",
				error: "Node.js detected but native WebSocket not found.",
				workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."
			};
		}
		return {
			type: "unsupported",
			error: "Unknown JavaScript runtime without WebSocket support.",
			workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
		};
	}
	/**
	* Returns the best available WebSocket constructor for the current runtime.
	*
	* @category Realtime
	*
	* @example Example with error handling
	* ```ts
	* try {
	*   const WS = WebSocketFactory.getWebSocketConstructor()
	*   const socket = new WS('wss://example.com/socket')
	* } catch (error) {
	*   console.error('WebSocket not available in this environment.', error)
	* }
	* ```
	*/
	static getWebSocketConstructor() {
		const env = this.detectEnvironment();
		if (env.wsConstructor) return env.wsConstructor;
		let errorMessage = env.error || "WebSocket not supported in this environment.";
		if (env.workaround) errorMessage += `\n\nSuggested solution: ${env.workaround}`;
		throw new Error(errorMessage);
	}
	/**
	* Detects whether the runtime can establish WebSocket connections.
	*
	* @category Realtime
	*
	* @example Example in a Node.js script
	* ```ts
	* if (!WebSocketFactory.isWebSocketSupported()) {
	*   console.error('WebSockets are required for this script.')
	*   process.exitCode = 1
	* }
	* ```
	*/
	static isWebSocketSupported() {
		try {
			return this.detectEnvironment().type === "native";
		} catch (_a) {
			return false;
		}
	}
};
var DEFAULT_VERSION = `realtime-js/2.117.2`;
var VSN_1_0_0 = "1.0.0";
var VSN_2_0_0 = "2.0.0";
var DEFAULT_VSN = VSN_2_0_0;
var DEFAULT_TIMEOUT = 1e4;
/** Mirrors the Realtime server's own default for `postgres_changes_options.timeout`. */
var DEFAULT_POSTGRES_CHANGES_WAIT_TIMEOUT = 15e3;
/**
* Headroom added to the join timeout when waiting on postgres_changes, covering the
* CHANNEL_ERROR_BACKOFF_MS sleep (5s by default) the server takes before rejecting a join.
*/
var POSTGRES_CHANGES_WAIT_ERROR_GRACE = 1e4;
var CHANNEL_STATES = {
	closed: "closed",
	errored: "errored",
	joined: "joined",
	joining: "joining",
	leaving: "leaving"
};
var CHANNEL_EVENTS = {
	close: "phx_close",
	error: "phx_error",
	join: "phx_join",
	reply: "phx_reply",
	leave: "phx_leave",
	access_token: "access_token"
};
var CONNECTION_STATE = {
	connecting: "connecting",
	open: "open",
	closing: "closing",
	closed: "closed"
};
var Serializer = class {
	constructor(allowedMetadataKeys) {
		this.HEADER_LENGTH = 1;
		this.USER_BROADCAST_PUSH_META_LENGTH = 6;
		this.KINDS = {
			userBroadcastPush: 3,
			userBroadcast: 4
		};
		this.BINARY_ENCODING = 0;
		this.JSON_ENCODING = 1;
		this.BROADCAST_EVENT = "broadcast";
		this.allowedMetadataKeys = [];
		this.allowedMetadataKeys = allowedMetadataKeys !== null && allowedMetadataKeys !== void 0 ? allowedMetadataKeys : [];
	}
	encode(msg, callback) {
		if (msg.event === this.BROADCAST_EVENT && !(msg.payload instanceof ArrayBuffer) && typeof msg.payload.event === "string") return callback(this._binaryEncodeUserBroadcastPush(msg));
		let payload = [
			msg.join_ref,
			msg.ref,
			msg.topic,
			msg.event,
			msg.payload
		];
		return callback(JSON.stringify(payload));
	}
	_binaryEncodeUserBroadcastPush(message) {
		var _a;
		if (this._isArrayBuffer((_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload)) return this._encodeBinaryUserBroadcastPush(message);
		else return this._encodeJsonUserBroadcastPush(message);
	}
	_encodeBinaryUserBroadcastPush(message) {
		var _a, _b;
		const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : /* @__PURE__ */ new ArrayBuffer(0);
		return this._encodeUserBroadcastPush(message, this.BINARY_ENCODING, userPayload);
	}
	_encodeJsonUserBroadcastPush(message) {
		var _a, _b;
		const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : {};
		const encodedUserPayload = new TextEncoder().encode(JSON.stringify(userPayload)).buffer;
		return this._encodeUserBroadcastPush(message, this.JSON_ENCODING, encodedUserPayload);
	}
	_encodeUserBroadcastPush(message, encodingType, encodedPayload) {
		var _a, _b;
		const encoder = new TextEncoder();
		const topic = encoder.encode(message.topic);
		const ref = encoder.encode((_a = message.ref) !== null && _a !== void 0 ? _a : "");
		const joinRef = encoder.encode((_b = message.join_ref) !== null && _b !== void 0 ? _b : "");
		const userEvent = encoder.encode(message.payload.event);
		const rest = this.allowedMetadataKeys ? this._pick(message.payload, this.allowedMetadataKeys) : {};
		const metadata = encoder.encode(Object.keys(rest).length === 0 ? "" : JSON.stringify(rest));
		if (joinRef.length > 255) throw new Error(`joinRef length ${joinRef.length} exceeds maximum of 255`);
		if (ref.length > 255) throw new Error(`ref length ${ref.length} exceeds maximum of 255`);
		if (topic.length > 255) throw new Error(`topic length ${topic.length} exceeds maximum of 255`);
		if (userEvent.length > 255) throw new Error(`userEvent length ${userEvent.length} exceeds maximum of 255`);
		if (metadata.length > 255) throw new Error(`metadata length ${metadata.length} exceeds maximum of 255`);
		const metaLength = this.USER_BROADCAST_PUSH_META_LENGTH + joinRef.length + ref.length + topic.length + userEvent.length + metadata.length;
		const header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
		const view = new DataView(header);
		const bytes = new Uint8Array(header);
		let offset = 0;
		view.setUint8(offset++, this.KINDS.userBroadcastPush);
		view.setUint8(offset++, joinRef.length);
		view.setUint8(offset++, ref.length);
		view.setUint8(offset++, topic.length);
		view.setUint8(offset++, userEvent.length);
		view.setUint8(offset++, metadata.length);
		view.setUint8(offset++, encodingType);
		bytes.set(joinRef, offset);
		offset += joinRef.length;
		bytes.set(ref, offset);
		offset += ref.length;
		bytes.set(topic, offset);
		offset += topic.length;
		bytes.set(userEvent, offset);
		offset += userEvent.length;
		bytes.set(metadata, offset);
		offset += metadata.length;
		var combined = new Uint8Array(header.byteLength + encodedPayload.byteLength);
		combined.set(new Uint8Array(header), 0);
		combined.set(new Uint8Array(encodedPayload), header.byteLength);
		return combined.buffer;
	}
	decode(rawPayload, callback) {
		if (this._isArrayBuffer(rawPayload)) return callback(this._binaryDecode(rawPayload));
		if (typeof rawPayload === "string") {
			const [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
			return callback({
				join_ref,
				ref,
				topic,
				event,
				payload
			});
		}
		return callback({});
	}
	_binaryDecode(buffer) {
		const view = new DataView(buffer);
		const kind = view.getUint8(0);
		const decoder = new TextDecoder();
		switch (kind) {
			case this.KINDS.userBroadcast: return this._decodeUserBroadcast(buffer, view, decoder);
		}
	}
	_decodeUserBroadcast(buffer, view, decoder) {
		const topicSize = view.getUint8(1);
		const userEventSize = view.getUint8(2);
		const metadataSize = view.getUint8(3);
		const payloadEncoding = view.getUint8(4);
		let offset = this.HEADER_LENGTH + 4;
		const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
		offset = offset + topicSize;
		const userEvent = decoder.decode(buffer.slice(offset, offset + userEventSize));
		offset = offset + userEventSize;
		const metadata = decoder.decode(buffer.slice(offset, offset + metadataSize));
		offset = offset + metadataSize;
		const payload = buffer.slice(offset, buffer.byteLength);
		const parsedPayload = payloadEncoding === this.JSON_ENCODING ? JSON.parse(decoder.decode(payload)) : payload;
		const data = {
			type: this.BROADCAST_EVENT,
			event: userEvent,
			payload: parsedPayload
		};
		if (metadataSize > 0) data["meta"] = JSON.parse(metadata);
		return {
			join_ref: null,
			ref: null,
			topic,
			event: this.BROADCAST_EVENT,
			payload: data
		};
	}
	_isArrayBuffer(buffer) {
		var _a;
		return buffer instanceof ArrayBuffer || ((_a = buffer === null || buffer === void 0 ? void 0 : buffer.constructor) === null || _a === void 0 ? void 0 : _a.name) === "ArrayBuffer";
	}
	_pick(obj, keys) {
		if (!obj || typeof obj !== "object") return {};
		return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
	}
};
/**
* Helpers to convert the change Payload into native JS types.
*/
var PostgresTypes;
(function(PostgresTypes) {
	PostgresTypes["abstime"] = "abstime";
	PostgresTypes["bool"] = "bool";
	PostgresTypes["date"] = "date";
	PostgresTypes["daterange"] = "daterange";
	PostgresTypes["float4"] = "float4";
	PostgresTypes["float8"] = "float8";
	PostgresTypes["int2"] = "int2";
	PostgresTypes["int4"] = "int4";
	PostgresTypes["int4range"] = "int4range";
	PostgresTypes["int8"] = "int8";
	PostgresTypes["int8range"] = "int8range";
	PostgresTypes["json"] = "json";
	PostgresTypes["jsonb"] = "jsonb";
	PostgresTypes["money"] = "money";
	PostgresTypes["numeric"] = "numeric";
	PostgresTypes["oid"] = "oid";
	PostgresTypes["reltime"] = "reltime";
	PostgresTypes["text"] = "text";
	PostgresTypes["time"] = "time";
	PostgresTypes["timestamp"] = "timestamp";
	PostgresTypes["timestamptz"] = "timestamptz";
	PostgresTypes["timetz"] = "timetz";
	PostgresTypes["tsrange"] = "tsrange";
	PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
/**
* Takes an array of columns and an object of string values then converts each string value
* to its mapped type.
*
* @param {{name: String, type: String}[]} columns
* @param {Object} record
* @param {Object} options The map of various options that can be applied to the mapper
* @param {Array} options.skipTypes The array of types that should not be converted
*
* @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
* //=>{ first_name: 'Paul', age: 33 }
*/
var convertChangeData = (columns, record, options = {}) => {
	var _a;
	const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
	if (!record) return {};
	return Object.keys(record).reduce((acc, rec_key) => {
		acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
		return acc;
	}, {});
};
/**
* Converts the value of an individual column.
*
* @param {String} columnName The column that you want to convert
* @param {{name: String, type: String}[]} columns All of the columns
* @param {Object} record The map of string values
* @param {Array} skipTypes An array of types that should not be converted
* @return {object} Useless information
*
* @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
* //=> 33
* @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
* //=> "33"
*/
var convertColumn = (columnName, columns, record, skipTypes) => {
	const column = columns.find((x) => x.name === columnName);
	const colType = column === null || column === void 0 ? void 0 : column.type;
	const value = record[columnName];
	if (colType && !skipTypes.includes(colType)) return convertCell(colType, value);
	return noop(value);
};
/**
* If the value of the cell is `null`, returns null.
* Otherwise converts the string value to the correct type.
* @param {String} type A postgres column type
* @param {String} value The cell value
*
* @example convertCell('bool', 't')
* //=> true
* @example convertCell('int8', '10')
* //=> 10
* @example convertCell('_int4', '{1,2,3,4}')
* //=> [1,2,3,4]
*/
var convertCell = (type, value) => {
	if (type.charAt(0) === "_") return toArray(value, type.slice(1, type.length));
	switch (type) {
		case PostgresTypes.bool: return toBoolean(value);
		case PostgresTypes.float4:
		case PostgresTypes.float8:
		case PostgresTypes.int2:
		case PostgresTypes.int4:
		case PostgresTypes.int8:
		case PostgresTypes.numeric:
		case PostgresTypes.oid: return toNumber(value);
		case PostgresTypes.json:
		case PostgresTypes.jsonb: return toJson(value);
		case PostgresTypes.timestamp: return toTimestampString(value);
		case PostgresTypes.abstime:
		case PostgresTypes.date:
		case PostgresTypes.daterange:
		case PostgresTypes.int4range:
		case PostgresTypes.int8range:
		case PostgresTypes.money:
		case PostgresTypes.reltime:
		case PostgresTypes.text:
		case PostgresTypes.time:
		case PostgresTypes.timestamptz:
		case PostgresTypes.timetz:
		case PostgresTypes.tsrange:
		case PostgresTypes.tstzrange: return noop(value);
		default: return noop(value);
	}
};
var noop = (value) => {
	return value;
};
var toBoolean = (value) => {
	switch (value) {
		case "t": return true;
		case "f": return false;
		default: return value;
	}
};
var toNumber = (value) => {
	if (typeof value === "string") {
		const parsedValue = parseFloat(value);
		if (!Number.isNaN(parsedValue)) return parsedValue;
	}
	return value;
};
var toJson = (value) => {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch (_a) {
		return value;
	}
	return value;
};
/**
* Converts a Postgres Array into a native JS array
*
* @example toArray('{}', 'int4')
* //=> []
* @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
* //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
* @example toArray([1,2,3,4], 'int4')
* //=> [1,2,3,4]
*/
var toArray = (value, type) => {
	if (typeof value !== "string") return value;
	const lastIdx = value.length - 1;
	const closeBrace = value[lastIdx];
	if (value[0] === "{" && closeBrace === "}") {
		let arr;
		const valTrim = value.slice(1, lastIdx);
		try {
			arr = JSON.parse("[" + valTrim + "]");
		} catch (_) {
			arr = valTrim ? valTrim.split(",") : [];
		}
		return arr.map((val) => convertCell(type, val));
	}
	return value;
};
/**
* Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
* See https://github.com/supabase/supabase/issues/18
*
* @example toTimestampString('2019-09-10 00:00:00')
* //=> '2019-09-10T00:00:00'
*/
var toTimestampString = (value) => {
	if (typeof value === "string") return value.replace(" ", "T");
	return value;
};
var httpEndpointURL = (socketUrl) => {
	const wsUrl = new URL(socketUrl);
	wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
	wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
	if (wsUrl.pathname === "" || wsUrl.pathname === "/") wsUrl.pathname = "/api/broadcast";
	else wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
	return wsUrl.href;
};
var PresenceAdapter = class PresenceAdapter {
	constructor(channel, opts) {
		const phoenixOptions = phoenixPresenceOptions(opts);
		this.presence = new Presence(channel.getChannel(), phoenixOptions);
		this.presence.onJoin((key, currentPresence, newPresence) => {
			const onJoinPayload = PresenceAdapter.onJoinPayload(key, currentPresence, newPresence);
			channel.getChannel().trigger("presence", onJoinPayload);
		});
		this.presence.onLeave((key, currentPresence, leftPresence) => {
			const onLeavePayload = PresenceAdapter.onLeavePayload(key, currentPresence, leftPresence);
			channel.getChannel().trigger("presence", onLeavePayload);
		});
		this.presence.onSync(() => {
			channel.getChannel().trigger("presence", { event: "sync" });
		});
	}
	get state() {
		return PresenceAdapter.transformState(this.presence.state);
	}
	/**
	* @private
	* Remove 'metas' key
	* Change 'phx_ref' to 'presence_ref'
	* Remove 'phx_ref' and 'phx_ref_prev'
	*
	* @example Transform state
	* // returns {
	*  abc123: [
	*    { presence_ref: '2', user_id: 1 },
	*    { presence_ref: '3', user_id: 2 }
	*  ]
	* }
	* RealtimePresence.transformState({
	*  abc123: {
	*    metas: [
	*      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
	*      { phx_ref: '3', user_id: 2 }
	*    ]
	*  }
	* })
	*
	*/
	static transformState(state) {
		state = cloneState(state);
		return Object.getOwnPropertyNames(state).reduce((newState, key) => {
			const presences = state[key];
			newState[key] = transformState(presences);
			return newState;
		}, {});
	}
	static onJoinPayload(key, currentPresence, newPresence) {
		return {
			event: "join",
			key,
			currentPresences: parseCurrentPresences(currentPresence),
			newPresences: transformState(newPresence)
		};
	}
	static onLeavePayload(key, currentPresence, leftPresence) {
		return {
			event: "leave",
			key,
			currentPresences: parseCurrentPresences(currentPresence),
			leftPresences: transformState(leftPresence)
		};
	}
};
function transformState(presences) {
	return presences.metas.map((presence) => {
		const descriptors = Object.getOwnPropertyDescriptors(presence);
		const transformedPresence = Object.defineProperties({}, descriptors);
		transformedPresence["presence_ref"] = transformedPresence["phx_ref"];
		delete transformedPresence["phx_ref"];
		delete transformedPresence["phx_ref_prev"];
		return transformedPresence;
	});
}
function cloneState(state) {
	return JSON.parse(JSON.stringify(state));
}
function phoenixPresenceOptions(opts) {
	return (opts === null || opts === void 0 ? void 0 : opts.events) && { events: opts.events };
}
function parseCurrentPresences(currentPresences) {
	return (currentPresences === null || currentPresences === void 0 ? void 0 : currentPresences.metas) ? transformState(currentPresences) : [];
}
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS) {
	REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
	REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
	REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
var RealtimePresence = class {
	get state() {
		return this.presenceAdapter.state;
	}
	/**
	* Creates a Presence helper that keeps the local presence state in sync with the server.
	*
	* @param channel - The realtime channel to bind to.
	* @param opts - Optional custom event names, e.g. `{ events: { state: 'state', diff: 'diff' } }`.
	*
	* @category Realtime
	*
	* @example Example for a presence channel
	* ```ts
	* const presence = new RealtimePresence(channel)
	*
	* channel.on('presence', ({ event, key }) => {
	*   console.log(`Presence ${event} on ${key}`)
	* })
	* ```
	*/
	constructor(channel, opts) {
		this.channel = channel;
		this.presenceAdapter = new PresenceAdapter(this.channel.channelAdapter, opts);
	}
};
/**
* Normalize the various shapes a channel error reason can take into a real `Error`.
*
* Transport-level channel errors arrive as a `CloseEvent`, a transport `Event`, an `Error`,
* a string, or `undefined` depending on which path in the underlying socket fired. Server-reply
* errors arrive as a payload object. This helper produces a consistent `Error` for every case
* and preserves the original via `cause` so callers can still inspect the raw event.
*/
function normalizeChannelError(reason) {
	if (reason instanceof Error) return reason;
	if (typeof reason === "string") return new Error(reason);
	if (reason && typeof reason === "object") {
		const obj = reason;
		if (typeof obj.code === "number") {
			const detail = typeof obj.reason === "string" && obj.reason ? ` (${obj.reason})` : "";
			return new Error(`socket closed: ${obj.code}${detail}`, { cause: reason });
		}
		return new Error("channel error: transport failure", { cause: reason });
	}
	return /* @__PURE__ */ new Error("channel error: connection lost");
}
var ChannelAdapter = class {
	constructor(socket, topic, params) {
		const phoenixParams = phoenixChannelParams(params);
		this.channel = socket.getSocket().channel(topic, phoenixParams);
		this.socket = socket;
	}
	get state() {
		return this.channel.state;
	}
	set state(state) {
		this.channel.state = state;
	}
	get joinedOnce() {
		return this.channel.joinedOnce;
	}
	get joinPush() {
		return this.channel.joinPush;
	}
	get rejoinTimer() {
		return this.channel.rejoinTimer;
	}
	on(event, callback) {
		return this.channel.on(event, callback);
	}
	off(event, refNumber) {
		this.channel.off(event, refNumber);
	}
	subscribe(timeout) {
		return this.channel.join(timeout);
	}
	unsubscribe(timeout) {
		return this.channel.leave(timeout);
	}
	teardown() {
		this.channel.teardown();
	}
	onClose(callback) {
		this.channel.onClose(callback);
	}
	onError(callback) {
		return this.channel.onError(callback);
	}
	push(event, payload, timeout) {
		let push;
		try {
			push = this.channel.push(event, payload, timeout);
		} catch (error) {
			throw new Error(`tried to push '${event}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
		}
		if (this.channel.pushBuffer.length > 100) {
			const removedPush = this.channel.pushBuffer.shift();
			removedPush.cancelTimeout();
			this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload());
		}
		return push;
	}
	updateJoinPayload(payload) {
		const oldPayload = this.channel.joinPush.payload();
		this.channel.joinPush.payload = () => Object.assign(Object.assign({}, oldPayload), payload);
	}
	canPush() {
		return this.socket.isConnected() && this.state === CHANNEL_STATES.joined;
	}
	isJoined() {
		return this.state === CHANNEL_STATES.joined;
	}
	isJoining() {
		return this.state === CHANNEL_STATES.joining;
	}
	isClosed() {
		return this.state === CHANNEL_STATES.closed;
	}
	isLeaving() {
		return this.state === CHANNEL_STATES.leaving;
	}
	updateFilterBindings(filterBindings) {
		this.channel.filterBindings = filterBindings;
	}
	updatePayloadTransform(callback) {
		this.channel.onMessage = callback;
	}
	/**
	* @internal
	*/
	getChannel() {
		return this.channel;
	}
};
function phoenixChannelParams(options) {
	return { config: Object.assign({
		broadcast: {
			ack: false,
			self: false
		},
		presence: {
			key: "",
			enabled: false
		},
		private: false
	}, options.config) };
}
var PostgrestReservedCharsRegexp = /[,()"\\]/;
var needsQuoting = (value) => PostgrestReservedCharsRegexp.test(value) || value !== value.trim();
var quote = (value) => `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
var serializeScalar = (value) => {
	const serialized = value === null ? "null" : String(value);
	return needsQuoting(serialized) ? quote(serialized) : serialized;
};
var serializeIsValue = (value) => value === null ? "null" : String(value);
var serialize = (operator, value) => {
	if (operator === "in") {
		const values = Array.isArray(value) ? value : [value];
		if (values.length === 0) throw new Error("Realtime `in` filter requires at least one value.");
		return `in.(${Array.from(new Set(values)).map((v) => serializeScalar(v)).join(",")})`;
	}
	if (operator === "is") return `is.${serializeIsValue(value)}`;
	return `${operator}.${serializeScalar(value)}`;
};
/**
* Fluent builder for Postgres Changes `filter` strings.
*
* Each method appends a single `column=operator.value` condition. Multiple
* conditions are combined with commas, which the Realtime server applies as an
* `AND`. Pass an instance straight to `channel.on('postgres_changes', …)` — the
* SDK serializes it to a string automatically — or call {@link build} to obtain
* the string yourself.
*
* The builder mirrors the `postgrest-js` filter API (`eq`, `neq`, `in`, `like`,
* `not`, …) for the operators that Realtime supports. Values containing reserved
* characters (`,`, `(`, `)`, `"`, `\`) — or surrounding whitespace — are
* automatically double-quoted and escaped the same way PostgREST does, so they
* survive the server's filter parser; all other values are sent verbatim.
*
* The filter is snapshotted when passed to `channel.on(...)`; mutating the
* builder afterwards does not affect an existing subscription. An empty builder
* serializes to `''`, which the server treats as "no filter".
*
* @example
* channel.on('postgres_changes', {
*   event: '*',
*   schema: 'public',
*   table: 'users',
*   filter: postgresChangesFilter().eq('id', 1).lt('age', 30), // → 'id=eq.1,age=lt.30'
* }, (payload) => { ... })
*/
var RealtimePostgresFilterBuilder = class {
	constructor() {
		this.filters = [];
	}
	add(column, operator, value, negate = false) {
		const prefix = negate ? "not." : "";
		this.filters.push(`${column}=${prefix}${serialize(operator, value)}`);
		return this;
	}
	/** Match rows where `column` equals `value` (`column=eq.value`). */
	eq(column, value) {
		return this.add(column, "eq", value);
	}
	/** Match rows where `column` does not equal `value` (`column=neq.value`). */
	neq(column, value) {
		return this.add(column, "neq", value);
	}
	/** Match rows where `column` is greater than `value` (`column=gt.value`). */
	gt(column, value) {
		return this.add(column, "gt", value);
	}
	/** Match rows where `column` is greater than or equal to `value` (`column=gte.value`). */
	gte(column, value) {
		return this.add(column, "gte", value);
	}
	/** Match rows where `column` is less than `value` (`column=lt.value`). */
	lt(column, value) {
		return this.add(column, "lt", value);
	}
	/** Match rows where `column` is less than or equal to `value` (`column=lte.value`). */
	lte(column, value) {
		return this.add(column, "lte", value);
	}
	/**
	* Match rows where `column` is one of `values` (`column=in.(a,b,c)`).
	* Requires at least one value; duplicates are removed. An element containing a
	* reserved character is double-quoted (`in.("a,b",c)`), so commas inside an
	* element are preserved. `null` is intentionally not accepted (`IN (null)`
	* never matches in SQL) — use `is`/`not('col','is',null)` for null checks.
	*/
	in(column, values) {
		return this.add(column, "in", values);
	}
	/** Match rows where `column` matches the case-sensitive `pattern` (`column=like.pattern`). */
	like(column, pattern) {
		return this.add(column, "like", pattern);
	}
	/** Match rows where `column` matches the case-insensitive `pattern` (`column=ilike.pattern`). */
	ilike(column, pattern) {
		return this.add(column, "ilike", pattern);
	}
	/** Match rows where `column` matches the POSIX regex `pattern` (`column=match.pattern`). */
	match(column, pattern) {
		return this.add(column, "match", pattern);
	}
	/** Match rows where `column` matches the case-insensitive POSIX regex `pattern` (`column=imatch.pattern`). */
	imatch(column, pattern) {
		return this.add(column, "imatch", pattern);
	}
	/**
	* Match rows where `column` `IS` the given value (`column=is.null`).
	* Accepts `null`, a boolean, or the keywords `'null' | 'true' | 'false' | 'unknown'`.
	*/
	is(column, value) {
		return this.add(column, "is", value);
	}
	/** Match rows where `column` is distinct from `value` (`column=isdistinct.value`). NULL-safe inequality. */
	isDistinct(column, value) {
		return this.add(column, "isdistinct", value);
	}
	not(column, operator, value) {
		return this.add(column, operator, value, true);
	}
	/**
	* Serialize all conditions into the comma-separated (AND) filter string.
	*
	* Conditions are joined by commas, which the server applies as `AND`. A scalar
	* value (or single `in` element) that contains a reserved character — `,`,
	* `(`, `)`, `"`, `\` — or surrounding whitespace is double-quoted and escaped
	* the way PostgREST does, so commas inside a value are preserved rather than
	* read as a condition boundary.
	*/
	build() {
		return this.filters.join(",");
	}
	/** Alias for {@link build}; lets the builder be used wherever a string is expected. */
	toString() {
		return this.build();
	}
};
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES) {
	REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
	REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
	REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
	REALTIME_LISTEN_TYPES["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES) {
	REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
	REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
	REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
	REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
/** A channel is the basic building block of Realtime
* and narrows the scope of data flow to subscribed clients.
* You can think of a channel as a chatroom where participants are able to see who's online
* and send and receive messages.
*/
var RealtimeChannel = class RealtimeChannel {
	get state() {
		return this.channelAdapter.state;
	}
	set state(state) {
		this.channelAdapter.state = state;
	}
	get joinedOnce() {
		return this.channelAdapter.joinedOnce;
	}
	get timeout() {
		return this.socket.timeout;
	}
	get joinPush() {
		return this.channelAdapter.joinPush;
	}
	get rejoinTimer() {
		return this.channelAdapter.rejoinTimer;
	}
	/**
	* Creates a channel that can broadcast messages, sync presence, and listen to Postgres changes.
	*
	* The topic determines which realtime stream you are subscribing to. Config options let you
	* enable acknowledgement for broadcasts, presence tracking, or private channels.
	*
	* @category Realtime
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const channel = supabase.channel('room1')
	* channel
	*   .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
	*   .subscribe()
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import RealtimeClient from '@supabase/realtime-js'
	*
	* const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
	*   params: { apikey: 'your-publishable-key' },
	* })
	* const channel = new RealtimeChannel('realtime:public:messages', { config: {} }, client)
	* ```
	*/
	constructor(topic, params = { config: {} }, socket) {
		var _a, _b;
		this.topic = topic;
		this.params = params;
		this.socket = socket;
		this.bindings = {};
		this.subTopic = topic.replace(/^realtime:/i, "");
		this.params.config = Object.assign({
			broadcast: {
				ack: false,
				self: false
			},
			presence: {
				key: "",
				enabled: false
			},
			private: false
		}, params.config);
		this.channelAdapter = new ChannelAdapter(this.socket.socketAdapter, topic, this.params);
		this.presence = new RealtimePresence(this);
		this._onClose(() => {
			this.socket._remove(this);
		});
		this._updateFilterTransform();
		this.broadcastEndpointURL = httpEndpointURL(this.socket.socketAdapter.endPointURL());
		this.private = this.params.config.private || false;
		if (!this.private && ((_b = (_a = this.params.config) === null || _a === void 0 ? void 0 : _a.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
	}
	/**
	* Subscribe registers your client with the server.
	*
	* The optional `callback` receives a `status` and, on failure, an `err` argument.
	* Log the full `err` so its `cause`, `name`, and any structured fields aren't hidden
	* behind `err.message`.
	*
	* @category Realtime
	*
	* @example Handling errors
	* ```js
	* supabase.channel('room1').subscribe((status, err) => {
	*   if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
	*     // Log the full error: its `cause` often holds the underlying reason.
	*     console.error(status, err)
	*   }
	* })
	* ```
	*/
	subscribe(callback, timeout = this.timeout) {
		var _a, _b, _c, _d;
		if (!this.socket.isConnected()) this.socket.connect();
		if (this.channelAdapter.isClosed()) {
			const { config: { broadcast, presence, private: isPrivate, postgres_changes_options } } = this.params;
			const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
			const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
			const accessTokenPayload = {};
			const config = Object.assign({
				broadcast,
				presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
				postgres_changes,
				private: isPrivate
			}, postgres_changes_options ? { postgres_changes_options } : {});
			if (this.socket.accessTokenValue) accessTokenPayload.access_token = this.socket.accessTokenValue;
			this._onError((reason) => {
				callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, normalizeChannelError(reason));
			});
			this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
			this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
			this._updateFilterMessage();
			const joinTimeout = (postgres_changes_options === null || postgres_changes_options === void 0 ? void 0 : postgres_changes_options.wait) && postgres_changes.length > 0 ? Math.max(timeout, ((_d = postgres_changes_options.timeout) !== null && _d !== void 0 ? _d : DEFAULT_POSTGRES_CHANGES_WAIT_TIMEOUT) + POSTGRES_CHANGES_WAIT_ERROR_GRACE) : timeout;
			this.channelAdapter.subscribe(joinTimeout).receive("ok", async ({ postgres_changes }) => {
				if (!this.socket._isManualToken()) this.socket.setAuth();
				if (postgres_changes === void 0) {
					callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
					return;
				}
				this._updatePostgresBindings(postgres_changes, callback);
			}).receive("error", (error) => {
				this.state = CHANNEL_STATES.errored;
				const message = Object.values(error).join(", ") || "error";
				callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(message, { cause: error }));
			}).receive("timeout", () => {
				callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
			});
		}
		return this;
	}
	_updatePostgresBindings(postgres_changes, callback) {
		var _a;
		const clientPostgresBindings = this.bindings.postgres_changes;
		const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
		const newPostgresBindings = [];
		for (let i = 0; i < bindingsLen; i++) {
			const clientPostgresBinding = clientPostgresBindings[i];
			const { filter: { event, schema, table, filter } } = clientPostgresBinding;
			const serverPostgresFilter = postgres_changes && postgres_changes[i];
			if (serverPostgresFilter && serverPostgresFilter.event === event && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.schema, schema) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.table, table) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.filter, filter)) newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
			else {
				this.unsubscribe();
				this.state = CHANNEL_STATES.errored;
				callback === null || callback === void 0 || callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, /* @__PURE__ */ new Error("mismatch between server and client bindings for postgres changes"));
				return;
			}
		}
		this.bindings.postgres_changes = newPostgresBindings;
		if (this.state != CHANNEL_STATES.errored && callback) callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
	}
	/**
	* Returns the current presence state for this channel.
	*
	* The shape is a map keyed by presence key (for example a user id) where each entry contains the
	* tracked metadata for that user.
	*
	* @category Realtime
	*/
	presenceState() {
		return this.presence.state;
	}
	/**
	* Sends the supplied payload to the presence tracker so other subscribers can see that this
	* client is online. Use `untrack` to stop broadcasting presence for the same key.
	*
	* Tracking makes this client visible to other subscribers immediately, regardless of this
	* channel's `config.presence.enabled` setting or whether it has a `presence` listener — that
	* flag only affects whether *this* client receives presence updates from others (and, on
	* RLS-protected channels, whether it's authorized to do so).
	*
	* @category Realtime
	*/
	async track(payload, opts = {}) {
		return await this.send({
			type: "presence",
			event: "track",
			payload
		}, opts);
	}
	/**
	* Removes the current presence state for this client.
	*
	* @category Realtime
	*/
	async untrack(opts = {}) {
		return await this.send({
			type: "presence",
			event: "untrack"
		}, opts);
	}
	/**
	* Listen to realtime events on this channel.
	* @category Realtime
	*
	* @remarks
	* - By default, Broadcast and Presence are enabled for all projects.
	* - By default, listening to database changes is disabled for new projects due to database performance and security concerns. You can turn it on by managing Realtime's [replication](/docs/guides/api#realtime-api-overview).
	* - You can receive the "previous" data for updates and deletes by setting the table's `REPLICA IDENTITY` to `FULL` (e.g., `ALTER TABLE your_table REPLICA IDENTITY FULL;`).
	* - Row level security is not applied to delete statements. When RLS is enabled and replica identity is set to full, only the primary key is sent to clients.
	*
	* @example Listen to broadcast messages
	* ```js
	* const channel = supabase.channel("room1")
	*
	* channel.on("broadcast", { event: "cursor-pos" }, (payload) => {
	*   console.log("Cursor position received!", payload);
	* }).subscribe((status) => {
	*   if (status === "SUBSCRIBED") {
	*     channel.send({
	*       type: "broadcast",
	*       event: "cursor-pos",
	*       payload: { x: Math.random(), y: Math.random() },
	*     });
	*   }
	* });
	* ```
	*
	* @example Listen to presence sync
	* ```js
	* const channel = supabase.channel('room1')
	* channel
	*   .on('presence', { event: 'sync' }, () => {
	*     console.log('Synced presence state: ', channel.presenceState())
	*   })
	*   .subscribe(async (status) => {
	*     if (status === 'SUBSCRIBED') {
	*       await channel.track({ online_at: new Date().toISOString() })
	*     }
	*   })
	* ```
	*
	* @example Listen to presence join
	* ```js
	* const channel = supabase.channel('room1')
	* channel
	*   .on('presence', { event: 'join' }, ({ newPresences }) => {
	*     console.log('Newly joined presences: ', newPresences)
	*   })
	*   .subscribe(async (status) => {
	*     if (status === 'SUBSCRIBED') {
	*       await channel.track({ online_at: new Date().toISOString() })
	*     }
	*   })
	* ```
	*
	* @example Listen to presence leave
	* ```js
	* const channel = supabase.channel('room1')
	* channel
	*   .on('presence', { event: 'leave' }, ({ leftPresences }) => {
	*     console.log('Newly left presences: ', leftPresences)
	*   })
	*   .subscribe(async (status) => {
	*     if (status === 'SUBSCRIBED') {
	*       await channel.track({ online_at: new Date().toISOString() })
	*       await channel.untrack()
	*     }
	*   })
	* ```
	*
	* Registering the same `postgres_changes` filter more than once on a channel is a no-op: the
	* duplicate is ignored and an error is logged, since the server only ever creates one
	* subscription per distinct filter.
	*
	* @example Listen to all database changes
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: '*', schema: '*' }, payload => {
	*     console.log('Change received!', payload)
	*   })
	*   .subscribe()
	* ```
	*
	* @example Listen to a specific table
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: '*', schema: 'public', table: 'countries' }, payload => {
	*     console.log('Change received!', payload)
	*   })
	*   .subscribe()
	* ```
	*
	* @example Listen to inserts
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'countries' }, payload => {
	*     console.log('Change received!', payload)
	*   })
	*   .subscribe()
	* ```
	*
	* @exampleDescription Listen to updates
	* By default, Supabase will send only the updated record. If you want to receive the previous values as well you can
	* enable full replication for the table you are listening to:
	*
	* ```sql
	* alter table "your_table" replica identity full;
	* ```
	*
	* @example Listen to updates
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'countries' }, payload => {
	*     console.log('Change received!', payload)
	*   })
	*   .subscribe()
	* ```
	*
	* @exampleDescription Listen to deletes
	* By default, Supabase does not send deleted records. If you want to receive the deleted record you can
	* enable full replication for the table you are listening to:
	*
	* ```sql
	* alter table "your_table" replica identity full;
	* ```
	*
	* @example Listen to deletes
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'countries' }, payload => {
	*     console.log('Change received!', payload)
	*   })
	*   .subscribe()
	* ```
	*
	* @exampleDescription Listen to multiple events
	* You can chain listeners if you want to listen to multiple events for each table.
	*
	* @example Listen to multiple events
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'countries' }, handleRecordInserted)
	*   .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'countries' }, handleRecordDeleted)
	*   .subscribe()
	* ```
	*
	* @exampleDescription Listen to row level changes
	* You can listen to individual rows using the format `{table}:{col}=eq.{val}` - where `{col}` is the column name, and `{val}` is the value which you want to match.
	*
	* @example Listen to row level changes
	* ```js
	* supabase
	*   .channel('room1')
	*   .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'countries', filter: 'id=eq.200' }, handleRecordUpdated)
	*   .subscribe()
	* ```
	*/
	on(type, filter, callback) {
		const stateCheck = this.channelAdapter.isJoined() || this.channelAdapter.isJoining();
		const typeCheck = type === REALTIME_LISTEN_TYPES.PRESENCE || type === REALTIME_LISTEN_TYPES.POSTGRES_CHANGES;
		if (stateCheck && typeCheck) {
			this.socket.log("channel", `cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
			throw new Error(`cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
		}
		return this._on(type, filter, callback);
	}
	/**
	* Sends a broadcast message explicitly via REST API.
	*
	* This method always uses the REST API endpoint regardless of WebSocket connection state.
	* Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
	*
	* Payloads that are `ArrayBuffer` or `ArrayBufferView` (e.g. `Uint8Array`) are sent as
	* `application/octet-stream`; all other payloads are JSON-encoded.
	*
	* @param event The name of the broadcast event
	* @param payload Payload to be sent (required)
	* @param opts Options including timeout
	* @returns Promise resolving to object with success status, and error details if failed
	*
	* @category Realtime
	*/
	async httpSend(event, payload, opts = {}) {
		var _a;
		if (payload === void 0 || payload === null) return Promise.reject(/* @__PURE__ */ new Error("Payload is required for httpSend()"));
		const isBinary = payload instanceof ArrayBuffer || ArrayBuffer.isView(payload);
		const headers = {
			apikey: this.socket.apiKey ? this.socket.apiKey : "",
			"Content-Type": isBinary ? "application/octet-stream" : "application/json"
		};
		if (this.socket.accessTokenValue) headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
		const url = new URL(this.broadcastEndpointURL);
		url.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(event)}`;
		if (this.private) url.searchParams.set("private", "true");
		const options = {
			method: "POST",
			headers,
			body: isBinary ? payload : JSON.stringify(payload)
		};
		const response = await this._fetchWithTimeout(url.toString(), options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
		if (response.status === 202) return { success: true };
		if (response.status === 404) return Promise.reject(/* @__PURE__ */ new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
		let errorMessage = response.statusText;
		try {
			const errorBody = await response.json();
			errorMessage = errorBody.error || errorBody.message || errorMessage;
		} catch (_b) {}
		return Promise.reject(new Error(errorMessage));
	}
	/**
	* Sends a message into the channel.
	*
	* @param args Arguments to send to channel
	* @param args.type The type of event to send
	* @param args.event The name of the event being sent
	* @param args.payload Payload to be sent
	* @param opts Options to be used during the send process
	*
	* @category Realtime
	*
	* @remarks
	* - When using REST you don't need to subscribe to the channel
	* - REST calls are only available from 2.37.0 onwards
	* - If you create a channel only to send a REST broadcast, remove it from
	*   the client when the send completes
	*
	* @example Send a message via websocket
	* ```js
	* const channel = supabase.channel('room1')
	*
	* channel.subscribe((status) => {
	*   if (status === 'SUBSCRIBED') {
	*     channel.send({
	*       type: 'broadcast',
	*       event: 'cursor-pos',
	*       payload: { x: Math.random(), y: Math.random() },
	*     })
	*   }
	* })
	* ```
	*
	* @exampleResponse Send a message via websocket
	* ```js
	* ok | timed out | error
	* ```
	*
	* @example Send a message via REST
	* ```js
	* const channel = supabase.channel('room1')
	*
	* try {
	*   await channel.httpSend('cursor-pos', { x: Math.random(), y: Math.random() })
	* } finally {
	*   await supabase.removeChannel(channel)
	* }
	* ```
	*/
	async send(args, opts = {}) {
		var _a, _b;
		if (!this.channelAdapter.canPush() && args.type === "broadcast") {
			const fallbackWarning = "Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.";
			if (this.socket.hasLogger()) this.socket.log("channel", fallbackWarning);
			else console.warn(fallbackWarning);
			const { event, payload: endpoint_payload } = args;
			const headers = {
				apikey: this.socket.apiKey ? this.socket.apiKey : "",
				"Content-Type": "application/json"
			};
			if (this.socket.accessTokenValue) headers["Authorization"] = `Bearer ${this.socket.accessTokenValue}`;
			const options = {
				method: "POST",
				headers,
				body: JSON.stringify({ messages: [{
					topic: this.subTopic,
					event,
					payload: endpoint_payload,
					private: this.private
				}] })
			};
			try {
				const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
				await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
				return response.ok ? "ok" : "error";
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") return "timed out";
				else return "error";
			}
		} else return new Promise((resolve) => {
			var _a, _b, _c;
			const push = this.channelAdapter.push(args.type, args, opts.timeout || this.timeout);
			if (args.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) resolve("ok");
			push.receive("ok", () => resolve("ok"));
			push.receive("error", () => resolve("error"));
			push.receive("timeout", () => resolve("timed out"));
		});
	}
	/**
	* Updates the payload that will be sent the next time the channel joins (reconnects).
	* Useful for rotating access tokens or updating config without re-creating the channel.
	*
	* @category Realtime
	*/
	updateJoinPayload(payload) {
		this.channelAdapter.updateJoinPayload(payload);
	}
	/**
	* Leaves the channel.
	*
	* Unsubscribes from server events, and instructs channel to terminate on server.
	* Triggers onClose() hooks.
	*
	* To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
	* channel.unsubscribe().receive("ok", () => alert("left!") )
	*
	* @category Realtime
	*/
	async unsubscribe(timeout = this.timeout) {
		return new Promise((resolve) => {
			this.channelAdapter.unsubscribe(timeout).receive("ok", () => resolve("ok")).receive("timeout", () => resolve("timed out")).receive("error", () => resolve("error"));
		});
	}
	/**
	* Destroys and stops related timers.
	*
	* @category Realtime
	*/
	teardown() {
		this.channelAdapter.teardown();
	}
	/** @internal */
	async _fetchWithTimeout(url, options, timeout) {
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
		clearTimeout(id);
		return response;
	}
	/** @internal */
	_on(type, filter, callback) {
		var _a;
		const typeLower = type.toLocaleLowerCase();
		const filterValue = filter === null || filter === void 0 ? void 0 : filter.filter;
		if (filterValue instanceof RealtimePostgresFilterBuilder || typeof filterValue === "object" && filterValue !== null && typeof filterValue.build === "function") filter = Object.assign(Object.assign({}, filter), { filter: filterValue.build() });
		if (typeLower === REALTIME_LISTEN_TYPES.POSTGRES_CHANGES) {
			if ((_a = this.bindings[typeLower]) === null || _a === void 0 ? void 0 : _a.find((bind) => RealtimeChannel.isSamePostgresFilter(bind.filter, filter))) {
				this.socket.log("error", `duplicate \`postgres_changes\` binding for ${this.topic} ignored`, filter);
				return this;
			}
		}
		const ref = this.channelAdapter.on(type, callback);
		const binding = {
			type: typeLower,
			filter,
			callback,
			ref
		};
		if (this.bindings[typeLower]) this.bindings[typeLower].push(binding);
		else this.bindings[typeLower] = [binding];
		this._updateFilterMessage();
		return this;
	}
	/**
	* Registers a callback that will be executed when the channel closes.
	*
	* @internal
	*/
	_onClose(callback) {
		this.channelAdapter.onClose(callback);
	}
	/**
	* Registers a callback that will be executed when the channel encounteres an error.
	*
	* @internal
	*/
	_onError(callback) {
		this.channelAdapter.onError(callback);
	}
	/** @internal */
	_updateFilterMessage() {
		this.channelAdapter.updateFilterBindings((binding, payload, ref) => {
			var _a, _b, _c, _d, _e, _f, _g;
			const typeLower = binding.event.toLocaleLowerCase();
			if (this._notThisChannelEvent(typeLower, ref)) return false;
			const bind = (_a = this.bindings[typeLower]) === null || _a === void 0 ? void 0 : _a.find((bind) => bind.ref === binding.ref);
			if (!bind) return true;
			if ([
				"broadcast",
				"presence",
				"postgres_changes"
			].includes(typeLower)) {
				if ("id" in bind) {
					const bindId = bind.id;
					const bindEvent = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event;
					return bindId && ((_c = payload.ids) === null || _c === void 0 ? void 0 : _c.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_d = payload.data) === null || _d === void 0 ? void 0 : _d.type.toLocaleLowerCase()));
				} else {
					const bindEvent = (_f = (_e = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _e === void 0 ? void 0 : _e.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase();
					return bindEvent === "*" || bindEvent === ((_g = payload === null || payload === void 0 ? void 0 : payload.event) === null || _g === void 0 ? void 0 : _g.toLocaleLowerCase());
				}
			} else return bind.type.toLocaleLowerCase() === typeLower;
		});
	}
	/** @internal */
	_notThisChannelEvent(event, ref) {
		const { close, error, leave, join } = CHANNEL_EVENTS;
		return ref && [
			close,
			error,
			leave,
			join
		].includes(event) && ref !== this.joinPush.ref;
	}
	/** @internal */
	_updateFilterTransform() {
		this.channelAdapter.updatePayloadTransform((event, payload, ref) => {
			if (typeof payload === "object" && "ids" in payload) {
				const postgresChanges = payload.data;
				const { schema, table, commit_timestamp, type, errors } = postgresChanges;
				return Object.assign(Object.assign({}, {
					schema,
					table,
					commit_timestamp,
					eventType: type,
					new: {},
					old: {},
					errors
				}), this._getPayloadRecords(postgresChanges));
			}
			return payload;
		});
	}
	copyBindings(other) {
		if (this.joinedOnce) throw new Error("cannot copy bindings into joined channel");
		for (const kind in other.bindings) for (const binding of other.bindings[kind]) this._on(binding.type, binding.filter, binding.callback);
	}
	/**
	* Compares two optional filter values for equality.
	* Treats undefined, null, and empty string as equivalent empty values.
	* @internal
	*/
	static isFilterValueEqual(serverValue, clientValue) {
		return (serverValue !== null && serverValue !== void 0 ? serverValue : void 0) === (clientValue !== null && clientValue !== void 0 ? clientValue : void 0);
	}
	/**
	* Two `postgres_changes` filters are the same when the server would collapse them into a single
	* subscription.
	* @internal
	*/
	static isSamePostgresFilter(a, b) {
		var _a, _b, _c, _d;
		const selectA = (_b = (_a = a === null || a === void 0 ? void 0 : a.select) === null || _a === void 0 ? void 0 : _a.join()) !== null && _b !== void 0 ? _b : void 0;
		const selectB = (_d = (_c = b === null || b === void 0 ? void 0 : b.select) === null || _c === void 0 ? void 0 : _c.join()) !== null && _d !== void 0 ? _d : void 0;
		return (a === null || a === void 0 ? void 0 : a.event) === (b === null || b === void 0 ? void 0 : b.event) && RealtimeChannel.isFilterValueEqual(a === null || a === void 0 ? void 0 : a.schema, b === null || b === void 0 ? void 0 : b.schema) && RealtimeChannel.isFilterValueEqual(a === null || a === void 0 ? void 0 : a.table, b === null || b === void 0 ? void 0 : b.table) && RealtimeChannel.isFilterValueEqual(a === null || a === void 0 ? void 0 : a.filter, b === null || b === void 0 ? void 0 : b.filter) && selectA === selectB;
	}
	/** @internal */
	_getPayloadRecords(payload) {
		const records = {
			new: {},
			old: {}
		};
		if (payload.type === "INSERT" || payload.type === "UPDATE") records.new = convertChangeData(payload.columns, payload.record);
		if (payload.type === "UPDATE" || payload.type === "DELETE") records.old = convertChangeData(payload.columns, payload.old_record);
		return records;
	}
};
var SocketAdapter = class {
	constructor(endPoint, options) {
		this.socket = new Socket(endPoint, options);
	}
	get timeout() {
		return this.socket.timeout;
	}
	get endPoint() {
		return this.socket.endPoint;
	}
	get transport() {
		return this.socket.transport;
	}
	get heartbeatIntervalMs() {
		return this.socket.heartbeatIntervalMs;
	}
	get heartbeatCallback() {
		return this.socket.heartbeatCallback;
	}
	set heartbeatCallback(callback) {
		this.socket.heartbeatCallback = callback;
	}
	get heartbeatTimer() {
		return this.socket.heartbeatTimer;
	}
	get pendingHeartbeatRef() {
		return this.socket.pendingHeartbeatRef;
	}
	get reconnectTimer() {
		return this.socket.reconnectTimer;
	}
	get vsn() {
		return this.socket.vsn;
	}
	get encode() {
		return this.socket.encode;
	}
	get decode() {
		return this.socket.decode;
	}
	get reconnectAfterMs() {
		return this.socket.reconnectAfterMs;
	}
	get sendBuffer() {
		return this.socket.sendBuffer;
	}
	get stateChangeCallbacks() {
		return this.socket.stateChangeCallbacks;
	}
	connect() {
		this.socket.connect();
	}
	disconnect(callback, code, reason, timeout = 1e4) {
		return new Promise((resolve) => {
			setTimeout(() => resolve("timeout"), timeout);
			this.socket.disconnect(() => {
				callback();
				resolve("ok");
			}, code, reason);
		});
	}
	push(data) {
		this.socket.push(data);
	}
	log(kind, msg, data) {
		this.socket.log(kind, msg, data);
	}
	hasLogger() {
		return this.socket.hasLogger();
	}
	makeRef() {
		return this.socket.makeRef();
	}
	onOpen(callback) {
		this.socket.onOpen(callback);
	}
	onClose(callback) {
		this.socket.onClose(callback);
	}
	onError(callback) {
		this.socket.onError(callback);
	}
	onMessage(callback) {
		this.socket.onMessage(callback);
	}
	isConnected() {
		return this.socket.isConnected();
	}
	isConnecting() {
		return this.socket.connectionState() == CONNECTION_STATE.connecting;
	}
	isDisconnecting() {
		return this.socket.connectionState() == CONNECTION_STATE.closing;
	}
	connectionState() {
		return this.socket.connectionState();
	}
	endPointURL() {
		return this.socket.endPointURL();
	}
	sendHeartbeat() {
		this.socket.sendHeartbeat();
	}
	/**
	* @internal
	*/
	getSocket() {
		return this.socket;
	}
};
var CONNECTION_TIMEOUTS = {
	HEARTBEAT_INTERVAL: 25e3,
	RECONNECT_DELAY: 10,
	HEARTBEAT_TIMEOUT_FALLBACK: 100
};
var RECONNECT_INTERVALS = [
	1e3,
	2e3,
	5e3,
	1e4
];
var DEFAULT_RECONNECT_FALLBACK = 1e4;
function createMemorySessionStorage() {
	const store = /* @__PURE__ */ new Map();
	return {
		get length() {
			return store.size;
		},
		clear() {
			store.clear();
		},
		getItem(key) {
			return store.has(key) ? store.get(key) : null;
		},
		key(index) {
			var _a;
			return (_a = Array.from(store.keys())[index]) !== null && _a !== void 0 ? _a : null;
		},
		removeItem(key) {
			store.delete(key);
		},
		setItem(key, value) {
			store.set(key, String(value));
		}
	};
}
function resolveSessionStorage() {
	try {
		if (typeof globalThis !== "undefined" && globalThis.sessionStorage) return globalThis.sessionStorage;
	} catch (_a) {}
	return createMemorySessionStorage();
}
var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
var RealtimeClient = class {
	get endPoint() {
		return this.socketAdapter.endPoint;
	}
	get timeout() {
		return this.socketAdapter.timeout;
	}
	get transport() {
		return this.socketAdapter.transport;
	}
	get heartbeatCallback() {
		return this.socketAdapter.heartbeatCallback;
	}
	get heartbeatIntervalMs() {
		return this.socketAdapter.heartbeatIntervalMs;
	}
	get heartbeatTimer() {
		if (this.worker) return this._workerHeartbeatTimer;
		return this.socketAdapter.heartbeatTimer;
	}
	get pendingHeartbeatRef() {
		if (this.worker) return this._pendingWorkerHeartbeatRef;
		return this.socketAdapter.pendingHeartbeatRef;
	}
	get reconnectTimer() {
		return this.socketAdapter.reconnectTimer;
	}
	get vsn() {
		return this.socketAdapter.vsn;
	}
	get encode() {
		return this.socketAdapter.encode;
	}
	get decode() {
		return this.socketAdapter.decode;
	}
	get reconnectAfterMs() {
		return this.socketAdapter.reconnectAfterMs;
	}
	get sendBuffer() {
		return this.socketAdapter.sendBuffer;
	}
	get stateChangeCallbacks() {
		return this.socketAdapter.stateChangeCallbacks;
	}
	/**
	* Initializes the Socket.
	*
	* @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
	* @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
	* @param options.timeout The default timeout in milliseconds to trigger push timeouts.
	* @param options.params The optional params to pass when connecting.
	* @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
	* @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
	* @param options.heartbeatCallback The optional function to handle heartbeat status and latency.
	* @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
	* @param options.logLevel Sets the log level for Realtime
	* @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
	* @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
	* @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
	* @param options.worker Use Web Worker to set a side flow. Defaults to false.
	* @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
	* @param options.vsn The protocol version to use when connecting. Supported versions are "1.0.0" and "2.0.0". Defaults to "2.0.0".
	*
	* @category Realtime
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const channel = supabase.channel('room1')
	* channel
	*   .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
	*   .subscribe()
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import RealtimeClient from '@supabase/realtime-js'
	*
	* const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
	*   params: { apikey: 'your-publishable-key' },
	* })
	* client.connect()
	* ```
	*/
	constructor(endPoint, options) {
		var _a;
		this.channels = new Array();
		this.accessTokenValue = null;
		this.accessToken = null;
		this.apiKey = null;
		this.httpEndpoint = "";
		/** @deprecated headers cannot be set on websocket connections */
		this.headers = {};
		this.params = {};
		this.ref = 0;
		this.serializer = new Serializer();
		this._manuallySetToken = false;
		this._authPromise = null;
		this._authGeneration = 0;
		this._workerHeartbeatTimer = void 0;
		this._pendingWorkerHeartbeatRef = null;
		this._pendingDisconnectTimer = null;
		this._disconnectOnEmptyChannelsAfterMs = 0;
		/**
		* Use either custom fetch, if provided, or default fetch to make HTTP requests
		*
		* @internal
		*/
		this._resolveFetch = (customFetch) => {
			if (customFetch) return (...args) => customFetch(...args);
			return (...args) => fetch(...args);
		};
		if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) throw new Error("API key is required to connect to Realtime");
		this.apiKey = options.params.apikey;
		const socketAdapterOptions = this._initializeOptions(options);
		this.socketAdapter = new SocketAdapter(endPoint, socketAdapterOptions);
		this.httpEndpoint = httpEndpointURL(endPoint);
		this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
	}
	/**
	* Connects the socket, unless already connected.
	*
	* @category Realtime
	*/
	connect() {
		if (this.isConnecting() || this.isDisconnecting() || this.isConnected()) return;
		if (this.accessToken && !this._authPromise) this._setAuthSafely("connect");
		this._setupConnectionHandlers();
		try {
			this.socketAdapter.connect();
		} catch (error) {
			const errorMessage = error.message;
			throw new Error(`WebSocket not available: ${errorMessage}`);
		}
		this._handleNodeJsRaceCondition();
	}
	/**
	* Returns the URL of the websocket.
	* @returns string The URL of the websocket.
	*
	* @category Realtime
	*/
	endpointURL() {
		return this.socketAdapter.endPointURL();
	}
	/**
	* Disconnects the socket.
	*
	* @param code A numeric status code to send on disconnect.
	* @param reason A custom reason for the disconnect.
	*
	* @category Realtime
	*/
	async disconnect(code, reason) {
		this._cancelPendingDisconnect();
		if (this.isDisconnecting()) return "ok";
		return await this.socketAdapter.disconnect(() => {
			clearInterval(this._workerHeartbeatTimer);
			this._terminateWorker();
		}, code, reason);
	}
	/**
	* Returns all created channels
	*
	* @category Realtime
	*/
	getChannels() {
		return this.channels;
	}
	/**
	* Unsubscribes, removes and tears down a single channel
	* @param channel A RealtimeChannel instance
	*
	* @category Realtime
	*/
	async removeChannel(channel) {
		const status = await channel.unsubscribe();
		if (status === "ok") channel.teardown();
		return status;
	}
	/**
	* Unsubscribes, removes and tears down all channels
	*
	* @category Realtime
	*/
	async removeAllChannels() {
		const promises = this.channels.map(async (channel) => {
			const result = await channel.unsubscribe();
			channel.teardown();
			return result;
		});
		const result = await Promise.all(promises);
		await this.disconnect();
		return result;
	}
	/**
	* Logs the message.
	*
	* For customized logging, `this.logger` can be overridden in Client constructor.
	*
	* @category Realtime
	*/
	log(kind, msg, data) {
		this.socketAdapter.log(kind, msg, data);
	}
	/**
	* Returns true if a custom `logger` has been configured on this client.
	*
	* @category Realtime
	*/
	hasLogger() {
		return this.socketAdapter.hasLogger();
	}
	/**
	* Returns the current state of the socket.
	*
	* @category Realtime
	*/
	connectionState() {
		return this.socketAdapter.connectionState() || CONNECTION_STATE.closed;
	}
	/**
	* Returns `true` is the connection is open.
	*
	* @category Realtime
	*/
	isConnected() {
		return this.socketAdapter.isConnected();
	}
	/**
	* Returns `true` if the connection is currently connecting.
	*
	* @category Realtime
	*/
	isConnecting() {
		return this.socketAdapter.isConnecting();
	}
	/**
	* Returns `true` if the connection is currently disconnecting.
	*
	* @category Realtime
	*/
	isDisconnecting() {
		return this.socketAdapter.isDisconnecting();
	}
	/**
	* Creates (or reuses) a {@link RealtimeChannel} for the provided topic.
	*
	* Topics are automatically prefixed with `realtime:` to match the Realtime service.
	* If a channel with the same topic already exists it will be returned instead of creating
	* a duplicate connection.
	*
	* @category Realtime
	*/
	channel(topic, params = { config: {} }) {
		const realtimeTopic = `realtime:${topic}`;
		const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
		if (!exists) {
			const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
			this._cancelPendingDisconnect();
			this.channels.push(chan);
			return chan;
		} else return exists;
	}
	/**
	* Push out a message if the socket is connected.
	*
	* If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
	*
	* @category Realtime
	*/
	push(data) {
		this.socketAdapter.push(data);
	}
	/**
	* Sets the JWT access token used for channel subscription authorization and Realtime RLS.
	*
	* If param is null it will use the `accessToken` callback function or the token set on the client.
	*
	* On callback used, it will set the value of the token internal to the client.
	*
	* When a token is explicitly provided AND no `accessToken` callback is configured,
	* it will be preserved across channel operations (including removeChannel and
	* resubscribe) and the client stays in manual-token mode.
	*
	* When an `accessToken` callback IS configured, the callback is the source of truth:
	* the client remains in callback mode and continues to refresh from it on heartbeat,
	* even after a bootstrap/override `setAuth(token)` call.
	*
	* The callback is called on connect and on every heartbeat (`heartbeatIntervalMs`,
	* default 25000ms). Its token must stay valid past the next call, or the server closes
	* the channel at expiry with no automatic resubscribe.
	*
	* @param token A JWT string to override the token set on the client.
	*
	* @example Setting the authorization header
	* // Use a manual token (preserved across resubscribes when no accessToken callback is set)
	* client.realtime.setAuth('my-custom-jwt')
	*
	* // Switch back to using the accessToken callback
	* client.realtime.setAuth()
	*
	* @category Realtime
	*/
	async setAuth(token = null) {
		const authGeneration = ++this._authGeneration;
		const authPromise = this._performAuth(token, authGeneration);
		if (authGeneration === this._authGeneration) this._authPromise = authPromise;
		try {
			await authPromise;
		} finally {
			if (this._authPromise === authPromise) this._authPromise = null;
		}
	}
	/**
	* Returns true if the current access token was explicitly set via setAuth(token),
	* false if it was obtained via the accessToken callback.
	* @internal
	*/
	_isManualToken() {
		return this._manuallySetToken;
	}
	/**
	* Sends a heartbeat message if the socket is connected.
	*
	* @category Realtime
	*/
	async sendHeartbeat() {
		this.socketAdapter.sendHeartbeat();
	}
	/**
	* Sets a callback that receives lifecycle events for internal heartbeat messages.
	* Useful for instrumenting connection health (e.g. sent/ok/timeout).
	*
	* @category Realtime
	*/
	onHeartbeat(callback) {
		this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(callback);
	}
	/**
	* Return the next message ref, accounting for overflows
	*
	* @internal
	*/
	_makeRef() {
		return this.socketAdapter.makeRef();
	}
	/**
	* Removes a channel from RealtimeClient
	*
	* @param channel An open subscription.
	*
	* @internal
	*/
	_remove(channel) {
		this.channels = this.channels.filter((c) => c.topic !== channel.topic);
		if (this.channels.length === 0) {
			this.log("transport", "no channels remaining, scheduling disconnect");
			this._schedulePendingDisconnect();
		}
	}
	/** @internal */
	_schedulePendingDisconnect() {
		this._cancelPendingDisconnect();
		if (this._disconnectOnEmptyChannelsAfterMs === 0) {
			this.log("transport", "disconnecting immediately - no channels");
			this.disconnect();
			return;
		}
		this._pendingDisconnectTimer = setTimeout(() => {
			this._pendingDisconnectTimer = null;
			if (this.channels.length === 0) {
				this.log("transport", "deferred disconnect fired - no channels, disconnecting");
				this.disconnect();
			}
		}, this._disconnectOnEmptyChannelsAfterMs);
		this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
	}
	/** @internal */
	_cancelPendingDisconnect() {
		if (this._pendingDisconnectTimer !== null) {
			this.log("transport", "pending disconnect cancelled - channel activity detected");
			clearTimeout(this._pendingDisconnectTimer);
			this._pendingDisconnectTimer = null;
		}
	}
	/**
	* Perform the actual auth operation
	* @internal
	*/
	async _performAuth(token, authGeneration) {
		let tokenToSend;
		let isManualToken = false;
		if (token) {
			tokenToSend = token;
			isManualToken = true;
		} else if (this.accessToken) try {
			tokenToSend = await this.accessToken();
		} catch (e) {
			this.log("error", "Error fetching access token from callback", e);
			tokenToSend = this.accessTokenValue;
		}
		else tokenToSend = this.accessTokenValue;
		if (authGeneration !== this._authGeneration) return;
		if (this.accessToken) this._manuallySetToken = false;
		else if (isManualToken) this._manuallySetToken = true;
		if (this.accessTokenValue != tokenToSend) {
			this.accessTokenValue = tokenToSend;
			this.channels.forEach((channel) => {
				const payload = {
					access_token: tokenToSend,
					version: DEFAULT_VERSION
				};
				channel.updateJoinPayload(payload);
				if (channel.joinedOnce && channel.channelAdapter.isJoined()) channel.channelAdapter.push(CHANNEL_EVENTS.access_token, { access_token: tokenToSend });
			});
		}
	}
	/**
	* Wait for any in-flight auth operations to complete
	* @internal
	*/
	async _waitForAuthIfNeeded() {
		if (this._authPromise) await this._authPromise;
	}
	/**
	* Safely call setAuth with standardized error handling
	* @internal
	*/
	_setAuthSafely(context = "general") {
		if (!this._isManualToken()) this.setAuth().catch((e) => {
			this.log("error", `Error setting auth in ${context}`, e);
		});
	}
	/** @internal */
	_setupConnectionHandlers() {
		this.socketAdapter.onOpen(() => {
			(this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch((e) => {
				this.log("error", "error waiting for auth on connect", e);
			});
			if (this.worker && !this.workerRef) this._startWorkerHeartbeat();
		});
		this.socketAdapter.onClose(() => {
			if (this.worker && this.workerRef) this._terminateWorker();
		});
		this.socketAdapter.onMessage((message) => {
			if (message.ref && message.ref === this._pendingWorkerHeartbeatRef) this._pendingWorkerHeartbeatRef = null;
		});
	}
	/** @internal */
	_handleNodeJsRaceCondition() {
		if (this.socketAdapter.isConnected()) this.socketAdapter.getSocket().onConnOpen();
	}
	/** @internal */
	_wrapHeartbeatCallback(heartbeatCallback) {
		return (status, latency) => {
			if (status === "disconnected") return;
			if (status == "sent") this._setAuthSafely();
			if (heartbeatCallback) heartbeatCallback(status, latency);
		};
	}
	/** @internal */
	_startWorkerHeartbeat() {
		if (this.workerUrl) this.log("worker", `starting worker for from ${this.workerUrl}`);
		else this.log("worker", `starting default worker`);
		const objectUrl = this._workerObjectUrl(this.workerUrl);
		this.workerRef = new Worker(objectUrl);
		this.workerRef.onerror = (error) => {
			this.log("worker", "worker error", error.message);
			this._terminateWorker();
			this.disconnect();
		};
		this.workerRef.onmessage = (event) => {
			if (event.data.event === "keepAlive") this.sendHeartbeat();
		};
		this.workerRef.postMessage({
			event: "start",
			interval: this.heartbeatIntervalMs
		});
	}
	/**
	* Terminate the Web Worker and clear the reference
	* @internal
	*/
	_terminateWorker() {
		if (this.workerRef) {
			this.log("worker", "terminating worker");
			this.workerRef.terminate();
			this.workerRef = void 0;
		}
	}
	/** @internal */
	_workerObjectUrl(url) {
		let result_url;
		if (url) result_url = url;
		else {
			const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
			result_url = URL.createObjectURL(blob);
		}
		return result_url;
	}
	/**
	* Initialize socket options with defaults
	* @internal
	*/
	_initializeOptions(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
		this.worker = (_a = options === null || options === void 0 ? void 0 : options.worker) !== null && _a !== void 0 ? _a : false;
		this.accessToken = (_b = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _b !== void 0 ? _b : null;
		const result = {};
		result.timeout = (_c = options === null || options === void 0 ? void 0 : options.timeout) !== null && _c !== void 0 ? _c : DEFAULT_TIMEOUT;
		result.heartbeatIntervalMs = (_d = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _d !== void 0 ? _d : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
		this._disconnectOnEmptyChannelsAfterMs = (_e = options === null || options === void 0 ? void 0 : options.disconnectOnEmptyChannelsAfterMs) !== null && _e !== void 0 ? _e : 2 * ((_f = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _f !== void 0 ? _f : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL);
		result.transport = (_g = options === null || options === void 0 ? void 0 : options.transport) !== null && _g !== void 0 ? _g : WebSocketFactory.getWebSocketConstructor();
		result.params = options === null || options === void 0 ? void 0 : options.params;
		result.logger = options === null || options === void 0 ? void 0 : options.logger;
		result.heartbeatCallback = this._wrapHeartbeatCallback(options === null || options === void 0 ? void 0 : options.heartbeatCallback);
		result.sessionStorage = (_h = options === null || options === void 0 ? void 0 : options.sessionStorage) !== null && _h !== void 0 ? _h : resolveSessionStorage();
		result.reconnectAfterMs = (_j = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _j !== void 0 ? _j : ((tries) => {
			return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
		});
		let defaultEncode;
		let defaultDecode;
		const vsn = (_k = options === null || options === void 0 ? void 0 : options.vsn) !== null && _k !== void 0 ? _k : DEFAULT_VSN;
		switch (vsn) {
			case VSN_1_0_0:
				defaultEncode = (payload, callback) => {
					return callback(JSON.stringify(payload));
				};
				defaultDecode = (payload, callback) => {
					return callback(JSON.parse(payload));
				};
				break;
			case VSN_2_0_0:
				defaultEncode = this.serializer.encode.bind(this.serializer);
				defaultDecode = this.serializer.decode.bind(this.serializer);
				break;
			default: throw new Error(`Unsupported serializer version: ${result.vsn}`);
		}
		result.vsn = vsn;
		result.encode = (_l = options === null || options === void 0 ? void 0 : options.encode) !== null && _l !== void 0 ? _l : defaultEncode;
		result.decode = (_m = options === null || options === void 0 ? void 0 : options.decode) !== null && _m !== void 0 ? _m : defaultDecode;
		result.beforeReconnect = this._reconnectAuth.bind(this);
		if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
			this.logLevel = options.logLevel || options.log_level;
			result.params = Object.assign(Object.assign({}, result.params), { log_level: this.logLevel });
		}
		if (this.worker) {
			if (typeof window !== "undefined" && !window.Worker) throw new Error("Web Worker is not supported");
			this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
			result.autoSendHeartbeat = !this.worker;
		}
		return result;
	}
	/** @internal */
	async _reconnectAuth() {
		await this._waitForAuthIfNeeded();
		if (!this.isConnected()) this.connect();
	}
};
function _typeof$1(o) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof$1(o);
}
function toPrimitive$1(t, r) {
	if ("object" != _typeof$1(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof$1(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey$1(t) {
	var i = toPrimitive$1(t, "string");
	return "symbol" == _typeof$1(i) ? i : i + "";
}
function _defineProperty$1(e, r, t) {
	return (r = toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r$1) {
			_defineProperty$1(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
/**
* Base error class for all Storage errors
* Supports both 'storage' and 'vectors' namespaces
*/
var StorageError = class extends Error {
	constructor(message, namespace = "storage", status, statusCode) {
		super(message);
		this.__isStorageError = true;
		this.namespace = namespace;
		this.name = namespace === "vectors" ? "StorageVectorsError" : "StorageError";
		this.status = status;
		this.statusCode = statusCode;
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			statusCode: this.statusCode
		};
	}
};
/**
* Type guard to check if an error is a StorageError
* @param error - The error to check
* @returns True if the error is a StorageError
*/
function isStorageError(error) {
	return typeof error === "object" && error !== null && "__isStorageError" in error;
}
/**
* API error returned from Storage service
* Includes HTTP status code and service-specific error code
*/
var StorageApiError = class extends StorageError {
	constructor(message, status, statusCode, namespace = "storage", code) {
		super(message, namespace, status, statusCode);
		this.name = namespace === "vectors" ? "StorageVectorsApiError" : "StorageApiError";
		this.status = status;
		this.statusCode = statusCode;
		this.code = code;
	}
	toJSON() {
		return _objectSpread2$1(_objectSpread2$1({}, super.toJSON()), {}, { code: this.code });
	}
};
/**
* Unknown error that doesn't match expected error patterns
* Wraps the original error for debugging
*/
var StorageUnknownError = class extends StorageError {
	constructor(message, originalError, namespace = "storage") {
		super(message, namespace);
		this.name = namespace === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError";
		this.originalError = originalError;
	}
};
/**
* Sets a header with case-insensitive deduplication.
* Removes any existing headers whose name matches (case-insensitive),
* then sets the value under the lowercase key. Does not mutate the input object.
*
* @param headers - Existing headers object
* @param name - Header name to set (stored as lowercase)
* @param value - Header value
* @returns New headers object with the header set
*/
function setHeader(headers, name, value) {
	const result = _objectSpread2$1({}, headers);
	const nameLower = name.toLowerCase();
	for (const key of Object.keys(result)) if (key.toLowerCase() === nameLower) delete result[key];
	result[nameLower] = value;
	return result;
}
/**
* Normalizes all header keys to lowercase with case-insensitive deduplication.
* When duplicate keys exist (differing only in case), the last value wins.
* Does not mutate the input object.
*
* @param headers - Headers object to normalize
* @returns New headers object with all keys lowercased
*/
function normalizeHeaders(headers) {
	const result = {};
	for (const [key, value] of Object.entries(headers)) result[key.toLowerCase()] = value;
	return result;
}
/**
* Resolves the fetch implementation to use
* Uses custom fetch if provided, otherwise uses native fetch
*
* @param customFetch - Optional custom fetch implementation
* @returns Resolved fetch function
*/
var resolveFetch$1 = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
/**
* Determine if input is a plain object
* An object is plain if it's created by either {}, new Object(), or Object.create(null)
*
* @param value - Value to check
* @returns True if value is a plain object
* @source https://github.com/sindresorhus/is-plain-obj
*/
var isPlainObject = (value) => {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
/**
* Recursively converts object keys from snake_case to camelCase
* Used for normalizing API responses
*
* @param item - Object to convert
* @returns Converted object with camelCase keys
*/
var recursiveToCamel = (item) => {
	if (Array.isArray(item)) return item.map((el) => recursiveToCamel(el));
	else if (typeof item === "function" || item !== Object(item)) return item;
	const result = {};
	Object.entries(item).forEach(([key, value]) => {
		const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
		result[newKey] = recursiveToCamel(value);
	});
	return result;
};
/**
* Validates if a given bucket name is valid according to Supabase Storage API rules
* Mirrors backend validation from: storage/src/storage/limits.ts:isValidBucketName()
*
* Rules:
* - Length: 1-100 characters
* - Allowed characters: alphanumeric (a-z, A-Z, 0-9), underscore (_), and safe special characters
* - Safe special characters: ! - . * ' ( ) space & $ @ = ; : + , ?
* - Forbidden: path separators (/, \), path traversal (..), leading/trailing whitespace
*
* AWS S3 Reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
*
* @param bucketName - The bucket name to validate
* @returns true if valid, false otherwise
*/
var isValidBucketName = (bucketName) => {
	if (!bucketName || typeof bucketName !== "string") return false;
	if (bucketName.length === 0 || bucketName.length > 100) return false;
	if (bucketName.trim() !== bucketName) return false;
	if (bucketName.includes("/") || bucketName.includes("\\")) return false;
	return /^[\w!.\*'() &$@=;:+,?-]+$/.test(bucketName);
};
/**
* Percent-encodes each segment of a storage path so URL delimiters within a
* key (e.g. `?`, `#`) can't be interpreted as a querystring/fragment start.
*
* Splits on `/` so real path separators stay literal — the storage server
* routes on them and decodes each segment back to the original key.
*
* @param path - A bucket id or `bucketId/objectKey` path
* @returns The path with each `/`-delimited segment percent-encoded
*/
var encodeStoragePath = (path) => path.split("/").map(encodeURIComponent).join("/");
/**
* Extracts error message from various error response formats
* @param err - Error object from API
* @returns Human-readable error message
*/
var _getErrorMessage = (err) => {
	if (typeof err === "object" && err !== null) {
		const e = err;
		if (typeof e.msg === "string") return e.msg;
		if (typeof e.message === "string") return e.message;
		if (typeof e.error_description === "string") return e.error_description;
		if (typeof e.error === "string") return e.error;
		if (typeof e.error === "object" && e.error !== null) {
			const nested = e.error;
			if (typeof nested.message === "string") return nested.message;
		}
	}
	return JSON.stringify(err);
};
/**
* Handles fetch errors and converts them to Storage error types
* @param error - The error caught from fetch
* @param reject - Promise rejection function
* @param options - Fetch options that may affect error handling
* @param namespace - Error namespace ('storage' or 'vectors')
*/
var handleError = async (error, reject, options, namespace) => {
	if (error !== null && typeof error === "object" && "json" in error && typeof error.json === "function") {
		const responseError = error;
		let status = parseInt(String(responseError.status), 10);
		if (!Number.isFinite(status)) status = 500;
		responseError.json().then((err) => {
			const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.code) || status + "";
			reject(new StorageApiError(_getErrorMessage(err), status, statusCode, namespace, err === null || err === void 0 ? void 0 : err.code));
		}).catch(() => {
			const statusCode = status + "";
			reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
		});
	} else reject(new StorageUnknownError(_getErrorMessage(error), error, namespace));
};
/**
* Builds request parameters for fetch calls
* @param method - HTTP method
* @param options - Custom fetch options
* @param parameters - Additional fetch parameters like AbortSignal
* @param body - Request body (will be JSON stringified if plain object)
* @returns Complete fetch request parameters
*/
var _getRequestParams = (method, options, parameters, body) => {
	const params = {
		method,
		headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
	};
	if (method === "GET" || method === "HEAD" || !body) return _objectSpread2$1(_objectSpread2$1({}, params), parameters);
	if (isPlainObject(body)) {
		var _contentType;
		const headers = (options === null || options === void 0 ? void 0 : options.headers) || {};
		let contentType;
		for (const [key, value] of Object.entries(headers)) if (key.toLowerCase() === "content-type") contentType = value;
		params.headers = setHeader(headers, "Content-Type", (_contentType = contentType) !== null && _contentType !== void 0 ? _contentType : "application/json");
		params.body = JSON.stringify(body);
	} else params.body = body;
	if (options === null || options === void 0 ? void 0 : options.duplex) params.duplex = options.duplex;
	return _objectSpread2$1(_objectSpread2$1({}, params), parameters);
};
/**
* Internal request handler that wraps fetch with error handling
* @param fetcher - Fetch function to use
* @param method - HTTP method
* @param url - Request URL
* @param options - Custom fetch options
* @param parameters - Additional fetch parameters
* @param body - Request body
* @param namespace - Error namespace ('storage' or 'vectors')
* @returns Promise with parsed response or error
*/
async function _handleRequest(fetcher, method, url, options, parameters, body, namespace) {
	return new Promise((resolve, reject) => {
		fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
			if (!result.ok) throw result;
			if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
			if (namespace === "vectors") {
				const contentType = result.headers.get("content-type");
				if (result.headers.get("content-length") === "0" || result.status === 204) return {};
				if (!contentType || !contentType.includes("application/json")) return {};
			}
			return result.json();
		}).then((data) => resolve(data)).catch((error) => handleError(error, reject, options, namespace));
	});
}
/**
* Creates a fetch API with the specified namespace
* @param namespace - Error namespace ('storage' or 'vectors')
* @returns Object with HTTP method functions
*/
function createFetchApi(namespace = "storage") {
	return {
		get: async (fetcher, url, options, parameters) => {
			return _handleRequest(fetcher, "GET", url, options, parameters, void 0, namespace);
		},
		post: async (fetcher, url, body, options, parameters) => {
			return _handleRequest(fetcher, "POST", url, options, parameters, body, namespace);
		},
		put: async (fetcher, url, body, options, parameters) => {
			return _handleRequest(fetcher, "PUT", url, options, parameters, body, namespace);
		},
		head: async (fetcher, url, options, parameters) => {
			return _handleRequest(fetcher, "HEAD", url, _objectSpread2$1(_objectSpread2$1({}, options), {}, { noResolveJson: true }), parameters, void 0, namespace);
		},
		remove: async (fetcher, url, body, options, parameters) => {
			return _handleRequest(fetcher, "DELETE", url, options, parameters, body, namespace);
		}
	};
}
var { get, post, put, head, remove } = createFetchApi("storage");
var vectorsApi = createFetchApi("vectors");
/**
* @ignore
* Base API client class for all Storage API classes
* Provides common infrastructure for error handling and configuration
*
* @typeParam TError - The error type (StorageError or subclass)
*/
var BaseApiClient = class {
	/**
	* Creates a new BaseApiClient instance
	* @param url - Base URL for API requests
	* @param headers - Default headers for API requests
	* @param fetch - Optional custom fetch implementation
	* @param namespace - Error namespace ('storage' or 'vectors')
	*/
	constructor(url, headers = {}, fetch$1, namespace = "storage") {
		this.shouldThrowOnError = false;
		this.url = url;
		this.headers = normalizeHeaders(headers);
		this.fetch = resolveFetch$1(fetch$1);
		this.namespace = namespace;
	}
	/**
	* Enable throwing errors instead of returning them.
	* When enabled, errors are thrown instead of returned in { data, error } format.
	*
	* @returns this - For method chaining
	*/
	throwOnError() {
		this.shouldThrowOnError = true;
		return this;
	}
	/**
	* Set an HTTP header for the request.
	* Creates a shallow copy of headers to avoid mutating shared state.
	*
	* @param name - Header name
	* @param value - Header value
	* @returns this - For method chaining
	*/
	setHeader(name, value) {
		this.headers = setHeader(this.headers, name, value);
		return this;
	}
	/**
	* Handles API operation with standardized error handling
	* Eliminates repetitive try-catch blocks across all API methods
	*
	* This wrapper:
	* 1. Executes the operation
	* 2. Returns { data, error: null } on success
	* 3. Returns { data: null, error } on failure (if shouldThrowOnError is false)
	* 4. Throws error on failure (if shouldThrowOnError is true)
	*
	* @typeParam T - The expected data type from the operation
	* @param operation - Async function that performs the API call
	* @returns Promise with { data, error } tuple
	*
	* @example Handling an operation
	* ```typescript
	* async listBuckets() {
	*   return this.handleOperation(async () => {
	*     return await get(this.fetch, `${this.url}/bucket`, {
	*       headers: this.headers,
	*     })
	*   })
	* }
	* ```
	*/
	async handleOperation(operation) {
		var _this = this;
		try {
			return {
				data: await operation(),
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
var _Symbol$toStringTag$1 = Symbol.toStringTag;
var StreamDownloadBuilder = class {
	constructor(downloadFn, shouldThrowOnError) {
		this.downloadFn = downloadFn;
		this.shouldThrowOnError = shouldThrowOnError;
		this[_Symbol$toStringTag$1] = "StreamDownloadBuilder";
		this.promise = null;
	}
	then(onfulfilled, onrejected) {
		return this.getPromise().then(onfulfilled, onrejected);
	}
	catch(onrejected) {
		return this.getPromise().catch(onrejected);
	}
	finally(onfinally) {
		return this.getPromise().finally(onfinally);
	}
	getPromise() {
		if (!this.promise) this.promise = this.execute();
		return this.promise;
	}
	async execute() {
		var _this = this;
		try {
			return {
				data: (await _this.downloadFn()).body,
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
var _Symbol$toStringTag = Symbol.toStringTag;
var BlobDownloadBuilder = class {
	constructor(downloadFn, shouldThrowOnError) {
		this.downloadFn = downloadFn;
		this.shouldThrowOnError = shouldThrowOnError;
		this[_Symbol$toStringTag] = "BlobDownloadBuilder";
		this.promise = null;
	}
	asStream() {
		return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
	}
	then(onfulfilled, onrejected) {
		return this.getPromise().then(onfulfilled, onrejected);
	}
	catch(onrejected) {
		return this.getPromise().catch(onrejected);
	}
	finally(onfinally) {
		return this.getPromise().finally(onfinally);
	}
	getPromise() {
		if (!this.promise) this.promise = this.execute();
		return this.promise;
	}
	async execute() {
		var _this = this;
		try {
			return {
				data: await (await _this.downloadFn()).blob(),
				error: null
			};
		} catch (error) {
			if (_this.shouldThrowOnError) throw error;
			if (isStorageError(error)) return {
				data: null,
				error
			};
			throw error;
		}
	}
};
var DEFAULT_SEARCH_OPTIONS = {
	limit: 100,
	offset: 0,
	sortBy: {
		column: "name",
		order: "asc"
	}
};
var DEFAULT_FILE_OPTIONS = {
	cacheControl: "3600",
	contentType: "text/plain;charset=UTF-8",
	upsert: false
};
var StorageFileApi = class extends BaseApiClient {
	constructor(url, headers = {}, bucketId, fetch$1) {
		super(url, headers, fetch$1, "storage");
		this.bucketId = bucketId;
	}
	/**
	* Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
	*
	* @param method HTTP method.
	* @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param fileBody The body of the file to be stored in the bucket.
	*/
	async uploadOrUpdate(method, path, fileBody, fileOptions) {
		var _this = this;
		return _this.handleOperation(async () => {
			let body;
			const options = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_FILE_OPTIONS), fileOptions);
			let headers = _objectSpread2$1(_objectSpread2$1({}, _this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
			const metadata = options.metadata;
			if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
				body = new FormData();
				body.append("cacheControl", options.cacheControl);
				if (metadata) body.append("metadata", _this.encodeMetadata(metadata));
				body.append("", fileBody);
			} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
				body = fileBody;
				if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
				if (metadata && !body.has("metadata")) body.append("metadata", _this.encodeMetadata(metadata));
			} else {
				body = fileBody;
				headers["cache-control"] = `max-age=${options.cacheControl}`;
				headers["content-type"] = options.contentType;
				if (metadata) headers["x-metadata"] = _this.toBase64(_this.encodeMetadata(metadata));
				if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
			}
			if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) for (const [key, value] of Object.entries(fileOptions.headers)) headers = setHeader(headers, key, value);
			const cleanPath = _this._removeEmptyFolders(path);
			const _path = _this._getFinalPath(cleanPath);
			const data = await (method == "PUT" ? put : post)(_this.fetch, `${_this.url}/object/${_path}`, body, _objectSpread2$1({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
			return {
				path: cleanPath,
				id: data.Id,
				fullPath: data.Key
			};
		});
	}
	/**
	* Uploads a file to an existing bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions Optional file upload options including cacheControl, contentType, upsert, and metadata.
	* @returns Promise with response containing file path, id, and fullPath or error
	*
	* @example Upload file
	* ```js
	* const avatarFile = event.target.files[0]
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', avatarFile, {
	*     cacheControl: '3600',
	*     upsert: false
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "public/avatar1.png",
	*     "fullPath": "avatars/public/avatar1.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Upload file using `ArrayBuffer` from base64 file data
	* ```js
	* import { decode } from 'base64-arraybuffer'
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', decode('base64FileData'), {
	*     contentType: 'image/png'
	*   })
	* ```
	*
	* @example Handling errors
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', avatarFile)
	*
	* if (error) {
	*   // Log the full error so fields like `statusCode` and `error` (the
	*   // Storage error name, e.g. "Duplicate") aren't hidden behind `error.message`.
	*   console.error(error)
	*   return
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: only `insert` when you are uploading new files and `select`, `insert` and `update` when you are upserting files
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	* - For React Native, using either `Blob`, `File` or `FormData` does not work as intended. Upload file using `ArrayBuffer` from base64 file data instead, see example below.
	*/
	async upload(path, fileBody, fileOptions) {
		return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
	}
	/**
	* Upload a file with a token generated from `createSignedUploadUrl`.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param token The token generated from `createSignedUploadUrl`
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions HTTP headers (cacheControl, contentType, etc.).
	* **Note:** The `upsert` option has no effect here. To enable upsert behavior,
	* pass `{ upsert: true }` when calling `createSignedUploadUrl()` instead.
	* @returns Promise with response containing file path and fullPath or error
	*
	* @example Upload to a signed URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .uploadToSignedUrl('folder/cat.jpg', 'token-from-createSignedUploadUrl', file)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "folder/cat.jpg",
	*     "fullPath": "avatars/folder/cat.jpg"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async uploadToSignedUrl(path, token, fileBody, fileOptions) {
		var _this3 = this;
		const cleanPath = _this3._removeEmptyFolders(path);
		const _path = _this3._getFinalPath(cleanPath);
		const url = new URL(_this3.url + `/object/upload/sign/${_path}`);
		url.searchParams.set("token", token);
		return _this3.handleOperation(async () => {
			let body;
			const options = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_FILE_OPTIONS), fileOptions);
			let headers = _objectSpread2$1(_objectSpread2$1({}, _this3.headers), { "x-upsert": String(options.upsert) });
			const metadata = options.metadata;
			if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
				body = new FormData();
				body.append("cacheControl", options.cacheControl);
				if (metadata) body.append("metadata", _this3.encodeMetadata(metadata));
				body.append("", fileBody);
			} else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
				body = fileBody;
				if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
				if (metadata && !body.has("metadata")) body.append("metadata", _this3.encodeMetadata(metadata));
			} else {
				body = fileBody;
				headers["cache-control"] = `max-age=${options.cacheControl}`;
				headers["content-type"] = options.contentType;
				if (metadata) headers["x-metadata"] = _this3.toBase64(_this3.encodeMetadata(metadata));
				if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
			}
			if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) for (const [key, value] of Object.entries(fileOptions.headers)) headers = setHeader(headers, key, value);
			return {
				path: cleanPath,
				fullPath: (await put(_this3.fetch, url.toString(), body, _objectSpread2$1({ headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}))).Key
			};
		});
	}
	/**
	* Creates a signed upload URL.
	* Signed upload URLs can be used to upload files to the bucket without further authentication.
	* They are valid for 2 hours.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the current file name. For example `folder/image.png`.
	* @param options.upsert If set to true, allows the file to be overwritten if it already exists.
	* @returns Promise with response containing signed upload URL, token, and path or error
	*
	* @example Create Signed Upload URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUploadUrl('folder/cat.jpg')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "signedUrl": "https://example.supabase.co/storage/v1/object/upload/sign/avatars/folder/cat.jpg?token=<TOKEN>",
	*     "path": "folder/cat.jpg",
	*     "token": "<TOKEN>"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `insert`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async createSignedUploadUrl(path, options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			let _path = _this4._getFinalPath(path);
			const headers = _objectSpread2$1({}, _this4.headers);
			if (options === null || options === void 0 ? void 0 : options.upsert) headers["x-upsert"] = "true";
			const data = await post(_this4.fetch, `${_this4.url}/object/upload/sign/${_path}`, {}, { headers });
			const url = new URL(_this4.url + data.url);
			const token = url.searchParams.get("token");
			if (!token) throw new StorageError("No token returned by API");
			return {
				signedUrl: url.toString(),
				path,
				token
			};
		});
	}
	/**
	* Replaces an existing file at the specified path with a new one.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions Optional file upload options including cacheControl, contentType, and metadata.
	* **Note:** The `upsert` option has no effect here. `update()` always replaces the
	* file at the given path, so the `x-upsert` header is not sent. To control upsert
	* behavior, use `upload()` instead.
	* @returns Promise with response containing file path, id, and fullPath or error
	*
	* @example Update file
	* ```js
	* const avatarFile = event.target.files[0]
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .update('public/avatar1.png', avatarFile, {
	*     cacheControl: '3600'
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "public/avatar1.png",
	*     "fullPath": "avatars/public/avatar1.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Update file using `ArrayBuffer` from base64 file data
	* ```js
	* import {decode} from 'base64-arraybuffer'
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .update('public/avatar1.png', decode('base64FileData'), {
	*     contentType: 'image/png'
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `update` and `select`
	* - `update()` always replaces the file at the given path regardless of the `upsert` option.
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	* - For React Native, using either `Blob`, `File` or `FormData` does not work as intended. Update file using `ArrayBuffer` from base64 file data instead, see example below.
	*/
	async update(path, fileBody, fileOptions) {
		return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
	}
	/**
	* Moves an existing file to a new path in the same bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	* @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
	* @param options The destination options.
	* @param options.sourceVersionId The version id of the source object to move.
	* @returns Promise with response containing success message or error
	*
	* @example Move file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .move('public/avatar1.png', 'private/avatar2.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully moved"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `update` and `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async move(fromPath, toPath, options) {
		var _this6 = this;
		return _this6.handleOperation(async () => {
			return await post(_this6.fetch, `${_this6.url}/object/move`, {
				bucketId: _this6.bucketId,
				sourceKey: fromPath,
				destinationKey: toPath,
				destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket,
				sourceVersionId: options === null || options === void 0 ? void 0 : options.sourceVersionId
			}, { headers: _this6.headers });
		});
	}
	/**
	* Copies an existing file to a new path in the same bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	* @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
	* @param options The destination options.
	* @param options.sourceVersionId The version id of the source object to copy.
	* @returns Promise with response containing copied file path or error
	*
	* @example Copy file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .copy('public/avatar1.png', 'private/avatar2.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "avatars/private/avatar2.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `insert` and `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async copy(fromPath, toPath, options) {
		var _this7 = this;
		return _this7.handleOperation(async () => {
			return { path: (await post(_this7.fetch, `${_this7.url}/object/copy`, {
				bucketId: _this7.bucketId,
				sourceKey: fromPath,
				destinationKey: toPath,
				destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket,
				sourceVersionId: options === null || options === void 0 ? void 0 : options.sourceVersionId
			}, { headers: _this7.headers })).Key };
		});
	}
	/**
	* Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the current file name. For example `folder/image.png`.
	* @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
	* @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.transform Transform the asset before serving it to the client.
	* @param options.cacheNonce Append a cache nonce parameter to the URL to invalidate the cache.
	* @param options.versionId Create a signed URL for a specific object version rather than the current one.
	* @returns Promise with response containing signed URL or error
	*
	* @example Create Signed URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Create a signed URL for an asset with transformations
	* ```js
	* const { data } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60, {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*     }
	*   })
	* ```
	*
	* @example Create a signed URL which triggers the download of the asset
	* ```js
	* const { data } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60, {
	*     download: true,
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async createSignedUrl(path, expiresIn, options) {
		var _this8 = this;
		return _this8.handleOperation(async () => {
			let _path = _this8._getFinalPath(path);
			const hasTransform = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0;
			let data = await post(_this8.fetch, `${_this8.url}/object/sign/${_path}`, _objectSpread2$1(_objectSpread2$1({ expiresIn }, hasTransform ? { transform: options.transform } : {}), (options === null || options === void 0 ? void 0 : options.versionId) != null ? { versionId: options.versionId } : {}), { headers: _this8.headers });
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
			if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
			const queryString = query.toString();
			return { signedUrl: encodeURI(`${_this8.url}${data.signedURL}${queryString ? `&${queryString}` : ""}`) };
		});
	}
	/**
	* Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
	* @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
	* @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.cacheNonce Append a cache nonce parameter to the URL to invalidate the cache.
	* @returns Promise with response containing array of objects with signedUrl, path, and error or error
	*
	* @example Create Signed URLs
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "error": null,
	*       "path": "folder/avatar1.png",
	*       "signedURL": "/object/sign/avatars/folder/avatar1.png?token=<TOKEN>",
	*       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
	*     },
	*     {
	*       "error": null,
	*       "path": "folder/avatar2.png",
	*       "signedURL": "/object/sign/avatars/folder/avatar2.png?token=<TOKEN>",
	*       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar2.png?token=<TOKEN>"
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async createSignedUrls(paths, expiresIn, options) {
		var _this9 = this;
		return _this9.handleOperation(async () => {
			const data = await post(_this9.fetch, `${_this9.url}/object/sign/${_this9.bucketId}`, {
				expiresIn,
				paths
			}, { headers: _this9.headers });
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
			if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
			const queryString = query.toString();
			return data.map((datum) => _objectSpread2$1(_objectSpread2$1({}, datum), {}, { signedUrl: datum.signedURL ? encodeURI(`${_this9.url}${datum.signedURL}${queryString ? `&${queryString}` : ""}`) : null }));
		});
	}
	/**
	* Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
	* @param options Optional settings: `transform` to transform the asset before serving it to the client, `cacheNonce` to append a cache nonce parameter to the URL to invalidate the cache, and `versionId` to download a specific object version.
	* @param parameters Additional fetch parameters like signal for cancellation. Supports standard fetch options including cache control.
	* @returns BlobDownloadBuilder instance for downloading the file
	*
	* @example Download file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": <BLOB>,
	*   "error": null
	* }
	* ```
	*
	* @example Download file with transformations
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*       quality: 80
	*     }
	*   })
	* ```
	*
	* @example Download with cache control (useful in Edge Functions)
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {}, { cache: 'no-store' })
	* ```
	*
	* @example Download with abort signal
	* ```js
	* const controller = new AbortController()
	* setTimeout(() => controller.abort(), 5000)
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {}, { signal: controller.signal })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	download(path, options, parameters) {
		const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image/authenticated" : "object";
		const query = new URLSearchParams();
		if (options === null || options === void 0 ? void 0 : options.transform) this.applyTransformOptsToQuery(query, options.transform);
		if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
		if ((options === null || options === void 0 ? void 0 : options.versionId) != null) query.set("versionId", String(options.versionId));
		const queryString = query.toString();
		const _path = this._getFinalPath(path);
		const downloadFn = () => get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString ? `?${queryString}` : ""}`, {
			headers: this.headers,
			noResolveJson: true
		}, parameters);
		return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
	}
	/**
	* Retrieves the details of an existing file.
	*
	* Returns detailed file metadata including size, content type, and timestamps.
	* Note: The API returns `last_modified` field, not `updated_at`.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. For example `folder/image.png`.
	* @param options Optional settings, including `versionId` to retrieve a specific object version.
	* @returns Promise with response containing file metadata or error
	*
	* @example Get file info
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .info('folder/avatar1.png')
	*
	* if (data) {
	*   console.log('Last modified:', data.lastModified)
	*   console.log('Size:', data.size)
	* }
	* ```
	*/
	async info(path, options) {
		var _this10 = this;
		const _path = _this10._getFinalPath(path);
		const query = new URLSearchParams();
		if ((options === null || options === void 0 ? void 0 : options.versionId) != null) query.set("versionId", String(options.versionId));
		const queryString = query.toString();
		return _this10.handleOperation(async () => {
			return recursiveToCamel(await get(_this10.fetch, `${_this10.url}/object/info/${_path}${queryString ? `?${queryString}` : ""}`, { headers: _this10.headers }));
		});
	}
	/**
	* Checks the existence of a file.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. For example `folder/image.png`.
	* @returns Promise with response containing boolean indicating file existence or error
	*
	* @example Check file existence
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .exists('folder/avatar1.png')
	* ```
	*/
	async exists(path) {
		var _this11 = this;
		const _path = _this11._getFinalPath(path);
		try {
			await head(_this11.fetch, `${_this11.url}/object/${_path}`, { headers: _this11.headers });
			return {
				data: true,
				error: null
			};
		} catch (error) {
			if (_this11.shouldThrowOnError) throw error;
			if (isStorageError(error)) {
				var _error$originalError;
				const status = error instanceof StorageApiError ? error.status : error instanceof StorageUnknownError ? (_error$originalError = error.originalError) === null || _error$originalError === void 0 ? void 0 : _error$originalError.status : void 0;
				if (status !== void 0 && [400, 404].includes(status)) return {
					data: false,
					error
				};
			}
			throw error;
		}
	}
	/**
	* A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
	* This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
	* @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.transform Transform the asset before serving it to the client.
	* @param options.cacheNonce Append a cache nonce parameter to the URL to invalidate the cache.
	* @param options.versionId Return the URL for a specific object version rather than the current one.
	* @returns Object with public URL
	*
	* @example Returns the URL for an asset in a public bucket
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "publicUrl": "https://example.supabase.co/storage/v1/object/public/public-bucket/folder/avatar1.png"
	*   }
	* }
	* ```
	*
	* @example Returns the URL for an asset in a public bucket with transformations
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png', {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*     }
	*   })
	* ```
	*
	* @example Returns the URL which triggers the download of an asset in a public bucket
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png', {
	*     download: true,
	*   })
	* ```
	*
	* @remarks
	* - The bucket needs to be set to public, either via [updateBucket()](/docs/reference/javascript/storage-updatebucket) or by going to Storage on [supabase.com/dashboard](https://supabase.com/dashboard), clicking the overflow menu on a bucket and choosing "Make public"
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	getPublicUrl(path, options) {
		const _path = this._getFinalPath(path);
		const query = new URLSearchParams();
		if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
		if (options === null || options === void 0 ? void 0 : options.transform) this.applyTransformOptsToQuery(query, options.transform);
		if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
		if ((options === null || options === void 0 ? void 0 : options.versionId) != null) query.set("versionId", String(options.versionId));
		const queryString = query.toString();
		const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image" : "object";
		return { data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}`) + (queryString ? `?${queryString}` : "") } };
	}
	/**
	* Deletes files within the same bucket
	*
	* Returns an array of FileObject entries for the deleted files. Note that deprecated
	* fields like `bucket_id` may or may not be present in the response - do not rely on them.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param paths An array of files to delete. Each entry is either a path (deletes whichever
	* version is currently at that path, e.g. `'folder/image.png'`), or `{ path, versionId }` to
	* delete an exact version current or archived (e.g. `{ path: 'folder/image.png', versionId: '...' }`).
	* @returns Promise with response containing array of deleted file objects or error
	*
	* @example Delete file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .remove(['folder/avatar1.png'])
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [],
	*   "error": null
	* }
	* ```
	*
	* @example Delete a specific object version
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .remove([{ path: 'folder/avatar1.png', versionId: 'noncurrent-version-id' }])
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `delete` and `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async remove(paths) {
		var _this12 = this;
		return _this12.handleOperation(async () => {
			return await remove(_this12.fetch, `${_this12.url}/object/${_this12.bucketId}`, { prefixes: paths }, { headers: _this12.headers });
		});
	}
	/**
	* Purges the CDN cache for a single object in this bucket.
	*
	* Maps to `DELETE /cdn/{bucket}/{path}` on the Storage API. The server
	* issues a CDN invalidation for the object and returns `{ message: 'success' }`.
	*
	* **Requires the `service_role` key.** The underlying endpoint enforces
	* `service_role` JWT — calls made with the anon key or a user JWT will be
	* rejected by the server.
	*
	* **Hosted CDN feature.** On self-hosted Supabase, the Storage service must
	* have `CDN_PURGE_ENDPOINT_URL` configured and the `purgeCache` tenant
	* feature enabled, otherwise the server returns an error.
	*
	* Operates on a single object path. There is no wildcard or recursion: pass
	* the exact path of the object you want invalidated.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The path (relative to the bucket) of the object to purge, e.g. `folder/avatar.png`.
	* @param options Optional purge cache options.
	* @param options.transformations If true, purges only transformations (resized/formatted variants), leaving the original cached file intact.
	* @param parameters Optional fetch parameters such as an `AbortController` signal.
	* @returns Promise with `{ data: { message }, error: null }` on success or `{ data: null, error }` on failure.
	*
	* @example Purge a single cached object
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .purgeCache('folder/avatar1.png')
	* ```
	*
	* @example Purge only transformations for a single object
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .purgeCache('folder/avatar1.png', { transformations: true })
	* ```
	*/
	async purgeCache(path, options, parameters) {
		var _this13 = this;
		return _this13.handleOperation(async () => {
			const _path = encodeStoragePath(_this13._getFinalPath(path));
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.transformations) query.set("transformations", "true");
			const queryString = query.toString();
			return await remove(_this13.fetch, `${_this13.url}/cdn/${_path}${queryString ? `?${queryString}` : ""}`, {}, { headers: _this13.headers }, parameters);
		});
	}
	/**
	* Get file metadata
	* @param id the file id to retrieve metadata
	*/
	/**
	* Update file metadata
	* @param id the file id to update metadata
	* @param meta the new file metadata
	*/
	/**
	* Lists all the files and folders within a path of the bucket.
	*
	* **Important:** For folder entries, fields like `id`, `updated_at`, `created_at`,
	* `last_accessed_at`, and `metadata` will be `null`. Only files have these fields populated.
	* Additionally, deprecated fields like `bucket_id`, `owner`, and `buckets` are NOT returned
	* by this method.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The folder path.
	* @param options Search options including limit (defaults to 100), offset, sortBy, and search
	* @param parameters Optional fetch parameters including signal for cancellation
	* @returns Promise with response containing array of files/folders or error
	*
	* @example List files in a bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .list('folder', {
	*     limit: 100,
	*     offset: 0,
	*     sortBy: { column: 'name', order: 'asc' },
	*   })
	*
	* // Handle files vs folders
	* data?.forEach(item => {
	*   if (item.id !== null) {
	*     // It's a file
	*     console.log('File:', item.name, 'Size:', item.metadata?.size)
	*   } else {
	*     // It's a folder
	*     console.log('Folder:', item.name)
	*   }
	* })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "avatar1.png",
	*       "id": "e668cf7f-821b-4a2f-9dce-7dfa5dd1cfd2",
	*       "updated_at": "2024-05-22T23:06:05.580Z",
	*       "created_at": "2024-05-22T23:04:34.443Z",
	*       "last_accessed_at": "2024-05-22T23:04:34.443Z",
	*       "metadata": {
	*         "eTag": "\"c5e8c553235d9af30ef4f6e280790b92\"",
	*         "size": 32175,
	*         "mimetype": "image/png",
	*         "cacheControl": "max-age=3600",
	*         "lastModified": "2024-05-22T23:06:05.574Z",
	*         "contentLength": 32175,
	*         "httpStatusCode": 200
	*       }
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @example Search files in a bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .list('folder', {
	*     limit: 100,
	*     offset: 0,
	*     sortBy: { column: 'name', order: 'asc' },
	*     search: 'jon'
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async list(path, options, parameters) {
		var _this14 = this;
		return _this14.handleOperation(async () => {
			const sortBy = (options === null || options === void 0 ? void 0 : options.sortBy) ? _objectSpread2$1(_objectSpread2$1({}, DEFAULT_SEARCH_OPTIONS.sortBy), options.sortBy) : DEFAULT_SEARCH_OPTIONS.sortBy;
			const body = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, DEFAULT_SEARCH_OPTIONS), options), {}, {
				sortBy,
				prefix: path || ""
			});
			return await post(_this14.fetch, `${_this14.url}/object/list/${_this14.bucketId}`, body, { headers: _this14.headers }, parameters);
		});
	}
	/**
	* Lists all the files and folders within a bucket using the V2 API with pagination support.
	*
	* **Important:** Folder entries in the `folders` array only contain `name` and optionally `key` —
	* they have no `id`, timestamps, or `metadata` fields. Full file metadata is only available
	* on entries in the `objects` array.
	*
	* @experimental this method signature might change in the future
	*
	* @category Storage
	* @subcategory File Buckets
	* @param options Search options including prefix, cursor for pagination, limit, with_delimiter
	* @param parameters Optional fetch parameters including signal for cancellation
	* @returns Promise with response containing folders/objects arrays with pagination info or error
	*
	* @example List files with pagination
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .listV2({
	*     prefix: 'folder/',
	*     limit: 100,
	*   })
	*
	* // Handle pagination
	* if (data?.hasNext) {
	*   const nextPage = await supabase
	*     .storage
	*     .from('avatars')
	*     .listV2({
	*       prefix: 'folder/',
	*       cursor: data.nextCursor,
	*     })
	* }
	*
	* // Handle files vs folders
	* data?.objects.forEach(file => {
	*   if (file.id !== null) {
	*     console.log('File:', file.name, 'Size:', file.metadata?.size)
	*   }
	* })
	* data?.folders.forEach(folder => {
	*   console.log('Folder:', folder.name)
	* })
	* ```
	*/
	async listV2(options, parameters) {
		var _this15 = this;
		return _this15.handleOperation(async () => {
			const body = _objectSpread2$1({}, options);
			return await post(_this15.fetch, `${_this15.url}/object/list-v2/${_this15.bucketId}`, body, { headers: _this15.headers }, parameters);
		});
	}
	encodeMetadata(metadata) {
		return JSON.stringify(metadata);
	}
	toBase64(data) {
		if (typeof Buffer !== "undefined") return Buffer.from(data).toString("base64");
		return btoa(data);
	}
	_getFinalPath(path) {
		return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
	}
	_removeEmptyFolders(path) {
		return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
	}
	/** Modifies the `query`, appending values the from `transform` */
	applyTransformOptsToQuery(query, transform) {
		if (transform.width) query.set("width", transform.width.toString());
		if (transform.height) query.set("height", transform.height.toString());
		if (transform.resize) query.set("resize", transform.resize);
		if (transform.format) query.set("format", transform.format);
		if (transform.quality) query.set("quality", transform.quality.toString());
		return query;
	}
};
var DEFAULT_HEADERS = { "X-Client-Info": `storage-js/2.117.2` };
var StorageBucketApi = class extends BaseApiClient {
	constructor(url, headers = {}, fetch$1, opts) {
		const baseUrl = new URL(url);
		if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
			if (/supabase\.(co|in|red)$/.test(baseUrl.hostname) && !baseUrl.hostname.includes("storage.supabase.")) baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
		}
		const finalUrl = baseUrl.href.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), headers);
		super(finalUrl, finalHeaders, fetch$1, "storage");
	}
	/**
	* Retrieves the details of all Storage buckets within an existing project.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param options Query parameters for listing buckets
	* @param options.limit Maximum number of buckets to return
	* @param options.offset Number of buckets to skip
	* @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
	* @param options.sortOrder Sort order ('asc' or 'desc')
	* @param options.search Search term to filter bucket names
	* @returns Promise with response containing array of buckets or error
	*
	* @example List buckets
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .listBuckets()
	* ```
	*
	* @example List buckets with options
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .listBuckets({
	*     limit: 10,
	*     offset: 0,
	*     sortColumn: 'created_at',
	*     sortOrder: 'desc',
	*     search: 'prod'
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async listBuckets(options) {
		var _this = this;
		return _this.handleOperation(async () => {
			const queryString = _this.listBucketOptionsToQueryString(options);
			return await get(_this.fetch, `${_this.url}/bucket${queryString}`, { headers: _this.headers });
		});
	}
	/**
	* Retrieves the details of an existing Storage bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to retrieve.
	* @returns Promise with response containing bucket details or error
	*
	* @example Get bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .getBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "id": "avatars",
	*     "name": "avatars",
	*     "owner": "",
	*     "public": false,
	*     "file_size_limit": 1024,
	*     "allowed_mime_types": [
	*       "image/png"
	*     ],
	*     "created_at": "2024-05-22T22:26:05.100Z",
	*     "updated_at": "2024-05-22T22:26:05.100Z"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async getBucket(id) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await get(_this2.fetch, `${_this2.url}/bucket/${id}`, { headers: _this2.headers });
		});
	}
	/**
	* Creates a new Storage bucket
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id A unique identifier for the bucket you are creating.
	* @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
	* @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	* The global file size limit takes precedence over this value.
	* The default value is null, which doesn't set a per bucket file size limit.
	* @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	* The default value is null, which allows files with all mime types to be uploaded.
	* Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	* @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
	*   - default bucket type is `STANDARD`
	* @param options.versioningStatus the bucket's initial object versioning status.
	* The default value is `DISABLED`
	* @returns Promise with response containing newly created bucket name or error
	*
	* @example Create bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .createBucket('avatars', {
	*     public: false,
	*     allowedMimeTypes: ['image/png'],
	*     fileSizeLimit: 1024
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "name": "avatars"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `insert`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async createBucket(id, options = { public: false }) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await post(_this3.fetch, `${_this3.url}/bucket`, {
				id,
				name: id,
				type: options.type,
				public: options.public,
				file_size_limit: options.fileSizeLimit,
				allowed_mime_types: options.allowedMimeTypes,
				versioning_status: options.versioningStatus
			}, { headers: _this3.headers });
		});
	}
	/**
	* Updates a Storage bucket
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id A unique identifier for the bucket you are updating.
	* @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
	* @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	* The global file size limit takes precedence over this value.
	* The default value is null, which doesn't set a per bucket file size limit.
	* @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	* The default value is null, which allows files with all mime types to be uploaded.
	* Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	* @param options.versioningStatus the bucket's new object versioning status. `DISABLED` is not
	* valid here, there's no transition back to it once versioning has been touched.
	* @returns Promise with response containing success message or error
	*
	* @example Update bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .updateBucket('avatars', {
	*     public: false,
	*     allowedMimeTypes: ['image/png'],
	*     fileSizeLimit: 1024
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully updated"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select` and `update`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async updateBucket(id, options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await put(_this4.fetch, `${_this4.url}/bucket/${id}`, {
				id,
				name: id,
				public: options.public,
				file_size_limit: options.fileSizeLimit,
				allowed_mime_types: options.allowedMimeTypes,
				versioning_status: options.versioningStatus
			}, { headers: _this4.headers });
		});
	}
	/**
	* Removes all objects inside a single bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to empty.
	* @returns Promise with success message or error
	*
	* @example Empty bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .emptyBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully emptied"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: `select` and `delete`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async emptyBucket(id) {
		var _this5 = this;
		return _this5.handleOperation(async () => {
			return await post(_this5.fetch, `${_this5.url}/bucket/${id}/empty`, {}, { headers: _this5.headers });
		});
	}
	/**
	* Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
	* You must first `empty()` the bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to delete.
	* @returns Promise with success message or error
	*
	* @example Delete bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .deleteBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select` and `delete`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async deleteBucket(id) {
		var _this6 = this;
		return _this6.handleOperation(async () => {
			return await remove(_this6.fetch, `${_this6.url}/bucket/${id}`, {}, { headers: _this6.headers });
		});
	}
	/**
	* Returns the lifecycle policy stored on a bucket.
	*
	* Fails with `NoSuchLifecycleConfiguration` when the bucket has no policy.
	*
	* These rules expire previous versions of objects, not the current one.
	* Turn versioning on or there is nothing for the policy to act on.
	* Standard buckets only. Returns `FeatureNotEnabled` if lifecycle is off
	* for the project.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket.
	* @returns Promise with the lifecycle configuration or error
	*
	* @example Get lifecycle configuration
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .getBucketLifecycle('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "rules": [
	*       {
	*         "id": "expire-history",
	*         "status": "Enabled",
	*         "filter": {},
	*         "noncurrentVersionExpiration": {
	*           "noncurrentDays": 30,
	*           "newerNoncurrentVersions": 2
	*         }
	*       }
	*     ]
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async getBucketLifecycle(id) {
		var _this7 = this;
		return _this7.handleOperation(async () => {
			return await get(_this7.fetch, _this7.bucketLifecycleUrl(id), { headers: _this7.headers });
		});
	}
	/**
	* Replaces the lifecycle policy on a bucket.
	*
	* The `rules` array you send is the whole policy. Anything previously stored
	* is overwritten. Send at least one rule. Call {@link deleteBucketLifecycle}
	* to remove the policy.
	*
	* Each rule currently supports only `noncurrentVersionExpiration`. `filter`
	* is required and must be `{}`. Prefix filters, tag filters, and current-object
	* expiration are rejected. Rule IDs must be unique. Omit `id` and the
	* server generates one.
	*
	* Standard buckets only. Returns `FeatureNotEnabled` if lifecycle is off
	* for the project.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket.
	* @param configuration The full lifecycle configuration to store.
	* @returns Promise with the stored configuration or error
	*
	* @example Replace lifecycle configuration
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .updateBucketLifecycle('avatars', {
	*     rules: [
	*       {
	*         id: 'expire-history',
	*         status: 'Enabled',
	*         filter: {},
	*         noncurrentVersionExpiration: {
	*           noncurrentDays: 30,
	*           newerNoncurrentVersions: 2,
	*         },
	*       },
	*     ],
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select` and `update`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async updateBucketLifecycle(id, configuration) {
		var _this8 = this;
		return _this8.handleOperation(async () => {
			return await put(_this8.fetch, _this8.bucketLifecycleUrl(id), configuration, { headers: _this8.headers });
		});
	}
	/**
	* Removes the lifecycle policy from a bucket.
	*
	* Safe to call when no policy is stored. The response is still success.
	* Standard buckets only. Returns `FeatureNotEnabled` if lifecycle is off
	* for the project.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket.
	* @returns Promise with success message or error
	*
	* @example Delete lifecycle configuration
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .deleteBucketLifecycle('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select` and `update`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/
	async deleteBucketLifecycle(id) {
		var _this9 = this;
		return _this9.handleOperation(async () => {
			return await remove(_this9.fetch, _this9.bucketLifecycleUrl(id), {}, { headers: _this9.headers });
		});
	}
	/**
	* Purges the CDN cache for an entire bucket.
	*
	* Maps to `DELETE /cdn/{bucket}` on the Storage API. The server
	* issues a CDN invalidation for the bucket and returns `{ message: 'success' }`.
	*
	* **Requires the `service_role` key.** The underlying endpoint enforces
	* `service_role` JWT — calls made with the anon key or a user JWT will be
	* rejected by the server.
	*
	* **Hosted CDN feature.** On self-hosted Supabase, the Storage service must
	* have `CDN_PURGE_ENDPOINT_URL` configured and the `purgeCache` tenant
	* feature enabled, otherwise the server returns an error.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to purge from cache.
	* @param options Optional purge cache options.
	* @param options.transformations If true, purges only transformations (resized/formatted variants), leaving original cached files intact.
	* @param parameters Optional fetch parameters such as an `AbortController` signal.
	* @returns Promise with `{ data: { message }, error: null }` on success or `{ data: null, error }` on failure.
	*
	* @example Purge cache for an entire bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .purgeBucketCache('avatars')
	* ```
	*
	* @example Purge only transformations for an entire bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .purgeBucketCache('avatars', { transformations: true })
	* ```
	*/
	async purgeBucketCache(id, options, parameters) {
		var _this10 = this;
		return _this10.handleOperation(async () => {
			const query = new URLSearchParams();
			if (options === null || options === void 0 ? void 0 : options.transformations) query.set("transformations", "true");
			const queryString = query.toString();
			return await remove(_this10.fetch, `${_this10.url}/cdn/${encodeStoragePath(id)}${queryString ? `?${queryString}` : ""}`, {}, { headers: _this10.headers }, parameters);
		});
	}
	bucketLifecycleUrl(id) {
		return `${this.url}/bucket/${encodeStoragePath(id)}/lifecycle`;
	}
	listBucketOptionsToQueryString(options) {
		const params = {};
		if (options) {
			if ("limit" in options) params.limit = String(options.limit);
			if ("offset" in options) params.offset = String(options.offset);
			if (options.search) params.search = options.search;
			if (options.sortColumn) params.sortColumn = options.sortColumn;
			if (options.sortOrder) params.sortOrder = options.sortOrder;
		}
		return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
	}
};
/**
* Client class for managing Analytics Buckets using Iceberg tables
* Provides methods for creating, listing, and deleting analytics buckets
*/
var StorageAnalyticsClient = class extends BaseApiClient {
	/**
	* @alpha
	*
	* Creates a new StorageAnalyticsClient instance
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param url - The base URL for the storage API
	* @param headers - HTTP headers to include in requests
	* @param fetch - Optional custom fetch implementation
	*
	* @example Using supabase-js (recommended)
	* ```typescript
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.storage.analytics.listBuckets()
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```typescript
	* import { StorageAnalyticsClient } from '@supabase/storage-js'
	*
	* const client = new StorageAnalyticsClient(url, headers)
	* ```
	*/
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), headers);
		super(finalUrl, finalHeaders, fetch$1, "storage");
	}
	/**
	* @alpha
	*
	* Creates a new analytics bucket using Iceberg tables
	* Analytics buckets are optimized for analytical queries and data processing
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param name A unique name for the bucket you are creating
	* @returns Promise with response containing newly created analytics bucket or error
	*
	* @example Create analytics bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .createBucket('analytics-data')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "name": "analytics-data",
	*     "type": "ANALYTICS",
	*     "format": "iceberg",
	*     "created_at": "2024-05-22T22:26:05.100Z",
	*     "updated_at": "2024-05-22T22:26:05.100Z"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - Creates a new analytics bucket using Iceberg tables
	* - Analytics buckets are optimized for analytical queries and data processing
	*/
	async createBucket(name) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await post(_this.fetch, `${_this.url}/bucket`, { name }, { headers: _this.headers });
		});
	}
	/**
	* @alpha
	*
	* Retrieves the details of all Analytics Storage buckets within an existing project
	* Only returns buckets of type 'ANALYTICS'
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param options Query parameters for listing buckets
	* @param options.limit Maximum number of buckets to return
	* @param options.offset Number of buckets to skip
	* @param options.sortColumn Column to sort by ('name', 'created_at', 'updated_at')
	* @param options.sortOrder Sort order ('asc' or 'desc')
	* @param options.search Search term to filter bucket names
	* @returns Promise with response containing array of analytics buckets or error
	*
	* @example List analytics buckets
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .listBuckets({
	*     limit: 10,
	*     offset: 0,
	*     sortColumn: 'created_at',
	*     sortOrder: 'desc'
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "analytics-data",
	*       "type": "ANALYTICS",
	*       "format": "iceberg",
	*       "created_at": "2024-05-22T22:26:05.100Z",
	*       "updated_at": "2024-05-22T22:26:05.100Z"
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - Retrieves the details of all Analytics Storage buckets within an existing project
	* - Only returns buckets of type 'ANALYTICS'
	*/
	async listBuckets(options) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			const queryParams = new URLSearchParams();
			if ((options === null || options === void 0 ? void 0 : options.limit) !== void 0) queryParams.set("limit", options.limit.toString());
			if ((options === null || options === void 0 ? void 0 : options.offset) !== void 0) queryParams.set("offset", options.offset.toString());
			if (options === null || options === void 0 ? void 0 : options.sortColumn) queryParams.set("sortColumn", options.sortColumn);
			if (options === null || options === void 0 ? void 0 : options.sortOrder) queryParams.set("sortOrder", options.sortOrder);
			if (options === null || options === void 0 ? void 0 : options.search) queryParams.set("search", options.search);
			const queryString = queryParams.toString();
			const url = queryString ? `${_this2.url}/bucket?${queryString}` : `${_this2.url}/bucket`;
			return await get(_this2.fetch, url, { headers: _this2.headers });
		});
	}
	/**
	* @alpha
	*
	* Deletes an existing analytics bucket
	* A bucket can't be deleted with existing objects inside it
	* You must first empty the bucket before deletion
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param bucketName The unique identifier of the bucket you would like to delete
	* @returns Promise with response containing success message or error
	*
	* @example Delete analytics bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .deleteBucket('analytics-data')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - Deletes an analytics bucket
	*/
	async deleteBucket(bucketName) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await remove(_this3.fetch, `${_this3.url}/bucket/${bucketName}`, {}, { headers: _this3.headers });
		});
	}
	/**
	* @alpha
	*
	* Get an Iceberg REST Catalog client configured for a specific analytics bucket
	* Use this to perform advanced table and namespace operations within the bucket
	* The returned client provides full access to the Apache Iceberg REST Catalog API
	* with the Supabase `{ data, error }` pattern for consistent error handling on all operations.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param bucketName - The name of the analytics bucket (warehouse) to connect to
	* @returns The wrapped Iceberg catalog client
	* @throws {StorageError} If the bucket name is invalid
	*
	* @example Get catalog and create table
	* ```js
	* // First, create an analytics bucket
	* const { data: bucket, error: bucketError } = await supabase
	*   .storage
	*   .analytics
	*   .createBucket('analytics-data')
	*
	* // Get the Iceberg catalog for that bucket
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // Create a namespace
	* const { error: nsError } = await catalog.createNamespace({ namespace: ['default'] })
	*
	* // Create a table with schema
	* const { data: tableMetadata, error: tableError } = await catalog.createTable(
	*   { namespace: ['default'] },
	*   {
	*     name: 'events',
	*     schema: {
	*       type: 'struct',
	*       fields: [
	*         { id: 1, name: 'id', type: 'long', required: true },
	*         { id: 2, name: 'timestamp', type: 'timestamp', required: true },
	*         { id: 3, name: 'user_id', type: 'string', required: false }
	*       ],
	*       'schema-id': 0,
	*       'identifier-field-ids': [1]
	*     },
	*     'partition-spec': {
	*       'spec-id': 0,
	*       fields: []
	*     },
	*     'write-order': {
	*       'order-id': 0,
	*       fields: []
	*     },
	*     properties: {
	*       'write.format.default': 'parquet'
	*     }
	*   }
	* )
	* ```
	*
	* @example List tables in namespace
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // List all tables in the default namespace
	* const { data: tables, error: listError } = await catalog.listTables({ namespace: ['default'] })
	* if (listError) {
	*   if (listError.isNotFound()) {
	*     console.log('Namespace not found')
	*   }
	*   return
	* }
	* console.log(tables) // [{ namespace: ['default'], name: 'events' }]
	* ```
	*
	* @example Working with namespaces
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // List all namespaces
	* const { data: namespaces } = await catalog.listNamespaces()
	*
	* // Create namespace with properties
	* await catalog.createNamespace(
	*   { namespace: ['production'] },
	*   { properties: { owner: 'data-team', env: 'prod' } }
	* )
	* ```
	*
	* @example Cleanup operations
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // Drop table with purge option (removes all data)
	* const { error: dropError } = await catalog.dropTable(
	*   { namespace: ['default'], name: 'events' },
	*   { purge: true }
	* )
	*
	* if (dropError?.isNotFound()) {
	*   console.log('Table does not exist')
	* }
	*
	* // Drop namespace (must be empty)
	* await catalog.dropNamespace({ namespace: ['default'] })
	* ```
	*
	* @remarks
	* This method provides a bridge between Supabase's bucket management and the standard
	* Apache Iceberg REST Catalog API. The bucket name maps to the Iceberg warehouse parameter.
	* All authentication and configuration is handled automatically using your Supabase credentials.
	*
	* **Error Handling**: Invalid bucket names throw immediately. All catalog
	* operations return `{ data, error }` where errors are `IcebergError` instances from iceberg-js.
	* Use helper methods like `error.isNotFound()` or check `error.status` for specific error handling.
	* Use `.throwOnError()` on the analytics client if you prefer exceptions for catalog operations.
	*
	* **Cleanup Operations**: When using `dropTable`, the `purge: true` option permanently
	* deletes all table data. Without it, the table is marked as deleted but data remains.
	*
	* **Library Dependency**: The returned catalog wraps `IcebergRestCatalog` from iceberg-js.
	* For complete API documentation and advanced usage, refer to the
	* [iceberg-js documentation](https://supabase.github.io/iceberg-js/).
	*/
	from(bucketName) {
		var _this4 = this;
		if (!isValidBucketName(bucketName)) throw new StorageError("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
		const catalog = new IcebergRestCatalog({
			baseUrl: this.url,
			catalogName: bucketName,
			auth: {
				type: "custom",
				getHeaders: async () => _this4.headers
			},
			fetch: this.fetch
		});
		const shouldThrowOnError = this.shouldThrowOnError;
		return new Proxy(catalog, { get(target, prop) {
			const value = target[prop];
			if (typeof value !== "function") return value;
			return async (...args) => {
				try {
					return {
						data: await value.apply(target, args),
						error: null
					};
				} catch (error) {
					if (shouldThrowOnError) throw error;
					return {
						data: null,
						error
					};
				}
			};
		} });
	}
};
/**
* @hidden
* Base implementation for vector index operations.
* Use {@link VectorBucketScope} via `supabase.storage.vectors.from('bucket')` instead.
*/
var VectorIndexApi = class extends BaseApiClient {
	/** Creates a new VectorIndexApi instance */
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	/** Creates a new vector index within a bucket */
	async createIndex(options) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/CreateIndex`, options, { headers: _this.headers }) || {};
		});
	}
	/** Retrieves metadata for a specific vector index */
	async getIndex(vectorBucketName, indexName) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetIndex`, {
				vectorBucketName,
				indexName
			}, { headers: _this2.headers });
		});
	}
	/** Lists vector indexes within a bucket with optional filtering and pagination */
	async listIndexes(options) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListIndexes`, options, { headers: _this3.headers });
		});
	}
	/** Deletes a vector index and all its data */
	async deleteIndex(vectorBucketName, indexName) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteIndex`, {
				vectorBucketName,
				indexName
			}, { headers: _this4.headers }) || {};
		});
	}
};
/**
* @hidden
* Base implementation for vector data operations.
* Use {@link VectorIndexScope} via `supabase.storage.vectors.from('bucket').index('idx')` instead.
*/
var VectorDataApi = class extends BaseApiClient {
	/** Creates a new VectorDataApi instance */
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	/** Inserts or updates vectors in batch (1-500 per request) */
	async putVectors(options) {
		var _this = this;
		if (options.vectors.length < 1 || options.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/PutVectors`, options, { headers: _this.headers }) || {};
		});
	}
	/** Retrieves vectors by their keys in batch */
	async getVectors(options) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectors`, options, { headers: _this2.headers });
		});
	}
	/** Lists vectors in an index with pagination */
	async listVectors(options) {
		var _this3 = this;
		if (options.segmentCount !== void 0) {
			if (options.segmentCount < 1 || options.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
			if (options.segmentIndex !== void 0) {
				if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount) throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
			}
		}
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectors`, options, { headers: _this3.headers });
		});
	}
	/** Queries for similar vectors using approximate nearest neighbor search */
	async queryVectors(options) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/QueryVectors`, options, { headers: _this4.headers });
		});
	}
	/** Deletes vectors by their keys in batch (1-500 per request) */
	async deleteVectors(options) {
		var _this5 = this;
		if (options.keys.length < 1 || options.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
		return _this5.handleOperation(async () => {
			return await vectorsApi.post(_this5.fetch, `${_this5.url}/DeleteVectors`, options, { headers: _this5.headers }) || {};
		});
	}
};
/**
* @hidden
* Base implementation for vector bucket operations.
* Use {@link StorageVectorsClient} via `supabase.storage.vectors` instead.
*/
var VectorBucketApi = class extends BaseApiClient {
	/** Creates a new VectorBucketApi instance */
	constructor(url, headers = {}, fetch$1) {
		const finalUrl = url.replace(/\/$/, "");
		const finalHeaders = _objectSpread2$1(_objectSpread2$1({}, DEFAULT_HEADERS), {}, { "Content-Type": "application/json" }, headers);
		super(finalUrl, finalHeaders, fetch$1, "vectors");
	}
	/** Creates a new vector bucket */
	async createBucket(vectorBucketName) {
		var _this = this;
		return _this.handleOperation(async () => {
			return await vectorsApi.post(_this.fetch, `${_this.url}/CreateVectorBucket`, { vectorBucketName }, { headers: _this.headers }) || {};
		});
	}
	/** Retrieves metadata for a specific vector bucket */
	async getBucket(vectorBucketName) {
		var _this2 = this;
		return _this2.handleOperation(async () => {
			return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectorBucket`, { vectorBucketName }, { headers: _this2.headers });
		});
	}
	/** Lists vector buckets with optional filtering and pagination */
	async listBuckets(options = {}) {
		var _this3 = this;
		return _this3.handleOperation(async () => {
			return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectorBuckets`, options, { headers: _this3.headers });
		});
	}
	/** Deletes a vector bucket (must be empty first) */
	async deleteBucket(vectorBucketName) {
		var _this4 = this;
		return _this4.handleOperation(async () => {
			return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteVectorBucket`, { vectorBucketName }, { headers: _this4.headers }) || {};
		});
	}
};
/**
*
* @alpha
*
* Main client for interacting with S3 Vectors API
* Provides access to bucket, index, and vector data operations
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*
* **Usage Patterns:**
*
* ```typescript
* const { data, error } = await supabase
*  .storage
*  .vectors
*  .createBucket('embeddings-prod')
*
* // Access index operations via buckets
* const bucket = supabase.storage.vectors.from('embeddings-prod')
* await bucket.createIndex({
*   indexName: 'documents',
*   dataType: 'float32',
*   dimension: 1536,
*   distanceMetric: 'cosine'
* })
*
* // Access vector operations via index
* const index = bucket.index('documents')
* await index.putVectors({
*   vectors: [
*     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
*   ]
* })
*
* // Query similar vectors
* const { data } = await index.queryVectors({
*   queryVector: { float32: [...] },
*   topK: 5,
*   returnDistance: true
* })
* ```
*/
var StorageVectorsClient = class extends VectorBucketApi {
	/**
	* @alpha
	*
	* Creates a StorageVectorsClient that can manage buckets, indexes, and vectors.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param url - Base URL of the Storage Vectors REST API.
	* @param options.headers - Optional headers (for example `Authorization`) applied to every request.
	* @param options.fetch - Optional custom `fetch` implementation for non-browser runtimes.
	*
	* @example Using supabase-js (recommended)
	* ```typescript
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```typescript
	* import { StorageVectorsClient } from '@supabase/storage-js'
	*
	* const client = new StorageVectorsClient(url, options)
	* ```
	*/
	constructor(url, options = {}) {
		super(url, options.headers || {}, options.fetch);
	}
	/**
	*
	* @alpha
	*
	* Access operations for a specific vector bucket
	* Returns a scoped client for index and vector operations within the bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Name of the vector bucket
	* @returns Bucket-scoped client with index and vector operations
	*
	* @example Accessing a vector bucket
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*/
	from(vectorBucketName) {
		return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
	}
	/**
	*
	* @alpha
	*
	* Creates a new vector bucket
	* Vector buckets are containers for vector indexes and their data
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Unique name for the vector bucket
	* @returns Promise with empty response on success or error
	*
	* @example Creating a vector bucket
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .createBucket('embeddings-prod')
	* ```
	*/
	async createBucket(vectorBucketName) {
		var _superprop_getCreateBucket = () => super.createBucket, _this = this;
		return _superprop_getCreateBucket().call(_this, vectorBucketName);
	}
	/**
	*
	* @alpha
	*
	* Retrieves metadata for a specific vector bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Name of the vector bucket
	* @returns Promise with bucket metadata or error
	*
	* @example Get bucket metadata
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .getBucket('embeddings-prod')
	*
	* console.log('Bucket created:', data?.vectorBucket.creationTime)
	* ```
	*/
	async getBucket(vectorBucketName) {
		var _superprop_getGetBucket = () => super.getBucket, _this2 = this;
		return _superprop_getGetBucket().call(_this2, vectorBucketName);
	}
	/**
	*
	* @alpha
	*
	* Lists all vector buckets with optional filtering and pagination
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Optional filters (prefix, maxResults, nextToken)
	* @returns Promise with list of buckets or error
	*
	* @example List vector buckets
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .listBuckets({ prefix: 'embeddings-' })
	*
	* data?.vectorBuckets.forEach(bucket => {
	*   console.log(bucket.vectorBucketName)
	* })
	* ```
	*/
	async listBuckets(options = {}) {
		var _superprop_getListBuckets = () => super.listBuckets, _this3 = this;
		return _superprop_getListBuckets().call(_this3, options);
	}
	/**
	*
	* @alpha
	*
	* Deletes a vector bucket (bucket must be empty)
	* All indexes must be deleted before deleting the bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Name of the vector bucket to delete
	* @returns Promise with empty response on success or error
	*
	* @example Delete a vector bucket
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .deleteBucket('embeddings-old')
	* ```
	*/
	async deleteBucket(vectorBucketName) {
		var _superprop_getDeleteBucket = () => super.deleteBucket, _this4 = this;
		return _superprop_getDeleteBucket().call(_this4, vectorBucketName);
	}
};
/**
*
* @alpha
*
* Scoped client for operations within a specific vector bucket
* Provides index management and access to vector operations
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*/
var VectorBucketScope = class extends VectorIndexApi {
	/**
	* @alpha
	*
	* Creates a helper that automatically scopes all index operations to the provided bucket.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @example Creating a vector bucket scope
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*/
	constructor(url, headers, vectorBucketName, fetch$1) {
		super(url, headers, fetch$1);
		this.vectorBucketName = vectorBucketName;
	}
	/**
	*
	* @alpha
	*
	* Creates a new vector index in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Index configuration (vectorBucketName is automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example Creating a vector index
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* await bucket.createIndex({
	*   indexName: 'documents-openai',
	*   dataType: 'float32',
	*   dimension: 1536,
	*   distanceMetric: 'cosine',
	*   metadataConfiguration: {
	*     nonFilterableMetadataKeys: ['raw_text']
	*   }
	* })
	* ```
	*/
	async createIndex(options) {
		var _superprop_getCreateIndex = () => super.createIndex, _this5 = this;
		return _superprop_getCreateIndex().call(_this5, _objectSpread2$1(_objectSpread2$1({}, options), {}, { vectorBucketName: _this5.vectorBucketName }));
	}
	/**
	*
	* @alpha
	*
	* Lists indexes in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Listing options (vectorBucketName is automatically set)
	* @returns Promise with response containing indexes array and pagination token or error
	*
	* @example List indexes
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* const { data } = await bucket.listIndexes({ prefix: 'documents-' })
	* ```
	*/
	async listIndexes(options = {}) {
		var _superprop_getListIndexes = () => super.listIndexes, _this6 = this;
		return _superprop_getListIndexes().call(_this6, _objectSpread2$1(_objectSpread2$1({}, options), {}, { vectorBucketName: _this6.vectorBucketName }));
	}
	/**
	*
	* @alpha
	*
	* Retrieves metadata for a specific index in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param indexName - Name of the index to retrieve
	* @returns Promise with index metadata or error
	*
	* @example Get index metadata
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* const { data } = await bucket.getIndex('documents-openai')
	* console.log('Dimension:', data?.index.dimension)
	* ```
	*/
	async getIndex(indexName) {
		var _superprop_getGetIndex = () => super.getIndex, _this7 = this;
		return _superprop_getGetIndex().call(_this7, _this7.vectorBucketName, indexName);
	}
	/**
	*
	* @alpha
	*
	* Deletes an index from this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param indexName - Name of the index to delete
	* @returns Promise with empty response on success or error
	*
	* @example Delete an index
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* await bucket.deleteIndex('old-index')
	* ```
	*/
	async deleteIndex(indexName) {
		var _superprop_getDeleteIndex = () => super.deleteIndex, _this8 = this;
		return _superprop_getDeleteIndex().call(_this8, _this8.vectorBucketName, indexName);
	}
	/**
	*
	* @alpha
	*
	* Access operations for a specific index within this bucket
	* Returns a scoped client for vector data operations
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param indexName - Name of the index
	* @returns Index-scoped client with vector data operations
	*
	* @example Accessing an index
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	*
	* // Insert vectors
	* await index.putVectors({
	*   vectors: [
	*     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
	*   ]
	* })
	*
	* // Query similar vectors
	* const { data } = await index.queryVectors({
	*   queryVector: { float32: [...] },
	*   topK: 5
	* })
	* ```
	*/
	index(indexName) {
		return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
	}
};
/**
*
* @alpha
*
* Scoped client for operations within a specific vector index
* Provides vector data operations (put, get, list, query, delete)
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*/
var VectorIndexScope = class extends VectorDataApi {
	/**
	*
	* @alpha
	*
	* Creates a helper that automatically scopes all vector operations to the provided bucket/index names.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @example Creating a vector index scope
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* ```
	*/
	constructor(url, headers, vectorBucketName, indexName, fetch$1) {
		super(url, headers, fetch$1);
		this.vectorBucketName = vectorBucketName;
		this.indexName = indexName;
	}
	/**
	*
	* @alpha
	*
	* Inserts or updates vectors in this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Vector insertion options (bucket and index names automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example Insert vectors into an index
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* await index.putVectors({
	*   vectors: [
	*     {
	*       key: 'doc-1',
	*       data: { float32: [0.1, 0.2, ...] },
	*       metadata: { title: 'Introduction', page: 1 }
	*     }
	*   ]
	* })
	* ```
	*/
	async putVectors(options) {
		var _superprop_getPutVectors = () => super.putVectors, _this9 = this;
		return _superprop_getPutVectors().call(_this9, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this9.vectorBucketName,
			indexName: _this9.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Retrieves vectors by keys from this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Vector retrieval options (bucket and index names automatically set)
	* @returns Promise with response containing vectors array or error
	*
	* @example Get vectors by keys
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.getVectors({
	*   keys: ['doc-1', 'doc-2'],
	*   returnMetadata: true
	* })
	* ```
	*/
	async getVectors(options) {
		var _superprop_getGetVectors = () => super.getVectors, _this10 = this;
		return _superprop_getGetVectors().call(_this10, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this10.vectorBucketName,
			indexName: _this10.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Lists vectors in this index with pagination
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Listing options (bucket and index names automatically set)
	* @returns Promise with response containing vectors array and pagination token or error
	*
	* @example List vectors with pagination
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.listVectors({
	*   maxResults: 500,
	*   returnMetadata: true
	* })
	* ```
	*/
	async listVectors(options = {}) {
		var _superprop_getListVectors = () => super.listVectors, _this11 = this;
		return _superprop_getListVectors().call(_this11, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this11.vectorBucketName,
			indexName: _this11.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Queries for similar vectors in this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Query options (bucket and index names automatically set)
	* @returns Promise with response containing vectors ordered by distance, an optional pagination token, or an error
	*
	* @example Query similar vectors
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.queryVectors({
	*   queryVector: { float32: [0.1, 0.2, ...] },
	*   topK: 5,
	*   filter: { category: 'technical' },
	*   returnDistance: true,
	*   returnMetadata: true
	* })
	* ```
	*/
	async queryVectors(options) {
		var _superprop_getQueryVectors = () => super.queryVectors, _this12 = this;
		return _superprop_getQueryVectors().call(_this12, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this12.vectorBucketName,
			indexName: _this12.indexName
		}));
	}
	/**
	*
	* @alpha
	*
	* Deletes vectors by keys from this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Deletion options (bucket and index names automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example Delete vectors by keys
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* await index.deleteVectors({
	*   keys: ['doc-1', 'doc-2', 'doc-3']
	* })
	* ```
	*/
	async deleteVectors(options) {
		var _superprop_getDeleteVectors = () => super.deleteVectors, _this13 = this;
		return _superprop_getDeleteVectors().call(_this13, _objectSpread2$1(_objectSpread2$1({}, options), {}, {
			vectorBucketName: _this13.vectorBucketName,
			indexName: _this13.indexName
		}));
	}
};
var StorageClient = class extends StorageBucketApi {
	/**
	* Creates a client for Storage buckets, files, analytics, and vectors.
	*
	* @category Storage
	* @subcategory File Buckets
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const avatars = supabase.storage.from('avatars')
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { StorageClient } from '@supabase/storage-js'
	*
	* const storage = new StorageClient('https://xyzcompany.supabase.co/storage/v1', {
	*   apikey: 'your-publishable-key',
	* })
	* const avatars = storage.from('avatars')
	* ```
	*/
	constructor(url, headers = {}, fetch$1, opts) {
		super(url, headers, fetch$1, opts);
	}
	/**
	* Perform file operation in a bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	*
	* @param id The bucket id to operate on.
	*
	* @example Accessing a bucket
	* ```typescript
	* const avatars = supabase.storage.from('avatars')
	* ```
	*/
	from(id) {
		return new StorageFileApi(this.url, this.headers, id, this.fetch);
	}
	/**
	*
	* @alpha
	*
	* Access vector storage operations.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	*
	* @returns A StorageVectorsClient instance configured with the current storage settings.
	*/
	get vectors() {
		return new StorageVectorsClient(this.url + "/vector", {
			headers: this.headers,
			fetch: this.fetch
		});
	}
	/**
	*
	* @alpha
	*
	* Access analytics storage operations using Iceberg tables.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	*
	* @returns A StorageAnalyticsClient instance configured with the current storage settings.
	*/
	get analytics() {
		return new StorageAnalyticsClient(this.url + "/iceberg", this.headers, this.fetch);
	}
};
var version = "2.117.2";
var JS_ENV = "";
var JS_RUNTIME_VERSION;
if (typeof Deno !== "undefined") {
	var _Deno$version;
	JS_ENV = "deno";
	JS_RUNTIME_VERSION = (_Deno$version = Deno.version) === null || _Deno$version === void 0 ? void 0 : _Deno$version.deno;
} else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else {
	var _process$version;
	JS_ENV = "node";
	const _process = globalThis["process"];
	JS_RUNTIME_VERSION = _process === null || _process === void 0 || (_process$version = _process["version"]) === null || _process$version === void 0 ? void 0 : _process$version.replace(/^v/, "");
}
var _runtimeMeta = [`runtime=${JS_ENV}`];
if (JS_RUNTIME_VERSION) _runtimeMeta.push(`runtime-version=${JS_RUNTIME_VERSION}`);
var DEFAULT_GLOBAL_OPTIONS = { headers: { "X-Client-Info": `supabase-js/${version}; ${_runtimeMeta.join("; ")}` } };
var DEFAULT_DB_OPTIONS = { schema: "public" };
var DEFAULT_AUTH_OPTIONS = {
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true,
	flowType: "implicit"
};
var DEFAULT_REALTIME_OPTIONS = {};
var DEFAULT_TRACE_PROPAGATION_OPTIONS = {
	enabled: false,
	respectSamplingDecision: true
};
/**
* Parse W3C traceparent header according to the specification.
*
* The traceparent header format is: version-traceid-parentid-traceflags
* - version: 2 hex digits (currently always "00")
* - traceid: 32 hex digits (128-bit trace identifier)
* - parentid: 16 hex digits (64-bit span/parent identifier)
* - traceflags: 2 hex digits (8-bit flags, bit 0 is sampled flag)
*
* @param traceparent - The traceparent header value
* @returns Parsed traceparent object, or null if invalid format
*
* @see https://www.w3.org/TR/trace-context/#traceparent-header
*
* @example
* ```typescript
* const parsed = parseTraceParent('00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01')
*
* console.log(parsed)
* // {
* //   version: '00',
* //   traceId: '0af7651916cd43dd8448eb211c80319c',
* //   parentId: 'b7ad6b7169203331',
* //   traceFlags: '01',
* //   isSampled: true
* // }
* ```
*/
function parseTraceParent(traceparent) {
	if (!traceparent || typeof traceparent !== "string") return null;
	const parts = traceparent.split("-");
	if (parts.length !== 4) return null;
	const [version$1, traceId, parentId, traceFlags] = parts;
	if (version$1.length !== 2 || traceId.length !== 32 || parentId.length !== 16 || traceFlags.length !== 2) return null;
	const hexRegex = /^[0-9a-f]+$/i;
	if (!hexRegex.test(version$1) || !hexRegex.test(traceId) || !hexRegex.test(parentId) || !hexRegex.test(traceFlags)) return null;
	if (traceId === "00000000000000000000000000000000" || parentId === "0000000000000000") return null;
	return {
		version: version$1,
		traceId,
		parentId,
		traceFlags,
		isSampled: (parseInt(traceFlags, 16) & 1) === 1
	};
}
/**
* Check if trace context should be propagated to the target URL.
*
* This function checks if the target URL matches any of the configured
* propagation targets. Targets can be:
* - String: Exact hostname match or wildcard domain (*.example.com)
* - RegExp: Pattern matching hostname
* - Function: Custom logic to determine if URL should receive trace context
*
* @param targetUrl - The URL to check
* @param targets - Array of propagation targets
* @returns True if trace context should be propagated, false otherwise
*
* @example
* ```typescript
* const targets = [
*   'myproject.supabase.co',           // Exact match
*   '*.supabase.co',                   // Wildcard domain
*   /.*\.supabase\.co$/,               // Regex pattern
*   (url) => url.hostname === 'localhost' // Custom function
* ]
*
* shouldPropagateToTarget('https://myproject.supabase.co/rest/v1/table', targets)
* // true
*
* shouldPropagateToTarget('https://evil.com/api', targets)
* // false
* ```
*/
function shouldPropagateToTarget(targetUrl, targets) {
	if (!targetUrl || !targets || targets.length === 0) return false;
	let url;
	if (targetUrl instanceof URL) url = targetUrl;
	else try {
		url = new URL(targetUrl);
	} catch (error) {
		return false;
	}
	for (const target of targets) try {
		if (typeof target === "string") {
			if (matchStringTarget(url.hostname, target)) return true;
		} else if (target instanceof RegExp) {
			if (target.test(url.hostname)) return true;
		} else if (typeof target === "function") {
			if (target(url)) return true;
		}
	} catch (error) {
		continue;
	}
	return false;
}
/**
* Match hostname against string target (exact match or wildcard)
*
* @param hostname - The hostname to check
* @param target - The target pattern (exact or wildcard)
* @returns True if hostname matches target
*/
function matchStringTarget(hostname, target) {
	if (target === hostname) return true;
	if (target.startsWith("*.")) {
		const domain = target.slice(2);
		if (hostname.endsWith(domain)) {
			if (hostname === domain || hostname.endsWith("." + domain)) return true;
		}
	}
	return false;
}
/**
* Generate default propagation targets based on the Supabase project URL.
*
* By default, trace context is only propagated to Supabase domains for
* security. This prevents leaking trace context to potentially malicious
* third-party services.
*
* Wildcard strings (e.g. `*.supabase.co`) are matched with linear string
* operations rather than regex, avoiding ReDoS risk.
*
* @param supabaseUrl - The Supabase project URL
* @returns Array of default propagation targets
*/
function getDefaultPropagationTargets(supabaseUrl) {
	const targets = [];
	try {
		const url = new URL(supabaseUrl);
		targets.push(url.hostname);
	} catch (error) {}
	targets.push("*.supabase.co", "*.supabase.in");
	targets.push("localhost", "127.0.0.1", "[::1]");
	return targets;
}
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
			_defineProperty(e, r$1, t[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
		});
	}
	return e;
}
var resolveFetch = (customFetch) => {
	if (customFetch) return (...args) => customFetch(...args);
	return (...args) => fetch(...args);
};
var resolveHeadersConstructor = () => {
	return Headers;
};
/**
* New-format Supabase API keys (`sb_publishable_…` / `sb_secret_…`) are not JWTs and
* must never be sent as a Bearer token — they belong only in the `apikey` header.
* All other keys (legacy JWT keys, `sb_temp_…` temporary keys, unrecognized `sb_`
* subtypes) keep the Bearer fallback.
*/
var isNewApiKey = (key) => key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
var TEMP_KEY_PREFIX = "sb_temp_";
var warnedKeySubtypes = /* @__PURE__ */ new Set();
/**
* Warn (once per subtype) when an `sb_` key isn't a subtype this SDK version recognizes.
* Never throws — the server, not the SDK, decides key validity. The key value is never
* included in the message.
*/
var checkApiKeyFormat = (key) => {
	var _key$match$, _key$match;
	if (!key.startsWith("sb_") || isNewApiKey(key) || key.startsWith(TEMP_KEY_PREFIX)) return;
	const subtype = (_key$match$ = (_key$match = key.match(/^sb_[a-zA-Z0-9]+_/)) === null || _key$match === void 0 ? void 0 : _key$match[0]) !== null && _key$match$ !== void 0 ? _key$match$ : "unknown";
	if (warnedKeySubtypes.has(subtype)) return;
	warnedKeySubtypes.add(subtype);
	console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.");
};
var fetchWithAuth = (supabaseKey, supabaseUrl, getAccessToken, customFetch, tracePropagationOptions, options) => {
	const fetch$1 = resolveFetch(customFetch);
	const HeadersConstructor = resolveHeadersConstructor();
	const traceEnabled = (tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.enabled) === true;
	const respectSampling = (tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.respectSamplingDecision) !== false;
	const traceTargets = traceEnabled ? getDefaultPropagationTargets(supabaseUrl) : null;
	const allowKeyAsBearer = !((options === null || options === void 0 ? void 0 : options.omitApiKeyAsBearer) && isNewApiKey(supabaseKey));
	return async (input, init) => {
		const realToken = await getAccessToken();
		let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
		if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
		if (!headers.has("Authorization")) {
			const bearer = realToken !== null && realToken !== void 0 ? realToken : allowKeyAsBearer ? supabaseKey : null;
			if (bearer) headers.set("Authorization", `Bearer ${bearer}`);
		}
		if (traceTargets) {
			const traceHeaders = getTraceHeaders(input, traceTargets, respectSampling);
			if (traceHeaders) {
				if (traceHeaders.traceparent && !headers.has("traceparent")) headers.set("traceparent", traceHeaders.traceparent);
				if (traceHeaders.tracestate && !headers.has("tracestate")) headers.set("tracestate", traceHeaders.tracestate);
				if (traceHeaders.baggage && !headers.has("baggage")) headers.set("baggage", traceHeaders.baggage);
			}
		}
		return fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, { headers }));
	};
};
var warnedMissingTracingRuntime = false;
var warnedNonW3CPropagator = false;
function getTraceHeaders(input, targets, respectSampling) {
	const extractTraceContext = getTraceContextExtractor();
	if (!extractTraceContext) {
		if (!warnedMissingTracingRuntime) {
			warnedMissingTracingRuntime = true;
			console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.");
		}
		return null;
	}
	if (!shouldPropagateToTarget(typeof input === "string" ? input : input instanceof URL ? input : input.url, targets)) return null;
	const traceContext = extractTraceContext();
	if (!traceContext || !traceContext.traceparent) {
		var _traceContext$carrier;
		if ((traceContext === null || traceContext === void 0 || (_traceContext$carrier = traceContext.carrierKeys) === null || _traceContext$carrier === void 0 ? void 0 : _traceContext$carrier.length) && !warnedNonW3CPropagator) {
			warnedNonW3CPropagator = true;
			const sentryHint = traceContext.carrierKeys.includes("sentry-trace") ? " Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it." : " Configure your tracing SDK to emit W3C trace context on outgoing requests.";
			console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${traceContext.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.` + sentryHint);
		}
		return null;
	}
	if (respectSampling) {
		const parsed = parseTraceParent(traceContext.traceparent);
		if (parsed && !parsed.isSampled) return { traceparent: traceContext.traceparent };
	}
	return traceContext;
}
function normalizeTracePropagation(value) {
	return typeof value === "boolean" ? { enabled: value } : value;
}
function ensureTrailingSlash(url) {
	return url.endsWith("/") ? url : url + "/";
}
var warnedTopLevelSchema = false;
/**
* Warn (once per process) when `schema` is passed at the top level of the client options
* instead of under `db`. A top-level `schema` is not part of the options shape and is
* ignored, so queries silently go to the default schema. Never throws.
*
* Only `undefined` counts as unset, matching `db.schema`, where any other value is sent
* as the profile header.
*/
function checkTopLevelSchemaOption(options) {
	if (warnedTopLevelSchema) return;
	if (typeof options !== "object" || options === null || !("schema" in options) || options.schema === void 0) return;
	warnedTopLevelSchema = true;
	console.warn("@supabase/supabase-js: The \"schema\" option must be nested under \"db\", e.g. createClient(url, key, { db: { schema: 'myschema' } }). A top-level \"schema\" is ignored and queries go to the default schema.");
}
function applySettingDefaults(options, defaults) {
	var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header, _ref, _tracePropagationOpti, _ref2, _tracePropagationOpti2;
	const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
	const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
	const tracePropagationOptions = normalizeTracePropagation(options.tracePropagation);
	const DEFAULT_TRACE_PROPAGATION_OPTIONS$1 = normalizeTracePropagation(defaults.tracePropagation);
	const result = {
		db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
		auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
		realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
		storage: {},
		global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, { headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {}) }),
		tracePropagation: {
			enabled: (_ref = (_tracePropagationOpti = tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.enabled) !== null && _tracePropagationOpti !== void 0 ? _tracePropagationOpti : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === void 0 ? void 0 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.enabled) !== null && _ref !== void 0 ? _ref : false,
			respectSamplingDecision: (_ref2 = (_tracePropagationOpti2 = tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.respectSamplingDecision) !== null && _tracePropagationOpti2 !== void 0 ? _tracePropagationOpti2 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === void 0 ? void 0 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.respectSamplingDecision) !== null && _ref2 !== void 0 ? _ref2 : true
		},
		accessToken: async () => ""
	};
	if (options.accessToken) result.accessToken = options.accessToken;
	else delete result.accessToken;
	return result;
}
/**
* Validates a Supabase client URL
*
* @param {string} supabaseUrl - The Supabase client URL string.
* @returns {URL} - The validated base URL.
* @throws {Error}
*/
function validateSupabaseUrl(supabaseUrl) {
	const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
	if (!trimmedUrl) throw new Error("supabaseUrl is required.");
	if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
	try {
		return new URL(ensureTrailingSlash(trimmedUrl));
	} catch (_unused) {
		throw Error("Invalid supabaseUrl: Provided URL is malformed.");
	}
}
var SupabaseAuthClient = class extends AuthClient {
	constructor(options) {
		super(options);
	}
};
/**
* Supabase Client.
*
* An isomorphic Javascript client for interacting with Postgres.
*/
var SupabaseClient = class {
	/**
	* Create a new client for use in the browser.
	*
	* @category Initializing
	*
	* @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
	* @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
	* @param options Optional configuration for the client:
	* - `db.schema` — You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
	* - `auth.autoRefreshToken` — Set to `true` if you want to automatically refresh the token before expiring.
	* - `auth.persistSession` — Set to `true` if you want to automatically save the user session into local storage.
	* - `auth.detectSessionInUrl` — Set to `true` if you want to automatically detect OAuth grants in the URL and sign in the user.
	* - `realtime` — Options passed along to the realtime-js constructor.
	* - `storage` — Options passed along to the storage-js constructor.
	* - `global.fetch` — A custom fetch implementation.
	* - `global.headers` — Any additional headers to send with each network request.
	*
	* @example Creating a client
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Create a single supabase client for interacting with your database
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* ```
	*
	* @example With a custom domain
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Use a custom domain as the supabase URL
	* const supabase = createClient('https://my-custom-domain.com', 'your-publishable-key')
	* ```
	*
	* @example With additional parameters
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const options = {
	*   db: {
	*     schema: 'public',
	*   },
	*   auth: {
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: true
	*   },
	*   global: {
	*     headers: { 'x-my-custom-header': 'my-app-name' },
	*   },
	* }
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", options)
	* ```
	*
	* @exampleDescription With custom schemas
	* By default the API server points to the `public` schema. You can enable other database schemas within the Dashboard.
	* Go to [Settings > API > Exposed schemas](/dashboard/project/_/settings/api) and add the schema which you want to expose to the API.
	*
	* Note: each client connection can only access a single schema, so the code above can access the `other_schema` schema but cannot access the `public` schema.
	*
	* @example With custom schemas
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   // Provide a custom schema. Defaults to "public".
	*   db: { schema: 'other_schema' }
	* })
	* ```
	*
	* @exampleDescription Custom fetch implementation
	* `supabase-js` uses the runtime's global `fetch` to make HTTP requests,
	* but an alternative `fetch` implementation can be provided as an option.
	* This is useful in environments where the global `fetch` is unavailable or where you want to customize request behavior.
	*
	* @example Custom fetch implementation
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   global: { fetch: fetch.bind(globalThis) }
	* })
	* ```
	*
	* @exampleDescription React Native options with AsyncStorage
	* For React Native we recommend using `AsyncStorage` as the storage implementation for Supabase Auth.
	*
	* @example React Native options with AsyncStorage
	* ```js
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from "@react-native-async-storage/async-storage";
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: AsyncStorage,
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @exampleDescription React Native options with Expo SecureStore
	* If you wish to encrypt the user's session information, you can use `aes-js` and store the encryption key in Expo SecureStore.
	* The `aes-js` library, a reputable JavaScript-only implementation of the AES encryption algorithm in CTR mode.
	* A new 256-bit encryption key is generated using the `react-native-get-random-values` library.
	* This key is stored inside Expo's SecureStore, while the value is encrypted and placed inside AsyncStorage.
	*
	* Please make sure that:
	* - You keep the `expo-secure-store`, `aes-js` and `react-native-get-random-values` libraries up-to-date.
	* - Choose the correct [`SecureStoreOptions`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestoreoptions) for your app's needs.
	*   E.g. [`SecureStore.WHEN_UNLOCKED`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestorewhen_unlocked) regulates when the data can be accessed.
	* - Carefully consider optimizations or other modifications to the above example, as those can lead to introducing subtle security vulnerabilities.
	*
	* @example React Native options with Expo SecureStore
	* ```ts
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from '@react-native-async-storage/async-storage';
	* import * as SecureStore from 'expo-secure-store';
	* import * as aesjs from 'aes-js';
	* import 'react-native-get-random-values';
	*
	* // As Expo's SecureStore does not support values larger than 2048
	* // bytes, an AES-256 key is generated and stored in SecureStore, while
	* // it is used to encrypt/decrypt values stored in AsyncStorage.
	* class LargeSecureStore {
	*   private async _encrypt(key: string, value: string) {
	*     const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
	*     const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
	*
	*     await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
	*
	*     return aesjs.utils.hex.fromBytes(encryptedBytes);
	*   }
	*
	*   private async _decrypt(key: string, value: string) {
	*     const encryptionKeyHex = await SecureStore.getItemAsync(key);
	*     if (!encryptionKeyHex) {
	*       return encryptionKeyHex;
	*     }
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
	*     const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
	*
	*     return aesjs.utils.utf8.fromBytes(decryptedBytes);
	*   }
	*
	*   async getItem(key: string) {
	*     const encrypted = await AsyncStorage.getItem(key);
	*     if (!encrypted) { return encrypted; }
	*
	*     return await this._decrypt(key, encrypted);
	*   }
	*
	*   async removeItem(key: string) {
	*     await AsyncStorage.removeItem(key);
	*     await SecureStore.deleteItemAsync(key);
	*   }
	*
	*   async setItem(key: string, value: string) {
	*     const encrypted = await this._encrypt(key, value);
	*
	*     await AsyncStorage.setItem(key, encrypted);
	*   }
	* }
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: new LargeSecureStore(),
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @example With a database query
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	*
	* const { data } = await supabase.from('profiles').select('*')
	* ```
	*
	* @exampleDescription With OpenTelemetry tracing
	* Opt in to W3C trace context propagation so the `trace_id` from your
	* client-side spans is attached to Supabase requests and appears in API
	* Gateway and Edge Function logs. Requires `@opentelemetry/api` to be
	* installed in your application and the tracing runtime to be loaded via
	* `import '@supabase/supabase-js/tracing'`. See [Tracing with the JS SDK](https://supabase.com/docs/guides/telemetry/client-side-tracing).
	*
	* @example With OpenTelemetry tracing
	* ```ts
	* import '@supabase/supabase-js/tracing'
	* import { createClient } from '@supabase/supabase-js'
	* import { trace } from '@opentelemetry/api'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   tracePropagation: true,
	* })
	*
	* const tracer = trace.getTracer('my-app')
	*
	* await tracer.startActiveSpan('fetch-users', async (span) => {
	*   // Outgoing request carries the active trace context.
	*   const { data, error } = await supabase.from('users').select('*')
	*   span.end()
	* })
	* ```
	*/
	constructor(supabaseUrl, supabaseKey, options) {
		var _settings$auth$storag, _settings$global$head;
		this.supabaseUrl = supabaseUrl;
		this.supabaseKey = supabaseKey;
		const baseUrl = validateSupabaseUrl(supabaseUrl);
		if (!supabaseKey) throw new Error("supabaseKey is required.");
		checkApiKeyFormat(supabaseKey);
		checkTopLevelSchemaOption(options);
		this.realtimeUrl = new URL("realtime/v1", baseUrl);
		this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
		this.authUrl = new URL("auth/v1", baseUrl);
		this.storageUrl = new URL("storage/v1", baseUrl);
		this.functionsUrl = new URL("functions/v1", baseUrl);
		const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
		const DEFAULTS = {
			db: DEFAULT_DB_OPTIONS,
			realtime: DEFAULT_REALTIME_OPTIONS,
			auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, { storageKey: defaultStorageKey }),
			global: DEFAULT_GLOBAL_OPTIONS,
			tracePropagation: DEFAULT_TRACE_PROPAGATION_OPTIONS
		};
		const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
		this.settings = settings;
		this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
		this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
		if (!settings.accessToken) {
			var _settings$auth;
			this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
		} else {
			this.accessToken = settings.accessToken;
			this.auth = new Proxy({}, { get: (_, prop) => {
				throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
			} });
		}
		this.fetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getSessionToken.bind(this), settings.global.fetch, settings.tracePropagation);
		this.functionsFetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getSessionToken.bind(this), settings.global.fetch, settings.tracePropagation, { omitApiKeyAsBearer: true });
		this.realtime = this._initRealtimeClient(_objectSpread2({
			headers: this.headers,
			accessToken: this._getAccessToken.bind(this),
			fetch: this.fetch
		}, settings.realtime));
		if (this.accessToken) Promise.resolve(this.accessToken()).then((token) => this.realtime.setAuth(token)).catch((e) => console.warn("Failed to set initial Realtime auth token:", e));
		this.rest = new PostgrestClient(new URL("rest/v1", baseUrl).href, {
			headers: this.headers,
			schema: settings.db.schema,
			fetch: this.fetch,
			timeout: settings.db.timeout,
			urlLengthLimit: settings.db.urlLengthLimit,
			retry: settings.db.retry
		});
		this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
		if (!settings.accessToken) this._listenForAuthEvents();
	}
	/**
	* Supabase Functions allows you to deploy and invoke edge functions.
	*/
	get functions() {
		return new FunctionsClient(this.functionsUrl.href, {
			headers: this.headers,
			customFetch: this.functionsFetch
		});
	}
	/**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/
	from(relation) {
		return this.rest.from(relation);
	}
	/**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/
	schema(schema) {
		return this.rest.schema(schema);
	}
	/**
	* Fetch the OpenAPI description PostgREST publishes for this client's schema.
	*
	* The document lists only the tables, views and functions the caller's role
	* holds privileges on. The request carries the same `apikey` and
	* `Authorization` headers as every other query, so the description is scoped
	* to the signed-in user. Call `.schema()` first to describe a schema other
	* than the client default.
	*
	* @example
	* ```ts
	* const { data, error } = await supabase.getOpenApiSpec()
	* ```
	*/
	getOpenApiSpec() {
		return this.rest.getOpenApiSpec();
	}
	/**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/
	rpc(fn, args = {}, options = {
		head: false,
		get: false,
		count: void 0
	}) {
		return this.rest.rpc(fn, args, options);
	}
	/**
	* Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	*
	* @param {string} name - The name of the Realtime channel.
	* @param {Object} opts - The options to pass to the Realtime channel.
	*
	* @category Realtime
	*/
	channel(name, opts = { config: {} }) {
		return this.realtime.channel(name, opts);
	}
	/**
	* Returns all Realtime channels.
	*
	* @category Realtime
	*
	* @example Get all channels
	* ```js
	* const channels = supabase.getChannels()
	* ```
	*/
	getChannels() {
		return this.realtime.getChannels();
	}
	/**
	* Unsubscribes and removes Realtime channel from Realtime client.
	*
	* @param {RealtimeChannel} channel - The name of the Realtime channel.
	*
	*
	* @category Realtime
	*
	* @remarks
	* - Removing a channel is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Removes a channel
	* ```js
	* supabase.removeChannel(myChannel)
	* ```
	*/
	removeChannel(channel) {
		return this.realtime.removeChannel(channel);
	}
	/**
	* Unsubscribes and removes all Realtime channels from Realtime client.
	*
	* @category Realtime
	*
	* @remarks
	* - Removing channels is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Remove all channels
	* ```js
	* supabase.removeAllChannels()
	* ```
	*/
	removeAllChannels() {
		return this.realtime.removeAllChannels();
	}
	/**
	* The raw session token — the custom `accessToken` result or the signed-in user's JWT —
	* or `null` when there is no session. Unlike {@link _getAccessToken} it does not fall back
	* to `supabaseKey`, so callers can distinguish "no session" from "has session".
	*/
	async _getSessionToken() {
		var _this = this;
		var _data$session$access_, _data$session;
		if (_this.accessToken) return await _this.accessToken();
		const { data } = await _this.auth.getSession();
		return (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : null;
	}
	async _getAccessToken() {
		var _this2 = this;
		var _await$this$_getSessi;
		return (_await$this$_getSessi = await _this2._getSessionToken()) !== null && _await$this$_getSessi !== void 0 ? _await$this$_getSessi : _this2.supabaseKey;
	}
	_initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError, experimental, lockAcquireTimeout, skipAutoInitialize }, headers, fetch$1) {
		const authHeaders = {
			Authorization: `Bearer ${this.supabaseKey}`,
			apikey: `${this.supabaseKey}`
		};
		return new SupabaseAuthClient({
			url: this.authUrl.href,
			headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
			storageKey,
			autoRefreshToken,
			persistSession,
			detectSessionInUrl,
			storage,
			userStorage,
			flowType,
			lock,
			debug,
			throwOnError,
			experimental,
			fetch: fetch$1,
			lockAcquireTimeout,
			skipAutoInitialize,
			hasCustomAuthorizationHeader: Object.keys(this.headers).some((key) => key.toLowerCase() === "authorization")
		});
	}
	_initRealtimeClient(options) {
		return new RealtimeClient(this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, { params: _objectSpread2(_objectSpread2({}, { apikey: this.supabaseKey }), options === null || options === void 0 ? void 0 : options.params) }));
	}
	_listenForAuthEvents() {
		return this.auth.onAuthStateChange((event, session) => {
			this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
		});
	}
	_handleTokenChanged(event, source, token) {
		if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN" || event === "INITIAL_SESSION") && this.changedAccessToken !== token) {
			this.changedAccessToken = token;
			this.realtime.setAuth(token);
		} else if (event === "SIGNED_OUT") {
			this.realtime.setAuth();
			if (source == "STORAGE") this.auth.signOut();
			this.changedAccessToken = void 0;
		}
	}
};
/**
* Creates a new Supabase Client.
*
* @example Creating a Supabase client
* ```ts
* import { createClient } from '@supabase/supabase-js'
*
* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
* const { data, error } = await supabase.from('profiles').select('*')
* ```
*/
var createClient = (supabaseUrl, supabaseKey, options) => {
	return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
	if (typeof window !== "undefined" || globalThis["Deno"] !== void 0) return false;
	const _process = globalThis["process"];
	if (!_process) return false;
	const processVersion = _process["version"];
	if (processVersion === void 0 || processVersion === null) return false;
	const versionMatch = processVersion.match(/^v(\d+)\./);
	if (!versionMatch) return false;
	return parseInt(versionMatch[1], 10) <= 20;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
//#endregion
export { createClient as n, __exportAll as t };
