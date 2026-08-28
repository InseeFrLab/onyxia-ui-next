import {
    mkdirSync,
    readFileSync,
    readdirSync,
    rmSync,
    statSync,
    writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const prettierConfigPath = path.join(repoRoot, ".prettierrc.json");
const prettierConfig = readJson(prettierConfigPath);
const generatedByScriptPath = "scripts/generateTokens.mjs";

const colorsSourceDir = path.join(repoRoot, "src/tokens/source/colors");
const palettesSourceDir = path.join(colorsSourceDir, "palettes");
const usecasesSourcePath = path.join(colorsSourceDir, "usecases.json");
const generatedColorsOutputPath = path.join(
    repoRoot,
    "src/tokens/generated/colors.ts",
);
const typographySourceDir = path.join(repoRoot, "src/tokens/source/typography");
const typographyTypefacesSourceDir = path.join(
    typographySourceDir,
    "typefaces",
);
const typographyStylesSourcePath = path.join(
    typographySourceDir,
    "styles.json",
);
const generatedTypographyOutputPath = path.join(
    repoRoot,
    "src/tokens/generated/typography/index.ts",
);
const spacingSourceDir = path.join(repoRoot, "src/tokens/source/spacing");
const spacingSourcePath = path.join(spacingSourceDir, "spacing.json");
const generatedSpacingOutputPath = path.join(
    repoRoot,
    "src/tokens/generated/spacing/index.ts",
);
const sizingSourceDir = path.join(repoRoot, "src/tokens/source/sizing");
const sizingSourcePath = path.join(sizingSourceDir, "sizing.json");
const generatedSizingOutputPath = path.join(
    repoRoot,
    "src/tokens/generated/sizing/index.ts",
);
const iconsSourceDir = path.join(repoRoot, "src/tokens/source/icons");
const iconSizingSourcePath = path.join(iconsSourceDir, "sizes.json");
const generatedIconSizingOutputPath = path.join(
    repoRoot,
    "src/tokens/generated/icons/index.ts",
);
const radiusSourceDir = path.join(repoRoot, "src/tokens/source/radius");
const radiusSourcePath = path.join(radiusSourceDir, "radius.json");
const generatedRadiusOutputPath = path.join(
    repoRoot,
    "src/tokens/generated/radius/index.ts",
);

function readJson(filePath) {
    return JSON.parse(readFileSync(filePath, "utf8"));
}

function fail(message) {
    throw new Error(`generateTokens: ${message}`);
}

function assertNumber(value, context) {
    if (typeof value !== "number" || Number.isNaN(value)) {
        fail(`${context} must be a number, received ${JSON.stringify(value)}`);
    }
}

function readFlatTokenObject(filePath, foundationName) {
    const sourceText = readFileSync(filePath, "utf8");
    const matchedKeys = [...sourceText.matchAll(/^\s*"([^"]+)"\s*:/gm)].map(
        ([, key]) => key,
    );
    const duplicateKey = matchedKeys.find(
        (key, index) => matchedKeys.indexOf(key) !== index,
    );

    if (duplicateKey !== undefined) {
        fail(
            `${foundationName} source contains a duplicate token name: ${duplicateKey}`,
        );
    }

    return JSON.parse(sourceText);
}

function sortSpacingTokenNames(tokenNames) {
    return [...tokenNames].sort((a, b) => {
        const aMatch = a.match(/^spacing-(\d+)$/);
        const bMatch = b.match(/^spacing-(\d+)$/);

        if (aMatch === null || bMatch === null) {
            return a.localeCompare(b, undefined, { numeric: true });
        }

        return Number(aMatch[1]) - Number(bMatch[1]);
    });
}

function sortRadiusTokenNames(tokenNames) {
    return [...tokenNames].sort((a, b) => {
        if (a === "radius-full") {
            return 1;
        }

        if (b === "radius-full") {
            return -1;
        }

        const aMatch = a.match(/^radius-(\d+)$/);
        const bMatch = b.match(/^radius-(\d+)$/);

        if (aMatch === null || bMatch === null) {
            return a.localeCompare(b, undefined, { numeric: true });
        }

        return Number(aMatch[1]) - Number(bMatch[1]);
    });
}

function sortSizingTokenNames(tokenNames) {
    return [...tokenNames].sort((a, b) => {
        if (a === "size-full") {
            return 1;
        }

        if (b === "size-full") {
            return -1;
        }

        const aMatch = a.match(/^size-(\d+)$/);
        const bMatch = b.match(/^size-(\d+)$/);

        if (aMatch === null || bMatch === null) {
            return a.localeCompare(b, undefined, { numeric: true });
        }

        return Number(aMatch[1]) - Number(bMatch[1]);
    });
}

function sortIconSizeTokenNames(tokenNames) {
    return [...tokenNames].sort((a, b) => {
        const aMatch = a.match(/^icon-size-(\d+)$/);
        const bMatch = b.match(/^icon-size-(\d+)$/);

        if (aMatch === null || bMatch === null) {
            return a.localeCompare(b, undefined, { numeric: true });
        }

        return Number(aMatch[1]) - Number(bMatch[1]);
    });
}

function assertHexColor(value, context) {
    if (
        typeof value !== "string" ||
        !/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value)
    ) {
        fail(
            `${context} must be a hex color, received ${JSON.stringify(value)}`,
        );
    }
}

function getPaletteSourceFiles() {
    return readdirSync(palettesSourceDir)
        .filter(fileName => fileName.endsWith(".json"))
        .sort();
}

function loadPaletteSources() {
    const paletteFiles = getPaletteSourceFiles();

    if (paletteFiles.length === 0) {
        fail("no palette JSON files were found");
    }

    const brandModes = [];
    const primitiveColorTokens = {};
    let referenceTokenNames = null;

    for (const fileName of paletteFiles) {
        const brandMode = path.basename(fileName, ".json");
        const filePath = path.join(palettesSourceDir, fileName);
        const valuesByToken = readJson(filePath);

        if (
            valuesByToken === null ||
            typeof valuesByToken !== "object" ||
            Array.isArray(valuesByToken) ||
            Object.keys(valuesByToken).length === 0
        ) {
            fail(`palette file ${fileName} must export a non-empty object`);
        }

        const tokenNames = Object.keys(valuesByToken).sort();

        if (referenceTokenNames === null) {
            referenceTokenNames = tokenNames;
        } else if (tokenNames.join("\n") !== referenceTokenNames.join("\n")) {
            fail(
                `palette file ${fileName} does not declare the same token set as the other brand palettes`,
            );
        }

        brandModes.push(brandMode);

        for (const tokenName of tokenNames) {
            const tokenValue = valuesByToken[tokenName];
            assertHexColor(
                tokenValue,
                `palette token ${tokenName} in ${fileName}`,
            );

            primitiveColorTokens[tokenName] ??= {};
            primitiveColorTokens[tokenName][brandMode] = tokenValue;
        }
    }

    return {
        brandModes,
        primitiveColorTokens,
    };
}

function loadUsecaseSource(knownPrimitiveTokenNames) {
    const usecasesSource = readJson(usecasesSourcePath);

    if (
        usecasesSource === null ||
        typeof usecasesSource !== "object" ||
        Array.isArray(usecasesSource)
    ) {
        fail("usecases.json must export an object");
    }

    const {
        collection = "colors-usecases",
        modes,
        values: semanticColorTokens,
    } = usecasesSource;

    if (collection !== "colors-usecases") {
        fail("usecases.json must target the colors-usecases collection");
    }

    if (!Array.isArray(modes) || modes.length === 0) {
        fail("usecases.json must declare at least one color mode");
    }

    if (
        semanticColorTokens === null ||
        typeof semanticColorTokens !== "object" ||
        Array.isArray(semanticColorTokens) ||
        Object.keys(semanticColorTokens).length === 0
    ) {
        fail("usecases.json must declare semantic tokens");
    }

    for (const [tokenName, aliasesByMode] of Object.entries(
        semanticColorTokens,
    )) {
        if (
            aliasesByMode === null ||
            typeof aliasesByMode !== "object" ||
            Array.isArray(aliasesByMode)
        ) {
            fail(
                `semantic token ${tokenName} must declare an object of aliases`,
            );
        }

        for (const colorMode of modes) {
            const aliasTarget = aliasesByMode[colorMode];

            if (typeof aliasTarget !== "string") {
                fail(
                    `semantic token ${tokenName} (${colorMode}) must reference a primitive token`,
                );
            }

            if (!knownPrimitiveTokenNames.has(aliasTarget)) {
                fail(
                    `semantic token ${tokenName} (${colorMode}) references unknown primitive token ${aliasTarget}`,
                );
            }
        }
    }

    return {
        colorModes: modes,
        semanticColorTokens,
    };
}

function getJsonFileNames(directoryPath) {
    return readdirSync(directoryPath)
        .filter(fileName => fileName.endsWith(".json"))
        .sort();
}

function loadTypographyTypefaces(expectedBrandModes) {
    const typefaceFiles = getJsonFileNames(typographyTypefacesSourceDir);

    if (typefaceFiles.length === 0) {
        fail("no typography typeface JSON files were found");
    }

    const brandModes = typefaceFiles.map(fileName =>
        path.basename(fileName, ".json"),
    );

    if (brandModes.join("\n") !== expectedBrandModes.join("\n")) {
        fail(
            "typography typeface files must match the supported brand modes declared by the color palettes",
        );
    }

    const typefacesByBrand = {};
    let referenceTypefaceRoles = null;

    for (const fileName of typefaceFiles) {
        const brandMode = path.basename(fileName, ".json");
        const filePath = path.join(typographyTypefacesSourceDir, fileName);
        const typefaces = readJson(filePath);

        if (
            typefaces === null ||
            typeof typefaces !== "object" ||
            Array.isArray(typefaces) ||
            Object.keys(typefaces).length === 0
        ) {
            fail(
                `typography typeface file ${fileName} must export a non-empty object`,
            );
        }

        const typefaceRoles = Object.keys(typefaces).sort();

        if (referenceTypefaceRoles === null) {
            referenceTypefaceRoles = typefaceRoles;
        } else if (
            typefaceRoles.join("\n") !== referenceTypefaceRoles.join("\n")
        ) {
            fail(
                `typography typeface file ${fileName} does not declare the same typeface roles as the other brands`,
            );
        }

        for (const role of typefaceRoles) {
            if (typeof typefaces[role] !== "string" || typefaces[role] === "") {
                fail(
                    `typography typeface ${role} in ${fileName} must be a non-empty string`,
                );
            }
        }

        typefacesByBrand[brandMode] = typefaces;
    }

    return {
        typefaceRoles: referenceTypefaceRoles,
        typefacesByBrand,
    };
}

function assertTypographyLeaf(value, context, knownTypefaceRoles) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        fail(`${context} must be an object`);
    }

    const { typeface, fontWeight, fontSize, lineHeight } = value;

    if (typeof typeface !== "string" || !knownTypefaceRoles.has(typeface)) {
        fail(
            `${context}.typeface must reference a known typeface role, received ${JSON.stringify(
                typeface,
            )}`,
        );
    }

    assertNumber(fontWeight, `${context}.fontWeight`);
    assertNumber(fontSize, `${context}.fontSize`);
    assertNumber(lineHeight, `${context}.lineHeight`);
}

function isTypographyLeaf(value) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }

    return ["typeface", "fontWeight", "fontSize", "lineHeight"].every(
        key => key in value,
    );
}

function validateTypographyStylesTree(value, context, knownTypefaceRoles) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        fail(`${context} must be an object`);
    }

    const entries = Object.entries(value);

    if (entries.length === 0) {
        fail(`${context} must not be empty`);
    }

    for (const [key, childValue] of entries) {
        const childContext = `${context}.${key}`;

        if (isTypographyLeaf(childValue)) {
            assertTypographyLeaf(childValue, childContext, knownTypefaceRoles);
            continue;
        }

        validateTypographyStylesTree(
            childValue,
            childContext,
            knownTypefaceRoles,
        );
    }
}

function validateTypographyStyleModes(value, knownTypefaceRoles) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        fail("typography styles must export an object of style modes");
    }

    const entries = Object.entries(value);

    if (entries.length === 0) {
        fail("typography styles must declare at least one style mode");
    }

    for (const [modeName, styleTree] of entries) {
        validateTypographyStylesTree(
            styleTree,
            `typography styles.${modeName}`,
            knownTypefaceRoles,
        );
    }
}

function loadTypographyStyles(knownTypefaceRoles) {
    const typographyStyles = readJson(typographyStylesSourcePath);

    validateTypographyStyleModes(typographyStyles, new Set(knownTypefaceRoles));

    return typographyStyles;
}

function loadSpacingSource() {
    const spacingTokens = readFlatTokenObject(spacingSourcePath, "spacing");

    if (
        spacingTokens === null ||
        typeof spacingTokens !== "object" ||
        Array.isArray(spacingTokens) ||
        Object.keys(spacingTokens).length === 0
    ) {
        fail("spacing.json must export a non-empty object");
    }

    const normalizedSpacingTokens = {};

    for (const tokenName of sortSpacingTokenNames(Object.keys(spacingTokens))) {
        if (!/^spacing-\d+$/.test(tokenName)) {
            fail(
                `spacing token ${tokenName} must follow the spacing-<index> naming convention`,
            );
        }

        const tokenValue = spacingTokens[tokenName];
        assertNumber(tokenValue, `spacing token ${tokenName}`);

        if (tokenValue < 0) {
            fail(`spacing token ${tokenName} must not be negative`);
        }

        normalizedSpacingTokens[tokenName] = tokenValue;
    }

    return normalizedSpacingTokens;
}

function loadRadiusSource() {
    const radiusTokens = readFlatTokenObject(radiusSourcePath, "radius");

    if (
        radiusTokens === null ||
        typeof radiusTokens !== "object" ||
        Array.isArray(radiusTokens) ||
        Object.keys(radiusTokens).length === 0
    ) {
        fail("radius.json must export a non-empty object");
    }

    if (!("radius-full" in radiusTokens)) {
        fail("radius.json must declare the semantic radius-full token");
    }

    const normalizedRadiusTokens = {};

    for (const tokenName of sortRadiusTokenNames(Object.keys(radiusTokens))) {
        if (!/^radius-(\d+|full)$/.test(tokenName)) {
            fail(
                `radius token ${tokenName} must follow the radius-<index> or radius-full naming convention`,
            );
        }

        const tokenValue = radiusTokens[tokenName];
        assertNumber(tokenValue, `radius token ${tokenName}`);

        if (tokenValue < 0) {
            fail(`radius token ${tokenName} must not be negative`);
        }

        normalizedRadiusTokens[tokenName] = tokenValue;
    }

    return normalizedRadiusTokens;
}

function loadSizingSource() {
    const sizingTokens = readFlatTokenObject(sizingSourcePath, "sizing");

    if (
        sizingTokens === null ||
        typeof sizingTokens !== "object" ||
        Array.isArray(sizingTokens) ||
        Object.keys(sizingTokens).length === 0
    ) {
        fail("sizing.json must export a non-empty object");
    }

    if (!("size-full" in sizingTokens)) {
        fail("sizing.json must declare the approved size-full token");
    }

    const normalizedSizingTokens = {};

    for (const tokenName of sortSizingTokenNames(Object.keys(sizingTokens))) {
        if (!/^size-(\d+|full)$/.test(tokenName)) {
            fail(
                `sizing token ${tokenName} must follow the size-<index> or size-full naming convention`,
            );
        }

        const tokenValue = sizingTokens[tokenName];
        assertNumber(tokenValue, `sizing token ${tokenName}`);

        if (tokenValue <= 0) {
            fail(`sizing token ${tokenName} must be strictly positive`);
        }

        normalizedSizingTokens[tokenName] = tokenValue;
    }

    return normalizedSizingTokens;
}

function loadIconSizingSource(knownSizingTokenNames) {
    const iconSizingAliases = readFlatTokenObject(
        iconSizingSourcePath,
        "icon sizing",
    );

    if (
        iconSizingAliases === null ||
        typeof iconSizingAliases !== "object" ||
        Array.isArray(iconSizingAliases) ||
        Object.keys(iconSizingAliases).length === 0
    ) {
        fail("icons/sizes.json must export a non-empty object");
    }

    const normalizedIconSizingAliases = {};

    for (const tokenName of sortIconSizeTokenNames(
        Object.keys(iconSizingAliases),
    )) {
        if (!/^icon-size-\d+$/.test(tokenName)) {
            fail(
                `icon size token ${tokenName} must follow the icon-size-<index> naming convention`,
            );
        }

        const aliasTarget = iconSizingAliases[tokenName];

        if (typeof aliasTarget !== "string") {
            fail(
                `icon size token ${tokenName} must reference a sizing token by name`,
            );
        }

        if (!knownSizingTokenNames.has(aliasTarget)) {
            fail(
                `icon size token ${tokenName} references unknown sizing token ${aliasTarget}`,
            );
        }

        normalizedIconSizingAliases[tokenName] = aliasTarget;
    }

    return normalizedIconSizingAliases;
}

function generateTypescript({
    brandModes,
    colorModes,
    primitiveColorTokens,
    semanticColorTokens,
}) {
    const source = `/**
 * This file is generated by \`${generatedByScriptPath}\`.
 * Do not edit it manually. Update the JSON sources under \`src/tokens/source/colors/\`
 * and rerun \`yarn generate:tokens\`.
 */

export type HexColor = \`#\${string}\`;

export const primitiveColorCollectionName = "colors-palettes" as const;
export const semanticColorCollectionName = "colors-usecases" as const;

export const onyxiaBrandModes = ${JSON.stringify(brandModes)} as const;
export const onyxiaColorModes = ${JSON.stringify(colorModes)} as const;

export type OnyxiaBrandMode = (typeof onyxiaBrandModes)[number];
export type OnyxiaColorMode = (typeof onyxiaColorModes)[number];

export const primitiveColorTokens = ${JSON.stringify(
        primitiveColorTokens,
        null,
        4,
    )} as const satisfies Record<string, Record<OnyxiaBrandMode, HexColor>>;

export type PrimitiveColorTokenName = keyof typeof primitiveColorTokens;

export const semanticColorTokens = ${JSON.stringify(
        semanticColorTokens,
        null,
        4,
    )} as const satisfies Record<
    string,
    Record<OnyxiaColorMode, PrimitiveColorTokenName>
>;

export type SemanticColorTokenName = keyof typeof semanticColorTokens;
`;

    return prettier.format(source, {
        ...prettierConfig,
        parser: "typescript",
    });
}

function generateTypographyTypescript({
    brandModes,
    typefaceRoles,
    typefacesByBrand,
    typographyStyles,
}) {
    const typographyStyleModes = Object.keys(typographyStyles);
    const source = `/**
 * This file is generated by \`${generatedByScriptPath}\`.
 * Do not edit it manually. Update the JSON sources under \`src/tokens/source/typography/\`
 * and rerun \`yarn generate:tokens\`.
 */

export const typefaceCollectionName = "font-typefaces" as const;
export const typographyCollectionName = "font-typographies" as const;

export const onyxiaTypographyBrandModes = ${JSON.stringify(
        brandModes,
    )} as const;
export const onyxiaTypefaceRoles = ${JSON.stringify(typefaceRoles)} as const;
export const onyxiaTypographyStyleModes = ${JSON.stringify(
        typographyStyleModes,
    )} as const;

export type OnyxiaTypographyBrandMode =
    (typeof onyxiaTypographyBrandModes)[number];
export type OnyxiaTypefaceRole = (typeof onyxiaTypefaceRoles)[number];
export type OnyxiaTypographyStyleMode =
    (typeof onyxiaTypographyStyleModes)[number];

export type TypographyStyleDefinition = {
    typeface: OnyxiaTypefaceRole;
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
};

export type TypographyStyleTree = {
    readonly [key: string]: TypographyStyleDefinition | TypographyStyleTree;
};

export type TypographyStyleTokensByMode = Record<
    OnyxiaTypographyStyleMode,
    TypographyStyleTree
>;

export const typographyTypefacesByBrand = ${JSON.stringify(
        typefacesByBrand,
        null,
        4,
    )} as const satisfies Record<
    OnyxiaTypographyBrandMode,
    Record<OnyxiaTypefaceRole, string>
>;

export const typographyStyleTokensByMode = ${JSON.stringify(
        typographyStyles,
        null,
        4,
    )} as const satisfies TypographyStyleTokensByMode;
`;

    return prettier.format(source, {
        ...prettierConfig,
        parser: "typescript",
    });
}

function generateSpacingTypescript(spacingTokens) {
    const spacingTokenNames = sortSpacingTokenNames(Object.keys(spacingTokens));
    const source = `/**
 * This file is generated by \`${generatedByScriptPath}\`.
 * Do not edit it manually. Update the JSON sources under \`src/tokens/source/spacing/\`
 * and rerun \`yarn generate:tokens\`.
 */

export const spacingCollectionName = "spacing" as const;
export const onyxiaSpacingTokenNames = ${JSON.stringify(
        spacingTokenNames,
    )} as const;

export type OnyxiaSpacingTokenName = (typeof onyxiaSpacingTokenNames)[number];

export const spacingTokens = ${JSON.stringify(
        spacingTokens,
        null,
        4,
    )} as const satisfies Record<OnyxiaSpacingTokenName, number>;

export type OnyxiaSpacingTokenValue =
    (typeof spacingTokens)[OnyxiaSpacingTokenName];
`;

    return prettier.format(source, {
        ...prettierConfig,
        parser: "typescript",
    });
}

function generateRadiusTypescript(radiusTokens) {
    const radiusTokenNames = sortRadiusTokenNames(Object.keys(radiusTokens));
    const source = `/**
 * This file is generated by \`${generatedByScriptPath}\`.
 * Do not edit it manually. Update the JSON sources under \`src/tokens/source/radius/\`
 * and rerun \`yarn generate:tokens\`.
 */

export const radiusCollectionName = "radius" as const;
export const onyxiaRadiusTokenNames = ${JSON.stringify(
        radiusTokenNames,
    )} as const;

export type OnyxiaRadiusTokenName = (typeof onyxiaRadiusTokenNames)[number];

export const radiusTokens = ${JSON.stringify(
        radiusTokens,
        null,
        4,
    )} as const satisfies Record<OnyxiaRadiusTokenName, number>;

export type OnyxiaRadiusTokenValue =
    (typeof radiusTokens)[OnyxiaRadiusTokenName];
`;

    return prettier.format(source, {
        ...prettierConfig,
        parser: "typescript",
    });
}

function generateSizingTypescript(sizingTokens) {
    const sizingTokenNames = sortSizingTokenNames(Object.keys(sizingTokens));
    const source = `/**
 * This file is generated by \`${generatedByScriptPath}\`.
 * Do not edit it manually. Update the JSON sources under \`src/tokens/source/sizing/\`
 * and rerun \`yarn generate:tokens\`.
 */

export const sizingCollectionName = "sizing" as const;
export const onyxiaSizingTokenNames = ${JSON.stringify(
        sizingTokenNames,
    )} as const;

export type OnyxiaSizingTokenName = (typeof onyxiaSizingTokenNames)[number];

export const sizingTokens = ${JSON.stringify(
        sizingTokens,
        null,
        4,
    )} as const satisfies Record<OnyxiaSizingTokenName, number>;

export type OnyxiaSizingTokenValue =
    (typeof sizingTokens)[OnyxiaSizingTokenName];
`;

    return prettier.format(source, {
        ...prettierConfig,
        parser: "typescript",
    });
}

function generateIconSizingTypescript(iconSizingAliases) {
    const iconSizeTokenNames = sortIconSizeTokenNames(
        Object.keys(iconSizingAliases),
    );
    const source = `/**
 * This file is generated by \`${generatedByScriptPath}\`.
 * Do not edit it manually. Update the JSON sources under \`src/tokens/source/icons/\`
 * and rerun \`yarn generate:tokens\`.
 */

import type { OnyxiaSizingTokenName } from "../sizing";

export const onyxiaIconSizeTokenNames = ${JSON.stringify(
        iconSizeTokenNames,
    )} as const;

export type OnyxiaIconSizeTokenName = (typeof onyxiaIconSizeTokenNames)[number];

export const iconSizeTokenToSizingToken = ${JSON.stringify(
        iconSizingAliases,
        null,
        4,
    )} as const satisfies Record<OnyxiaIconSizeTokenName, OnyxiaSizingTokenName>;
`;

    return prettier.format(source, {
        ...prettierConfig,
        parser: "typescript",
    });
}

function assertUpToDate(filePath, expectedOutput, staleMessage) {
    let currentOutput;

    try {
        currentOutput = readFileSync(filePath, "utf8");
    } catch {
        fail(staleMessage);
    }

    if (currentOutput !== expectedOutput) {
        fail(staleMessage);
    }
}

function main() {
    if (!statSync(colorsSourceDir).isDirectory()) {
        fail("src/tokens/source/colors is missing");
    }

    if (!statSync(typographySourceDir).isDirectory()) {
        fail("src/tokens/source/typography is missing");
    }

    if (!statSync(spacingSourceDir).isDirectory()) {
        fail("src/tokens/source/spacing is missing");
    }

    if (!statSync(sizingSourceDir).isDirectory()) {
        fail("src/tokens/source/sizing is missing");
    }

    if (!statSync(iconsSourceDir).isDirectory()) {
        fail("src/tokens/source/icons is missing");
    }

    if (!statSync(radiusSourceDir).isDirectory()) {
        fail("src/tokens/source/radius is missing");
    }

    const { brandModes, primitiveColorTokens } = loadPaletteSources();
    const { colorModes, semanticColorTokens } = loadUsecaseSource(
        new Set(Object.keys(primitiveColorTokens)),
    );
    const { typefaceRoles, typefacesByBrand } =
        loadTypographyTypefaces(brandModes);
    const typographyStyles = loadTypographyStyles(typefaceRoles);
    const spacingTokens = loadSpacingSource();
    const sizingTokens = loadSizingSource();
    const iconSizingAliases = loadIconSizingSource(
        new Set(Object.keys(sizingTokens)),
    );
    const radiusTokens = loadRadiusSource();

    const colorsOutput = generateTypescript({
        brandModes,
        colorModes,
        primitiveColorTokens,
        semanticColorTokens,
    });
    const typographyOutput = generateTypographyTypescript({
        brandModes,
        typefaceRoles,
        typefacesByBrand,
        typographyStyles,
    });
    const spacingOutput = generateSpacingTypescript(spacingTokens);
    const sizingOutput = generateSizingTypescript(sizingTokens);
    const iconSizingOutput = generateIconSizingTypescript(iconSizingAliases);
    const radiusOutput = generateRadiusTypescript(radiusTokens);

    if (process.argv.includes("--check")) {
        assertUpToDate(
            generatedColorsOutputPath,
            colorsOutput,
            "generated color tokens are stale. Run `yarn generate:tokens` and commit the result.",
        );
        assertUpToDate(
            generatedTypographyOutputPath,
            typographyOutput,
            "generated typography tokens are stale. Run `yarn generate:tokens` and commit the result.",
        );
        assertUpToDate(
            generatedSpacingOutputPath,
            spacingOutput,
            "generated spacing tokens are stale. Run `yarn generate:tokens` and commit the result.",
        );
        assertUpToDate(
            generatedSizingOutputPath,
            sizingOutput,
            "generated sizing tokens are stale. Run `yarn generate:tokens` and commit the result.",
        );
        assertUpToDate(
            generatedIconSizingOutputPath,
            iconSizingOutput,
            "generated icon sizing tokens are stale. Run `yarn generate:tokens` and commit the result.",
        );
        assertUpToDate(
            generatedRadiusOutputPath,
            radiusOutput,
            "generated radius tokens are stale. Run `yarn generate:tokens` and commit the result.",
        );

        return;
    }

    mkdirSync(path.dirname(generatedColorsOutputPath), { recursive: true });
    writeFileSync(generatedColorsOutputPath, colorsOutput);

    rmSync(path.dirname(generatedTypographyOutputPath), {
        recursive: true,
        force: true,
    });
    mkdirSync(path.dirname(generatedTypographyOutputPath), { recursive: true });
    writeFileSync(generatedTypographyOutputPath, typographyOutput);

    rmSync(path.dirname(generatedSpacingOutputPath), {
        recursive: true,
        force: true,
    });
    mkdirSync(path.dirname(generatedSpacingOutputPath), { recursive: true });
    writeFileSync(generatedSpacingOutputPath, spacingOutput);

    rmSync(path.dirname(generatedSizingOutputPath), {
        recursive: true,
        force: true,
    });
    mkdirSync(path.dirname(generatedSizingOutputPath), { recursive: true });
    writeFileSync(generatedSizingOutputPath, sizingOutput);

    rmSync(path.dirname(generatedIconSizingOutputPath), {
        recursive: true,
        force: true,
    });
    mkdirSync(path.dirname(generatedIconSizingOutputPath), { recursive: true });
    writeFileSync(generatedIconSizingOutputPath, iconSizingOutput);

    rmSync(path.dirname(generatedRadiusOutputPath), {
        recursive: true,
        force: true,
    });
    mkdirSync(path.dirname(generatedRadiusOutputPath), { recursive: true });
    writeFileSync(generatedRadiusOutputPath, radiusOutput);
}

main();
