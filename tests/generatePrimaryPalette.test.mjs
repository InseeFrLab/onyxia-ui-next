import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

async function transpileToTemporaryModule(params) {
    const {
        sourcePath,
        outputDirectory,
        outputFileName,
        rewriteImports = [],
    } = params;
    const source = await fs.readFile(sourcePath, "utf8");
    const sourceFilePath =
        sourcePath instanceof URL ? fileURLToPath(sourcePath) : sourcePath;
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.ES2020,
            target: ts.ScriptTarget.ES2020,
        },
        fileName: path.basename(sourceFilePath),
    });
    const rewrittenOutput = rewriteImports.reduce(
        (currentOutput, { from, to }) => currentOutput.replaceAll(from, to),
        outputText,
    );
    const outputPath = path.join(outputDirectory, outputFileName);

    await fs.writeFile(outputPath, rewrittenOutput, "utf8");

    return outputPath;
}

const temporaryDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), "onyxia-ui-next-primary-palette-"),
);

const temporaryColorUtilsPath = await transpileToTemporaryModule({
    sourcePath: new URL("../src/tools/color/colorUtils.ts", import.meta.url),
    outputDirectory: temporaryDirectory,
    outputFileName: "colorUtils.mjs",
});

const temporaryGeneratePrimaryPalettePath = await transpileToTemporaryModule({
    sourcePath: new URL(
        "../src/tools/color/generatePrimaryPalette.ts",
        import.meta.url,
    ),
    outputDirectory: temporaryDirectory,
    outputFileName: "generatePrimaryPalette.mjs",
    rewriteImports: [
        {
            from: './colorUtils";',
            to: './colorUtils.mjs";',
        },
    ],
});

const {
    generatePrimaryAlphaPalette,
    generatePrimaryPalette,
    primaryPaletteTonalSteps,
} = await import(pathToFileURL(temporaryGeneratePrimaryPalettePath).href);
const { getPerceivedLightness, isHexColor, normalizeHexColor } = await import(
    pathToFileURL(temporaryColorUtilsPath).href
);

const representativeColors = [
    "#FE3711",
    "#0F29F0",
    "#46B9B5",
    "#BA47EE",
    "#2BC423",
];

test("normalizeHexColor accepts lowercase input and normalizes it", () => {
    assert.equal(normalizeHexColor("#fe3711"), "#FE3711");
    assert.equal(normalizeHexColor("0f29f0"), "#0F29F0");
});

test("generatePrimaryPalette keeps the 500 anchor exactly equal to the normalized input", () => {
    const palette = generatePrimaryPalette("#fe3711");

    assert.equal(palette[500], "#FE3711");
});

test("generatePrimaryPalette generates all required tonal steps", () => {
    const palette = generatePrimaryPalette("#FE3711");

    assert.deepEqual(
        Object.keys(palette).map(value => Number(value)),
        [...primaryPaletteTonalSteps],
    );
});

test("generatePrimaryPalette generates valid sRGB hex colors for several hues", () => {
    for (const color of representativeColors) {
        const palette = generatePrimaryPalette(color);

        for (const step of primaryPaletteTonalSteps) {
            assert.equal(isHexColor(palette[step]), true);
        }
    }
});

test("generated palettes do not repeat adjacent tonal steps for representative hues", () => {
    for (const color of representativeColors) {
        const palette = generatePrimaryPalette(color);

        for (
            let index = 1;
            index < primaryPaletteTonalSteps.length;
            index += 1
        ) {
            const previous = primaryPaletteTonalSteps[index - 1];
            const current = primaryPaletteTonalSteps[index];

            assert.notEqual(
                palette[previous],
                palette[current],
                `${color} repeats ${previous} and ${current}`,
            );
        }
    }
});

test("light steps become progressively lighter and dark steps become progressively darker", () => {
    for (const color of representativeColors) {
        const palette = generatePrimaryPalette(color);
        const lightSequence = [50, 100, 200, 300, 400, 500];
        const darkSequence = [500, 600, 700, 800, 900, 950];

        for (let index = 1; index < lightSequence.length; index += 1) {
            const previous = lightSequence[index - 1];
            const current = lightSequence[index];

            assert.ok(
                getPerceivedLightness(palette[previous]) >=
                    getPerceivedLightness(palette[current]),
                `${color} did not darken progressively from ${previous} to ${current}`,
            );
        }

        for (let index = 1; index < darkSequence.length; index += 1) {
            const previous = darkSequence[index - 1];
            const current = darkSequence[index];

            assert.ok(
                getPerceivedLightness(palette[previous]) >
                    getPerceivedLightness(palette[current]),
                `${color} did not darken progressively from ${previous} to ${current}`,
            );
        }
    }
});

test("950 is darker than 900 for representative hues", () => {
    for (const color of representativeColors) {
        const palette = generatePrimaryPalette(color);

        assert.ok(
            getPerceivedLightness(palette[950]) <
                getPerceivedLightness(palette[900]),
        );
    }
});

test("alpha generation reuses the 500 anchor with the approved alpha convention", () => {
    const alphaPalette = generatePrimaryAlphaPalette("#FE3711");

    assert.deepEqual(alphaPalette, {
        "primary-alpha-10": "#FE37111A",
        "primary-alpha-20": "#FE371133",
    });
});

test("icon semantic sizes reference shared sizing tokens instead of duplicating numeric values", async () => {
    const [sizingSource, iconSizingSource] = await Promise.all([
        fs.readFile(
            new URL("../src/tokens/source/sizing/sizing.json", import.meta.url),
            "utf8",
        ),
        fs.readFile(
            new URL("../src/tokens/source/icons/sizes.json", import.meta.url),
            "utf8",
        ),
    ]);

    const sizingTokens = JSON.parse(sizingSource);
    const iconSizingAliases = JSON.parse(iconSizingSource);

    for (const [iconTokenName, sizingTokenName] of Object.entries(
        iconSizingAliases,
    )) {
        assert.equal(typeof sizingTokenName, "string");
        assert.ok(
            sizingTokenName in sizingTokens,
            `${iconTokenName} should reference an existing sizing token`,
        );
    }
});
