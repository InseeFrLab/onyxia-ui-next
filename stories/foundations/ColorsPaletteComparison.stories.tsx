import { BrandPaletteComparisonPage } from "./ColorValidationFixtures";

const meta = {
    title: "Foundations/Colors/Palette comparison",
    component: BrandPaletteComparisonPage,
    parameters: {
        controls: {
            exclude: ["selectedBrandMode"],
        },
    },
    render: (_args, context) => (
        <BrandPaletteComparisonPage
            selectedBrandMode={context.globals.brandMode}
        />
    ),
};

export default meta;

export const Default = {};
