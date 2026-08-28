export const breakpointsValues = {
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
} as const;

export type OnyxiaBreakpoint = keyof typeof breakpointsValues;
export const onyxiaResponsiveBreakpoints = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
] as const;
export type OnyxiaResponsiveBreakpoint =
    (typeof onyxiaResponsiveBreakpoints)[number];

export function getOnyxiaActiveBreakpoint(
    windowInnerWidth: number,
): OnyxiaResponsiveBreakpoint {
    if (windowInnerWidth < breakpointsValues.sm) {
        return "xs";
    }

    if (windowInnerWidth < breakpointsValues.md) {
        return "sm";
    }

    if (windowInnerWidth < breakpointsValues.lg) {
        return "md";
    }

    if (windowInnerWidth < breakpointsValues.xl) {
        return "lg";
    }

    return "xl";
}

export function resolveOnyxiaResponsiveValue<T>(params: {
    valuesByBreakpoint: Partial<Record<OnyxiaResponsiveBreakpoint, T>>;
    windowInnerWidth: number;
}): T {
    const { valuesByBreakpoint, windowInnerWidth } = params;
    const activeBreakpoint = getOnyxiaActiveBreakpoint(windowInnerWidth);
    const activeBreakpointIndex =
        onyxiaResponsiveBreakpoints.indexOf(activeBreakpoint);

    for (let index = activeBreakpointIndex; index >= 0; index -= 1) {
        const breakpoint = onyxiaResponsiveBreakpoints[index];
        const value = valuesByBreakpoint[breakpoint];

        if (value !== undefined) {
            return value;
        }
    }

    throw new Error(
        "No responsive value was provided for the active breakpoint",
    );
}
