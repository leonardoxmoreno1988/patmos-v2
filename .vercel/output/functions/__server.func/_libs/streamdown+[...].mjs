import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { l as require_react_dom, u as require_react } from "./@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./@radix-ui/react-collection+[...].mjs";
import { n as clsx } from "./class-variance-authority+clsx.mjs";
import { c as SKIP, l as visitParents, n as visit } from "./@streamdown/cjk+[...].mjs";
import { o as VFile } from "./@streamdown/math+[...].mjs";
import { t as harden } from "./rehype-harden.mjs";
import { t as rehypeRaw } from "./rehype-raw.mjs";
import { n as defaultSchema } from "./hast-util-sanitize.mjs";
import { t as rehypeSanitize } from "./rehype-sanitize.mjs";
import { t as remarkGfm } from "./remark-gfm.mjs";
import { n as Or } from "./remend.mjs";
import { t as toJsxRuntime } from "./hast-util-to-jsx-runtime+[...].mjs";
import { t as urlAttributes } from "./html-url-attributes.mjs";
import { t as remarkParse } from "./remark-parse.mjs";
import { t as remarkRehype } from "./remark-rehype.mjs";
import { t as bail } from "./bail.mjs";
import { t as require_extend } from "./extend.mjs";
import { t as isPlainObject } from "./is-plain-obj.mjs";
import { t as R } from "./marked.mjs";
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Concatenates two arrays faster than the array spread operator.
*/
var concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
var createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
	...createClassGroupUtils(config)
});
var createPostfixLookupClassGroupIds = (config) => {
	const lookup = Object.create(null);
	const classGroupIds = config.postfixLookupClassGroups;
	if (classGroupIds) for (let i = 0; i < classGroupIds.length; i++) lookup[classGroupIds[i]] = true;
	return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers, postfixLookupClassGroupIds } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId;
		if (hasPostfixModifier) {
			classGroupId = getClassGroupId(baseClassName.substring(0, maybePostfixModifierPosition));
			const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
			if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
				classGroupId = classGroupIdWithPostfix;
				hasPostfixModifier = false;
			}
		} else classGroupId = getClassGroupId(baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	themeGetter.themeKey = key;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		themeContainer,
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			* @deprecated since Tailwind CSS v4.0.0
			*/
			container: ["container"],
			/**
			* Container Type
			* @see https://tailwindcss.com/docs/responsive-design#container-queries
			*/
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Container Name
			* @see https://tailwindcss.com/docs/responsive-design#named-containers
			*/
			"container-named": [isNamedContainerQuery],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [
				isNumber,
				"auto",
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": scaleBreak() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": scaleBreak() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Screen Reader Only
			* @see https://tailwindcss.com/docs/display#screen-reader-only
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: scalePositionWithArbitrary() }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: scaleOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: scaleOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Inset
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Inset Inline
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Inset Block
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Inset Inline Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-s` in next major release
			*/
			start: [{
				"inset-s": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				start: scaleInset()
			}],
			/**
			* Inset Inline End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-e` in next major release
			*/
			end: [{
				"inset-e": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				end: scaleInset()
			}],
			/**
			* Inset Block Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-bs": [{ "inset-bs": scaleInset() }],
			/**
			* Inset Block End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-be": [{ "inset-be": scaleInset() }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: scaleInset() }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: scaleInset() }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: scaleInset() }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: scaleInset() }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: scaleUnambiguousSpacing() }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Block
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
			/**
			* Padding Block Start
			* @see https://tailwindcss.com/docs/padding
			*/
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			/**
			* Padding Block End
			* @see https://tailwindcss.com/docs/padding
			*/
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: scaleUnambiguousSpacing() }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: scaleUnambiguousSpacing() }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: scaleUnambiguousSpacing() }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: scaleUnambiguousSpacing() }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: scaleMargin() }],
			/**
			* Margin Inline
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Block
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Inline Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin Inline End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
			/**
			* Margin Block Start
			* @see https://tailwindcss.com/docs/margin
			*/
			mbs: [{ mbs: scaleMargin() }],
			/**
			* Margin Block End
			* @see https://tailwindcss.com/docs/margin
			*/
			mbe: [{ mbe: scaleMargin() }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: scaleMargin() }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: scaleMargin() }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: scaleMargin() }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: scaleMargin() }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Size
			* @see https://tailwindcss.com/docs/width#setting-both-width-and-height
			*/
			size: [{ size: scaleSizing() }],
			/**
			* Inline Size
			* @see https://tailwindcss.com/docs/inline-size
			*/
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			/**
			* Min-Inline Size
			* @see https://tailwindcss.com/docs/min-inline-size
			*/
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			/**
			* Max-Inline Size
			* @see https://tailwindcss.com/docs/max-inline-size
			*/
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			/**
			* Block Size
			* @see https://tailwindcss.com/docs/block-size
			*/
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			/**
			* Min-Block Size
			* @see https://tailwindcss.com/docs/min-block-size
			*/
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			/**
			* Max-Block Size
			* @see https://tailwindcss.com/docs/max-block-size
			*/
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			/**
			* Font Stretch
			* @see https://tailwindcss.com/docs/font-stretch
			*/
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			/**
			* Font Feature Settings
			* @see https://tailwindcss.com/docs/font-feature-settings
			*/
			"font-features": [{ "font-features": [isArbitraryValue] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [
				"none",
				themeLeading,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://v3.tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: scaleColor() }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: scaleColor() }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: scaleColor() }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: scaleUnambiguousSpacing() }],
			/**
			* Tab Size
			* @see https://tailwindcss.com/docs/tab-size
			*/
			"tab-size": [{ tab: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Overflow Wrap
			* @see https://tailwindcss.com/docs/overflow-wrap
			*/
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: scaleBgPosition() }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: scaleBgSize() }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						"",
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: scaleColor() }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: scaleColor() }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: scaleColor() }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: scaleColor() }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: scaleRadius() }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: scaleBorderWidth() }],
			/**
			* Border Width Inline
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Block
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Inline Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width Inline End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			/**
			* Border Width Block Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			/**
			* Border Width Block End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
			*/
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: scaleColor() }],
			/**
			* Border Color Inline
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Block
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color Inline Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color Inline End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
			/**
			* Border Color Block Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-bs": [{ "border-bs": scaleColor() }],
			/**
			* Border Color Block End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-be": [{ "border-be": scaleColor() }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": scaleColor() }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": scaleColor() }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": scaleColor() }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": scaleColor() }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: scaleColor() }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: scaleColor() }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
			*/
			"shadow-color": [{ shadow: scaleColor() }],
			/**
			* Inset Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
			*/
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Inset Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
			*/
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
			*/
			"ring-w": [{ ring: scaleBorderWidth() }],
			/**
			* Ring Width Inset
			* @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
			*/
			"ring-color": [{ ring: scaleColor() }],
			/**
			* Ring Offset Width
			* @see https://v3.tailwindcss.com/docs/ring-offset-width
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://v3.tailwindcss.com/docs/ring-offset-color
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			/**
			* Inset Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
			*/
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			/**
			* Inset Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
			*/
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			/**
			* Text Shadow
			* @see https://tailwindcss.com/docs/text-shadow
			*/
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Text Shadow Color
			* @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
			*/
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			/**
			* Mask Clip
			* @see https://tailwindcss.com/docs/mask-clip
			*/
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			/**
			* Mask Composite
			* @see https://tailwindcss.com/docs/mask-composite
			*/
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			/**
			* Mask Mode
			* @see https://tailwindcss.com/docs/mask-mode
			*/
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			/**
			* Mask Origin
			* @see https://tailwindcss.com/docs/mask-origin
			*/
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			/**
			* Mask Position
			* @see https://tailwindcss.com/docs/mask-position
			*/
			"mask-position": [{ mask: scaleBgPosition() }],
			/**
			* Mask Repeat
			* @see https://tailwindcss.com/docs/mask-repeat
			*/
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			/**
			* Mask Size
			* @see https://tailwindcss.com/docs/mask-size
			*/
			"mask-size": [{ mask: scaleBgSize() }],
			/**
			* Mask Type
			* @see https://tailwindcss.com/docs/mask-type
			*/
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Filter
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: scaleBlur() }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Drop Shadow Color
			* @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
			*/
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Filter
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Transition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Behavior
			* @see https://tailwindcss.com/docs/transition-behavior
			*/
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backface Visibility
			* @see https://tailwindcss.com/docs/backface-visibility
			*/
			backface: [{ backface: ["hidden", "visible"] }],
			/**
			* Perspective
			* @see https://tailwindcss.com/docs/perspective
			*/
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Perspective Origin
			* @see https://tailwindcss.com/docs/perspective-origin
			*/
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: scaleRotate() }],
			/**
			* Rotate X
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			/**
			* Rotate Y
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			/**
			* Rotate Z
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: scaleScale() }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": scaleScale() }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": scaleScale() }],
			/**
			* Scale Z
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-z": [{ "scale-z": scaleScale() }],
			/**
			* Scale 3D
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-3d": ["scale-3d"],
			/**
			* Skew
			* @see https://tailwindcss.com/docs/skew
			*/
			skew: [{ skew: scaleSkew() }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": scaleSkew() }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": scaleSkew() }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			/**
			* Transform Style
			* @see https://tailwindcss.com/docs/transform-style
			*/
			"transform-style": [{ transform: ["3d", "flat"] }],
			/**
			* Translate
			* @see https://tailwindcss.com/docs/translate
			*/
			translate: [{ translate: scaleTranslate() }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": scaleTranslate() }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": scaleTranslate() }],
			/**
			* Translate Z
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-z": [{ "translate-z": scaleTranslate() }],
			/**
			* Translate None
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-none": ["translate-none"],
			/**
			* Zoom
			* @see https://tailwindcss.com/docs/zoom
			*/
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: scaleColor() }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: scaleColor() }],
			/**
			* Color Scheme
			* @see https://tailwindcss.com/docs/color-scheme
			*/
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Field Sizing
			* @see https://tailwindcss.com/docs/field-sizing
			*/
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scrollbar Thumb Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-thumb-color": [{ "scrollbar-thumb": scaleColor() }],
			/**
			* Scrollbar Track Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-track-color": [{ "scrollbar-track": scaleColor() }],
			/**
			* Scrollbar Gutter
			* @see https://tailwindcss.com/docs/scrollbar-gutter
			*/
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			/**
			* Scrollbar Width
			* @see https://tailwindcss.com/docs/scrollbar-width
			*/
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: ["none", ...scaleColor()] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
//#endregion
//#region node_modules/trough/lib/index.js
/**
* @typedef {(error?: Error | null | undefined, ...output: Array<any>) => void} Callback
*   Callback.
*
* @typedef {(...input: Array<any>) => any} Middleware
*   Ware.
*
* @typedef Pipeline
*   Pipeline.
* @property {Run} run
*   Run the pipeline.
* @property {Use} use
*   Add middleware.
*
* @typedef {(...input: Array<any>) => void} Run
*   Call all middleware.
*
*   Calls `done` on completion with either an error or the output of the
*   last middleware.
*
*   > 👉 **Note**: as the length of input defines whether async functions get a
*   > `next` function,
*   > it’s recommended to keep `input` at one value normally.

*
* @typedef {(fn: Middleware) => Pipeline} Use
*   Add middleware.
*/
/**
* Create new middleware.
*
* @returns {Pipeline}
*   Pipeline.
*/
function trough() {
	/** @type {Array<Middleware>} */
	const fns = [];
	/** @type {Pipeline} */
	const pipeline = {
		run,
		use
	};
	return pipeline;
	/** @type {Run} */
	function run(...values) {
		let middlewareIndex = -1;
		/** @type {Callback} */
		const callback = values.pop();
		if (typeof callback !== "function") throw new TypeError("Expected function as last argument, not " + callback);
		next(null, ...values);
		/**
		* Run the next `fn`, or we’re done.
		*
		* @param {Error | null | undefined} error
		* @param {Array<any>} output
		*/
		function next(error, ...output) {
			const fn = fns[++middlewareIndex];
			let index = -1;
			if (error) {
				callback(error);
				return;
			}
			while (++index < values.length) if (output[index] === null || output[index] === void 0) output[index] = values[index];
			values = output;
			if (fn) wrap(fn, next)(...output);
			else callback(null, ...output);
		}
	}
	/** @type {Use} */
	function use(middelware) {
		if (typeof middelware !== "function") throw new TypeError("Expected `middelware` to be a function, not " + middelware);
		fns.push(middelware);
		return pipeline;
	}
}
/**
* Wrap `middleware` into a uniform interface.
*
* You can pass all input to the resulting function.
* `callback` is then called with the output of `middleware`.
*
* If `middleware` accepts more arguments than the later given in input,
* an extra `done` function is passed to it after that input,
* which must be called by `middleware`.
*
* The first value in `input` is the main input value.
* All other input values are the rest input values.
* The values given to `callback` are the input values,
* merged with every non-nullish output value.
*
* * if `middleware` throws an error,
*   returns a promise that is rejected,
*   or calls the given `done` function with an error,
*   `callback` is called with that error
* * if `middleware` returns a value or returns a promise that is resolved,
*   that value is the main output value
* * if `middleware` calls `done`,
*   all non-nullish values except for the first one (the error) overwrite the
*   output values
*
* @param {Middleware} middleware
*   Function to wrap.
* @param {Callback} callback
*   Callback called with the output of `middleware`.
* @returns {Run}
*   Wrapped middleware.
*/
function wrap(middleware, callback) {
	/** @type {boolean} */
	let called;
	return wrapped;
	/**
	* Call `middleware`.
	* @this {any}
	* @param {Array<any>} parameters
	* @returns {void}
	*/
	function wrapped(...parameters) {
		const fnExpectsCallback = middleware.length > parameters.length;
		/** @type {any} */
		let result;
		if (fnExpectsCallback) parameters.push(done);
		try {
			result = middleware.apply(this, parameters);
		} catch (error) {
			const exception = error;
			if (fnExpectsCallback && called) throw exception;
			return done(exception);
		}
		if (!fnExpectsCallback) {
			if (result && result.then && typeof result.then === "function") result.then(then, done);
			else if (result instanceof Error) done(result);
			else then(result);
		}
	}
	/**
	* Call `callback`, only once.
	*
	* @type {Callback}
	*/
	function done(error, ...output) {
		if (!called) {
			called = true;
			callback(error, ...output);
		}
	}
	/**
	* Call `done` with one value.
	*
	* @param {any} [value]
	*/
	function then(value) {
		done(null, value);
	}
}
//#endregion
//#region node_modules/unified/lib/callable-instance.js
var import_extend = /* @__PURE__ */ __toESM(require_extend(), 1);
var CallableInstance = (
/**
* @this {Function}
* @param {string | symbol} property
* @returns {(...parameters: Array<unknown>) => unknown}
*/
function(property) {
	const proto = this.constructor.prototype;
	const value = proto[property];
	/** @type {(...parameters: Array<unknown>) => unknown} */
	const apply = function() {
		return value.apply(apply, arguments);
	};
	Object.setPrototypeOf(apply, proto);
	return apply;
});
//#endregion
//#region node_modules/unified/lib/index.js
/**
* @typedef {import('trough').Pipeline} Pipeline
*
* @typedef {import('unist').Node} Node
*
* @typedef {import('vfile').Compatible} Compatible
* @typedef {import('vfile').Value} Value
*
* @typedef {import('../index.js').CompileResultMap} CompileResultMap
* @typedef {import('../index.js').Data} Data
* @typedef {import('../index.js').Settings} Settings
*/
/**
* @typedef {CompileResultMap[keyof CompileResultMap]} CompileResults
*   Acceptable results from compilers.
*
*   To register custom results, add them to
*   {@linkcode CompileResultMap}.
*/
/**
* @template {Node} [Tree=Node]
*   The node that the compiler receives (default: `Node`).
* @template {CompileResults} [Result=CompileResults]
*   The thing that the compiler yields (default: `CompileResults`).
* @callback Compiler
*   A **compiler** handles the compiling of a syntax tree to something else
*   (in most cases, text) (TypeScript type).
*
*   It is used in the stringify phase and called with a {@linkcode Node}
*   and {@linkcode VFile} representation of the document to compile.
*   It should return the textual representation of the given tree (typically
*   `string`).
*
*   > **Note**: unified typically compiles by serializing: most compilers
*   > return `string` (or `Uint8Array`).
*   > Some compilers, such as the one configured with
*   > [`rehype-react`][rehype-react], return other values (in this case, a
*   > React tree).
*   > If you’re using a compiler that doesn’t serialize, expect different
*   > result values.
*   >
*   > To register custom results in TypeScript, add them to
*   > {@linkcode CompileResultMap}.
*
*   [rehype-react]: https://github.com/rehypejs/rehype-react
* @param {Tree} tree
*   Tree to compile.
* @param {VFile} file
*   File associated with `tree`.
* @returns {Result}
*   New content: compiled text (`string` or `Uint8Array`, for `file.value`) or
*   something else (for `file.result`).
*/
/**
* @template {Node} [Tree=Node]
*   The node that the parser yields (default: `Node`)
* @callback Parser
*   A **parser** handles the parsing of text to a syntax tree.
*
*   It is used in the parse phase and is called with a `string` and
*   {@linkcode VFile} of the document to parse.
*   It must return the syntax tree representation of the given file
*   ({@linkcode Node}).
* @param {string} document
*   Document to parse.
* @param {VFile} file
*   File associated with `document`.
* @returns {Tree}
*   Node representing the given file.
*/
/**
* @typedef {(
*   Plugin<Array<any>, any, any> |
*   PluginTuple<Array<any>, any, any> |
*   Preset
* )} Pluggable
*   Union of the different ways to add plugins and settings.
*/
/**
* @typedef {Array<Pluggable>} PluggableList
*   List of plugins and presets.
*/
/**
* @template {Array<unknown>} [PluginParameters=[]]
*   Arguments passed to the plugin (default: `[]`, the empty tuple).
* @template {Node | string | undefined} [Input=Node]
*   Value that is expected as input (default: `Node`).
*
*   *   If the plugin returns a {@linkcode Transformer}, this
*       should be the node it expects.
*   *   If the plugin sets a {@linkcode Parser}, this should be
*       `string`.
*   *   If the plugin sets a {@linkcode Compiler}, this should be the
*       node it expects.
* @template [Output=Input]
*   Value that is yielded as output (default: `Input`).
*
*   *   If the plugin returns a {@linkcode Transformer}, this
*       should be the node that that yields.
*   *   If the plugin sets a {@linkcode Parser}, this should be the
*       node that it yields.
*   *   If the plugin sets a {@linkcode Compiler}, this should be
*       result it yields.
* @typedef {(
*   (this: Processor, ...parameters: PluginParameters) =>
*     Input extends string ? // Parser.
*        Output extends Node | undefined ? undefined | void : never :
*     Output extends CompileResults ? // Compiler.
*        Input extends Node | undefined ? undefined | void : never :
*     Transformer<
*       Input extends Node ? Input : Node,
*       Output extends Node ? Output : Node
*     > | undefined | void
* )} Plugin
*   Single plugin.
*
*   Plugins configure the processors they are applied on in the following
*   ways:
*
*   *   they change the processor, such as the parser, the compiler, or by
*       configuring data
*   *   they specify how to handle trees and files
*
*   In practice, they are functions that can receive options and configure the
*   processor (`this`).
*
*   > **Note**: plugins are called when the processor is *frozen*, not when
*   > they are applied.
*/
/**
* Tuple of a plugin and its configuration.
*
* The first item is a plugin, the rest are its parameters.
*
* @template {Array<unknown>} [TupleParameters=[]]
*   Arguments passed to the plugin (default: `[]`, the empty tuple).
* @template {Node | string | undefined} [Input=undefined]
*   Value that is expected as input (optional).
*
*   *   If the plugin returns a {@linkcode Transformer}, this
*       should be the node it expects.
*   *   If the plugin sets a {@linkcode Parser}, this should be
*       `string`.
*   *   If the plugin sets a {@linkcode Compiler}, this should be the
*       node it expects.
* @template [Output=undefined] (optional).
*   Value that is yielded as output.
*
*   *   If the plugin returns a {@linkcode Transformer}, this
*       should be the node that that yields.
*   *   If the plugin sets a {@linkcode Parser}, this should be the
*       node that it yields.
*   *   If the plugin sets a {@linkcode Compiler}, this should be
*       result it yields.
* @typedef {(
*   [
*     plugin: Plugin<TupleParameters, Input, Output>,
*     ...parameters: TupleParameters
*   ]
* )} PluginTuple
*/
/**
* @typedef Preset
*   Sharable configuration.
*
*   They can contain plugins and settings.
* @property {PluggableList | undefined} [plugins]
*   List of plugins and presets (optional).
* @property {Settings | undefined} [settings]
*   Shared settings for parsers and compilers (optional).
*/
/**
* @template {VFile} [File=VFile]
*   The file that the callback receives (default: `VFile`).
* @callback ProcessCallback
*   Callback called when the process is done.
*
*   Called with either an error or a result.
* @param {Error | undefined} [error]
*   Fatal error (optional).
* @param {File | undefined} [file]
*   Processed file (optional).
* @returns {undefined}
*   Nothing.
*/
/**
* @template {Node} [Tree=Node]
*   The tree that the callback receives (default: `Node`).
* @callback RunCallback
*   Callback called when transformers are done.
*
*   Called with either an error or results.
* @param {Error | undefined} [error]
*   Fatal error (optional).
* @param {Tree | undefined} [tree]
*   Transformed tree (optional).
* @param {VFile | undefined} [file]
*   File (optional).
* @returns {undefined}
*   Nothing.
*/
/**
* @template {Node} [Output=Node]
*   Node type that the transformer yields (default: `Node`).
* @callback TransformCallback
*   Callback passed to transforms.
*
*   If the signature of a `transformer` accepts a third argument, the
*   transformer may perform asynchronous operations, and must call it.
* @param {Error | undefined} [error]
*   Fatal error to stop the process (optional).
* @param {Output | undefined} [tree]
*   New, changed, tree (optional).
* @param {VFile | undefined} [file]
*   New, changed, file (optional).
* @returns {undefined}
*   Nothing.
*/
/**
* @template {Node} [Input=Node]
*   Node type that the transformer expects (default: `Node`).
* @template {Node} [Output=Input]
*   Node type that the transformer yields (default: `Input`).
* @callback Transformer
*   Transformers handle syntax trees and files.
*
*   They are functions that are called each time a syntax tree and file are
*   passed through the run phase.
*   When an error occurs in them (either because it’s thrown, returned,
*   rejected, or passed to `next`), the process stops.
*
*   The run phase is handled by [`trough`][trough], see its documentation for
*   the exact semantics of these functions.
*
*   > **Note**: you should likely ignore `next`: don’t accept it.
*   > it supports callback-style async work.
*   > But promises are likely easier to reason about.
*
*   [trough]: https://github.com/wooorm/trough#function-fninput-next
* @param {Input} tree
*   Tree to handle.
* @param {VFile} file
*   File to handle.
* @param {TransformCallback<Output>} next
*   Callback.
* @returns {(
*   Promise<Output | undefined | void> |
*   Promise<never> | // For some reason this is needed separately.
*   Output |
*   Error |
*   undefined |
*   void
* )}
*   If you accept `next`, nothing.
*   Otherwise:
*
*   *   `Error` — fatal error to stop the process
*   *   `Promise<undefined>` or `undefined` — the next transformer keeps using
*       same tree
*   *   `Promise<Node>` or `Node` — new, changed, tree
*/
/**
* @template {Node | undefined} ParseTree
*   Output of `parse`.
* @template {Node | undefined} HeadTree
*   Input for `run`.
* @template {Node | undefined} TailTree
*   Output for `run`.
* @template {Node | undefined} CompileTree
*   Input of `stringify`.
* @template {CompileResults | undefined} CompileResult
*   Output of `stringify`.
* @template {Node | string | undefined} Input
*   Input of plugin.
* @template Output
*   Output of plugin (optional).
* @typedef {(
*   Input extends string
*     ? Output extends Node | undefined
*       ? // Parser.
*         Processor<
*           Output extends undefined ? ParseTree : Output,
*           HeadTree,
*           TailTree,
*           CompileTree,
*           CompileResult
*         >
*       : // Unknown.
*         Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
*     : Output extends CompileResults
*     ? Input extends Node | undefined
*       ? // Compiler.
*         Processor<
*           ParseTree,
*           HeadTree,
*           TailTree,
*           Input extends undefined ? CompileTree : Input,
*           Output extends undefined ? CompileResult : Output
*         >
*       : // Unknown.
*         Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
*     : Input extends Node | undefined
*     ? Output extends Node | undefined
*       ? // Transform.
*         Processor<
*           ParseTree,
*           HeadTree extends undefined ? Input : HeadTree,
*           Output extends undefined ? TailTree : Output,
*           CompileTree,
*           CompileResult
*         >
*       : // Unknown.
*         Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
*     : // Unknown.
*       Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>
* )} UsePlugin
*   Create a processor based on the input/output of a {@link Plugin plugin}.
*/
/**
* @template {CompileResults | undefined} Result
*   Node type that the transformer yields.
* @typedef {(
*   Result extends Value | undefined ?
*     VFile :
*     VFile & {result: Result}
*   )} VFileWithOutput
*   Type to generate a {@linkcode VFile} corresponding to a compiler result.
*
*   If a result that is not acceptable on a `VFile` is used, that will
*   be stored on the `result` field of {@linkcode VFile}.
*/
var own = {}.hasOwnProperty;
/**
* Create a new processor.
*
* @example
*   This example shows how a new processor can be created (from `remark`) and linked
*   to **stdin**(4) and **stdout**(4).
*
*   ```js
*   import process from 'node:process'
*   import concatStream from 'concat-stream'
*   import {remark} from 'remark'
*
*   process.stdin.pipe(
*     concatStream(function (buf) {
*       process.stdout.write(String(remark().processSync(buf)))
*     })
*   )
*   ```
*
* @returns
*   New *unfrozen* processor (`processor`).
*
*   This processor is configured to work the same as its ancestor.
*   When the descendant processor is configured in the future it does not
*   affect the ancestral processor.
*/
var unified = new class Processor extends CallableInstance {
	/**
	* Create a processor.
	*/
	constructor() {
		super("copy");
		/**
		* Compiler to use (deprecated).
		*
		* @deprecated
		*   Use `compiler` instead.
		* @type {(
		*   Compiler<
		*     CompileTree extends undefined ? Node : CompileTree,
		*     CompileResult extends undefined ? CompileResults : CompileResult
		*   > |
		*   undefined
		* )}
		*/
		this.Compiler = void 0;
		/**
		* Parser to use (deprecated).
		*
		* @deprecated
		*   Use `parser` instead.
		* @type {(
		*   Parser<ParseTree extends undefined ? Node : ParseTree> |
		*   undefined
		* )}
		*/
		this.Parser = void 0;
		/**
		* Internal list of configured plugins.
		*
		* @deprecated
		*   This is a private internal property and should not be used.
		* @type {Array<PluginTuple<Array<unknown>>>}
		*/
		this.attachers = [];
		/**
		* Compiler to use.
		*
		* @type {(
		*   Compiler<
		*     CompileTree extends undefined ? Node : CompileTree,
		*     CompileResult extends undefined ? CompileResults : CompileResult
		*   > |
		*   undefined
		* )}
		*/
		this.compiler = void 0;
		/**
		* Internal state to track where we are while freezing.
		*
		* @deprecated
		*   This is a private internal property and should not be used.
		* @type {number}
		*/
		this.freezeIndex = -1;
		/**
		* Internal state to track whether we’re frozen.
		*
		* @deprecated
		*   This is a private internal property and should not be used.
		* @type {boolean | undefined}
		*/
		this.frozen = void 0;
		/**
		* Internal state.
		*
		* @deprecated
		*   This is a private internal property and should not be used.
		* @type {Data}
		*/
		this.namespace = {};
		/**
		* Parser to use.
		*
		* @type {(
		*   Parser<ParseTree extends undefined ? Node : ParseTree> |
		*   undefined
		* )}
		*/
		this.parser = void 0;
		/**
		* Internal list of configured transformers.
		*
		* @deprecated
		*   This is a private internal property and should not be used.
		* @type {Pipeline}
		*/
		this.transformers = trough();
	}
	/**
	* Copy a processor.
	*
	* @deprecated
	*   This is a private internal method and should not be used.
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*   New *unfrozen* processor ({@linkcode Processor}) that is
	*   configured to work the same as its ancestor.
	*   When the descendant processor is configured in the future it does not
	*   affect the ancestral processor.
	*/
	copy() {
		const destination = new Processor();
		let index = -1;
		while (++index < this.attachers.length) {
			const attacher = this.attachers[index];
			destination.use(...attacher);
		}
		destination.data((0, import_extend.default)(true, {}, this.namespace));
		return destination;
	}
	/**
	* Configure the processor with info available to all plugins.
	* Information is stored in an object.
	*
	* Typically, options can be given to a specific plugin, but sometimes it
	* makes sense to have information shared with several plugins.
	* For example, a list of HTML elements that are self-closing, which is
	* needed during all phases.
	*
	* > **Note**: setting information cannot occur on *frozen* processors.
	* > Call the processor first to create a new unfrozen processor.
	*
	* > **Note**: to register custom data in TypeScript, augment the
	* > {@linkcode Data} interface.
	*
	* @example
	*   This example show how to get and set info:
	*
	*   ```js
	*   import {unified} from 'unified'
	*
	*   const processor = unified().data('alpha', 'bravo')
	*
	*   processor.data('alpha') // => 'bravo'
	*
	*   processor.data() // => {alpha: 'bravo'}
	*
	*   processor.data({charlie: 'delta'})
	*
	*   processor.data() // => {charlie: 'delta'}
	*   ```
	*
	* @template {keyof Data} Key
	*
	* @overload
	* @returns {Data}
	*
	* @overload
	* @param {Data} dataset
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*
	* @overload
	* @param {Key} key
	* @returns {Data[Key]}
	*
	* @overload
	* @param {Key} key
	* @param {Data[Key]} value
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*
	* @param {Data | Key} [key]
	*   Key to get or set, or entire dataset to set, or nothing to get the
	*   entire dataset (optional).
	* @param {Data[Key]} [value]
	*   Value to set (optional).
	* @returns {unknown}
	*   The current processor when setting, the value at `key` when getting, or
	*   the entire dataset when getting without key.
	*/
	data(key, value) {
		if (typeof key === "string") {
			if (arguments.length === 2) {
				assertUnfrozen("data", this.frozen);
				this.namespace[key] = value;
				return this;
			}
			return own.call(this.namespace, key) && this.namespace[key] || void 0;
		}
		if (key) {
			assertUnfrozen("data", this.frozen);
			this.namespace = key;
			return this;
		}
		return this.namespace;
	}
	/**
	* Freeze a processor.
	*
	* Frozen processors are meant to be extended and not to be configured
	* directly.
	*
	* When a processor is frozen it cannot be unfrozen.
	* New processors working the same way can be created by calling the
	* processor.
	*
	* It’s possible to freeze processors explicitly by calling `.freeze()`.
	* Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
	* `.stringify()`, `.process()`, or `.processSync()` are called.
	*
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*   The current processor.
	*/
	freeze() {
		if (this.frozen) return this;
		const self = this;
		while (++this.freezeIndex < this.attachers.length) {
			const [attacher, ...options] = this.attachers[this.freezeIndex];
			if (options[0] === false) continue;
			if (options[0] === true) options[0] = void 0;
			const transformer = attacher.call(self, ...options);
			if (typeof transformer === "function") this.transformers.use(transformer);
		}
		this.frozen = true;
		this.freezeIndex = Number.POSITIVE_INFINITY;
		return this;
	}
	/**
	* Parse text to a syntax tree.
	*
	* > **Note**: `parse` freezes the processor if not already *frozen*.
	*
	* > **Note**: `parse` performs the parse phase, not the run phase or other
	* > phases.
	*
	* @param {Compatible | undefined} [file]
	*   file to parse (optional); typically `string` or `VFile`; any value
	*   accepted as `x` in `new VFile(x)`.
	* @returns {ParseTree extends undefined ? Node : ParseTree}
	*   Syntax tree representing `file`.
	*/
	parse(file) {
		this.freeze();
		const realFile = vfile(file);
		const parser = this.parser || this.Parser;
		assertParser("parse", parser);
		return parser(String(realFile), realFile);
	}
	/**
	* Process the given file as configured on the processor.
	*
	* > **Note**: `process` freezes the processor if not already *frozen*.
	*
	* > **Note**: `process` performs the parse, run, and stringify phases.
	*
	* @overload
	* @param {Compatible | undefined} file
	* @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
	* @returns {undefined}
	*
	* @overload
	* @param {Compatible | undefined} [file]
	* @returns {Promise<VFileWithOutput<CompileResult>>}
	*
	* @param {Compatible | undefined} [file]
	*   File (optional); typically `string` or `VFile`]; any value accepted as
	*   `x` in `new VFile(x)`.
	* @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
	*   Callback (optional).
	* @returns {Promise<VFile> | undefined}
	*   Nothing if `done` is given.
	*   Otherwise a promise, rejected with a fatal error or resolved with the
	*   processed file.
	*
	*   The parsed, transformed, and compiled value is available at
	*   `file.value` (see note).
	*
	*   > **Note**: unified typically compiles by serializing: most
	*   > compilers return `string` (or `Uint8Array`).
	*   > Some compilers, such as the one configured with
	*   > [`rehype-react`][rehype-react], return other values (in this case, a
	*   > React tree).
	*   > If you’re using a compiler that doesn’t serialize, expect different
	*   > result values.
	*   >
	*   > To register custom results in TypeScript, add them to
	*   > {@linkcode CompileResultMap}.
	*
	*   [rehype-react]: https://github.com/rehypejs/rehype-react
	*/
	process(file, done) {
		const self = this;
		this.freeze();
		assertParser("process", this.parser || this.Parser);
		assertCompiler("process", this.compiler || this.Compiler);
		return done ? executor(void 0, done) : new Promise(executor);
		/**
		* @param {((file: VFileWithOutput<CompileResult>) => undefined | void) | undefined} resolve
		* @param {(error: Error | undefined) => undefined | void} reject
		* @returns {undefined}
		*/
		function executor(resolve, reject) {
			const realFile = vfile(file);
			const parseTree = self.parse(realFile);
			self.run(parseTree, realFile, function(error, tree, file) {
				if (error || !tree || !file) return realDone(error);
				const compileTree = tree;
				const compileResult = self.stringify(compileTree, file);
				if (looksLikeAValue(compileResult)) file.value = compileResult;
				else file.result = compileResult;
				realDone(error, file);
			});
			/**
			* @param {Error | undefined} error
			* @param {VFileWithOutput<CompileResult> | undefined} [file]
			* @returns {undefined}
			*/
			function realDone(error, file) {
				if (error || !file) reject(error);
				else if (resolve) resolve(file);
				else done(void 0, file);
			}
		}
	}
	/**
	* Process the given file as configured on the processor.
	*
	* An error is thrown if asynchronous transforms are configured.
	*
	* > **Note**: `processSync` freezes the processor if not already *frozen*.
	*
	* > **Note**: `processSync` performs the parse, run, and stringify phases.
	*
	* @param {Compatible | undefined} [file]
	*   File (optional); typically `string` or `VFile`; any value accepted as
	*   `x` in `new VFile(x)`.
	* @returns {VFileWithOutput<CompileResult>}
	*   The processed file.
	*
	*   The parsed, transformed, and compiled value is available at
	*   `file.value` (see note).
	*
	*   > **Note**: unified typically compiles by serializing: most
	*   > compilers return `string` (or `Uint8Array`).
	*   > Some compilers, such as the one configured with
	*   > [`rehype-react`][rehype-react], return other values (in this case, a
	*   > React tree).
	*   > If you’re using a compiler that doesn’t serialize, expect different
	*   > result values.
	*   >
	*   > To register custom results in TypeScript, add them to
	*   > {@linkcode CompileResultMap}.
	*
	*   [rehype-react]: https://github.com/rehypejs/rehype-react
	*/
	processSync(file) {
		/** @type {boolean} */
		let complete = false;
		/** @type {VFileWithOutput<CompileResult> | undefined} */
		let result;
		this.freeze();
		assertParser("processSync", this.parser || this.Parser);
		assertCompiler("processSync", this.compiler || this.Compiler);
		this.process(file, realDone);
		assertDone("processSync", "process", complete);
		return result;
		/**
		* @type {ProcessCallback<VFileWithOutput<CompileResult>>}
		*/
		function realDone(error, file) {
			complete = true;
			bail(error);
			result = file;
		}
	}
	/**
	* Run *transformers* on a syntax tree.
	*
	* > **Note**: `run` freezes the processor if not already *frozen*.
	*
	* > **Note**: `run` performs the run phase, not other phases.
	*
	* @overload
	* @param {HeadTree extends undefined ? Node : HeadTree} tree
	* @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
	* @returns {undefined}
	*
	* @overload
	* @param {HeadTree extends undefined ? Node : HeadTree} tree
	* @param {Compatible | undefined} file
	* @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
	* @returns {undefined}
	*
	* @overload
	* @param {HeadTree extends undefined ? Node : HeadTree} tree
	* @param {Compatible | undefined} [file]
	* @returns {Promise<TailTree extends undefined ? Node : TailTree>}
	*
	* @param {HeadTree extends undefined ? Node : HeadTree} tree
	*   Tree to transform and inspect.
	* @param {(
	*   RunCallback<TailTree extends undefined ? Node : TailTree> |
	*   Compatible
	* )} [file]
	*   File associated with `node` (optional); any value accepted as `x` in
	*   `new VFile(x)`.
	* @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
	*   Callback (optional).
	* @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
	*   Nothing if `done` is given.
	*   Otherwise, a promise rejected with a fatal error or resolved with the
	*   transformed tree.
	*/
	run(tree, file, done) {
		assertNode(tree);
		this.freeze();
		const transformers = this.transformers;
		if (!done && typeof file === "function") {
			done = file;
			file = void 0;
		}
		return done ? executor(void 0, done) : new Promise(executor);
		/**
		* @param {(
		*   ((tree: TailTree extends undefined ? Node : TailTree) => undefined | void) |
		*   undefined
		* )} resolve
		* @param {(error: Error) => undefined | void} reject
		* @returns {undefined}
		*/
		function executor(resolve, reject) {
			const realFile = vfile(file);
			transformers.run(tree, realFile, realDone);
			/**
			* @param {Error | undefined} error
			* @param {Node} outputTree
			* @param {VFile} file
			* @returns {undefined}
			*/
			function realDone(error, outputTree, file) {
				const resultingTree = outputTree || tree;
				if (error) reject(error);
				else if (resolve) resolve(resultingTree);
				else done(void 0, resultingTree, file);
			}
		}
	}
	/**
	* Run *transformers* on a syntax tree.
	*
	* An error is thrown if asynchronous transforms are configured.
	*
	* > **Note**: `runSync` freezes the processor if not already *frozen*.
	*
	* > **Note**: `runSync` performs the run phase, not other phases.
	*
	* @param {HeadTree extends undefined ? Node : HeadTree} tree
	*   Tree to transform and inspect.
	* @param {Compatible | undefined} [file]
	*   File associated with `node` (optional); any value accepted as `x` in
	*   `new VFile(x)`.
	* @returns {TailTree extends undefined ? Node : TailTree}
	*   Transformed tree.
	*/
	runSync(tree, file) {
		/** @type {boolean} */
		let complete = false;
		/** @type {(TailTree extends undefined ? Node : TailTree) | undefined} */
		let result;
		this.run(tree, file, realDone);
		assertDone("runSync", "run", complete);
		return result;
		/**
		* @type {RunCallback<TailTree extends undefined ? Node : TailTree>}
		*/
		function realDone(error, tree) {
			bail(error);
			result = tree;
			complete = true;
		}
	}
	/**
	* Compile a syntax tree.
	*
	* > **Note**: `stringify` freezes the processor if not already *frozen*.
	*
	* > **Note**: `stringify` performs the stringify phase, not the run phase
	* > or other phases.
	*
	* @param {CompileTree extends undefined ? Node : CompileTree} tree
	*   Tree to compile.
	* @param {Compatible | undefined} [file]
	*   File associated with `node` (optional); any value accepted as `x` in
	*   `new VFile(x)`.
	* @returns {CompileResult extends undefined ? Value : CompileResult}
	*   Textual representation of the tree (see note).
	*
	*   > **Note**: unified typically compiles by serializing: most compilers
	*   > return `string` (or `Uint8Array`).
	*   > Some compilers, such as the one configured with
	*   > [`rehype-react`][rehype-react], return other values (in this case, a
	*   > React tree).
	*   > If you’re using a compiler that doesn’t serialize, expect different
	*   > result values.
	*   >
	*   > To register custom results in TypeScript, add them to
	*   > {@linkcode CompileResultMap}.
	*
	*   [rehype-react]: https://github.com/rehypejs/rehype-react
	*/
	stringify(tree, file) {
		this.freeze();
		const realFile = vfile(file);
		const compiler = this.compiler || this.Compiler;
		assertCompiler("stringify", compiler);
		assertNode(tree);
		return compiler(tree, realFile);
	}
	/**
	* Configure the processor to use a plugin, a list of usable values, or a
	* preset.
	*
	* If the processor is already using a plugin, the previous plugin
	* configuration is changed based on the options that are passed in.
	* In other words, the plugin is not added a second time.
	*
	* > **Note**: `use` cannot be called on *frozen* processors.
	* > Call the processor first to create a new unfrozen processor.
	*
	* @example
	*   There are many ways to pass plugins to `.use()`.
	*   This example gives an overview:
	*
	*   ```js
	*   import {unified} from 'unified'
	*
	*   unified()
	*     // Plugin with options:
	*     .use(pluginA, {x: true, y: true})
	*     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
	*     .use(pluginA, {y: false, z: true})
	*     // Plugins:
	*     .use([pluginB, pluginC])
	*     // Two plugins, the second with options:
	*     .use([pluginD, [pluginE, {}]])
	*     // Preset with plugins and settings:
	*     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
	*     // Settings only:
	*     .use({settings: {position: false}})
	*   ```
	*
	* @template {Array<unknown>} [Parameters=[]]
	* @template {Node | string | undefined} [Input=undefined]
	* @template [Output=Input]
	*
	* @overload
	* @param {Preset | null | undefined} [preset]
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*
	* @overload
	* @param {PluggableList} list
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*
	* @overload
	* @param {Plugin<Parameters, Input, Output>} plugin
	* @param {...(Parameters | [boolean])} parameters
	* @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
	*
	* @param {PluggableList | Plugin | Preset | null | undefined} value
	*   Usable value.
	* @param {...unknown} parameters
	*   Parameters, when a plugin is given as a usable value.
	* @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
	*   Current processor.
	*/
	use(value, ...parameters) {
		const attachers = this.attachers;
		const namespace = this.namespace;
		assertUnfrozen("use", this.frozen);
		if (value === null || value === void 0) {} else if (typeof value === "function") addPlugin(value, parameters);
		else if (typeof value === "object") {
			if (Array.isArray(value)) addList(value);
			else addPreset(value);
		} else throw new TypeError("Expected usable value, not `" + value + "`");
		return this;
		/**
		* @param {Pluggable} value
		* @returns {undefined}
		*/
		function add(value) {
			if (typeof value === "function") addPlugin(value, []);
			else if (typeof value === "object") {
				if (Array.isArray(value)) {
					const [plugin, ...parameters] = value;
					addPlugin(plugin, parameters);
				} else addPreset(value);
			} else throw new TypeError("Expected usable value, not `" + value + "`");
		}
		/**
		* @param {Preset} result
		* @returns {undefined}
		*/
		function addPreset(result) {
			if (!("plugins" in result) && !("settings" in result)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			addList(result.plugins);
			if (result.settings) namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
		}
		/**
		* @param {PluggableList | null | undefined} plugins
		* @returns {undefined}
		*/
		function addList(plugins) {
			let index = -1;
			if (plugins === null || plugins === void 0) {} else if (Array.isArray(plugins)) while (++index < plugins.length) {
				const thing = plugins[index];
				add(thing);
			}
			else throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
		}
		/**
		* @param {Plugin} plugin
		* @param {Array<unknown>} parameters
		* @returns {undefined}
		*/
		function addPlugin(plugin, parameters) {
			let index = -1;
			let entryIndex = -1;
			while (++index < attachers.length) if (attachers[index][0] === plugin) {
				entryIndex = index;
				break;
			}
			if (entryIndex === -1) attachers.push([plugin, ...parameters]);
			else if (parameters.length > 0) {
				let [primary, ...rest] = parameters;
				const currentPrimary = attachers[entryIndex][1];
				if (isPlainObject(currentPrimary) && isPlainObject(primary)) primary = (0, import_extend.default)(true, currentPrimary, primary);
				attachers[entryIndex] = [
					plugin,
					primary,
					...rest
				];
			}
		}
	}
}().freeze();
/**
* Assert a parser is available.
*
* @param {string} name
* @param {unknown} value
* @returns {asserts value is Parser}
*/
function assertParser(name, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name + "` without `parser`");
}
/**
* Assert a compiler is available.
*
* @param {string} name
* @param {unknown} value
* @returns {asserts value is Compiler}
*/
function assertCompiler(name, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name + "` without `compiler`");
}
/**
* Assert the processor is not frozen.
*
* @param {string} name
* @param {unknown} frozen
* @returns {asserts frozen is false}
*/
function assertUnfrozen(name, frozen) {
	if (frozen) throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
/**
* Assert `node` is a unist node.
*
* @param {unknown} node
* @returns {asserts node is Node}
*/
function assertNode(node) {
	if (!isPlainObject(node) || typeof node.type !== "string") throw new TypeError("Expected node, got `" + node + "`");
}
/**
* Assert that `complete` is `true`.
*
* @param {string} name
* @param {string} asyncName
* @param {unknown} complete
* @returns {asserts complete is true}
*/
function assertDone(name, asyncName, complete) {
	if (!complete) throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
}
/**
* @param {Compatible | undefined} [value]
* @returns {VFile}
*/
function vfile(value) {
	return looksLikeAVFile(value) ? value : new VFile(value);
}
/**
* @param {Compatible | undefined} [value]
* @returns {value is VFile}
*/
function looksLikeAVFile(value) {
	return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
}
/**
* @param {unknown} [value]
* @returns {value is Value}
*/
function looksLikeAValue(value) {
	return typeof value === "string" || isUint8Array(value);
}
/**
* Assert `value` is an `Uint8Array`.
*
* @param {unknown} value
*   thing.
* @returns {value is Uint8Array}
*   Whether `value` is an `Uint8Array`.
*/
function isUint8Array(value) {
	return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
}
//#endregion
//#region node_modules/streamdown/dist/chunk-D32TOXHM.js
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var _r = 300;
var jr = "300px";
var zr = 500;
function uo(e = {}) {
	let { immediate: t = false, debounceDelay: o = _r, rootMargin: n = jr, idleTimeout: r = zr } = e, [s, a] = (0, import_react.useState)(false), l = (0, import_react.useRef)(null), i = (0, import_react.useRef)(null), c = (0, import_react.useRef)(null), d = (0, import_react.useMemo)(() => (p) => {
		let u = Date.now();
		return window.setTimeout(() => {
			p({
				didTimeout: false,
				timeRemaining: () => Math.max(0, 50 - (Date.now() - u))
			});
		}, 1);
	}, []), f = (0, import_react.useMemo)(() => typeof window != "undefined" && window.requestIdleCallback ? (p, u) => window.requestIdleCallback(p, u) : d, [d]), g = (0, import_react.useMemo)(() => typeof window != "undefined" && window.cancelIdleCallback ? (p) => window.cancelIdleCallback(p) : (p) => {
		clearTimeout(p);
	}, []);
	return (0, import_react.useEffect)(() => {
		if (t) {
			a(true);
			return;
		}
		let p = l.current;
		if (!p) return;
		i.current && (clearTimeout(i.current), i.current = null), c.current && (g(c.current), c.current = null);
		let u = () => {
			i.current && (clearTimeout(i.current), i.current = null), c.current && (g(c.current), c.current = null);
		}, b = (m) => {
			c.current = f((C) => {
				C.timeRemaining() > 0 || C.didTimeout ? (a(true), m.disconnect()) : c.current = f(() => {
					a(true), m.disconnect();
				}, { timeout: r / 2 });
			}, { timeout: r });
		}, h = (m) => {
			u(), i.current = window.setTimeout(() => {
				var P, N;
				let C = m.takeRecords();
				(C.length === 0 || (N = (P = C.at(-1)) == null ? void 0 : P.isIntersecting) != null && N) && b(m);
			}, o);
		}, y = (m, C) => {
			m.isIntersecting ? h(C) : u();
		}, w = new IntersectionObserver((m) => {
			for (let C of m) y(C, w);
		}, {
			rootMargin: n,
			threshold: 0
		});
		return w.observe(p), () => {
			i.current && clearTimeout(i.current), c.current && g(c.current), w.disconnect();
		};
	}, [
		t,
		o,
		n,
		r,
		g,
		f
	]), {
		shouldRender: s,
		containerRef: l
	};
}
var $r = 320;
var Wr = 4;
var ho = () => typeof performance == "undefined" ? Date.now() : performance.now();
function Pt(e) {
	var s, a;
	let t = (s = e == null ? void 0 : e.now) != null ? s : ho, o = (a = e == null ? void 0 : e.maxBacklogMs) != null ? a : $r, n = 0, r = 0;
	return {
		now: t,
		beginPass(l) {
			r = Math.min(Math.max(n, l), l + o);
		},
		mark() {
			return r;
		},
		rewind(l) {
			r = l;
		},
		take(l, i, c) {
			if (l <= 0) return {
				baseDelay: 0,
				step: Math.max(0, i)
			};
			let d = Math.max(0, i), f = d === 0 ? 0 : Math.min(d, Wr), g = Math.max(r, c), p = c + o, u = g + Math.max(0, l - 1) * d, b = d;
			if (u > p && l > 1) if (g < p) {
				let y = p - g;
				b = Math.max(f, y / (l - 1));
			} else b = f;
			let h = Math.max(0, Math.round(g - c));
			return r = g + l * b, {
				baseDelay: h,
				step: b
			};
		},
		commitPass() {
			n = r;
		}
	};
}
var yo = /\s/;
var Et = /^\s+$/;
var qr = /* @__PURE__ */ new Set([
	"pre",
	"svg",
	"math",
	"annotation"
]);
var Xr = /* @__PURE__ */ new Set(["img", "hr"]);
var Ve = (e) => typeof e == "object" && e !== null && "type" in e && e.type === "element";
var Mt = (e) => e.some((t) => Ve(t) && qr.has(t.tagName));
var Zr = (e) => {
	for (let t = e.length - 1; t >= 0; t--) {
		let o = e[t];
		if (Ve(o) && o.tagName === "li") return o;
	}
};
var Gr = (e, t, o, n) => {
	e.properties ??= {}, e.properties["data-sd-animate-marker"] = true;
	let r = typeof e.properties.style == "string" ? `${e.properties.style};` : "";
	e.properties.style = `${r}--sd-marker-duration:${t}ms;--sd-marker-delay:${Math.round(o)}ms;--sd-marker-easing:${n}`;
};
var Kr = /* @__PURE__ */ new Set([
	"ul",
	"ol",
	"li"
]);
var Co = (e) => {
	for (let t of e.children) if (Ve(t)) {
		if (t.tagName === "input") return t;
		if (Kr.has(t.tagName)) continue;
		let o = Co(t);
		if (o) return o;
	}
};
var wo = (e, t, o, n) => {
	e.properties ??= {}, e.properties["data-sd-animate"] = true;
	let r = typeof e.properties.style == "string" ? `${e.properties.style};` : "";
	e.properties.style = `${r}--sd-animation:sd-${t.animation};--sd-duration:${o}ms;--sd-easing:${t.easing};--sd-delay:${Math.round(n)}ms`;
};
var Jr = (e, t, o, n) => {
	let r = Co(e);
	r && wo(r, t, o, n);
};
var Ur = (e, t, o, n, r, s) => {
	if (Mt(t)) return;
	let a = n.prevContentLength, l = r.count;
	r.count += 1;
	let i = a > 0 && l < a, c = i ? 0 : s.baseDelay + r.newIndex++ * s.step;
	wo(e, o, i ? 0 : o.duration, c);
};
var Yr = (e) => {
	var t;
	for (let o = e.length - 1; o >= 0; o -= 1) {
		let n = e[o];
		if (Ve(n)) {
			if ((t = n.properties) != null && t["data-sd-animated"]) break;
			n.properties = {
				...n.properties,
				"data-sd-animated": true
			};
		}
	}
};
var xo = (e) => {
	let t = [], o = "", n = false;
	for (let r of e) {
		let s = yo.test(r);
		if (s !== n && o) {
			if (s) {
				o += r, n = true;
				continue;
			}
			t.push(o), o = "";
		}
		o += r, n = s;
	}
	return o && t.push(o), t;
};
var vo = (e) => {
	let t = [], o = "";
	for (let n of e) yo.test(n) ? t.length > 0 && !Et.test(t.at(-1)) ? t[t.length - 1] += n : o += n : (o && (t.push(o), o = ""), t.push(n));
	return o && (t.length > 0 ? t[t.length - 1] += o : t.push(o)), t;
};
var po = /^[^\s;:'"\\/](?:[^;:'"\\/\r\n]*[^\s;:'"\\/])?$/;
var Qr = (e, t, o, n) => {
	let r = `sd-${t.animation}`, s = `${o ? 0 : t.duration}ms`, a;
	return t.styleObjects ? (a = {
		"--sd-animation": r,
		"--sd-duration": s,
		"--sd-easing": t.easing
	}, n && (a["--sd-delay"] = `${Math.round(n)}ms`)) : (a = `--sd-animation:${r};--sd-duration:${s};--sd-easing:${t.easing}`, n && (a += `;--sd-delay:${Math.round(n)}ms`)), {
		type: "element",
		tagName: "span",
		properties: {
			"data-sd-animate": true,
			style: a
		},
		children: [{
			type: "text",
			value: e
		}]
	};
};
var fo = (e, t) => !(e > 0 && t < e);
var Tt = (e) => Ve(e) && Xr.has(e.tagName);
var es = (e, t, o) => {
	let n = 0, r = 0;
	return visitParents(e, (s) => s.type === "text" || Tt(s), (s, a) => {
		if (Mt(a)) return SKIP;
		if (Tt(s)) {
			fo(o, r) && (n += 1), r += 1;
			return;
		}
		let l = s.value;
		if (!l.trim()) {
			r += l.length;
			return;
		}
		let i = t.sep === "char" ? vo(l) : xo(l);
		for (let c of i) {
			let d = r;
			r += c.length, !Et.test(c) && fo(o, d) && (n += 1);
		}
	}), n;
};
var ts = (e, t, o, n, r, s) => {
	var y;
	let a = t.at(-1);
	if (!(a && "children" in a)) return;
	if (Mt(t)) return SKIP;
	let l = a, i = l.children.indexOf(e);
	if (i === -1) return;
	let c = e.value;
	if (!c.trim()) {
		r.count += c.length;
		return;
	}
	let d = o.sep === "char" ? vo(c) : xo(c), f = n.prevContentLength, g = false, p = Zr(t), u = !!(p && !((y = p.properties) != null && y["data-sd-animate-marker"])), b = false, h = d.map((w) => {
		let m = r.count;
		if (r.count += w.length, Et.test(w)) return {
			type: "text",
			value: w
		};
		let C = f > 0 && m < f, M = C ? 0 : s.baseDelay + r.newIndex++ * s.step;
		if (g = true, p && u && !b) {
			let P = C ? 0 : o.duration;
			Gr(p, P, M, o.easing), Jr(p, o, P, M), b = true;
		}
		return Qr(w, o, C, M);
	});
	return g && Yr(t), l.children.splice(i, 1, ...h), i + h.length;
};
var os = 0;
function ko(e) {
	return Po(e, false);
}
var To = (e) => Po(e, true);
function Po(e, t) {
	var i, c, d, f, g;
	let o = (i = e == null ? void 0 : e.animation) != null ? i : "fadeIn", n = (c = e == null ? void 0 : e.easing) != null ? c : "ease", r = {
		animation: o,
		duration: (d = e == null ? void 0 : e.duration) != null ? d : 150,
		easing: n,
		sep: (f = e == null ? void 0 : e.sep) != null ? f : "word",
		stagger: (g = e == null ? void 0 : e.stagger) != null ? g : 40,
		styleObjects: t && po.test(o) && po.test(n),
		timeline: e == null ? void 0 : e.timeline
	}, s = {
		committedCharCount: 0,
		prevContentLength: 0,
		lastRenderCharCount: 0,
		pendingMark: null
	}, a = os++, l = () => (p) => {
		var w;
		let u = {
			count: 0,
			newIndex: 0
		};
		s.prevContentLength = s.committedCharCount;
		let b = r.timeline, h = (w = b == null ? void 0 : b.now()) != null ? w : ho();
		b && (s.pendingMark === null ? s.pendingMark = b.mark() : b.rewind(s.pendingMark));
		let y = b ? b.take(es(p, r, s.prevContentLength), r.stagger, h) : {
			baseDelay: 0,
			step: r.stagger
		};
		visitParents(p, (m) => m.type === "text" || Tt(m), (m, C) => {
			if (m.type === "text") return ts(m, C, r, s, u, y);
			Ur(m, C, r, s, u, y);
		}), s.lastRenderCharCount = u.count, s.prevContentLength = 0;
	};
	return Object.defineProperty(l, "name", { value: `rehypeAnimate$${a}` }), {
		name: "animate",
		type: "animate",
		rehypePlugin: l,
		setPrevContentLength(p) {
			s.committedCharCount = p, s.prevContentLength = p;
		},
		getLastRenderCharCount() {
			return s.lastRenderCharCount;
		},
		commit() {
			s.committedCharCount = s.lastRenderCharCount, s.pendingMark = null;
		}
	};
}
ko();
var Nt = (0, import_react.createContext)(false);
var Fe = () => (0, import_react.useContext)(Nt);
var Pe = (...e) => twMerge(clsx(e));
var ss = (e, t) => {
	if (!e || !t) return t;
	let o = `${e}:`;
	return t.split(/\s+/).filter(Boolean).map((n) => n.startsWith(o) ? n : `${e}:${n}`).join(" ");
};
var No = (e) => e ? (...t) => ss(e, twMerge(clsx(t))) : Pe;
var re = (e, t, o) => {
	let n = typeof t == "string" && o.startsWith("text/csv") ? "﻿" : "", r = typeof t == "string" ? new Blob([n + t], { type: o }) : t, s = URL.createObjectURL(r), a = document.createElement("a");
	a.href = s, a.download = e, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(s);
};
var Qe = (0, import_react.createContext)(Pe);
var x = () => (0, import_react.useContext)(Qe);
var ls = 8;
var ot = (e) => {
	if (!(e === void 0 || e === 0 || e === Number.POSITIVE_INFINITY)) {
		if (typeof e == "number") return Number.isFinite(e) && e > 0 ? `${e}px` : void 0;
		if (!(e === "0" || e === "none" || e === "Infinity")) return e;
	}
};
var nt = (e, t, o) => {
	let n = (0, import_react.useRef)(null), r = (0, import_react.useRef)(true), s = (0, import_react.useRef)(false), a = (0, import_react.useRef)(null);
	return (0, import_react.useEffect)(() => {
		let l = n.current;
		if (!(l && t)) return;
		let i = () => {
			let c = l.scrollHeight - l.scrollTop - l.clientHeight < ls;
			r.current = c;
		};
		return l.addEventListener("scroll", i, { passive: true }), () => l.removeEventListener("scroll", i);
	}, [t]), (0, import_react.useEffect)(() => {
		e && !s.current && (r.current = true), e || (r.current = true), s.current = e;
	}, [e]), (0, import_react.useEffect)(() => () => {
		a.current !== null && cancelAnimationFrame(a.current);
	}, []), (0, import_react.useEffect)(() => {
		let l = n.current;
		!(l && t && e && r.current) || a.current !== null || (a.current = requestAnimationFrame(() => {
			a.current = null, r.current && l.scrollTo({
				top: l.scrollHeight,
				behavior: "instant"
			});
		}));
	}, [
		e,
		t,
		o
	]), n;
};
var ms = Pe("block");
var us = Pe("block", "before:content-[counter(line)]", "before:inline-block", "before:[counter-increment:line]", "before:w-6", "before:mr-4", "before:text-[13px]", "before:text-right", "before:text-muted-foreground/50", "before:font-mono", "before:select-none");
var ps = (e) => {
	let t = {};
	for (let o of e.split(";")) {
		let n = o.indexOf(":");
		if (n > 0) {
			let r = o.slice(0, n).trim(), s = o.slice(n + 1).trim();
			r && s && (t[r] = s);
		}
	}
	return t;
};
var So = (0, import_react.memo)(({ children: e, result: t, language: o, className: n, maxHeight: r, startLine: s, lineNumbers: a = true, ...l }) => {
	let i = x(), { isAnimating: c } = (0, import_react.useContext)(S), d = ot(r), f = nt(c, !!d, t), g = (0, import_react.useMemo)(() => i(us), [i]), p = (0, import_react.useMemo)(() => i(ms), [i]), u = (0, import_react.useMemo)(() => {
		let b = {};
		return t.bg && (b["--sdm-bg"] = t.bg), t.fg && (b["--sdm-fg"] = t.fg), t.rootStyle && Object.assign(b, ps(t.rootStyle)), b;
	}, [
		t.bg,
		t.fg,
		t.rootStyle
	]);
	return (0, import_jsx_runtime.jsx)("div", {
		className: i(n, d ? "overflow-y-auto" : null, "overflow-x-auto rounded-md border border-border bg-background p-4 text-sm"),
		"data-language": o,
		"data-streamdown": "code-block-body",
		ref: f,
		style: d ? { maxHeight: d } : void 0,
		...l,
		children: (0, import_jsx_runtime.jsx)("pre", {
			className: i(n, "bg-[var(--sdm-bg,inherit)]", "dark:bg-[var(--shiki-dark-bg,var(--sdm-bg,inherit))]"),
			style: u,
			children: (0, import_jsx_runtime.jsx)("code", {
				className: a ? i("[counter-increment:line_0] [counter-reset:line]") : void 0,
				style: a && s && s > 1 ? { counterReset: `line ${s - 1}` } : void 0,
				children: t.tokens.map((b, h) => (0, import_jsx_runtime.jsx)("span", {
					className: a ? g : p,
					children: b.length === 0 || b.length === 1 && b[0].content === "" ? `
` : b.map((y, w) => {
						let m = {}, C = !!y.bgColor;
						if (y.color && (m["--sdm-c"] = y.color), y.bgColor && (m["--sdm-tbg"] = y.bgColor), y.htmlStyle) for (let [M, P] of Object.entries(y.htmlStyle)) M === "color" ? m["--sdm-c"] = P : M === "background-color" ? (m["--sdm-tbg"] = P, C = true) : m[M] = P;
						return (0, import_jsx_runtime.jsx)("span", {
							className: i("text-[var(--sdm-c,inherit)]", "dark:text-[var(--shiki-dark,var(--sdm-c,inherit))]", C && "bg-[var(--sdm-tbg)]", C && "dark:bg-[var(--shiki-dark-bg,var(--sdm-tbg))]"),
							style: m,
							...y.htmlAttrs,
							children: y.content
						}, w);
					})
				}, h))
			})
		})
	});
});
var It = ({ className: e, language: t, style: o, isIncomplete: n, ...r }) => {
	let s = x();
	return (0, import_jsx_runtime.jsx)("div", {
		className: s("relative my-4 flex w-full flex-col gap-2 rounded-xl border border-border bg-sidebar p-2", e),
		"data-incomplete": n || void 0,
		"data-language": t,
		"data-streamdown": "code-block",
		style: {
			contentVisibility: "auto",
			containIntrinsicSize: "auto 200px",
			...o
		},
		...r
	});
};
var Rt = (0, import_react.createContext)({ code: "" });
var rt = () => (0, import_react.useContext)(Rt);
var Lt = ({ language: e }) => {
	let t = x();
	return (0, import_jsx_runtime.jsx)("div", {
		className: t("flex h-8 items-center text-muted-foreground text-xs"),
		"data-language": e,
		"data-streamdown": "code-block-header",
		children: (0, import_jsx_runtime.jsx)("span", {
			className: t("ml-1 font-mono lowercase"),
			children: e
		})
	});
};
var ws = (e) => {
	let t = e.length;
	for (; t > 0 && e[t - 1] === `
`;) t--;
	return e.slice(0, t);
};
var xs = (0, import_react.lazy)(() => Promise.resolve().then(() => highlighted_body_KQOG7T2V_exports).then((e) => ({ default: e.HighlightedCodeBlockBody })));
var Dt = ({ code: e, language: t, className: o, children: n, isIncomplete: r = false, startLine: s, lineNumbers: a, ...l }) => {
	let i = x(), { codeBlockMaxHeight: c } = (0, import_react.useContext)(S), d = (0, import_react.useMemo)(() => ws(e), [e]), f = (0, import_react.useMemo)(() => ({
		bg: "transparent",
		fg: "inherit",
		tokens: d.split(`
`).map((g) => [{
			content: g,
			color: "inherit",
			bgColor: "transparent",
			htmlStyle: {},
			offset: 0
		}])
	}), [d]);
	return (0, import_jsx_runtime.jsx)(Rt.Provider, {
		value: { code: e },
		children: (0, import_jsx_runtime.jsxs)(It, {
			dir: "ltr",
			isIncomplete: r,
			language: t,
			children: [
				(0, import_jsx_runtime.jsx)(Lt, { language: t }),
				n ? (0, import_jsx_runtime.jsx)("div", {
					className: i("pointer-events-none absolute top-2 right-2 z-10 flex items-center"),
					children: (0, import_jsx_runtime.jsx)("div", {
						className: i("pointer-events-auto flex shrink-0 items-center gap-2 rounded-md border border-sidebar bg-sidebar/80 px-1.5 py-1 supports-[backdrop-filter]:bg-sidebar/70 supports-[backdrop-filter]:backdrop-blur"),
						"data-streamdown": "code-block-actions",
						children: n
					})
				}) : null,
				(0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: (0, import_jsx_runtime.jsx)(So, {
						className: o,
						language: t,
						lineNumbers: a,
						maxHeight: c,
						result: f,
						startLine: s,
						...l
					}),
					children: (0, import_jsx_runtime.jsx)(xs, {
						className: o,
						code: d,
						isIncomplete: r,
						language: t,
						lineNumbers: a,
						maxHeight: c,
						raw: f,
						startLine: s,
						...l
					})
				})
			]
		})
	});
};
var Lo = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var Do = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var Ho = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M8.75 1V1.75V8.68934L10.7197 6.71967L11.25 6.18934L12.3107 7.25L11.7803 7.78033L8.70711 10.8536C8.31658 11.2441 7.68342 11.2441 7.29289 10.8536L4.21967 7.78033L3.68934 7.25L4.75 6.18934L5.28033 6.71967L7.25 8.68934V1.75V1H8.75ZM13.5 9.25V13.5H2.5V9.25V8.5H1V9.25V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.25V8.5H13.5V9.25Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var Ao = (e) => (0, import_jsx_runtime.jsxs)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: [
		(0, import_jsx_runtime.jsx)("path", {
			d: "M8 0V4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M8 16V12",
			opacity: "0.5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M3.29773 1.52783L5.64887 4.7639",
			opacity: "0.9",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M12.7023 1.52783L10.3511 4.7639",
			opacity: "0.1",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M12.7023 14.472L10.3511 11.236",
			opacity: "0.4",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M3.29773 14.472L5.64887 11.236",
			opacity: "0.6",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M15.6085 5.52783L11.8043 6.7639",
			opacity: "0.2",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M0.391602 10.472L4.19583 9.23598",
			opacity: "0.7",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M15.6085 10.4722L11.8043 9.2361",
			opacity: "0.3",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}),
		(0, import_jsx_runtime.jsx)("path", {
			d: "M0.391602 5.52783L4.19583 6.7639",
			opacity: "0.8",
			stroke: "currentColor",
			strokeWidth: "1.5"
		})
	]
});
var Bo = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M1 5.25V6H2.5V5.25V2.5H5.25H6V1H5.25H2C1.44772 1 1 1.44772 1 2V5.25ZM5.25 14.9994H6V13.4994H5.25H2.5V10.7494V9.99939H1V10.7494V13.9994C1 14.5517 1.44772 14.9994 2 14.9994H5.25ZM15 10V10.75V14C15 14.5523 14.5523 15 14 15H10.75H10V13.5H10.75H13.5V10.75V10H15ZM10.75 1H10V2.5H10.75H13.5V5.25V6H15V5.25V2C15 1.44772 14.5523 1 14 1H10.75Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var Oo = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M13.5 8C13.5 4.96643 11.0257 2.5 7.96452 2.5C5.42843 2.5 3.29365 4.19393 2.63724 6.5H5.25H6V8H5.25H0.75C0.335787 8 0 7.66421 0 7.25V2.75V2H1.5V2.75V5.23347C2.57851 2.74164 5.06835 1 7.96452 1C11.8461 1 15 4.13001 15 8C15 11.87 11.8461 15 7.96452 15C5.62368 15 3.54872 13.8617 2.27046 12.1122L1.828 11.5066L3.03915 10.6217L3.48161 11.2273C4.48831 12.6051 6.12055 13.5 7.96452 13.5C11.0257 13.5 13.5 11.0336 13.5 8Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var Vo = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var Fo = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M13.5 10.25V13.25C13.5 13.3881 13.3881 13.5 13.25 13.5H2.75C2.61193 13.5 2.5 13.3881 2.5 13.25L2.5 2.75C2.5 2.61193 2.61193 2.5 2.75 2.5H5.75H6.5V1H5.75H2.75C1.7835 1 1 1.7835 1 2.75V13.25C1 14.2165 1.7835 15 2.75 15H13.25C14.2165 15 15 14.2165 15 13.25V10.25V9.5H13.5V10.25ZM9 1H9.75H14.2495C14.6637 1 14.9995 1.33579 14.9995 1.75V6.25V7H13.4995V6.25V3.56066L8.53033 8.52978L8 9.06011L6.93934 7.99945L7.46967 7.46912L12.4388 2.5H9.75H9V1Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var _o = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0ZM4.125 5.875H4.75H5.875V4.75V4.125H7.125V4.75V5.875H8.25H8.875V7.125H8.25H7.125V8.25V8.875H5.875V8.25V7.125H4.75H4.125V5.875Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var jo = (e) => (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	color: "currentColor",
	height: 16,
	strokeLinejoin: "round",
	viewBox: "0 0 16 16",
	width: 16,
	...e,
	children: (0, import_jsx_runtime.jsx)("path", {
		clipRule: "evenodd",
		d: "M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0ZM4.125 5.875H4.75H8.25H8.875V7.125H8.25H4.75H4.125V5.875Z",
		fill: "currentColor",
		fillRule: "evenodd"
	})
});
var je = {
	CheckIcon: Lo,
	CopyIcon: Do,
	DownloadIcon: Ho,
	ExternalLinkIcon: Fo,
	Loader2Icon: Ao,
	Maximize2Icon: Bo,
	RotateCcwIcon: Oo,
	XIcon: Vo,
	ZoomInIcon: _o,
	ZoomOutIcon: jo
};
var $o = (0, import_react.createContext)(je);
var Es = (e, t) => {
	if (e === t) return true;
	if (!(e && t)) return e === t;
	let o = Object.keys(e), n = Object.keys(t);
	return o.length !== n.length ? false : o.every((r) => e[r] === t[r]);
};
var Ht = ({ icons: e, children: t }) => {
	let o = (0, import_react.useRef)(e), n = (0, import_react.useRef)(e ? {
		...je,
		...e
	} : je);
	Es(o.current, e) || (o.current = e, n.current = e ? {
		...je,
		...e
	} : je);
	let r = n.current;
	return (0, import_jsx_runtime.jsx)($o.Provider, {
		value: r,
		children: t
	});
};
var F = () => (0, import_react.useContext)($o);
var st = {
	copyCode: "Copy Code",
	downloadFile: "Download file",
	downloadDiagram: "Download diagram",
	downloadDiagramAsSvg: "Download diagram as SVG",
	downloadDiagramAsPng: "Download diagram as PNG",
	downloadDiagramAsMmd: "Download diagram as MMD",
	viewFullscreen: "View fullscreen",
	exitFullscreen: "Exit fullscreen",
	mermaidFormatSvg: "SVG",
	mermaidFormatPng: "PNG",
	mermaidFormatMmd: "MMD",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out",
	resetView: "Reset zoom and pan",
	copyTable: "Copy table",
	copyTableAsMarkdown: "Copy table as Markdown",
	copyTableAsCsv: "Copy table as CSV",
	copyTableAsTsv: "Copy table as TSV",
	downloadTable: "Download table",
	downloadTableAsCsv: "Download table as CSV",
	downloadTableAsMarkdown: "Download table as Markdown",
	tableFormatMarkdown: "Markdown",
	tableFormatCsv: "CSV",
	tableFormatTsv: "TSV",
	imageNotAvailable: "Image not available",
	downloadImage: "Download image",
	openExternalLink: "Open external link?",
	externalLinkWarning: "You're about to visit an external website.",
	close: "Close",
	copyLink: "Copy link",
	copied: "Copied",
	openLink: "Open link"
};
var at = (0, import_react.createContext)(st);
var j = () => (0, import_react.useContext)(at);
var Ee = ({ onCopy: e, onError: t, timeout: o = 2e3, children: n, className: r, code: s, ...a }) => {
	let l = x(), [i, c] = (0, import_react.useState)(false), d = (0, import_react.useRef)(0), { code: f } = rt(), { isAnimating: g } = (0, import_react.useContext)(S), p = j(), u = s != null ? s : f, b = async () => {
		var w;
		if (typeof window == "undefined" || !((w = navigator == null ? void 0 : navigator.clipboard) != null && w.writeText)) {
			t?.(/* @__PURE__ */ new Error("Clipboard API not available"));
			return;
		}
		try {
			i || (await navigator.clipboard.writeText(u), c(!0), e?.(), d.current = window.setTimeout(() => c(!1), o));
		} catch (m) {
			t?.(m);
		}
	};
	(0, import_react.useEffect)(() => () => {
		window.clearTimeout(d.current);
	}, []);
	let h = F(), y = i ? h.CheckIcon : h.CopyIcon;
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		"aria-label": p.copyCode,
		className: l("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", r),
		"data-streamdown": "code-block-copy-button",
		disabled: g,
		onClick: b,
		title: p.copyCode,
		type: "button",
		...a,
		children: n != null ? n : (0, import_jsx_runtime.jsx)(y, {
			"aria-hidden": "true",
			size: 14
		})
	}), i && (0, import_jsx_runtime.jsx)("output", {
		"aria-live": "polite",
		className: "sr-only",
		children: p.copied
	})] });
};
var ye = (e, t, o) => {
	if (typeof e == "boolean") return o;
	let n = e[t];
	if (typeof n != "object") return o;
	let r = n.download;
	return typeof r != "object" ? o : r.filename || o;
};
var Bt = (e, t) => {
	if (typeof e == "boolean") return {};
	let o = e[t];
	if (typeof o != "object") return {};
	let n = o.copy;
	return typeof n != "object" || n === null ? {} : {
		onCopy: n.onCopy,
		onError: n.onError
	};
};
var Wo = {
	"1c": "1c",
	"1c-query": "1cq",
	abap: "abap",
	"actionscript-3": "as",
	ada: "ada",
	adoc: "adoc",
	"angular-html": "html",
	"angular-ts": "ts",
	apache: "conf",
	apex: "cls",
	apl: "apl",
	applescript: "applescript",
	ara: "ara",
	asciidoc: "adoc",
	asm: "asm",
	astro: "astro",
	awk: "awk",
	ballerina: "bal",
	bash: "sh",
	bat: "bat",
	batch: "bat",
	be: "be",
	beancount: "beancount",
	berry: "berry",
	bibtex: "bib",
	bicep: "bicep",
	blade: "blade.php",
	bsl: "bsl",
	c: "c",
	"c#": "cs",
	"c++": "cpp",
	cadence: "cdc",
	cairo: "cairo",
	cdc: "cdc",
	clarity: "clar",
	clj: "clj",
	clojure: "clj",
	"closure-templates": "soy",
	cmake: "cmake",
	cmd: "cmd",
	cobol: "cob",
	codeowners: "CODEOWNERS",
	codeql: "ql",
	coffee: "coffee",
	coffeescript: "coffee",
	"common-lisp": "lisp",
	console: "sh",
	coq: "v",
	cpp: "cpp",
	cql: "cql",
	crystal: "cr",
	cs: "cs",
	csharp: "cs",
	css: "css",
	csv: "csv",
	cue: "cue",
	cypher: "cql",
	d: "d",
	dart: "dart",
	dax: "dax",
	desktop: "desktop",
	diff: "diff",
	docker: "dockerfile",
	dockerfile: "dockerfile",
	dotenv: "env",
	"dream-maker": "dm",
	edge: "edge",
	elisp: "el",
	elixir: "ex",
	elm: "elm",
	"emacs-lisp": "el",
	erb: "erb",
	erl: "erl",
	erlang: "erl",
	f: "f",
	"f#": "fs",
	f03: "f03",
	f08: "f08",
	f18: "f18",
	f77: "f77",
	f90: "f90",
	f95: "f95",
	fennel: "fnl",
	fish: "fish",
	fluent: "ftl",
	for: "for",
	"fortran-fixed-form": "f",
	"fortran-free-form": "f90",
	fs: "fs",
	fsharp: "fs",
	fsl: "fsl",
	ftl: "ftl",
	gdresource: "tres",
	gdscript: "gd",
	gdshader: "gdshader",
	genie: "gs",
	gherkin: "feature",
	"git-commit": "gitcommit",
	"git-rebase": "gitrebase",
	gjs: "js",
	gleam: "gleam",
	"glimmer-js": "js",
	"glimmer-ts": "ts",
	glsl: "glsl",
	gnuplot: "plt",
	go: "go",
	gql: "gql",
	graphql: "graphql",
	groovy: "groovy",
	gts: "gts",
	hack: "hack",
	haml: "haml",
	handlebars: "hbs",
	haskell: "hs",
	haxe: "hx",
	hbs: "hbs",
	hcl: "hcl",
	hjson: "hjson",
	hlsl: "hlsl",
	hs: "hs",
	html: "html",
	"html-derivative": "html",
	http: "http",
	hxml: "hxml",
	hy: "hy",
	imba: "imba",
	ini: "ini",
	jade: "jade",
	java: "java",
	javascript: "js",
	jinja: "jinja",
	jison: "jison",
	jl: "jl",
	js: "js",
	json: "json",
	json5: "json5",
	jsonc: "jsonc",
	jsonl: "jsonl",
	jsonnet: "jsonnet",
	jssm: "jssm",
	jsx: "jsx",
	julia: "jl",
	kotlin: "kt",
	kql: "kql",
	kt: "kt",
	kts: "kts",
	kusto: "kql",
	latex: "tex",
	lean: "lean",
	lean4: "lean",
	less: "less",
	liquid: "liquid",
	lisp: "lisp",
	lit: "lit",
	llvm: "ll",
	log: "log",
	logo: "logo",
	lua: "lua",
	luau: "luau",
	make: "mak",
	makefile: "mak",
	markdown: "md",
	marko: "marko",
	matlab: "m",
	md: "md",
	mdc: "mdc",
	mdx: "mdx",
	mediawiki: "wiki",
	mermaid: "mmd",
	mips: "s",
	mipsasm: "s",
	mmd: "mmd",
	mojo: "mojo",
	move: "move",
	nar: "nar",
	narrat: "narrat",
	nextflow: "nf",
	nf: "nf",
	nginx: "conf",
	nim: "nim",
	nix: "nix",
	nu: "nu",
	nushell: "nu",
	objc: "m",
	"objective-c": "m",
	"objective-cpp": "mm",
	ocaml: "ml",
	pascal: "pas",
	perl: "pl",
	perl6: "p6",
	php: "php",
	plsql: "pls",
	po: "po",
	polar: "polar",
	postcss: "pcss",
	pot: "pot",
	potx: "potx",
	powerquery: "pq",
	powershell: "ps1",
	prisma: "prisma",
	prolog: "pl",
	properties: "properties",
	proto: "proto",
	protobuf: "proto",
	ps: "ps",
	ps1: "ps1",
	pug: "pug",
	puppet: "pp",
	purescript: "purs",
	py: "py",
	python: "py",
	ql: "ql",
	qml: "qml",
	qmldir: "qmldir",
	qss: "qss",
	r: "r",
	racket: "rkt",
	raku: "raku",
	razor: "cshtml",
	rb: "rb",
	reg: "reg",
	regex: "regex",
	regexp: "regexp",
	rel: "rel",
	riscv: "s",
	rs: "rs",
	rst: "rst",
	ruby: "rb",
	rust: "rs",
	sas: "sas",
	sass: "sass",
	scala: "scala",
	scheme: "scm",
	scss: "scss",
	sdbl: "sdbl",
	sh: "sh",
	shader: "shader",
	shaderlab: "shader",
	shell: "sh",
	shellscript: "sh",
	shellsession: "sh",
	smalltalk: "st",
	solidity: "sol",
	soy: "soy",
	sparql: "rq",
	spl: "spl",
	splunk: "spl",
	sql: "sql",
	"ssh-config": "config",
	stata: "do",
	styl: "styl",
	stylus: "styl",
	svelte: "svelte",
	swift: "swift",
	"system-verilog": "sv",
	systemd: "service",
	talon: "talon",
	talonscript: "talon",
	tasl: "tasl",
	tcl: "tcl",
	templ: "templ",
	terraform: "tf",
	tex: "tex",
	tf: "tf",
	tfvars: "tfvars",
	toml: "toml",
	ts: "ts",
	"ts-tags": "ts",
	tsp: "tsp",
	tsv: "tsv",
	tsx: "tsx",
	turtle: "ttl",
	twig: "twig",
	typ: "typ",
	typescript: "ts",
	typespec: "tsp",
	typst: "typ",
	v: "v",
	vala: "vala",
	vb: "vb",
	verilog: "v",
	vhdl: "vhdl",
	vim: "vim",
	viml: "vim",
	vimscript: "vim",
	vue: "vue",
	"vue-html": "html",
	"vue-vine": "vine",
	vy: "vy",
	vyper: "vy",
	wasm: "wasm",
	wenyan: "wy",
	wgsl: "wgsl",
	wiki: "wiki",
	wikitext: "wiki",
	wit: "wit",
	wl: "wl",
	wolfram: "wl",
	xml: "xml",
	xsl: "xsl",
	yaml: "yaml",
	yml: "yml",
	zenscript: "zs",
	zig: "zig",
	zsh: "zsh",
	文言: "wy"
};
var Ot = ({ onDownload: e, onError: t, language: o, children: n, className: r, code: s, ...a }) => {
	let l = x(), { code: i } = rt(), { isAnimating: c, controls: d } = (0, import_react.useContext)(S), f = j(), g = F(), p = s != null ? s : i, u = o && o in Wo ? Wo[o] : "txt", b = `${ye(d, "code", "file")}.${u}`, h = "text/plain", y = () => {
		try {
			re(b, p, h), e?.();
		} catch (w) {
			t?.(w);
		}
	};
	return (0, import_jsx_runtime.jsx)("button", {
		"aria-label": f.downloadFile,
		className: l("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", r),
		"data-streamdown": "code-block-download-button",
		disabled: c,
		onClick: y,
		title: f.downloadFile,
		type: "button",
		...a,
		children: n != null ? n : (0, import_jsx_runtime.jsx)(g.DownloadIcon, { size: 14 })
	});
};
var it = () => {
	let { Loader2Icon: e } = F(), t = x();
	return (0, import_jsx_runtime.jsxs)("div", {
		className: t("w-full divide-y divide-border overflow-hidden rounded-xl border border-border"),
		children: [(0, import_jsx_runtime.jsx)("div", { className: t("h-[46px] w-full bg-muted/80") }), (0, import_jsx_runtime.jsx)("div", {
			className: t("flex w-full items-center justify-center p-4"),
			children: (0, import_jsx_runtime.jsx)(e, { className: t("size-4 animate-spin") })
		})]
	});
};
var js = /\.[^/.]+$/;
var Go = ({ node: e, className: t, src: o, alt: n, onLoad: r, onError: s, showControls: a = true, showDownloadControl: l = true, ...i }) => {
	let { DownloadIcon: c } = F(), d = x(), f = (0, import_react.useRef)(null), [g, p] = (0, import_react.useState)(false), [u, b] = (0, import_react.useState)(false), h = j(), y = i.width != null || i.height != null, m = (g || y) && !u && a && l, C = u && !y;
	(0, import_react.useEffect)(() => {
		let E = f.current;
		if (E != null && E.complete) {
			let R = E.naturalWidth > 0;
			p(R), b(!R);
		}
	}, []);
	let M = (0, import_react.useCallback)((E) => {
		p(true), b(false), r?.(E);
	}, [r]), P = (0, import_react.useCallback)((E) => {
		p(false), b(true), s?.(E);
	}, [s]), N = async () => {
		if (o) try {
			let R = await (await fetch(o)).blob(), H = new URL(o, window.location.origin).pathname.split("/").pop() || "", Z = H.split(".").pop(), Q = H.includes(".") && Z !== void 0 && Z.length <= 4, A = "";
			if (Q) A = H;
			else {
				let z = R.type, _ = "png";
				z.includes("jpeg") || z.includes("jpg") ? _ = "jpg" : z.includes("png") ? _ = "png" : z.includes("svg") ? _ = "svg" : z.includes("gif") ? _ = "gif" : z.includes("webp") && (_ = "webp"), A = `${(n || H || "image").replace(js, "")}.${_}`;
			}
			re(A, R, R.type);
		} catch (E) {
			window.open(o, "_blank");
		}
	};
	return o ? o === "streamdown:incomplete-image" ? (0, import_jsx_runtime.jsx)("div", {
		className: d("group relative my-4 inline-block"),
		"data-incomplete": "true",
		"data-streamdown": "image-wrapper",
		children: (0, import_jsx_runtime.jsx)("div", {
			className: d("h-24 w-48 animate-pulse rounded-lg bg-muted"),
			"data-streamdown": "image-placeholder"
		})
	}) : (0, import_jsx_runtime.jsxs)("div", {
		className: d("group relative my-4 inline-block"),
		"data-streamdown": "image-wrapper",
		children: [
			(0, import_jsx_runtime.jsx)("img", {
				alt: n,
				className: d("max-w-full rounded-lg", C && "hidden", t),
				"data-streamdown": "image",
				onError: P,
				onLoad: M,
				ref: f,
				src: o,
				...i
			}),
			C && (0, import_jsx_runtime.jsx)("span", {
				className: d("text-muted-foreground text-xs italic"),
				"data-streamdown": "image-fallback",
				children: h.imageNotAvailable
			}),
			a && (0, import_jsx_runtime.jsx)("div", {
				className: d("pointer-events-none absolute inset-0 hidden rounded-lg bg-black/10 group-hover:block"),
				"data-streamdown": "image-overlay"
			}),
			m && (0, import_jsx_runtime.jsx)("button", {
				className: d("absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-background", "opacity-0 group-hover:opacity-100"),
				onClick: N,
				title: h.downloadImage,
				type: "button",
				children: (0, import_jsx_runtime.jsx)(c, { size: 14 })
			})
		]
	}) : null;
};
var Me = (e) => {
	let t = typeof e == "function" ? e() : e;
	return t != null ? t : document.body;
};
var ze = 0;
var Ne = () => {
	ze += 1, ze === 1 && (document.body.style.overflow = "hidden");
};
var Se = () => {
	ze = Math.max(0, ze - 1), ze === 0 && (document.body.style.overflow = "");
};
var Uo = ({ url: e, isOpen: t, onClose: o, onConfirm: n }) => {
	let { CheckIcon: r, CopyIcon: s, ExternalLinkIcon: a, XIcon: l } = F(), i = x(), [c, d] = (0, import_react.useState)(false), f = j(), { portal: g } = (0, import_react.useContext)(S), p = (0, import_react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(e), d(!0), setTimeout(() => d(!1), 2e3);
		} catch (h) {}
	}, [e]), u = (0, import_react.useCallback)(() => {
		n(), o();
	}, [n, o]);
	if ((0, import_react.useEffect)(() => {
		if (t) {
			Ne();
			let h = (y) => {
				y.key === "Escape" && o();
			};
			return document.addEventListener("keydown", h), () => {
				document.removeEventListener("keydown", h), Se();
			};
		}
	}, [t, o]), !t || typeof document == "undefined") return null;
	let b = (0, import_jsx_runtime.jsx)("div", {
		className: i("fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm"),
		"data-streamdown": "link-safety-modal",
		onClick: o,
		onKeyDown: (h) => {
			h.key === "Escape" && o();
		},
		role: "button",
		tabIndex: 0,
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: i("relative mx-4 flex w-full max-w-md flex-col gap-4 rounded-xl border bg-background p-6 shadow-lg"),
			onClick: (h) => h.stopPropagation(),
			onKeyDown: (h) => h.stopPropagation(),
			role: "presentation",
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					className: i("absolute top-4 right-4 rounded-md p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"),
					onClick: o,
					title: f.close,
					type: "button",
					children: (0, import_jsx_runtime.jsx)(l, { size: 16 })
				}),
				(0, import_jsx_runtime.jsxs)("div", {
					className: i("flex flex-col gap-2"),
					children: [(0, import_jsx_runtime.jsxs)("div", {
						className: i("flex items-center gap-2 font-semibold text-lg"),
						children: [(0, import_jsx_runtime.jsx)(a, { size: 20 }), (0, import_jsx_runtime.jsx)("span", { children: f.openExternalLink })]
					}), (0, import_jsx_runtime.jsx)("p", {
						className: i("text-muted-foreground text-sm"),
						children: f.externalLinkWarning
					})]
				}),
				(0, import_jsx_runtime.jsx)("div", {
					className: i("break-all rounded-md bg-muted p-3 font-mono text-sm", e.length > 100 && "max-h-32 overflow-y-auto"),
					children: e
				}),
				(0, import_jsx_runtime.jsxs)("div", {
					className: i("flex gap-2"),
					children: [(0, import_jsx_runtime.jsx)("button", {
						className: i("flex flex-1 items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 font-medium text-sm transition-all hover:bg-muted"),
						onClick: p,
						type: "button",
						children: c ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(r, { size: 14 }), (0, import_jsx_runtime.jsx)("span", { children: f.copied })] }) : (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)(s, { size: 14 }), (0, import_jsx_runtime.jsx)("span", { children: f.copyLink })] })
					}), (0, import_jsx_runtime.jsxs)("button", {
						className: i("flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-all hover:bg-primary/90"),
						onClick: u,
						type: "button",
						children: [(0, import_jsx_runtime.jsx)(a, { size: 14 }), (0, import_jsx_runtime.jsx)("span", { children: f.openLink })]
					})]
				})
			]
		})
	});
	return (0, import_react_dom.createPortal)(b, Me(g));
};
var lt = (0, import_react.createContext)(null);
var Ft = () => (0, import_react.useContext)(lt);
var Fc = () => {
	var t;
	let e = Ft();
	return (t = e == null ? void 0 : e.code) != null ? t : null;
};
var Ie = () => {
	var t;
	let e = Ft();
	return (t = e == null ? void 0 : e.mermaid) != null ? t : null;
};
var Yo = (e) => {
	var o;
	let t = Ft();
	return t != null && t.renderers && e && (o = t.renderers.find((n) => Array.isArray(n.language) ? n.language.includes(e) : n.language === e)) != null ? o : null;
};
var tn = /<svg\b[^>]*>/i;
var Ks = /\bviewBox=(['"])(.*?)\1/i;
var Js = /[\s,]+/;
var Us = /\swidth=(['"]).*?\1/gi;
var Ys = /\sheight=(['"]).*?\1/gi;
var Qo = /\sstyle=(['"])(.*?)\1/i;
var Qs = /^width\s*:/i;
var ea = /^height\s*:/i;
var ta = /^max-width\s*:/i;
var en = /^<svg/i;
var _t = (e) => {
	let t = e.match(tn);
	if (!t) return null;
	let n = t[0].match(Ks), r = n == null ? void 0 : n[2];
	if (!r) return null;
	let s = r.trim().split(Js).map((i) => Number.parseFloat(i));
	if (s.length < 4 || s.slice(0, 4).some(Number.isNaN)) return null;
	let a = s[2], l = s[3];
	return a > 0 && l > 0 ? {
		height: l,
		width: a
	} : null;
};
var on = (e) => {
	let t = e.match(tn);
	if (!t) return e;
	try {
		let o = t[0], n = _t(e);
		if (!n) return e;
		let { width: r, height: s } = n, a = o.replace(Us, "").replace(Ys, ""), l = a.match(Qo), i = `width:${r}px;height:${s}px;max-width:none;`;
		if (l) {
			let c = l[1], f = l[2].split(";").map((p) => p.trim()).filter(Boolean).filter((p) => !(Qs.test(p) || ea.test(p) || ta.test(p))).join(";"), g = `${i}${f ? `${f};` : ""}`;
			a = a.replace(Qo, ` style=${c}${g}${c}`);
		} else a = a.replace(en, `<svg style="${i}"`);
		return a = a.replace(en, `<svg width="${r}" height="${s}"`), e.replace(o, a);
	} catch (o) {
		return e;
	}
};
var nn = (e) => {
	if (typeof DOMParser == "undefined" || typeof XMLSerializer == "undefined") return e;
	let o = new DOMParser().parseFromString(e, "text/html").querySelector("svg");
	return o ? new XMLSerializer().serializeToString(o) : e;
};
var rn = (e, t) => {
	var n;
	let o = (n = void 0) != null ? n : 5;
	return new Promise((r, s) => {
		let a = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(e))), l = new Image();
		l.crossOrigin = "anonymous", l.onload = () => {
			let i = document.createElement("canvas"), c = l.width * o, d = l.height * o;
			i.width = c, i.height = d;
			let f = i.getContext("2d");
			if (!f) {
				s(/* @__PURE__ */ new Error("Failed to create 2D canvas context for PNG export"));
				return;
			}
			f.drawImage(l, 0, 0, c, d), i.toBlob((g) => {
				if (!g) {
					s(/* @__PURE__ */ new Error("Failed to create PNG blob"));
					return;
				}
				r(g);
			}, "image/png");
		}, l.onerror = () => s(/* @__PURE__ */ new Error("Failed to load SVG image")), l.src = a;
	});
};
var ct = ({ chart: e, children: t, className: o, onDownload: n, config: r, onError: s }) => {
	let a = x(), [l, i] = (0, import_react.useState)(false), c = (0, import_react.useRef)(null), { isAnimating: d, controls: f } = (0, import_react.useContext)(S), g = F(), p = Ie(), u = j(), b = ye(f, "mermaid", "diagram"), h = async (y) => {
		try {
			if (y === "mmd") {
				re(`${b}.mmd`, e, "text/plain"), i(!1), n?.(y);
				return;
			}
			if (!p) {
				s?.(/* @__PURE__ */ new Error("Mermaid plugin not available"));
				return;
			}
			let w = p.getMermaid(r), m = e.split("").reduce((N, I) => (N << 5) - N + I.charCodeAt(0) | 0, 0), C = `mermaid-${Math.abs(m)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, { svg: M } = await w.render(C, e);
			if (!M) {
				s?.(/* @__PURE__ */ new Error("SVG not found. Please wait for the diagram to render."));
				return;
			}
			let P = nn(M);
			if (y === "svg") {
				re(`${b}.svg`, P, "image/svg+xml"), i(!1), n?.(y);
				return;
			}
			if (y === "png") {
				let N = await rn(P);
				re(`${b}.png`, N, "image/png"), n?.(y), i(!1);
				return;
			}
		} catch (w) {
			s?.(w);
		}
	};
	return (0, import_react.useEffect)(() => {
		let y = (w) => {
			let m = w.composedPath();
			c.current && !m.includes(c.current) && i(false);
		};
		return document.addEventListener("mousedown", y), () => {
			document.removeEventListener("mousedown", y);
		};
	}, []), (0, import_jsx_runtime.jsxs)("div", {
		className: a("relative"),
		ref: c,
		children: [(0, import_jsx_runtime.jsx)("button", {
			"aria-label": u.downloadDiagram,
			className: a("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", o),
			disabled: d,
			onClick: () => i(!l),
			title: u.downloadDiagram,
			type: "button",
			children: t != null ? t : (0, import_jsx_runtime.jsx)(g.DownloadIcon, {
				"aria-hidden": "true",
				size: 14
			})
		}), l ? (0, import_jsx_runtime.jsxs)("div", {
			className: a("absolute top-full right-0 z-10 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg"),
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": u.downloadDiagramAsSvg,
					className: a("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => h("svg"),
					title: u.downloadDiagramAsSvg,
					type: "button",
					children: u.mermaidFormatSvg
				}),
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": u.downloadDiagramAsPng,
					className: a("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => h("png"),
					title: u.downloadDiagramAsPng,
					type: "button",
					children: u.mermaidFormatPng
				}),
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": u.downloadDiagramAsMmd,
					className: a("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => h("mmd"),
					title: u.downloadDiagramAsMmd,
					type: "button",
					children: u.mermaidFormatMmd
				})
			]
		}) : null]
	});
};
var cn = ({ chart: e, config: t, onFullscreen: o, onExit: n, className: r, ...s }) => {
	let { Maximize2Icon: a, XIcon: l } = F(), i = x(), [c, d] = (0, import_react.useState)(false), { isAnimating: f, controls: g, portal: p } = (0, import_react.useContext)(S), u = j(), b = (() => {
		if (typeof g == "boolean") return g;
		let m = g.mermaid;
		return m === false ? false : m === true || m === void 0 ? true : m.panZoom !== false;
	})(), h = (() => {
		if (typeof g == "boolean") return g;
		let m = g.mermaid;
		return m === false ? false : m === true || m === void 0 ? true : m.download !== false;
	})(), y = (() => {
		if (typeof g == "boolean") return g;
		let m = g.mermaid;
		return m === false ? false : m === true || m === void 0 ? true : m.copy !== false;
	})(), w = () => {
		d(!c);
	};
	return (0, import_react.useEffect)(() => {
		if (c) {
			Ne();
			let m = (C) => {
				C.key === "Escape" && d(false);
			};
			return document.addEventListener("keydown", m), () => {
				document.removeEventListener("keydown", m), Se();
			};
		}
	}, [c]), (0, import_react.useEffect)(() => {
		c ? o?.() : n && n();
	}, [
		c,
		o,
		n
	]), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		className: i("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", r),
		disabled: f,
		onClick: w,
		title: u.viewFullscreen,
		type: "button",
		...s,
		"aria-label": u.viewFullscreen,
		children: (0, import_jsx_runtime.jsx)(a, {
			"aria-hidden": "true",
			size: 14
		})
	}), c ? (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsxs)("div", {
		"aria-label": u.viewFullscreen,
		"aria-modal": "true",
		className: i("fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"),
		"data-streamdown": "mermaid-fullscreen",
		onClick: w,
		onKeyDown: (m) => {
			m.key === "Escape" && w();
		},
		role: "dialog",
		children: [(0, import_jsx_runtime.jsxs)("div", {
			className: i("absolute top-4 right-4 z-10 flex items-center gap-1"),
			onClick: (m) => m.stopPropagation(),
			onKeyDown: (m) => m.stopPropagation(),
			role: "presentation",
			children: [
				h ? (0, import_jsx_runtime.jsx)(ct, {
					chart: e,
					config: t
				}) : null,
				y ? (0, import_jsx_runtime.jsx)(Ee, { code: e }) : null,
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": u.exitFullscreen,
					className: i("rounded-md p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"),
					onClick: w,
					title: u.exitFullscreen,
					type: "button",
					children: (0, import_jsx_runtime.jsx)(l, {
						"aria-hidden": "true",
						size: 20
					})
				})
			]
		}), (0, import_jsx_runtime.jsx)("div", {
			className: i("flex size-full items-center justify-center p-4"),
			onClick: (m) => m.stopPropagation(),
			onKeyDown: (m) => m.stopPropagation(),
			role: "presentation",
			children: (0, import_jsx_runtime.jsx)(ln, {
				chart: e,
				className: i("size-full [&_svg]:h-auto [&_svg]:w-auto"),
				config: t,
				fullscreen: true,
				showControls: b
			})
		})]
	}), Me(p)) : null] });
};
function zt(e) {
	var o;
	if (e.nodeType === Node.TEXT_NODE) return (o = e.textContent) != null ? o : "";
	if (e.nodeType !== Node.ELEMENT_NODE) return "";
	let t = e;
	return t.tagName === "BR" ? `
` : Array.from(t.childNodes).map(zt).join("");
}
var Re = (e) => {
	let t = [], o = [], n = e.querySelectorAll("thead th");
	for (let s of n) t.push(zt(s).trim());
	let r = e.querySelectorAll("tbody tr");
	for (let s of r) {
		let a = [], l = s.querySelectorAll("td");
		for (let i of l) a.push(zt(i).trim());
		o.push(a);
	}
	return {
		headers: t,
		rows: o
	};
};
var We = (e) => {
	var o;
	if (typeof e != "object") return ",";
	let t = e.table;
	return typeof t != "object" ? "," : (o = t.csvSeparator) != null ? o : ",";
};
var xe = (e, t = ",") => {
	let o;
	t === "auto" ? Intl.NumberFormat().format(1.1).includes(",") ? o = ";" : o = "," : o = t;
	let { headers: n, rows: r } = e, s = (c) => {
		let d = false;
		for (let f of c) if (f === o || f === "\"" || f === `
` || f === "\r") {
			d = true;
			break;
		}
		return d ? `"${c.replace(/"/g, "\"\"")}"` : c;
	}, a = n.length > 0 ? r.length + 1 : r.length, l = new Array(a), i = 0;
	n.length > 0 && (l[i] = n.map(s).join(o), i += 1);
	for (let c of r) l[i] = c.map(s).join(o), i += 1;
	return l.join(`
`);
};
var $t = (e) => {
	let { headers: t, rows: o } = e, n = (l) => {
		let i = false;
		for (let d of l) if (d === "	" || d === `
` || d === "\r") {
			i = true;
			break;
		}
		if (!i) return l;
		let c = [];
		for (let d of l) d === "	" ? c.push("\\t") : d === `
` ? c.push("\\n") : d === "\r" ? c.push("\\r") : c.push(d);
		return c.join("");
	}, r = t.length > 0 ? o.length + 1 : o.length, s = new Array(r), a = 0;
	t.length > 0 && (s[a] = t.map(n).join("	"), a += 1);
	for (let l of o) s[a] = l.map(n).join("	"), a += 1;
	return s.join(`
`);
};
var dt = (e) => {
	let t = false;
	for (let n of e) if (n === "\\" || n === "|" || n === `
` || n === "&" || n === "<" || n === ">") {
		t = true;
		break;
	}
	if (!t) return e;
	let o = [];
	for (let n of e) n === "\\" ? o.push("\\\\") : n === "|" ? o.push("\\|") : n === `
` ? o.push("<br>") : n === "&" ? o.push("&amp;") : n === "<" ? o.push("&lt;") : n === ">" ? o.push("&gt;") : o.push(n);
	return o.join("");
};
var Le = (e) => {
	let { headers: t, rows: o } = e;
	if (t.length === 0) return "";
	let n = new Array(o.length + 2), r = 0, s = t.map((l) => dt(l));
	n[r] = `| ${s.join(" | ")} |`, r += 1;
	let a = new Array(t.length);
	for (let l = 0; l < t.length; l += 1) a[l] = "---";
	n[r] = `| ${a.join(" | ")} |`, r += 1;
	for (let l of o) if (l.length < t.length) {
		let i = new Array(t.length);
		for (let c = 0; c < t.length; c += 1) i[c] = c < l.length ? dt(l[c]) : "";
		n[r] = `| ${i.join(" | ")} |`, r += 1;
	} else {
		let i = l.map((c) => dt(c));
		n[r] = `| ${i.join(" | ")} |`, r += 1;
	}
	return n.join(`
`);
};
var Xe = ({ children: e, className: t, onCopy: o, onError: n, timeout: r = 2e3 }) => {
	let s = x(), [a, l] = (0, import_react.useState)(false), [i, c] = (0, import_react.useState)(false), d = (0, import_react.useRef)(null), f = (0, import_react.useRef)(0), { isAnimating: g, controls: p } = (0, import_react.useContext)(S), u = j(), b = We(p), h = async (m) => {
		var C, M;
		if (typeof window == "undefined" || !((C = navigator == null ? void 0 : navigator.clipboard) != null && C.write)) {
			n?.(/* @__PURE__ */ new Error("Clipboard API not available"));
			return;
		}
		try {
			let P = (M = d.current) == null ? void 0 : M.closest("[data-streamdown=\"table-wrapper\"]"), N = P == null ? void 0 : P.querySelector("table");
			if (!N) {
				n?.(/* @__PURE__ */ new Error("Table not found"));
				return;
			}
			let I = Re(N), E = "";
			m === "csv" ? E = xe(I, b) : m === "tsv" ? E = $t(I) : E = Le(I);
			let R = new ClipboardItem({
				"text/plain": new Blob([E], { type: "text/plain" }),
				"text/html": new Blob([N.outerHTML], { type: "text/html" })
			});
			await navigator.clipboard.write([R]), c(!0), l(!1), o?.(m), f.current = window.setTimeout(() => c(!1), r);
		} catch (P) {
			n?.(P);
		}
	};
	(0, import_react.useEffect)(() => {
		let m = (C) => {
			let M = C.composedPath();
			d.current && !M.includes(d.current) && l(false);
		};
		return document.addEventListener("mousedown", m), () => {
			document.removeEventListener("mousedown", m), window.clearTimeout(f.current);
		};
	}, []);
	let y = F(), w = i ? y.CheckIcon : y.CopyIcon;
	return (0, import_jsx_runtime.jsxs)("div", {
		className: s("relative"),
		ref: d,
		children: [(0, import_jsx_runtime.jsx)("button", {
			className: s("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
			disabled: g,
			onClick: () => l(!a),
			title: u.copyTable,
			type: "button",
			children: e != null ? e : (0, import_jsx_runtime.jsx)(w, {
				height: 14,
				width: 14
			})
		}), a ? (0, import_jsx_runtime.jsxs)("div", {
			className: s("absolute top-full right-0 z-20 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg"),
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					className: s("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => h("md"),
					title: u.copyTableAsMarkdown,
					type: "button",
					children: u.tableFormatMarkdown
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: s("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => h("csv"),
					title: u.copyTableAsCsv,
					type: "button",
					children: u.tableFormatCsv
				}),
				(0, import_jsx_runtime.jsx)("button", {
					className: s("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
					onClick: () => h("tsv"),
					title: u.copyTableAsTsv,
					type: "button",
					children: u.tableFormatTsv
				})
			]
		}) : null]
	});
};
var Ze = ({ children: e, className: t, onDownload: o, onError: n }) => {
	let r = x(), [s, a] = (0, import_react.useState)(false), l = (0, import_react.useRef)(null), { isAnimating: i, controls: c } = (0, import_react.useContext)(S), d = j(), f = F(), g = We(c), p = (u) => {
		var b;
		try {
			let h = (b = l.current) == null ? void 0 : b.closest("[data-streamdown=\"table-wrapper\"]"), y = h == null ? void 0 : h.querySelector("table");
			if (!y) {
				n?.(/* @__PURE__ */ new Error("Table not found"));
				return;
			}
			let w = Re(y), m = u === "csv" ? xe(w, g) : Le(w), C = u === "csv" ? "csv" : "md";
			re(`${ye(c, "table", "table")}.${C}`, m, u === "csv" ? "text/csv" : "text/markdown"), a(!1), o?.(u);
		} catch (h) {
			n?.(h);
		}
	};
	return (0, import_react.useEffect)(() => {
		let u = (b) => {
			let h = b.composedPath();
			l.current && !h.includes(l.current) && a(false);
		};
		return document.addEventListener("mousedown", u), () => {
			document.removeEventListener("mousedown", u);
		};
	}, []), (0, import_jsx_runtime.jsxs)("div", {
		className: r("relative"),
		ref: l,
		children: [(0, import_jsx_runtime.jsx)("button", {
			className: r("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
			disabled: i,
			onClick: () => a(!s),
			title: d.downloadTable,
			type: "button",
			children: e != null ? e : (0, import_jsx_runtime.jsx)(f.DownloadIcon, { size: 14 })
		}), s ? (0, import_jsx_runtime.jsxs)("div", {
			className: r("absolute top-full right-0 z-20 mt-1 min-w-[120px] overflow-hidden rounded-md border border-border bg-background shadow-lg"),
			children: [(0, import_jsx_runtime.jsx)("button", {
				className: r("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
				onClick: () => p("csv"),
				title: d.downloadTableAsCsv,
				type: "button",
				children: d.tableFormatCsv
			}), (0, import_jsx_runtime.jsx)("button", {
				className: r("w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted/40"),
				onClick: () => p("markdown"),
				title: d.downloadTableAsMarkdown,
				type: "button",
				children: d.tableFormatMarkdown
			})]
		}) : null]
	});
};
var gn = ({ children: e, className: t, showCopy: o = true, showDownload: n = true }) => {
	let { Maximize2Icon: r, XIcon: s } = F(), a = x(), [l, i] = (0, import_react.useState)(false), { isAnimating: c, portal: d } = (0, import_react.useContext)(S), f = j(), g = () => {
		i(true);
	}, p = () => {
		i(false);
	};
	return (0, import_react.useEffect)(() => {
		if (l) {
			Ne();
			let u = (b) => {
				b.key === "Escape" && i(false);
			};
			return document.addEventListener("keydown", u), () => {
				document.removeEventListener("keydown", u), Se();
			};
		}
	}, [l]), (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		className: a("cursor-pointer p-1 text-muted-foreground transition-all hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", t),
		disabled: c,
		onClick: g,
		title: f.viewFullscreen,
		type: "button",
		children: (0, import_jsx_runtime.jsx)(r, { size: 14 })
	}), l ? (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)("div", {
		"aria-label": f.viewFullscreen,
		"aria-modal": "true",
		className: a("fixed inset-0 z-50 flex flex-col bg-background"),
		"data-streamdown": "table-fullscreen",
		onClick: p,
		onKeyDown: (u) => {
			u.key === "Escape" && p();
		},
		role: "dialog",
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: a("flex h-full flex-col"),
			"data-streamdown": "table-wrapper",
			onClick: (u) => u.stopPropagation(),
			onKeyDown: (u) => u.stopPropagation(),
			role: "presentation",
			children: [(0, import_jsx_runtime.jsxs)("div", {
				className: a("flex items-center justify-end gap-1 p-4"),
				children: [
					o ? (0, import_jsx_runtime.jsx)(Xe, {}) : null,
					n ? (0, import_jsx_runtime.jsx)(Ze, {}) : null,
					(0, import_jsx_runtime.jsx)("button", {
						className: a("rounded-md p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"),
						onClick: p,
						title: f.exitFullscreen,
						type: "button",
						children: (0, import_jsx_runtime.jsx)(s, { size: 20 })
					})
				]
			}), (0, import_jsx_runtime.jsx)("div", {
				className: a("flex-1 overflow-auto p-4 pt-0 [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10"),
				children: (0, import_jsx_runtime.jsx)("table", {
					className: a("w-full border-collapse border border-border"),
					"data-streamdown": "table",
					children: e
				})
			})]
		})
	}), Me(d)) : null] });
};
var hn = ({ children: e, className: t, maxHeight: o, showControls: n, showCopy: r = true, showDownload: s = true, showFullscreen: a = true, ...l }) => {
	let i = x(), { isAnimating: c } = (0, import_react.useContext)(S), d = ot(o), f = nt(c, !!d, e), g = n && r, p = n && s, u = n && a, b = g || p || u;
	return (0, import_jsx_runtime.jsxs)("div", {
		className: i("my-4 flex flex-col gap-2 rounded-lg border border-border bg-sidebar p-2"),
		"data-streamdown": "table-wrapper",
		children: [b ? (0, import_jsx_runtime.jsxs)("div", {
			className: i("flex items-center justify-end gap-1"),
			children: [
				g ? (0, import_jsx_runtime.jsx)(Xe, {}) : null,
				p ? (0, import_jsx_runtime.jsx)(Ze, {}) : null,
				u ? (0, import_jsx_runtime.jsx)(gn, {
					showCopy: g,
					showDownload: p,
					children: e
				}) : null
			]
		}) : null, (0, import_jsx_runtime.jsx)("div", {
			className: i("border-collapse overflow-x-auto overflow-y-auto rounded-md border border-border bg-background"),
			ref: f,
			style: d ? { maxHeight: d } : void 0,
			children: (0, import_jsx_runtime.jsx)("table", {
				className: i("w-full divide-y divide-border", t),
				"data-streamdown": "table",
				...l,
				children: e
			})
		})]
	});
};
var Pa = /startLine=(\d+)/;
var Ea = /\bnoLineNumbers\b/;
var Ma = (0, import_react.lazy)(() => Promise.resolve().then(() => mermaid_MCJ5UELQ_exports).then((e) => ({ default: e.Mermaid })));
var Na = /language-([^\s]+)/;
var Sa = "node";
function O(e, t) {
	let o = Object.keys(e);
	if (o.length !== Object.keys(t).length) return false;
	let n = e, r = t;
	for (let s of o) if (s !== Sa && !Object.is(n[s], r[s])) return false;
	return true;
}
function Ia(e, t) {
	var o, n;
	return ((o = e == null ? void 0 : e.properties) == null ? void 0 : o.metastring) === ((n = t == null ? void 0 : t.properties) == null ? void 0 : n.metastring);
}
var pt = (e, t) => typeof e == "boolean" ? e : e[t] !== false;
var Xt = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.table;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
};
var Cn = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.code;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
};
var mt = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.mermaid;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
};
var Ra = (e, t) => {
	if (typeof e == "boolean") return e;
	let o = e.image;
	return o === false ? false : o === true || o === void 0 ? true : o[t] !== false;
};
var Zt = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("ol", {
		className: r("list-inside list-decimal whitespace-normal [li_&]:pl-6", t),
		"data-streamdown": "ordered-list",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Zt.displayName = "MarkdownOl";
var wn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	var l;
	let r = x(), s = Array.isArray(e) ? e.filter((i) => i !== `
` && i !== "") : [e], a = s.length === 1 && (0, import_react.isValidElement)(s[0]) && (s[0].type === Gt || ((l = s[0].props.node) == null ? void 0 : l.tagname) === "p") ? s[0].props.children : e;
	return (0, import_jsx_runtime.jsx)("li", {
		className: r("py-1 [&>p]:inline", t),
		"data-streamdown": "list-item",
		...n,
		children: a
	});
}, (e, t) => O(e, t));
wn.displayName = "MarkdownLi";
var xn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("ul", {
		className: r("list-inside list-disc whitespace-normal [li_&]:pl-6", t),
		"data-streamdown": "unordered-list",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
xn.displayName = "MarkdownUl";
var vn = (0, import_react.memo)(({ className: e, node: t, ...o }) => {
	let n = x();
	return (0, import_jsx_runtime.jsx)("hr", {
		className: n("my-6 border-border", e),
		"data-streamdown": "horizontal-rule",
		...o
	});
}, (e, t) => O(e, t));
vn.displayName = "MarkdownHr";
var kn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("span", {
		className: r("font-semibold", t),
		"data-streamdown": "strong",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
kn.displayName = "MarkdownStrong";
var La = ({ children: e, className: t, href: o, node: n, ...r }) => {
	let s = x(), { linkSafety: a } = (0, import_react.useContext)(S), [l, i] = (0, import_react.useState)(false), c = o === "streamdown:incomplete-link", d = (0, import_react.useCallback)(async (u) => {
		if (!(!(a != null && a.enabled && o) || c)) {
			if (u.preventDefault(), a.onLinkCheck && await a.onLinkCheck(o)) {
				window.open(o, "_blank", "noreferrer");
				return;
			}
			i(true);
		}
	}, [
		a,
		o,
		c
	]), f = (0, import_react.useCallback)(() => {
		o && window.open(o, "_blank", "noreferrer");
	}, [o]), g = (0, import_react.useCallback)(() => {
		i(false);
	}, []), p = {
		url: o != null ? o : "",
		isOpen: l,
		onClose: g,
		onConfirm: f
	};
	return a != null && a.enabled && o ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("button", {
		className: s("wrap-anywhere appearance-none text-left font-medium text-primary underline", t),
		"data-incomplete": c,
		"data-streamdown": "link",
		onClick: d,
		type: "button",
		children: e
	}), a.renderModal ? a.renderModal(p) : (0, import_jsx_runtime.jsx)(Uo, { ...p })] }) : (0, import_jsx_runtime.jsx)("a", {
		className: s("wrap-anywhere font-medium text-primary underline", t),
		"data-incomplete": c,
		"data-streamdown": "link",
		href: o,
		rel: "noreferrer",
		target: "_blank",
		...r,
		children: e
	});
};
var Tn = (0, import_react.memo)(La, (e, t) => O(e, t));
Tn.displayName = "MarkdownA";
var Pn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("h1", {
		className: r("mt-6 mb-2 font-semibold text-3xl", t),
		"data-streamdown": "heading-1",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Pn.displayName = "MarkdownH1";
var En = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("h2", {
		className: r("mt-6 mb-2 font-semibold text-2xl", t),
		"data-streamdown": "heading-2",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
En.displayName = "MarkdownH2";
var Mn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("h3", {
		className: r("mt-6 mb-2 font-semibold text-xl", t),
		"data-streamdown": "heading-3",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Mn.displayName = "MarkdownH3";
var Nn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("h4", {
		className: r("mt-6 mb-2 font-semibold text-lg", t),
		"data-streamdown": "heading-4",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Nn.displayName = "MarkdownH4";
var Sn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("h5", {
		className: r("mt-6 mb-2 font-semibold text-base", t),
		"data-streamdown": "heading-5",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Sn.displayName = "MarkdownH5";
var In = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("h6", {
		className: r("mt-6 mb-2 font-semibold text-sm", t),
		"data-streamdown": "heading-6",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
In.displayName = "MarkdownH6";
var Rn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let { controls: r, tableMaxHeight: s } = (0, import_react.useContext)(S), a = pt(r, "table"), l = Xt(r, "copy"), i = Xt(r, "download"), c = Xt(r, "fullscreen");
	return (0, import_jsx_runtime.jsx)(hn, {
		className: t,
		maxHeight: s,
		showControls: a,
		showCopy: l,
		showDownload: i,
		showFullscreen: c,
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Rn.displayName = "MarkdownTable";
var Ln = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("thead", {
		className: r("bg-muted/80", t),
		"data-streamdown": "table-header",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Ln.displayName = "MarkdownThead";
var Dn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("tbody", {
		className: r("divide-y divide-border", t),
		"data-streamdown": "table-body",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Dn.displayName = "MarkdownTbody";
var Hn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("tr", {
		className: r("border-border", t),
		"data-streamdown": "table-row",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Hn.displayName = "MarkdownTr";
var An = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("th", {
		className: r("whitespace-nowrap px-4 py-2 text-left font-semibold text-sm", t),
		"data-streamdown": "table-header-cell",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
An.displayName = "MarkdownTh";
var Bn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("td", {
		className: r("px-4 py-2 text-sm", t),
		"data-streamdown": "table-cell",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Bn.displayName = "MarkdownTd";
var On = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("blockquote", {
		className: r("my-4 border-muted-foreground/30 border-l-4 pl-4 text-muted-foreground italic", t),
		"data-streamdown": "blockquote",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
On.displayName = "MarkdownBlockquote";
var Vn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("sup", {
		className: r("text-sm", t),
		"data-streamdown": "superscript",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Vn.displayName = "MarkdownSup";
var Fn = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	let r = x();
	return (0, import_jsx_runtime.jsx)("sub", {
		className: r("text-sm", t),
		"data-streamdown": "subscript",
		...n,
		children: e
	});
}, (e, t) => O(e, t));
Fn.displayName = "MarkdownSub";
var _n = (0, import_react.memo)(({ children: e, className: t, node: o, ...n }) => {
	if ("data-footnotes" in n) {
		let s = (i) => {
			var g, p;
			if (!(0, import_react.isValidElement)(i)) return false;
			let c = Array.isArray(i.props.children) ? i.props.children : [i.props.children], d = false, f = false;
			for (let u of c) if (u) {
				if (typeof u == "string") u.trim() !== "" && (d = true);
				else if ((0, import_react.isValidElement)(u)) if (((g = u.props) == null ? void 0 : g["data-footnote-backref"]) !== void 0) f = true;
				else {
					let b = Array.isArray(u.props.children) ? u.props.children : [u.props.children];
					for (let h of b) {
						if (typeof h == "string" && h.trim() !== "") {
							d = true;
							break;
						}
						if ((0, import_react.isValidElement)(h) && ((p = h.props) == null ? void 0 : p["data-footnote-backref"]) === void 0) {
							d = true;
							break;
						}
					}
				}
			}
			return f && !d;
		}, a = Array.isArray(e) ? e.map((i) => {
			if (!(0, import_react.isValidElement)(i)) return i;
			if (i.type === Zt) {
				let d = (Array.isArray(i.props.children) ? i.props.children : [i.props.children]).filter((f) => !s(f));
				return d.length === 0 ? null : {
					...i,
					props: {
						...i.props,
						children: d
					}
				};
			}
			return i;
		}) : e;
		return (Array.isArray(a) ? a.some((i) => i !== null) : a !== null) ? (0, import_jsx_runtime.jsx)("section", {
			className: t,
			...n,
			children: a
		}) : null;
	}
	return (0, import_jsx_runtime.jsx)("section", {
		className: t,
		...n,
		children: e
	});
}, (e, t) => O(e, t));
_n.displayName = "MarkdownSection";
var Da = ({ node: e, className: t, children: o, ...n }) => {
	var R, $;
	let r = x(), s = !("data-block" in n), { mermaid: a, controls: l, lineNumbers: i } = (0, import_react.useContext)(S), c = Ie(), d = Fe(), f = t == null ? void 0 : t.match(Na), g = (R = f == null ? void 0 : f.at(1)) != null ? R : "", p = Yo(g);
	if (s) return (0, import_jsx_runtime.jsx)("code", {
		className: r("rounded bg-muted px-1.5 py-0.5 font-mono text-sm", t),
		"data-streamdown": "inline-code",
		...n,
		children: o
	});
	let u = ($ = e == null ? void 0 : e.properties) == null ? void 0 : $.metastring, b = u == null ? void 0 : u.match(Pa), h = b ? Number.parseInt(b[1], 10) : void 0, y = h !== void 0 && h >= 1 ? h : void 0, m = !(u ? Ea.test(u) : false) && i !== false, C = "";
	if ((0, import_react.isValidElement)(o) && o.props && typeof o.props == "object" && "children" in o.props && typeof o.props.children == "string" ? C = o.props.children : typeof o == "string" && (C = o), p) {
		let H = p.component;
		return (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: (0, import_jsx_runtime.jsx)(it, {}),
			children: (0, import_jsx_runtime.jsx)(H, {
				code: C,
				isIncomplete: d,
				language: g,
				meta: u
			})
		});
	}
	if (g === "mermaid" && c) {
		let H = pt(l, "mermaid"), Z = mt(l, "download"), Q = mt(l, "copy"), A = mt(l, "fullscreen"), z = mt(l, "panZoom"), _ = H && (Z || Q || A);
		return (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: (0, import_jsx_runtime.jsx)(it, {}),
			children: (0, import_jsx_runtime.jsxs)("div", {
				className: r("group relative my-4 flex w-full flex-col gap-2 rounded-xl border border-border bg-sidebar p-2", t),
				"data-streamdown": "mermaid-block",
				children: [
					(0, import_jsx_runtime.jsx)("div", {
						className: r("flex h-8 items-center text-muted-foreground text-xs"),
						children: (0, import_jsx_runtime.jsx)("span", {
							className: r("ml-1 font-mono lowercase"),
							children: "mermaid"
						})
					}),
					_ ? (0, import_jsx_runtime.jsx)("div", {
						className: r("pointer-events-none absolute top-2 right-2 z-10 flex items-center"),
						children: (0, import_jsx_runtime.jsxs)("div", {
							className: r("pointer-events-auto flex shrink-0 items-center gap-2 rounded-md border border-sidebar bg-sidebar/80 px-1.5 py-1 supports-[backdrop-filter]:bg-sidebar/70 supports-[backdrop-filter]:backdrop-blur"),
							"data-streamdown": "mermaid-block-actions",
							children: [
								Z ? (0, import_jsx_runtime.jsx)(ct, {
									chart: C,
									config: a == null ? void 0 : a.config
								}) : null,
								Q ? (0, import_jsx_runtime.jsx)(Ee, {
									code: C,
									...Bt(l, "mermaid")
								}) : null,
								A ? (0, import_jsx_runtime.jsx)(cn, {
									chart: C,
									config: a == null ? void 0 : a.config
								}) : null
							]
						})
					}) : null,
					(0, import_jsx_runtime.jsx)("div", {
						className: r("overflow-hidden rounded-md border border-border bg-background"),
						children: (0, import_jsx_runtime.jsx)(Ma, {
							chart: C,
							config: a == null ? void 0 : a.config,
							showControls: z
						})
					})
				]
			})
		});
	}
	let M = pt(l, "code"), P = Cn(l, "download"), N = Cn(l, "copy"), { "data-block": I, ...E } = n;
	return (0, import_jsx_runtime.jsx)(Dt, {
		className: t,
		code: C,
		isIncomplete: d,
		language: g,
		lineNumbers: m,
		startLine: y,
		...E,
		children: M ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [P ? (0, import_jsx_runtime.jsx)(Ot, {
			code: C,
			language: g
		}) : null, N ? (0, import_jsx_runtime.jsx)(Ee, { ...Bt(l, "code") }) : null] }) : null
	});
};
var jn = (0, import_react.memo)(Da, (e, t) => O(e, t) && Ia(e.node, t.node));
jn.displayName = "MarkdownCode";
var Ha = ({ node: e, className: t, ...o }) => {
	let { controls: n } = (0, import_react.useContext)(S), r = pt(n, "image"), s = r && Ra(n, "download");
	return (0, import_jsx_runtime.jsx)(Go, {
		className: t,
		node: e,
		showControls: r,
		showDownloadControl: s,
		...o
	});
};
var zn = (0, import_react.memo)(Ha, (e, t) => O(e, t));
zn.displayName = "MarkdownImg";
var Gt = (0, import_react.memo)(({ children: e, node: t, ...o }) => {
	let r = (Array.isArray(e) ? e : [e]).filter((s) => s != null && s !== "");
	if (r.length === 1 && (0, import_react.isValidElement)(r[0])) {
		let s = r[0].props.node, a = s == null ? void 0 : s.tagName;
		if (a === "img") return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: e });
		if (a === "code" && "data-block" in r[0].props) return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: e });
	}
	return (0, import_jsx_runtime.jsx)("p", {
		...o,
		children: e
	});
}, (e, t) => O(e, t));
Gt.displayName = "MarkdownParagraph";
var Kt = {
	ol: Zt,
	li: wn,
	ul: xn,
	hr: vn,
	strong: kn,
	a: Tn,
	h1: Pn,
	h2: En,
	h3: Mn,
	h4: Nn,
	h5: Sn,
	h6: In,
	table: Rn,
	thead: Ln,
	tbody: Dn,
	tr: Hn,
	th: An,
	td: Bn,
	blockquote: On,
	code: jn,
	img: zn,
	pre: ({ children: e }) => (0, import_react.isValidElement)(e) ? (0, import_react.cloneElement)(e, { "data-block": "true" }) : e,
	sup: Vn,
	sub: Fn,
	p: Gt,
	section: _n
};
var Aa = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;
var Ba = /\p{L}/u;
function Ke(e) {
	let t = e.replace(/(```|~~~)[\s\S]*?\1/g, "").replace(/^#{1,6}\s+/gm, "").replace(/(\*{1,3}|_{1,3})/g, "").replace(/`[^`]*`/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/^[\s>*\-+\d.]+/gm, ""), o, n = 0, r = 0;
	for (let s of t) {
		if (Aa.test(s)) {
			o ??= "rtl", r += 1;
			continue;
		}
		Ba.test(s) && (o ??= "ltr", n += 1);
	}
	return r > n ? "rtl" : n > r ? "ltr" : o != null ? o : "ltr";
}
var Oa = /^[ \t]{0,3}(`{3,}|~{3,})/;
var Va = /^\|?[ \t]*:?-{1,}:?[ \t]*(\|[ \t]*:?-{1,}:?[ \t]*)*\|?$/;
var Jt = (e) => {
	let t = e.split(`
`), o = null, n = 0;
	for (let r of t) {
		let s = Oa.exec(r);
		if (o === null) {
			if (s) {
				let a = s[1];
				o = a[0], n = a.length;
			}
		} else if (s) {
			let a = s[1], l = a[0], i = a.length;
			l === o && i >= n && (o = null, n = 0);
		}
	}
	return o !== null;
};
var $n = (e) => {
	let t = e.split(`
`);
	for (let o of t) {
		let n = o.trim();
		if (n.length > 0 && n.includes("|") && Va.test(n)) return true;
	}
	return false;
};
var Wn = () => (e) => {
	visit(e, "html", (t, o, n) => {
		!n || typeof o != "number" || (n.children[o] = {
			type: "text",
			value: t.value
		});
	});
};
var Xn = [];
var Zn = { allowDangerousHtml: true };
var bt = /* @__PURE__ */ new WeakMap();
var Yt = class {
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
		this.keyCache = /* @__PURE__ */ new WeakMap();
		this.maxSize = 100;
	}
	generateCacheKey(t) {
		let o = this.keyCache.get(t);
		if (o) return o;
		let n = t.rehypePlugins, r = t.remarkPlugins, s = t.remarkRehypeOptions;
		if (!(n || r || s)) {
			let f = "default";
			return this.keyCache.set(t, f), f;
		}
		let a = (f) => {
			if (!f || f.length === 0) return "";
			let g = "";
			for (let p = 0; p < f.length; p += 1) {
				let u = f[p];
				if (p > 0 && (g += ","), Array.isArray(u)) {
					let [b, h] = u;
					if (typeof b == "function") {
						let y = bt.get(b);
						y || (y = b.name, bt.set(b, y)), g += y;
					} else g += String(b);
					g += ":", g += JSON.stringify(h);
				} else if (typeof u == "function") {
					let b = bt.get(u);
					b || (b = u.name, bt.set(u, b)), g += b;
				} else g += String(u);
			}
			return g;
		}, l = a(n), d = `${a(r)}::${l}::${s ? JSON.stringify(s) : ""}`;
		return this.keyCache.set(t, d), d;
	}
	get(t) {
		let o = this.generateCacheKey(t), n = this.cache.get(o);
		return n && (this.cache.delete(o), this.cache.set(o, n)), n;
	}
	set(t, o) {
		let n = this.generateCacheKey(t);
		if (this.cache.size >= this.maxSize) {
			let r = this.cache.keys().next().value;
			r && this.cache.delete(r);
		}
		this.cache.set(n, o);
	}
	clear() {
		this.cache.clear();
	}
};
var Gn = new Yt();
var Qt = (e) => {
	let t = Ga(e), o = e.children || "";
	return ei(t.runSync(t.parse(o), o), e);
};
var Ga = (e) => {
	let t = Gn.get(e);
	if (t) return t;
	let o = Ja(e);
	return Gn.set(e, o), o;
};
var Ka = (e) => e.some((t) => Array.isArray(t) ? t[0] === rehypeRaw : t === rehypeRaw);
var Ja = (e) => {
	let t = e.rehypePlugins || Xn, o = e.remarkPlugins || Xn, n = Ka(t) ? o : [...o, Wn], r = e.remarkRehypeOptions ? {
		...Zn,
		...e.remarkRehypeOptions
	} : Zn;
	return unified().use(remarkParse).use(n).use(remarkRehype, r).use(t);
};
var Kn = (e) => e;
var Ua = (e, t, o, n) => {
	o ? e.children.splice(t, 1) : e.children[t] = {
		type: "text",
		value: n
	};
};
var Ya = (e, t) => {
	var o;
	for (let n in urlAttributes) if (Object.hasOwn(urlAttributes, n) && Object.hasOwn(e.properties, n)) {
		let r = e.properties[n], s = urlAttributes[n];
		(s === null || s.includes(e.tagName)) && (e.properties[n] = (o = t(String(r || ""), n, e)) != null ? o : void 0);
	}
};
var Qa = (e, t, o, n, r, s) => {
	let a = false;
	return n ? a = !n.includes(e.tagName) : r && (a = r.includes(e.tagName)), !a && s && typeof t == "number" && (a = !s(e, t, o)), a;
};
var ei = (e, t) => {
	let { allowElement: o, allowedElements: n, disallowedElements: r, skipHtml: s, unwrapDisallowed: a, urlTransform: l } = t;
	if (o || n || r || s || l) {
		let c = l || Kn;
		visit(e, (d, f, g) => {
			if (d.type === "raw" && g && typeof f == "number") return Ua(g, f, s, d.value), f;
			if (d.type === "element" && (Ya(d, c), Qa(d, f, g, n, r, o) && g && typeof f == "number")) return a && d.children ? g.children.splice(f, 1, ...d.children) : g.children.splice(f, 1), f;
		});
	}
	return toJsxRuntime(e, {
		Fragment: import_jsx_runtime.Fragment,
		components: t.components,
		ignoreInvalidStyle: true,
		jsx: import_jsx_runtime.jsx,
		jsxs: import_jsx_runtime.jsxs,
		passKeys: true,
		passNode: true
	});
};
var oi = /\[\^[\w-]{1,200}\](?!:)/;
var ni = /\[\^[\w-]{1,200}\]:/;
var ri = /<([A-Za-z][\w:-]*)[\s>/]/;
var si = /^ {0,3}\[[^\]]+\]:/m;
var ai = /* @__PURE__ */ new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
var Jn = /* @__PURE__ */ new Map();
var Un = /* @__PURE__ */ new Map();
var ii = (e) => {
	let t = e.toLowerCase(), o = Jn.get(t);
	if (o) return o;
	let n = new RegExp(`<${t}(?=[\\s>/])[^>]*>`, "gi");
	return Jn.set(t, n), n;
};
var li = (e) => {
	let t = e.toLowerCase(), o = Un.get(t);
	if (o) return o;
	let n = new RegExp(`</${t}(?=[\\s>])[^>]*>`, "gi");
	return Un.set(t, n), n;
};
var Yn = (e, t) => {
	if (ai.has(t.toLowerCase())) return 0;
	let o = e.match(ii(t));
	if (!o) return 0;
	let n = 0;
	for (let r of o) r.trimEnd().endsWith("/>") || (n += 1);
	return n;
};
var Qn = (e, t) => {
	let o = e.match(li(t));
	return o ? o.length : 0;
};
var ci = (e) => {
	let t = 0;
	for (let o = 0; o < e.length - 1; o += 1) e[o] === "$" && e[o + 1] === "$" && (t += 1, o += 1);
	return t;
};
var di = /\r\n|\r/g;
var er = (e) => new R({ gfm: true }).blockTokens(e);
var ve = null;
var mi = `

`;
var ui = (e) => {
	for (let t = e.length - 3; t >= 0; t -= 1) if (e[t].endsWith(mi)) return t + 1;
	return 0;
};
var pi = (e) => ` ${e}`.slice(1);
var tr = (e) => e.map(pi);
var or = (e) => {
	let t = [], o = [], n = false;
	for (let r of e) {
		let s = r.raw, a = t.length;
		if (o.length > 0) {
			t[a - 1] += s;
			let l = o.at(-1), i = Yn(s, l), c = Qn(s, l);
			for (let d = 0; d < i; d += 1) o.push(l);
			for (let d = 0; d < c; d += 1) o.length > 0 && o.at(-1) === l && o.pop();
			continue;
		}
		if (r.type === "html" && r.block) {
			let l = s.match(ri);
			if (l) {
				let i = l[1];
				Yn(s, i) > Qn(s, i) && o.push(i);
			}
		}
		if (r.type === "space" && a > 0) {
			t[a - 1] += s;
			continue;
		}
		if (a > 0 && !n) {
			let l = t[a - 1];
			if (ci(l) % 2 === 1) {
				t[a - 1] = l + s;
				continue;
			}
		}
		t.push(s), r.type !== "space" && (n = r.type === "code");
	}
	return t;
};
var fi = (e, t) => {
	if (t.length <= e.input.length || t.slice(0, e.input.length) !== e.input || si.test(t)) return null;
	let o = ui(e.blocks);
	if (o === 0) return null;
	let n = e.verifiedCount, r = e.verifiedLength;
	if (n > o) {
		n = o, r = 0;
		for (let a = 0; a < n; a += 1) r += e.blocks[a].length;
	}
	for (; n < o && t.startsWith(e.blocks[n], r);) r += e.blocks[n].length, n += 1;
	if (n !== o) return null;
	let s = tr(or(er(t.slice(r))));
	return {
		input: t,
		blocks: e.blocks.slice(0, o).concat(s),
		verifiedCount: n,
		verifiedLength: r
	};
};
var eo = (e) => {
	let t = oi.test(e), o = ni.test(e);
	if (t || o) return [e];
	let n = e.includes("\r") ? e.replace(di, `
`) : e;
	if ((ve == null ? void 0 : ve.input) === n) return ve.blocks;
	let r = ve ? fi(ve, n) : null, s = r != null ? r : {
		input: n,
		blocks: tr(or(er(n))),
		verifiedCount: 0,
		verifiedLength: 0
	};
	return ve = s, s.blocks;
};
var gi = /^\n*/;
var bi = /\n*$/;
var to = /\n\n/g;
var hi = (e, t, o) => {
	if (!t.includes(`
`)) return e + t + o;
	return `${e}${t.replace(to, `
<!---->
`).replace(gi, `

`).replace(bi, `

`)}${o}

`;
};
var yi = (e, t) => {
	let o = new RegExp(`<(${t})(?=[\\s>/])([^>]*)>`, "gi"), n = "", r = 0, s = o.exec(e);
	for (; s;) {
		let a = s[0], l = s[1], i = s.index + a.length, c = e.slice(i);
		if (new RegExp(`</${l}\\s*>`, "i").test(c)) {
			s = o.exec(e);
			continue;
		}
		if (n += e.slice(r, s.index), c.length === 0) {
			n += a, r = i, s = o.exec(e);
			continue;
		}
		if (c.startsWith(`

`)) {
			let p = c.slice(2).replace(to, `
<!---->
`);
			n += `${a}

${p}`, r = e.length;
			break;
		}
		if (!c.startsWith(`
`)) {
			n += a, r = i, s = o.exec(e);
			continue;
		}
		let f = c.slice(1);
		if (f.trim().length === 0) {
			n += a, r = i, s = o.exec(e);
			continue;
		}
		let g = f.replace(to, `
<!---->
`);
		n += `${a}

${g}`, r = e.length;
		break;
	}
	return r === 0 ? e : n + e.slice(r);
};
var nr = (e, t) => {
	if (!t.length) return e;
	let o = e;
	for (let n of t) {
		let r = new RegExp(`(<${n}(?=[\\s>/])[^>]*>)([\\s\\S]*?)(</${n}\\s*>)`, "gi");
		o = o.replace(r, (s, a, l, i) => hi(a, l, i)), o = yi(o, n);
	}
	return o;
};
var Ci = /([\\`*_~[\]|])/g;
var wi = (e) => e.replace(Ci, "\\$1");
var rr = (e, t) => {
	if (!t.length) return e;
	let o = e;
	for (let n of t) {
		let r = new RegExp(`(<${n}(?=[\\s>/])[^>]*>)([\\s\\S]*?)(</${n}\\s*>)`, "gi");
		o = o.replace(r, (s, a, l, i) => {
			return a + wi(l).replace(/\n\n/g, "&#10;&#10;") + i;
		});
	}
	return o;
};
var vi = /* @__PURE__ */ new Set([
	"blockquote",
	"dd",
	"dt",
	"figcaption",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"li",
	"p",
	"td",
	"th"
]);
var sr = /* @__PURE__ */ new Set([
	"code",
	"kbd",
	"pre",
	"samp",
	"var"
]);
function ar(e) {
	return e.children.map((t) => t.type === "text" ? t.value : t.type === "element" && !sr.has(t.tagName) ? ar(t) : "").join("");
}
function ir() {
	return (e) => {
		visit(e, "element", (t) => {
			if (sr.has(t.tagName)) {
				t.properties ??= {}, t.properties.dir = "ltr";
				return;
			}
			vi.has(t.tagName) && (t.properties ??= {}, typeof t.properties.dir != "string" && (t.properties.dir = Ke(ar(t))));
		});
	};
}
var lr = (e) => e.type === "text" ? e.value : "children" in e && Array.isArray(e.children) ? e.children.map(lr).join("") : "";
var cr = (e) => (t) => {
	if (!e || e.length === 0) return;
	let o = new Set(e.map((n) => n.toLowerCase()));
	visit(t, "element", (n) => {
		if (o.has(n.tagName.toLowerCase())) {
			let r = lr(n);
			n.children = r ? [{
				type: "text",
				value: r
			}] : [];
		}
	});
};
var dr = () => (e) => {
	visit(e, "code", (t) => {
		var o, n;
		t.meta && (t.data = (o = t.data) != null ? o : {}, t.data.hProperties = {
			...(n = t.data.hProperties) != null ? n : {},
			metastring: t.meta
		});
	});
};
var Ei = /^([a-zA-Z][a-zA-Z\d+\-.]*:)/;
var Mi = (e) => new Set(e.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0).map((t) => t.endsWith(":") ? t : `${t}:`));
function Ni(e, t, o) {
	var l, i;
	let n = (i = (l = e.position) == null ? void 0 : l.start) == null ? void 0 : i.offset;
	if (typeof n == "number" && o.charCodeAt(n) === 91 || e.children.length !== 1) return false;
	let [r] = e.children;
	if (r.type !== "text") return false;
	let s = Ei.exec(e.url);
	if (!s) return false;
	let a = s[1].toLowerCase();
	return t.has(a) ? a === "mailto:" ? e.url === `mailto:${r.value}` : e.url === r.value || e.url === `${a}//${r.value}` : false;
}
var mr = (e = []) => {
	let t = Mi(e);
	return (o, n) => {
		var s;
		if (t.size === 0) return;
		let r = String((s = n.value) != null ? s : "");
		visit(o, "link", (a, l, i) => {
			if (!(!i || l === void 0) && Ni(a, t, r)) return i.children.splice(l, 1, ...a.children), l;
		});
	};
};
var pr = "data-sd-caret-hidden";
var fr = (e) => {
	let t = (0, import_react.useRef)(null), o = (0, import_react.useRef)(null), [n, r] = (0, import_react.useState)(false);
	return (0, import_react.useEffect)(() => r(true), []), (0, import_react.useLayoutEffect)(() => {
		var l, i;
		let s = e && (i = (l = t.current) == null ? void 0 : l.lastElementChild) != null ? i : null, a = o.current;
		a !== s && (a?.removeAttribute(pr), s?.setAttribute(pr, ""), o.current = s);
	}), {
		containerRef: t,
		showCaret: n || !e
	};
};
var br = /^[a-z]/;
var Fi = /^[ \t]*<[\w!/?-]/;
var _i = /(^|\n)[ \t]{4,}(?=<[\w!/?-])/g;
var ji = (e) => typeof e != "string" || e.length === 0 || !Fi.test(e) ? e : e.replace(_i, "$1");
var yr;
var Cr;
var wr;
var xr;
var vr;
var kr;
var ht = {
	...defaultSchema,
	clobberPrefix: "",
	protocols: {
		...defaultSchema.protocols,
		href: [
			...(Cr = (yr = defaultSchema.protocols) == null ? void 0 : yr.href) != null ? Cr : [],
			"tel",
			"streamdown"
		],
		src: [...(xr = (wr = defaultSchema.protocols) == null ? void 0 : wr.src) != null ? xr : [], "streamdown"]
	},
	attributes: {
		...defaultSchema.attributes,
		code: [...(kr = (vr = defaultSchema.attributes) == null ? void 0 : vr.code) != null ? kr : [], "metastring"]
	}
};
var oo = {
	raw: rehypeRaw,
	sanitize: [rehypeSanitize, ht],
	harden: [harden, {
		allowedImagePrefixes: ["*"],
		allowedLinkPrefixes: ["*"],
		allowedProtocols: ["*"],
		defaultOrigin: void 0,
		allowDataImages: true
	}]
};
var zi = {
	gfm: [remarkGfm, {}],
	codeMeta: dr
};
var hr = Object.values(oo);
var $i = Object.values(zi);
var Wi = {
	block: " ▋",
	circle: " ●"
};
var Mr = ["github-light", "github-dark"];
var Nr = { enabled: true };
var S = (0, import_react.createContext)({
	codeBlockMaxHeight: 400,
	shikiTheme: Mr,
	controls: true,
	isAnimating: false,
	lineNumbers: true,
	mode: "streaming",
	mermaid: void 0,
	linkSafety: Nr,
	portal: void 0,
	tableMaxHeight: 300
});
var Sr = (0, import_react.memo)(({ content: e, shouldParseIncompleteMarkdown: t, shouldNormalizeHtmlIndentation: o, index: n, isIncomplete: r, dir: s, animatePlugin: a, ...l }) => {
	(0, import_react.useLayoutEffect)(() => {
		a?.commit();
	});
	let i = typeof e == "string" && o ? ji(e) : e, c = (0, import_jsx_runtime.jsx)(Qt, {
		...l,
		children: i
	});
	return (0, import_jsx_runtime.jsx)(Nt.Provider, {
		value: r,
		children: s ? (0, import_jsx_runtime.jsx)("div", {
			dir: s,
			style: { display: "contents" },
			children: c
		}) : c
	});
}, (e, t) => {
	if (e.content !== t.content || e.shouldNormalizeHtmlIndentation !== t.shouldNormalizeHtmlIndentation || e.index !== t.index || e.isIncomplete !== t.isIncomplete || e.dir !== t.dir) return false;
	if (e.components !== t.components) {
		let o = Object.keys(e.components || {}), n = Object.keys(t.components || {});
		if (o.length !== n.length || o.some((r) => {
			var s, a;
			return ((s = e.components) == null ? void 0 : s[r]) !== ((a = t.components) == null ? void 0 : a[r]);
		})) return false;
	}
	return !(e.rehypePlugins !== t.rehypePlugins || e.remarkPlugins !== t.remarkPlugins || !!e.animatePlugin != !!t.animatePlugin);
});
Sr.displayName = "Block";
var Xi = (0, import_react.memo)(({ children: e, mode: t = "streaming", dir: o, parseIncompleteMarkdown: n = true, normalizeHtmlIndentation: r = false, components: s, rehypePlugins: a = hr, remarkPlugins: l = $i, className: i, shikiTheme: c, mermaid: d, codeBlockMaxHeight: f = 400, controls: g = true, isAnimating: p = false, tableMaxHeight: u = 300, animated: b, BlockComponent: h = Sr, parseMarkdownIntoBlocksFn: y = eo, caret: w, plugins: m, remend: C, linkSafety: M = Nr, portal: P, lineNumbers: N = true, allowedTags: I, fallbackComponent: E, literalTagContent: R, disableAutolinkProtocols: $, translations: H, icons: Z, prefix: Q, onAnimationStart: A, onAnimationEnd: z, ..._ }) => {
	let G = (0, import_react.useId)(), ee = (0, import_react.useMemo)(() => No(Q), [Q]), ae = (0, import_react.useRef)(null), ie = (0, import_react.useRef)(A), Te = (0, import_react.useRef)(z);
	ie.current = A, Te.current = z, (0, import_react.useEffect)(() => {
		var V, q, ne;
		if (t === "static") return;
		let v = ae.current;
		if (ae.current = p, v === null) {
			p && ((V = ie.current) == null || V.call(ie));
			return;
		}
		p && !v ? (q = ie.current) == null || q.call(ie) : !p && v && ((ne = Te.current) == null || ne.call(Te));
	}, [p, t]);
	let Be = (0, import_react.useMemo)(() => I ? Object.keys(I) : [], [I]), ge = (0, import_react.useMemo)(() => {
		if (typeof e != "string") return "";
		let v = t === "streaming" && n ? Or(e, C) : e;
		return R && R.length > 0 && (v = rr(v, R)), Be.length > 0 && (v = nr(v, Be)), v;
	}, [
		e,
		t,
		n,
		C,
		Be,
		R
	]), K = (0, import_react.useMemo)(() => y(ge), [ge, y]), le = (0, import_react.useMemo)(() => o === "auto" ? K.map(Ke) : void 0, [K, o]), wt = (0, import_react.useMemo)(() => K.map((v, V) => `${G}-${V}`), [K.length, G]), T = (0, import_react.useMemo)(() => b === true ? "true" : b ? JSON.stringify(b) : "", [b]), L = (0, import_react.useRef)(null), te = (0, import_react.useRef)([]), oe = (0, import_react.useRef)([]), Ye = (0, import_react.useRef)(null), xt = (0, import_react.useRef)("");
	if (T) {
		if (xt.current !== T) {
			xt.current = T;
			L.current = Pt({ maxBacklogMs: T !== "true" ? b.maxBacklogMs : void 0 }), te.current = [], oe.current = [];
		} else L.current || (L.current = Pt());
		p && L.current && L.current.beginPass(L.current.now());
	} else L.current = null, te.current = [], oe.current = [], xt.current = "";
	(0, import_react.useLayoutEffect)(() => {
		var v;
		p && ((v = L.current) == null || v.commitPass());
	});
	let io = (0, import_react.useMemo)(() => {
		var v, V;
		return {
			codeBlockMaxHeight: f,
			shikiTheme: (V = c != null ? c : (v = m == null ? void 0 : m.code) == null ? void 0 : v.getThemes()) != null ? V : Mr,
			controls: g,
			isAnimating: p,
			lineNumbers: N,
			mode: t,
			mermaid: d,
			linkSafety: M,
			portal: P,
			tableMaxHeight: u
		};
	}, [
		f,
		c,
		g,
		p,
		N,
		t,
		d,
		M,
		P,
		m == null ? void 0 : m.code,
		u
	]), Lr = (0, import_react.useMemo)(() => H ? JSON.stringify(H) : "", [H]), lo = (0, import_react.useMemo)(() => ({
		...st,
		...H
	}), [Lr]), co = (0, import_react.useMemo)(() => {
		let { inlineCode: v, ...V } = s != null ? s : {}, q = {
			...Kt,
			...V
		};
		if (v) {
			let ne = q.code;
			q.code = (J) => "data-block" in J ? ne ? (0, import_react.createElement)(ne, J) : null : (0, import_react.createElement)(v, J);
		}
		if (E) {
			if (I) for (let J of Object.keys(I)) Object.hasOwn(q, J) || (q[J] = E);
			let ne = {
				configurable: true,
				enumerable: false,
				value: E,
				writable: false
			};
			return new Proxy(q, {
				getOwnPropertyDescriptor(J, Y) {
					let be = Object.getOwnPropertyDescriptor(J, Y);
					if (be) return be;
					if (typeof Y == "string" && br.test(Y)) return ne;
				},
				get(J, Y, be) {
					return typeof Y == "string" && br.test(Y) && !Object.hasOwn(J, Y) ? E : Reflect.get(J, Y, be);
				}
			});
		}
		return q;
	}, [
		s,
		E,
		I
	]), mo = (0, import_react.useMemo)(() => {
		let v = [];
		return m != null && m.cjk && (v = [...v, ...m.cjk.remarkPluginsBefore]), v = [...v, ...l], $ && $.length > 0 && (v = [...v, [mr, $]]), m != null && m.cjk && (v = [...v, ...m.cjk.remarkPluginsAfter]), m != null && m.math && (v = [...v, m.math.remarkPlugin]), v;
	}, [
		l,
		m == null ? void 0 : m.math,
		m == null ? void 0 : m.cjk,
		$
	]), Oe = (0, import_react.useMemo)(() => {
		var V;
		let v = a;
		if (I && Object.keys(I).length > 0 && a === hr) {
			let q = {
				...ht,
				tagNames: [...(V = ht.tagNames) != null ? V : [], ...Object.keys(I)],
				attributes: {
					...ht.attributes,
					...I
				}
			};
			v = [
				oo.raw,
				[rehypeSanitize, q],
				oo.harden
			];
		}
		return R && R.length > 0 && (v = [...v, [cr, R]]), m != null && m.math && (v = [...v, m.math.rehypePlugin]), o === "auto" && t === "static" && (v = [...v, ir]), v;
	}, [
		a,
		m == null ? void 0 : m.math,
		I,
		R,
		o,
		t
	]), Dr = (0, import_react.useMemo)(() => w && p ? { "--streamdown-caret": `"${Wi[w]}"` } : void 0, [w, p]), { containerRef: Ar, showCaret: Br } = fr((0, import_react.useMemo)(() => {
		if (!p || K.length === 0) return false;
		let v = K.at(-1);
		return Jt(v) || $n(v);
	}, [p, K])), Or$1 = (v) => {
		let V = null;
		if (L.current && p) {
			if (!te.current[v]) {
				let { maxBacklogMs: J, ...Y } = T && T !== "true" ? b : {};
				te.current[v] = To({
					...Y,
					timeline: L.current
				});
			}
			V = te.current[v];
		}
		Ye.current !== Oe && (oe.current = [], Ye.current = Oe), V && !oe.current[v] && (oe.current[v] = [...Oe, V.rehypePlugin]);
		let q = V && oe.current[v] ? oe.current[v] : Oe;
		return {
			blockAnimatePlugin: V,
			blockRehypePlugins: q
		};
	};
	return t === "static" ? (0, import_jsx_runtime.jsx)(at.Provider, {
		value: lo,
		children: (0, import_jsx_runtime.jsx)(lt.Provider, {
			value: m != null ? m : null,
			children: (0, import_jsx_runtime.jsx)(S.Provider, {
				value: io,
				children: (0, import_jsx_runtime.jsx)(Ht, {
					icons: Z,
					children: (0, import_jsx_runtime.jsx)(Qe.Provider, {
						value: ee,
						children: (0, import_jsx_runtime.jsx)("div", {
							className: ee("space-y-4 whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", i),
							dir: o === "auto" ? void 0 : o,
							children: (0, import_jsx_runtime.jsx)(Qt, {
								components: co,
								rehypePlugins: Oe,
								remarkPlugins: mo,
								..._,
								children: ge
							})
						})
					})
				})
			})
		})
	}) : (0, import_jsx_runtime.jsx)(at.Provider, {
		value: lo,
		children: (0, import_jsx_runtime.jsx)(lt.Provider, {
			value: m != null ? m : null,
			children: (0, import_jsx_runtime.jsx)(S.Provider, {
				value: io,
				children: (0, import_jsx_runtime.jsx)(Ht, {
					icons: Z,
					children: (0, import_jsx_runtime.jsx)(Qe.Provider, {
						value: ee,
						children: (0, import_jsx_runtime.jsxs)("div", {
							className: ee("space-y-4 whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", w && Br ? "[&>*:last-child:not([data-sd-caret-hidden])]:after:inline [&>*:last-child:not([data-sd-caret-hidden])]:after:align-baseline [&>*:last-child:not([data-sd-caret-hidden])]:after:content-[var(--streamdown-caret)]" : null, i),
							ref: Ar,
							style: Dr,
							children: [K.length === 0 && w && p && (0, import_jsx_runtime.jsx)("span", {}), K.map((v, V) => {
								var be;
								let q = V === K.length - 1, ne = p && q && Jt(v), { blockAnimatePlugin: J, blockRehypePlugins: Y } = Or$1(V);
								return (0, import_jsx_runtime.jsx)(h, {
									animatePlugin: J,
									components: co,
									content: v,
									dir: (be = le == null ? void 0 : le[V]) != null ? be : o !== "auto" ? o : void 0,
									index: V,
									isIncomplete: ne,
									rehypePlugins: Y,
									remarkPlugins: mo,
									shouldNormalizeHtmlIndentation: r,
									shouldParseIncompleteMarkdown: n,
									..._
								}, wt[V]);
							})]
						})
					})
				})
			})
		})
	});
}, (e, t) => e.children === t.children && e.shikiTheme === t.shikiTheme && e.isAnimating === t.isAnimating && e.animated === t.animated && e.mode === t.mode && e.plugins === t.plugins && e.className === t.className && e.linkSafety === t.linkSafety && e.lineNumbers === t.lineNumbers && e.codeBlockMaxHeight === t.codeBlockMaxHeight && e.tableMaxHeight === t.tableMaxHeight && e.normalizeHtmlIndentation === t.normalizeHtmlIndentation && e.literalTagContent === t.literalTagContent && e.disableAutolinkProtocols === t.disableAutolinkProtocols && JSON.stringify(e.translations) === JSON.stringify(t.translations) && e.prefix === t.prefix && e.dir === t.dir && e.fallbackComponent === t.fallbackComponent);
Xi.displayName = "Streamdown";
var Je = (e) => e > 0 ? e : null;
var Ki = (e, t) => {
	if (e.endsWith("px")) return Je(Number.parseFloat(e));
	if (e.endsWith("rem")) {
		let o = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
		return Je(Number.parseFloat(e) * o);
	}
	if (e.endsWith("em")) {
		let o = Number.parseFloat(getComputedStyle(t).fontSize || "16");
		return Je(Number.parseFloat(e) * o);
	}
	if (e.endsWith("vh")) return Je(Number.parseFloat(e) / 100 * window.innerHeight);
	if (e.endsWith("%")) {
		let o = t.parentElement;
		return o && o.clientHeight > 0 ? Je(Number.parseFloat(e) / 100 * o.clientHeight) : null;
	}
	return null;
};
var ro = (e, t) => {
	let o = t.trim().toLowerCase();
	return !o || o === "none" || o === "auto" ? null : Ki(o, e);
};
var Ji = /^min\(\s*([^,]+)\s*,\s*([^)]+)\s*\)$/i;
var Ui = (e, t) => {
	let o = ro(e, t);
	if (o != null) return o;
	let n = t.trim().match(Ji);
	if (!n) return null;
	let r = ro(e, n[1].trim()), s = ro(e, n[2].trim());
	return r == null || s == null ? null : Math.min(r, s);
};
var Yi = (e, t, o) => {
	let n = t.clientWidth;
	if (!(n > 0)) return null;
	if (o) {
		let d = t.clientHeight;
		if (!(d > 0)) return null;
		let f = Math.min(n / e.width, d / e.height, 1);
		return !(f > 0) || Number.isNaN(f) ? null : {
			fitZoom: f,
			viewportHeight: null
		};
	}
	let r = Math.min(n / e.width, 1);
	if (!(r > 0) || Number.isNaN(r)) return null;
	let s = e.height * r, a = null, l = t;
	for (; l && a == null;) {
		let d = getComputedStyle(l);
		a = Ui(l, d.maxHeight), l = l.parentElement;
	}
	let i = a != null ? Math.min(s, a) : s, c = Math.min(r, i / e.height, 1);
	return !(c > 0) || Number.isNaN(c) ? null : {
		fitZoom: c,
		viewportHeight: i
	};
};
var Rr = ({ children: e, className: t, contentSize: o, fitKey: n, minZoom: r = .5, maxZoom: s = 3, zoomStep: a = .1, showControls: l = true, initialZoom: i = 1, isAutoFit: c = false, fullscreen: d = false }) => {
	let { RotateCcwIcon: f, ZoomInIcon: g, ZoomOutIcon: p } = F(), u = x(), b = j(), h = (0, import_react.useRef)(null), y = (0, import_react.useRef)(null), w = (0, import_react.useRef)(false), [m, C] = (0, import_react.useState)(i), [M, P] = (0, import_react.useState)(r), [N, I] = (0, import_react.useState)(i), [E, R] = (0, import_react.useState)({
		x: 0,
		y: 0
	}), [$, H] = (0, import_react.useState)(false), [Z, Q] = (0, import_react.useState)({
		x: 0,
		y: 0
	}), [A, z] = (0, import_react.useState)({
		x: 0,
		y: 0
	}), [_, G] = (0, import_react.useState)(null), ee = (0, import_react.useCallback)((T) => {
		let L = h.current;
		if (!L) return;
		let te = Yi(T, L, d);
		if (!te) return;
		let { fitZoom: oe, viewportHeight: Ye } = te;
		G(Ye), C(oe), P(Math.min(r, oe)), w.current || (I(oe), R({
			x: 0,
			y: 0
		}));
	}, [d, r]), ae = (0, import_react.useCallback)((T) => {
		I((L) => Math.max(M, Math.min(s, L + T))), w.current = true;
	}, [M, s]), ie = (0, import_react.useCallback)(() => {
		ae(a);
	}, [ae, a]), Te = (0, import_react.useCallback)(() => {
		ae(-a);
	}, [ae, a]), Be = (0, import_react.useCallback)(() => {
		I(m), R({
			x: 0,
			y: 0
		}), w.current = false;
	}, [m]), ge = (0, import_react.useCallback)((T) => {
		T.preventDefault();
		let L = T.deltaY > 0 ? -a : a;
		ae(L);
	}, [ae, a]), ao = (0, import_react.useCallback)((T) => {
		if (T.button !== 0 || T.isPrimary === false) return;
		H(true), w.current = true, Q({
			x: T.clientX,
			y: T.clientY
		}), z(E);
		let L = T.currentTarget;
		L instanceof HTMLElement && L.setPointerCapture(T.pointerId);
	}, [E]), K = (0, import_react.useCallback)((T) => {
		if (!$) return;
		T.preventDefault();
		let L = T.clientX - Z.x, te = T.clientY - Z.y;
		R({
			x: A.x + L,
			y: A.y + te
		});
	}, [
		$,
		Z,
		A
	]), le = (0, import_react.useCallback)((T) => {
		H(false);
		let L = T.currentTarget;
		L instanceof HTMLElement && L.releasePointerCapture(T.pointerId);
	}, []);
	(0, import_react.useEffect)(() => {
		P(r), c || (C(i), I(i), G(null));
	}, [
		i,
		c,
		r
	]), (0, import_react.useLayoutEffect)(() => {
		if (!(c && o)) return;
		ee(o);
		let T = h.current;
		if (!T || typeof ResizeObserver == "undefined") return;
		let L = new ResizeObserver(() => {
			ee(o);
		});
		return L.observe(T), () => {
			L.disconnect();
		};
	}, [
		ee,
		o,
		c
	]), (0, import_react.useEffect)(() => {
		c && (w.current = false);
	}, [n, c]), (0, import_react.useEffect)(() => {
		let T = h.current;
		if (T) return T.addEventListener("wheel", ge, { passive: false }), () => {
			T.removeEventListener("wheel", ge);
		};
	}, [ge]), (0, import_react.useEffect)(() => {
		let T = y.current;
		if (T && $) return document.body.style.userSelect = "none", T.addEventListener("pointermove", K, { passive: false }), T.addEventListener("pointerup", le), T.addEventListener("pointercancel", le), () => {
			document.body.style.userSelect = "", T.removeEventListener("pointermove", K), T.removeEventListener("pointerup", le), T.removeEventListener("pointercancel", le);
		};
	}, [
		$,
		K,
		le
	]);
	let wt = !d && c && _ != null ? { height: _ } : void 0;
	return (0, import_jsx_runtime.jsxs)("div", {
		className: u("relative flex flex-col", d ? "h-full w-full" : "min-h-28 w-full", t),
		ref: h,
		style: {
			cursor: $ ? "grabbing" : "grab",
			...wt
		},
		children: [l ? (0, import_jsx_runtime.jsxs)("div", {
			className: u("absolute z-10 flex flex-col gap-1 rounded-md border border-border bg-background/80 p-1 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-sm", d ? "bottom-4 left-4" : "bottom-2 left-2"),
			children: [
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": b.zoomIn,
					className: u("flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"),
					disabled: N >= s,
					onClick: ie,
					title: b.zoomIn,
					type: "button",
					children: (0, import_jsx_runtime.jsx)(g, {
						"aria-hidden": "true",
						size: 16
					})
				}),
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": b.zoomOut,
					className: u("flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"),
					disabled: N <= M,
					onClick: Te,
					title: b.zoomOut,
					type: "button",
					children: (0, import_jsx_runtime.jsx)(p, {
						"aria-hidden": "true",
						size: 16
					})
				}),
				(0, import_jsx_runtime.jsx)("button", {
					"aria-label": b.resetView,
					className: u("flex items-center justify-center rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"),
					onClick: Be,
					title: b.resetView,
					type: "button",
					children: (0, import_jsx_runtime.jsx)(f, {
						"aria-hidden": "true",
						size: 16
					})
				})
			]
		}) : null, (0, import_jsx_runtime.jsx)("div", {
			className: u("flex h-full w-full flex-1 origin-center items-center justify-center transition-transform duration-150 ease-out"),
			onPointerDown: ao,
			ref: y,
			role: "application",
			style: {
				transform: `translate(${E.x}px, ${E.y}px) scale(${N})`,
				transformOrigin: "center center",
				touchAction: "none",
				willChange: "transform"
			},
			children: e
		})]
	});
};
var el = (e, t) => new Promise((o) => {
	let n = setTimeout(o, e);
	t(() => {
		clearTimeout(n), o();
	});
});
var tl = async (e, { chart: t, config: o }, n) => {
	try {
		let r = e.getMermaid(o), s = t.split("").reduce((c, d) => (c << 5) - c + d.charCodeAt(0) | 0, 0), a = `mermaid-${Math.abs(s)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, { svg: l } = await r.render(a, t), i = _t(l);
		return {
			ok: !0,
			svg: n ? l : on(l),
			size: i
		};
	} catch (r) {
		return {
			ok: false,
			error: r instanceof Error ? r.message : "Failed to render Mermaid chart"
		};
	}
};
var ln = ({ chart: e, className: t, config: o, fullscreen: n = false, showControls: r = true }) => {
	let s = x(), [a, l] = (0, import_react.useState)(null), [i, c] = (0, import_react.useState)(false), [d, f] = (0, import_react.useState)(""), [g, p] = (0, import_react.useState)(null), [u, b] = (0, import_react.useState)(""), [h, y] = (0, import_react.useState)(0), { mermaid: w } = (0, import_react.useContext)(S), m = Ie(), C = w == null ? void 0 : w.errorComponent, { shouldRender: M, containerRef: P } = uo({ immediate: n }), N = (0, import_react.useRef)(null), I = (0, import_react.useRef)(false), E = (0, import_react.useRef)(false), R = Fe(), $ = (0, import_react.useRef)(R), H = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => (E.current = true, () => {
		var A;
		E.current = false, (A = H.current) == null || A.call(H);
	}), []), (0, import_react.useEffect)(() => {
		var A;
		$.current = R, R || (A = H.current) == null || A.call(H);
	}, [R]);
	let Z = async (A) => {
		$.current && (await el(A, (z) => {
			H.current = z;
		}), H.current = null);
	};
	if ((0, import_react.useEffect)(() => {
		if (!M) return;
		if (!m) {
			l("Mermaid plugin not available. Please add the mermaid plugin to enable diagram rendering.");
			return;
		}
		if (N.current = {
			chart: e,
			config: o
		}, I.current) return;
		let A = (_, G) => {
			G.ok ? (f(G.svg), p(G.size), b(G.svg)) : _ === N.current && l(G.error);
		};
		(async () => {
			I.current = true, l(null), c(true);
			try {
				let _ = N.current;
				for (; _;) {
					let G = performance.now(), ee = await tl(m, _, n);
					if (!E.current || (A(_, ee), ee.ok && await Z(performance.now() - G), !E.current || _ === N.current)) return;
					_ = N.current;
				}
			} finally {
				I.current = false, E.current && c(false);
			}
		})();
	}, [
		e,
		o,
		h,
		M,
		m
	]), !(M || d || u)) return (0, import_jsx_runtime.jsx)("div", {
		className: s("my-4 min-h-[200px]", t),
		ref: P
	});
	if (i && !d && !u) return (0, import_jsx_runtime.jsx)("div", {
		className: s("my-4 flex justify-center p-4", t),
		ref: P,
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: s("flex items-center space-x-2 text-muted-foreground"),
			children: [(0, import_jsx_runtime.jsx)("div", { className: s("h-4 w-4 animate-spin rounded-full border-current border-b-2") }), (0, import_jsx_runtime.jsx)("span", {
				className: s("text-sm"),
				children: "Loading diagram..."
			})]
		})
	});
	if (a && !d && !u) {
		let A = () => y((z) => z + 1);
		return C ? (0, import_jsx_runtime.jsx)("div", {
			ref: P,
			children: (0, import_jsx_runtime.jsx)(C, {
				chart: e,
				error: a,
				retry: A
			})
		}) : (0, import_jsx_runtime.jsxs)("div", {
			className: s("rounded-md bg-red-50 p-4", t),
			ref: P,
			children: [(0, import_jsx_runtime.jsxs)("p", {
				className: s("font-mono text-red-700 text-sm"),
				children: ["Mermaid Error: ", a]
			}), (0, import_jsx_runtime.jsxs)("details", {
				className: s("mt-2"),
				children: [(0, import_jsx_runtime.jsx)("summary", {
					className: s("cursor-pointer text-red-600 text-xs"),
					children: "Show Code"
				}), (0, import_jsx_runtime.jsx)("pre", {
					className: s("mt-2 overflow-x-auto rounded bg-red-100 p-2 text-red-800 text-xs"),
					children: e
				})]
			})]
		});
	}
	let Q = d || u;
	return (0, import_jsx_runtime.jsx)("div", {
		className: s(n ? "size-full" : "max-h-[min(70vh,40rem)] w-full", t),
		"data-streamdown": "mermaid",
		ref: P,
		children: (0, import_jsx_runtime.jsx)(Rr, {
			className: s(n ? "size-full overflow-hidden" : "max-h-[min(70vh,40rem)] overflow-hidden", t),
			contentSize: g,
			fitKey: e,
			fullscreen: n,
			isAutoFit: true,
			maxZoom: 3,
			minZoom: .1,
			showControls: r,
			zoomStep: .1,
			children: (0, import_jsx_runtime.jsx)("div", {
				"aria-label": "Mermaid chart",
				className: s("flex justify-center", n ? "size-full items-center" : null),
				dangerouslySetInnerHTML: { __html: Q },
				role: "img"
			})
		})
	});
};
//#endregion
//#region node_modules/streamdown/dist/highlighted-body-KQOG7T2V.js
var highlighted_body_KQOG7T2V_exports = /* @__PURE__ */ __exportAll({ HighlightedCodeBlockBody: () => T });
var T = ({ code: s, isIncomplete: l = false, language: e, maxHeight: d, raw: t, className: a, startLine: c$1, lineNumbers: p, ...f$1 }) => {
	let { shikiTheme: r } = (0, import_react.useContext)(S), o = Fc(), [H, i] = (0, import_react.useState)(t);
	return (0, import_react.useEffect)(() => {
		if (!o) {
			i(t);
			return;
		}
		let n = true, u = o.highlight({
			code: s,
			isIncomplete: l,
			language: e,
			themes: r
		}, (B) => {
			n && i(B);
		});
		return u && i(u), () => {
			n = false;
		};
	}, [
		s,
		l,
		e,
		r,
		o,
		t
	]), (0, import_jsx_runtime.jsx)(So, {
		className: a,
		language: e,
		lineNumbers: p,
		maxHeight: d,
		result: H,
		startLine: c$1,
		...f$1
	});
};
//#endregion
//#region node_modules/streamdown/dist/mermaid-MCJ5UELQ.js
var mermaid_MCJ5UELQ_exports = /* @__PURE__ */ __exportAll({ Mermaid: () => ln });
//#endregion
export { twMerge as n, Xi as t };
