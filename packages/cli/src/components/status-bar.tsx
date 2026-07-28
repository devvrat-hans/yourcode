import { TextAttributes } from "@opentui/core";
import { colors } from "../theme/colors";

export function StatusBar() {
    return (
        <box flexDirection="row" gap={1}>
            <text fg={colors.inputBarBlue}>Build</text>
            <text attributes={TextAttributes.DIM} fg={colors.brandingGray}>
                》
            </text>
            <text>sonnet-4-6</text>
        </box>
    )
}