import { ColorValidationPage } from "./ColorValidationFixtures";

const meta = {
    title: "Foundations/Colors/Overview",
    component: ColorValidationPage,
    parameters: {
        controls: {
            exclude: ["variant"],
        },
    },
    args: {
        variant: "overview",
    },
};

export default meta;

export const Default = {};
