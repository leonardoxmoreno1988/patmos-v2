import { i as __toESM } from "../_runtime.mjs";
import { n as linkifyScriptureMarkdown } from "./scripture-refs-Cn_GoRyO.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as supabase } from "./notes-BgCmovsq.mjs";
import { D as Check, S as Copy, T as ChevronLeft, _ as History, b as CreditCard, h as LoaderCircle, j as ArrowDown, l as RotateCcw, n as Trash2, o as Square, s as Settings, t as X, u as Printer, x as CornerDownLeft } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Xi } from "../_libs/streamdown+[...].mjs";
import { _ as SheetTitle, a as DialogDescription, c as DialogTitle, g as SheetDescription, h as SheetContent, i as DialogContent, m as Sheet, n as Button, o as DialogFooter, p as PatmosWordmark, r as Dialog, s as DialogHeader, x as cn } from "./site-header-B8hZvSt8.mjs";
import { n as useStickToBottomContext, t as StickToBottom } from "../_libs/use-stick-to-bottom.mjs";
import { t as B } from "../_libs/@streamdown/cjk+[...].mjs";
import { t as G } from "../_libs/shiki+streamdown__code.mjs";
import { t as h } from "../_libs/@streamdown/math+[...].mjs";
import { t as f } from "../_libs/@streamdown/mermaid+[...].mjs";
import { t as nanoid } from "../_libs/nanoid.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consulta-patmos-Dw_QpIE_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Glifo de las Escrituras (libro abierto con columnas de texto).
* Geometría original de `sacred-scriptures.svg`, normalizada a un lienzo de 512
* y pintada con `currentColor` para que herede el tono del tema.
*/
function SacredScripturesIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 512 512",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 30,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "translate(0,512) scale(1,-1)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(256,378.875)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m 0,0 v -305.75 c 0,33.28 -26.97,60.25 -60.25,60.25 H -241 V 60 H -60 C -26.86,60 0,33.14 0,0 Z" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(497,438.875)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m 0,0 v -305.5 h -180.75 c -16.64,0 -31.7,-6.74 -42.61,-17.64 -10.9,-10.91 -17.64,-25.97 -17.64,-42.61 V -60 c 0,33.14 26.86,60 60,60 z" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(75.25,344.25)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H 120.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(75.25,284)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H 120.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(75.25,223.75)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H 120.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(316.25,344.25)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H 120.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(316.25,284)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H 120.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(316.25,223.75)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H 120.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(256,73.125)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M 0,0 H -241 V 60.25 H -60.25 C -26.97,60.25 0,33.28 0,0 Z" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(497,133.375)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m 0,0 v -60.25 h -241 c 0,16.64 6.74,31.7 17.64,42.61 10.91,10.9 25.97,17.64 42.61,17.64 z" })
				})
			]
		})
	});
}
var Conversation = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom, {
	className: cn("relative flex-1 overflow-y-hidden", className),
	initial: "smooth",
	resize: "smooth",
	role: "log",
	...props
});
var ConversationContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom.Content, {
	className: cn("flex flex-col gap-8 p-4", className),
	...props
});
var ConversationScrollButton = ({ className, ...props }) => {
	const { isAtBottom, scrollToBottom } = useStickToBottomContext();
	const handleScrollToBottom = (0, import_react.useCallback)(() => {
		scrollToBottom();
	}, [scrollToBottom]);
	return !isAtBottom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: cn("absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full dark:bg-background dark:hover:bg-muted", className),
		onClick: handleScrollToBottom,
		size: "icon",
		type: "button",
		variant: "outline",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
	});
};
var Message = ({ className, from, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("group flex w-full max-w-[95%] flex-col gap-2", from === "user" ? "is-user ml-auto justify-end" : "is-assistant", className),
	...props
});
var MessageContent = ({ children, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm", "group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground", "group-[.is-assistant]:text-foreground", className),
	...props,
	children
});
(0, import_react.createContext)(null);
var streamdownPlugins = {
	cjk: B,
	code: G,
	math: h,
	mermaid: f
};
var MessageResponse = (0, import_react.memo)(({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Xi, {
	className: cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className),
	plugins: streamdownPlugins,
	...props
}), (prevProps, nextProps) => prevProps.children === nextProps.children && nextProps.isAnimating === prevProps.isAnimating);
MessageResponse.displayName = "MessageResponse";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]", "h-9 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1", "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", className),
		...props
	});
}
var inputGroupAddonVariants = cva("text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
		"block-end": "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupTextarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		"data-slot": "input-group-control",
		className: cn("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent", className),
		...props
	});
}
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
var convertBlobUrlToDataUrl = async (url) => {
	try {
		const blob = await (await fetch(url)).blob();
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};
var PromptInputController = (0, import_react.createContext)(null);
var ProviderAttachmentsContext = (0, import_react.createContext)(null);
var useOptionalPromptInputController = () => (0, import_react.useContext)(PromptInputController);
var useOptionalProviderAttachments = () => (0, import_react.useContext)(ProviderAttachmentsContext);
var LocalAttachmentsContext = (0, import_react.createContext)(null);
var usePromptInputAttachments = () => {
	const provider = useOptionalProviderAttachments();
	const context = (0, import_react.useContext)(LocalAttachmentsContext) ?? provider;
	if (!context) throw new Error("usePromptInputAttachments must be used within a PromptInput or PromptInputProvider");
	return context;
};
var LocalReferencedSourcesContext = (0, import_react.createContext)(null);
var PromptInput = ({ className, accept, multiple, globalDrop, syncHiddenInput, maxFiles, maxFileSize, onError, onSubmit, children, ...props }) => {
	const controller = useOptionalPromptInputController();
	const usingProvider = !!controller;
	const inputRef = (0, import_react.useRef)(null);
	const formRef = (0, import_react.useRef)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	const files = usingProvider ? controller.attachments.files : items;
	const [referencedSources, setReferencedSources] = (0, import_react.useState)([]);
	const filesRef = (0, import_react.useRef)(files);
	(0, import_react.useEffect)(() => {
		filesRef.current = files;
	}, [files]);
	const openFileDialogLocal = (0, import_react.useCallback)(() => {
		inputRef.current?.click();
	}, []);
	const matchesAccept = (0, import_react.useCallback)((f) => {
		if (!accept || accept.trim() === "") return true;
		return accept.split(",").map((s) => s.trim()).filter(Boolean).some((pattern) => {
			if (pattern.endsWith("/*")) {
				const prefix = pattern.slice(0, -1);
				return f.type.startsWith(prefix);
			}
			return f.type === pattern;
		});
	}, [accept]);
	const addLocal = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		setItems((prev) => {
			const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - prev.length) : void 0;
			const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
			if (typeof capacity === "number" && sized.length > capacity) onError?.({
				code: "max_files",
				message: "Too many files. Some were not added."
			});
			const next = [];
			for (const file of capped) next.push({
				filename: file.name,
				id: nanoid(),
				mediaType: file.type,
				type: "file",
				url: URL.createObjectURL(file)
			});
			return [...prev, ...next];
		});
	}, [
		matchesAccept,
		maxFiles,
		maxFileSize,
		onError
	]);
	const removeLocal = (0, import_react.useCallback)((id) => setItems((prev) => {
		const found = prev.find((file) => file.id === id);
		if (found?.url) URL.revokeObjectURL(found.url);
		return prev.filter((file) => file.id !== id);
	}), []);
	const addWithProviderValidation = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		const currentCount = files.length;
		const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - currentCount) : void 0;
		const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
		if (typeof capacity === "number" && sized.length > capacity) onError?.({
			code: "max_files",
			message: "Too many files. Some were not added."
		});
		if (capped.length > 0) controller?.attachments.add(capped);
	}, [
		matchesAccept,
		maxFileSize,
		maxFiles,
		onError,
		files.length,
		controller
	]);
	const clearAttachments = (0, import_react.useCallback)(() => usingProvider ? controller?.attachments.clear() : setItems((prev) => {
		for (const file of prev) if (file.url) URL.revokeObjectURL(file.url);
		return [];
	}), [usingProvider, controller]);
	const clearReferencedSources = (0, import_react.useCallback)(() => setReferencedSources([]), []);
	const add = usingProvider ? addWithProviderValidation : addLocal;
	const remove = usingProvider ? controller.attachments.remove : removeLocal;
	const openFileDialog = usingProvider ? controller.attachments.openFileDialog : openFileDialogLocal;
	const clear = (0, import_react.useCallback)(() => {
		clearAttachments();
		clearReferencedSources();
	}, [clearAttachments, clearReferencedSources]);
	(0, import_react.useEffect)(() => {
		if (!usingProvider) return;
		controller.__registerFileInput(inputRef, () => inputRef.current?.click());
	}, [usingProvider, controller]);
	(0, import_react.useEffect)(() => {
		if (syncHiddenInput && inputRef.current && files.length === 0) inputRef.current.value = "";
	}, [files, syncHiddenInput]);
	(0, import_react.useEffect)(() => {
		const form = formRef.current;
		if (!form) return;
		if (globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		form.addEventListener("dragover", onDragOver);
		form.addEventListener("drop", onDrop);
		return () => {
			form.removeEventListener("dragover", onDragOver);
			form.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => {
		if (!globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		document.addEventListener("dragover", onDragOver);
		document.addEventListener("drop", onDrop);
		return () => {
			document.removeEventListener("dragover", onDragOver);
			document.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => () => {
		if (!usingProvider) {
			for (const f of filesRef.current) if (f.url) URL.revokeObjectURL(f.url);
		}
	}, [usingProvider]);
	const handleChange = (0, import_react.useCallback)((event) => {
		if (event.currentTarget.files) add(event.currentTarget.files);
		event.currentTarget.value = "";
	}, [add]);
	const attachmentsCtx = (0, import_react.useMemo)(() => ({
		add,
		clear: clearAttachments,
		fileInputRef: inputRef,
		files: files.map((item) => ({
			...item,
			id: item.id
		})),
		openFileDialog,
		remove
	}), [
		files,
		add,
		remove,
		clearAttachments,
		openFileDialog
	]);
	const refsCtx = (0, import_react.useMemo)(() => ({
		add: (incoming) => {
			const array = Array.isArray(incoming) ? incoming : [incoming];
			setReferencedSources((prev) => [...prev, ...array.map((s) => ({
				...s,
				id: nanoid()
			}))]);
		},
		clear: clearReferencedSources,
		remove: (id) => {
			setReferencedSources((prev) => prev.filter((s) => s.id !== id));
		},
		sources: referencedSources
	}), [referencedSources, clearReferencedSources]);
	const handleSubmit = (0, import_react.useCallback)(async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const text = usingProvider ? controller.textInput.value : (() => {
			return new FormData(form).get("message") || "";
		})();
		if (!usingProvider) form.reset();
		try {
			const result = onSubmit({
				files: await Promise.all(files.map(async ({ id: _id, ...item }) => {
					if (item.url?.startsWith("blob:")) {
						const dataUrl = await convertBlobUrlToDataUrl(item.url);
						return {
							...item,
							url: dataUrl ?? item.url
						};
					}
					return item;
				})),
				text
			}, event);
			if (result instanceof Promise) try {
				await result;
				clear();
				if (usingProvider) controller.textInput.clear();
			} catch {}
			else {
				clear();
				if (usingProvider) controller.textInput.clear();
			}
		} catch {}
	}, [
		usingProvider,
		controller,
		files,
		onSubmit,
		clear
	]);
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		accept,
		"aria-label": "Upload files",
		className: "hidden",
		multiple,
		onChange: handleChange,
		ref: inputRef,
		title: "Upload files",
		type: "file"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: cn("w-full", className),
		onSubmit: handleSubmit,
		ref: formRef,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
			className: "overflow-hidden",
			children
		})
	})] });
	const withReferencedSources = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalReferencedSourcesContext.Provider, {
		value: refsCtx,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalAttachmentsContext.Provider, {
		value: attachmentsCtx,
		children: withReferencedSources
	});
};
var PromptInputTextarea = ({ onChange, onKeyDown, className, placeholder = "What would you like to know?", ...props }) => {
	const controller = useOptionalPromptInputController();
	const attachments = usePromptInputAttachments();
	const [isComposing, setIsComposing] = (0, import_react.useState)(false);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		onKeyDown?.(e);
		if (e.defaultPrevented) return;
		if (e.key === "Enter") {
			if (isComposing || e.nativeEvent.isComposing) return;
			if (e.shiftKey) return;
			e.preventDefault();
			const { form } = e.currentTarget;
			if ((form?.querySelector("button[type=\"submit\"]"))?.disabled) return;
			form?.requestSubmit();
		}
		if (e.key === "Backspace" && e.currentTarget.value === "" && attachments.files.length > 0) {
			e.preventDefault();
			const lastAttachment = attachments.files.at(-1);
			if (lastAttachment) attachments.remove(lastAttachment.id);
		}
	}, [
		onKeyDown,
		isComposing,
		attachments
	]);
	const handlePaste = (0, import_react.useCallback)((event) => {
		const items = event.clipboardData?.items;
		if (!items) return;
		const files = [];
		for (const item of items) if (item.kind === "file") {
			const file = item.getAsFile();
			if (file) files.push(file);
		}
		if (files.length > 0) {
			event.preventDefault();
			attachments.add(files);
		}
	}, [attachments]);
	const handleCompositionEnd = (0, import_react.useCallback)(() => setIsComposing(false), []);
	const handleCompositionStart = (0, import_react.useCallback)(() => setIsComposing(true), []);
	const controlledProps = controller ? {
		onChange: (e) => {
			controller.textInput.setInput(e.currentTarget.value);
			onChange?.(e);
		},
		value: controller.textInput.value
	} : { onChange };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupTextarea, {
		className: cn("field-sizing-content max-h-48 min-h-16", className),
		name: "message",
		onCompositionEnd: handleCompositionEnd,
		onCompositionStart: handleCompositionStart,
		onKeyDown: handleKeyDown,
		onPaste: handlePaste,
		placeholder,
		...props,
		...controlledProps
	});
};
var PromptInputFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
	align: "block-end",
	className: cn("justify-between gap-1", className),
	...props
});
var PromptInputSubmit = ({ className, variant = "default", size = "icon-sm", status, onStop, onClick, children, ...props }) => {
	const isGenerating = status === "submitted" || status === "streaming";
	let Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "size-4" });
	if (status === "submitted") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
	else if (status === "streaming") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" });
	else if (status === "error") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" });
	const handleClick = (0, import_react.useCallback)((e) => {
		if (isGenerating && onStop) {
			e.preventDefault();
			onStop();
			return;
		}
		onClick?.(e);
	}, [
		isGenerating,
		onStop,
		onClick
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
		"aria-label": isGenerating ? "Stop" : "Submit",
		className: cn(className),
		onClick: handleClick,
		size,
		type: isGenerating && onStop ? "button" : "submit",
		variant,
		...props,
		children: children ?? Icon
	});
};
var motionComponentCache = /* @__PURE__ */ new Map();
var getMotionComponent = (element) => {
	let component = motionComponentCache.get(element);
	if (!component) {
		component = motion.create(element);
		motionComponentCache.set(element, component);
	}
	return component;
};
var ShimmerComponent = ({ children, as: Component = "p", className, duration = 2, spread = 2 }) => {
	const MotionComponent = getMotionComponent(Component);
	const dynamicSpread = (0, import_react.useMemo)(() => (children?.length ?? 0) * spread, [children, spread]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionComponent, {
		animate: { backgroundPosition: "0% center" },
		className: cn("relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent", "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]", className),
		initial: { backgroundPosition: "100% center" },
		style: {
			"--spread": `${dynamicSpread}px`,
			backgroundImage: "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))"
		},
		transition: {
			duration,
			ease: "linear",
			repeat: Number.POSITIVE_INFINITY
		},
		children
	});
};
var Shimmer = (0, import_react.memo)(ShimmerComponent);
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var STARTERS = [
	"¿Cuál es el contexto histórico de este capítulo?",
	"Ver análisis del texto original (Reina Valera 1865)",
	"Referencias cruzadas clave para este pasaje"
];
var GLOBAL_STARTERS = [
	"¿Qué enseña la Escritura sobre el pacto con Abraham?",
	"Analiza la esperanza de la resurrección en ambos Testamentos",
	"Referencias cruzadas clave sobre la segunda venida de Cristo"
];
var CHECKOUT_URL = (userId) => `https://patmos.lemonsqueezy.com/checkout/buy/4beafe1a-6811-457e-b7b5-02e216f8aeef?checkout[custom][user_id]=${encodeURIComponent(userId)}&embed=1`;
async function authHeaders() {
	const { data } = await supabase.auth.getSession();
	const token = data.session?.access_token;
	return token ? { Authorization: `Bearer ${token}` } : {};
}
function extractDelta(payload) {
	try {
		const j = JSON.parse(payload);
		if (typeof j === "string") return j;
		return j?.choices?.[0]?.delta?.content ?? j?.delta?.text ?? j?.delta ?? j?.text ?? j?.content ?? "";
	} catch {
		return payload;
	}
}
function formatTs(ts) {
	if (!ts) return "";
	const d = new Date(ts);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleDateString("es", {
		day: "numeric",
		month: "short"
	});
}
function ConsultaPatmos(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: props.open,
		onOpenChange: props.onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col gap-0 p-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-5 pb-3 pt-4 pr-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Consultas Patmos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
						className: "sr-only",
						children: "Análisis Exegético y contexto histórico del texto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatmosWordmark, { className: "h-3.5" })
				]
			}), props.userId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultaChat, {
				...props,
				userId: props.userId
			}, props.userId) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Inicia sesión para realizar consultas y conservar tus Registros Históricos."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: props.onRequireAuth,
					className: "h-9 rounded-full bg-[#000f37] px-5 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-[#000f37]",
					children: "Iniciar Sesión"
				})]
			})]
		})
	});
}
function ConsultaChat({ userId, book, chapter, verses, chapterText, chapterNotes, onOpenChange, initialView, initialScope }) {
	const navigate = useNavigate();
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [view, setView] = (0, import_react.useState)(initialView ?? "chat");
	const [sessions, setSessions] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("ready");
	const [error, setError] = (0, import_react.useState)(null);
	const [hasCredits, setHasCredits] = (0, import_react.useState)(true);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [confirmPurge, setConfirmPurge] = (0, import_react.useState)(false);
	const [purging, setPurging] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [pendingExternal, setPendingExternal] = (0, import_react.useState)(null);
	const [scope, setScope] = (0, import_react.useState)(initialScope ?? (book ? "passage" : "bible"));
	const abortRef = (0, import_react.useRef)(null);
	const textareaRef = (0, import_react.useRef)(null);
	const passage = `${book} ${chapter}${verses.length ? `:${verses.length > 3 ? `${verses[0]}–${verses[verses.length - 1]}` : verses.join(", ")}` : ""}`;
	const usingPassage = scope === "passage" && Boolean(book);
	const fetchSessions = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetch("/api/history", { headers: await authHeaders() });
			if (!res.ok) throw new Error(String(res.status));
			const json = await res.json();
			const rows = Array.isArray(json) ? json : json.history ?? json.data ?? [];
			setSessions(rows.filter((r) => r.user_query).map((r, i) => ({
				id: r.id ?? `h${i}`,
				user_query: r.user_query,
				bot_response: r.bot_response ?? "",
				created_at: r.created_at
			})));
		} catch {
			setSessions([]);
			setError("No pudimos cargar los Registros Históricos.");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (initialView === "history") fetchSessions();
	}, [initialView, fetchSessions]);
	const openHistory = () => {
		setView("history");
		setConfirmPurge(false);
		setSettingsOpen(false);
		if (sessions === null) fetchSessions();
	};
	const loadSession = (s) => {
		stop();
		setError(null);
		setMessages([{
			id: `${s.id}-u`,
			role: "user",
			text: s.user_query
		}, ...s.bot_response ? [{
			id: `${s.id}-a`,
			role: "assistant",
			text: s.bot_response
		}] : []]);
		setView("chat");
	};
	const nuevaConsulta = () => {
		stop();
		setError(null);
		setMessages([]);
		setView("chat");
	};
	const busy = status === "submitted" || status === "streaming";
	(0, import_react.useEffect)(() => {
		if (!busy && view === "chat") textareaRef.current?.focus();
	}, [busy, view]);
	const stop = (0, import_react.useCallback)(() => {
		abortRef.current?.abort();
		abortRef.current = null;
		setStatus("ready");
	}, []);
	const send = async (text) => {
		const t = text.trim();
		if (!t || busy) return;
		if (!hasCredits) return;
		setError(null);
		const userMsg = {
			id: crypto.randomUUID(),
			role: "user",
			text: t
		};
		const asstId = crypto.randomUUID();
		setMessages((m) => [...m, userMsg]);
		setStatus("submitted");
		const ctrl = new AbortController();
		abortRef.current = ctrl;
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				signal: ctrl.signal,
				headers: {
					"Content-Type": "application/json",
					...await authHeaders()
				},
				body: JSON.stringify({
					messages: [{
						role: "user",
						content: scope === "passage" ? `[Pasaje: ${passage}] ${t}` : t
					}],
					...scope === "passage" ? { readerContext: `<ACTIVE_READER_CONTEXT>\n[Libro: ${book} | Capítulo: ${chapter}]\n\n=== TEXTO BÍBLICO DEL CAPÍTULO ACTUAL ===\n${chapterText || "(no disponible)"}\n\n=== NOTAS DE ESTUDIO VISIBLES EN PANTALLA ===\n${chapterNotes || "(sin notas para este capítulo)"}\n</ACTIVE_READER_CONTEXT>` } : {}
				})
			});
			if (res.status === 429) {
				setHasCredits(false);
				setStatus("ready");
				return;
			}
			if (res.status === 401) throw new Error("Inicia sesión de nuevo para consultar.");
			if (!res.ok || !res.body) {
				const j = await res.json().catch(() => null);
				throw new Error(j?.error ?? "No pudimos completar la consulta. Inténtalo de nuevo.");
			}
			const isSSE = (res.headers.get("content-type") ?? "").includes("event-stream");
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let acc = "";
			let buf = "";
			setMessages((m) => [...m, {
				id: asstId,
				role: "assistant",
				text: ""
			}]);
			setStatus("streaming");
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value, { stream: true });
				if (isSSE) {
					buf += chunk;
					const lines = buf.split("\n");
					buf = lines.pop() ?? "";
					for (const line of lines) {
						if (!line.startsWith("data:")) continue;
						const data = line.slice(5).trim();
						if (!data || data === "[DONE]") continue;
						acc += extractDelta(data);
					}
				} else acc += chunk;
				const snapshot = acc;
				setMessages((m) => m.map((x) => x.id === asstId ? {
					...x,
					text: snapshot
				} : x));
			}
			setStatus("ready");
			setSessions(null);
		} catch (e) {
			if (e.name === "AbortError") return;
			setError(e.message || "No pudimos completar la consulta.");
			setStatus("error");
		} finally {
			abortRef.current = null;
		}
	};
	const purge = async () => {
		if (purging) return;
		setPurging(true);
		stop();
		try {
			if (!(await fetch("/api/history", {
				method: "DELETE",
				headers: await authHeaders()
			})).ok) throw new Error();
			setSessions([]);
			setMessages([]);
			setView("chat");
			setConfirmPurge(false);
			setSettingsOpen(false);
		} catch {
			setError("No pudimos borrar los Registros Históricos.");
			setConfirmPurge(false);
			setSettingsOpen(false);
		} finally {
			setPurging(false);
		}
	};
	const openBilling = async () => {
		const win = window.open("", "_blank");
		try {
			const res = await fetch("/api/billing", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...await authHeaders()
				},
				body: JSON.stringify({ userId })
			});
			const json = await res.json();
			const url = json.url ?? json.portalUrl ?? json.portal_url;
			if (!res.ok || !url) throw new Error();
			if (win) win.location.href = url;
			else window.open(url, "_blank", "noopener");
		} catch {
			win?.close();
			setError("No pudimos abrir la gestión de suscripción.");
		}
	};
	const copy = async (m) => {
		await navigator.clipboard.writeText(m.text);
		setCopied(m.id);
		setTimeout(() => setCopied(null), 1500);
	};
	const print = (m) => {
		const html = document.getElementById(`patmos-${m.id}`)?.innerHTML ?? m.text;
		const w = window.open("", "_blank");
		if (!w) return;
		w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Consultas Patmos — ${passage}</title>
<style>body{font-family:Georgia,serif;max-width:680px;margin:48px auto;padding:0 24px;color:#111;line-height:1.65}
h1{font-size:20px;border-bottom:1px solid #ccc;padding-bottom:8px}blockquote{border-left:3px solid #b8964f;margin:12px 0;padding-left:12px;font-style:italic}
a{color:inherit}.meta{font-size:12px;color:#666}</style></head><body>
<h1>Consultas Patmos · Análisis Exegético</h1><p class="meta">Pasaje: ${passage} · ${(/* @__PURE__ */ new Date()).toLocaleDateString("es")}</p>${html}</body></html>`);
		w.document.close();
		w.focus();
		w.print();
	};
	const navigateInternal = (0, import_react.useCallback)((href) => {
		onOpenChange(false);
		const [path, hash] = href.split("#");
		const leer = path?.match(/^\/leer\/([^/]+)\/([^/]+)/);
		if (leer) navigate({
			to: "/leer/$libro/$cap",
			params: {
				libro: leer[1],
				cap: leer[2]
			},
			...hash ? { hash } : {}
		});
		else navigate({ href });
	}, [navigate, onOpenChange]);
	const markdownComponents = (0, import_react.useMemo)(() => ({ a: ({ href, children, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		...rest,
		onClick: (e) => {
			if (!href) return;
			if (href.startsWith("/") || href.startsWith("#")) {
				e.preventDefault();
				navigateInternal(href);
				return;
			}
			if (/^https?:\/\//i.test(href)) {
				e.preventDefault();
				setPendingExternal(href);
			}
		},
		children
	}) }), [navigateInternal]);
	const lastIsUser = messages[messages.length - 1]?.role === "user";
	if (view === "history") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 border-b border-border px-5 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView("chat"),
					className: "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Volver"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: "Registros Históricos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					open: settingsOpen,
					onOpenChange: (next) => {
						setSettingsOpen(next);
						if (!next) setConfirmPurge(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Opciones de los Registros Históricos",
							className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						align: "end",
						className: "w-72 rounded-2xl p-1.5",
						children: confirmPurge ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-snug text-foreground",
									children: "¿Está seguro de que desea eliminar todo su historial de consultas?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-muted-foreground",
									children: "Se borrarán todas las consultas guardadas. Esta acción no se puede deshacer."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setConfirmPurge(false),
										className: "rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void purge(),
										disabled: purging,
										className: "rounded-full bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-60",
										children: purging ? "Borrando..." : "Sí, borrar todo"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setConfirmPurge(true),
							className: "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 shrink-0" }), "Limpiar registros históricos"]
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3 py-3",
			children: sessions === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, {
				className: "px-2 pt-4 text-sm",
				children: "Consultando los registros..."
			}) : sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 pt-6 text-center text-sm text-muted-foreground",
				children: "Aún no tienes consultas guardadas."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: sessions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => loadSession(s),
					className: "flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-foreground/[0.05]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate text-sm text-foreground",
						children: s.user_query
					}), s.created_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs text-muted-foreground",
						children: formatTs(s.created_at)
					}) : null]
				}) }, s.id))
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 px-5 py-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: usingPassage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Pasaje: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: passage
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Modo: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: "Toda la Escritura"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: openHistory,
						"aria-label": "Registros Históricos",
						title: "Historial",
						className: "inline-flex h-7 items-center justify-center gap-1 rounded-full px-2 hover:bg-accent hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Historial"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void openBilling(),
						"aria-label": "Gestionar suscripción",
						title: "Gestionar suscripción",
						className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-3.5 w-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: nuevaConsulta,
						"aria-label": "Nueva Consulta",
						title: "Nueva Consulta",
						className: "inline-flex h-7 items-center justify-center gap-1 rounded-full px-2 hover:bg-accent hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Nueva Consulta"
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1.5 border-b border-border px-5 pb-2.5 pt-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Alcance del contexto",
				className: "flex w-full items-center gap-1 rounded-full bg-foreground/[0.05] p-1",
				children: [...book ? [{
					id: "passage",
					label: `Pasaje Activo (${book} ${chapter})`,
					short: "Pasaje Activo"
				}] : [], {
					id: "bible",
					label: "Toda la Biblia",
					short: "Toda la Biblia"
				}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": scope === opt.id,
					onClick: () => setScope(opt.id),
					className: `min-w-0 flex-1 truncate rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${scope === opt.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate sm:hidden",
						children: opt.short
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden truncate sm:inline",
						children: opt.label
					})]
				}, opt.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Conversation, {
			className: "min-h-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConversationContent, {
				className: "gap-6 px-5",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3 pt-2 text-center sm:gap-5 sm:pt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SacredScripturesIcon, { className: "h-11 w-11 text-muted-foreground/70 dark:text-primary/35 sm:h-16 sm:w-16" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm text-muted-foreground",
								children: usingPassage ? `Plantea una duda sobre ${book} ${chapter}.` : "Consulta temas exegéticos y proféticos en toda la Escritura."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex w-full flex-col gap-2",
								children: (usingPassage ? STARTERS : GLOBAL_STARTERS).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void send(s),
									className: "rounded-xl bg-foreground/[0.04] px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-foreground/[0.08] sm:py-3",
									children: s
								}, s))
							})
						]
					}) : null,
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
						from: m.role,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent, {
							className: m.role === "user" ? "group-[.is-user]:bg-[#000f37] group-[.is-user]:text-white dark:group-[.is-user]:bg-[#2c2944] dark:group-[.is-user]:text-[#e9e7f1]" : "text-[15px] leading-relaxed [&_blockquote]:border-l-2 [&_blockquote]:border-[#d9b36a] [&_blockquote]:pl-3 [&_blockquote]:italic [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2",
							children: m.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: `patmos-${m.id}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageResponse, {
									components: markdownComponents,
									children: linkifyScriptureMarkdown(m.text)
								})
							}), m.text && !(busy && m.id === messages[messages.length - 1]?.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void copy(m),
									className: "inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground",
									children: [copied === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copied === m.id ? "Copiado" : "Copiar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => print(m),
									className: "inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-accent hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3 w-3" }), " Imprimir"]
								})]
							}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap",
								children: m.text
							})
						})
					}, m.id)),
					status === "submitted" || status === "streaming" && lastIsUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, {
						className: "text-sm",
						children: "Consultando las fuentes exegéticas..."
					}) : null,
					!hasCredits ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-[#d9b36a]/40 bg-[#d9b36a]/10 p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: "Has alcanzado el límite de consultas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "Suscríbete a Patmos para continuar con tu Análisis Exegético sin límites."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: CHECKOUT_URL(userId),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "lemonsqueezy-button mt-3 inline-flex h-9 items-center rounded-full bg-[#000f37] px-4 text-sm font-medium text-white hover:opacity-90 dark:bg-[#d9b36a] dark:text-[#141321]",
								children: "Ampliar consultas"
							})
						]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: error
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationScrollButton, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border p-3 sm:p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptInput, {
				onSubmit: ({ text }) => void send(text),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputTextarea, {
					ref: textareaRef,
					placeholder: "Escribe una duda de estudio o pasaje...",
					disabled: !hasCredits
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputFooter, {
					className: "justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputSubmit, {
						status,
						onStop: stop,
						disabled: !hasCredits
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: pendingExternal !== null,
			onOpenChange: (o) => {
				if (!o) setPendingExternal(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "rounded-2xl sm:max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "¿Abrir enlace externo?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: pendingExternal ? `Este enlace lleva a un sitio fuera de RVNotas (${new URL(pendingExternal).hostname}) y se abrirá en una pestaña nueva.` : "Este enlace lleva a un sitio fuera de RVNotas y se abrirá en una pestaña nueva." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPendingExternal(null),
						className: "rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (pendingExternal) window.open(pendingExternal, "_blank", "noopener,noreferrer");
							setPendingExternal(null);
						},
						className: "rounded-full bg-[#000f37] px-4 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-[#d9b36a] dark:text-[#141321]",
						children: "Abrir enlace"
					})]
				})]
			})
		})
	] });
}
//#endregion
export { PopoverTrigger as i, Popover as n, PopoverContent as r, ConsultaPatmos as t };
