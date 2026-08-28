import type { ThemeOptions } from "@mui/material/styles";
import type {
    OnyxiaSpacingSystem,
    OnyxiaSpacingTokenName,
} from "../spacingSystem";

function resolveMuiSpacingArgument(
    argument: number | string,
    spacing: OnyxiaSpacingSystem,
): string {
    if (typeof argument === "number") {
        if (!Number.isInteger(argument) || argument < 0) {
            throw new Error(
                `MUI spacing only supports non-negative integer spacing token indexes, received ${argument}`,
            );
        }

        const tokenName = `spacing-${argument}` as OnyxiaSpacingTokenName;

        if (!(tokenName in spacing.values)) {
            throw new Error(
                `MUI spacing token ${tokenName} is not part of the approved Onyxia spacing scale`,
            );
        }

        return spacing.toCssValue(tokenName);
    }

    if (argument === "auto") {
        return argument;
    }

    if (/^spacing-\d+$/.test(argument)) {
        const tokenName = argument as OnyxiaSpacingTokenName;

        if (!(tokenName in spacing.values)) {
            throw new Error(
                `MUI spacing token ${tokenName} is not part of the approved Onyxia spacing scale`,
            );
        }

        return spacing.toCssValue(tokenName);
    }

    throw new Error(
        `MUI spacing only accepts approved spacing token indexes, spacing token names, or "auto". Received ${JSON.stringify(
            argument,
        )}`,
    );
}

export function createOnyxiaMuiSpacing(
    spacing: OnyxiaSpacingSystem,
): ThemeOptions["spacing"] {
    return (...arguments_: Array<number | string>) => {
        const resolvedArguments = arguments_.length === 0 ? [1] : arguments_;

        return resolvedArguments
            .map(argument => resolveMuiSpacingArgument(argument, spacing))
            .join(" ");
    };
}
