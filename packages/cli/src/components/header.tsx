import { colors } from "../theme/colors";

export function Header() {
    return (
        <box alignItems="center" justifyContent="center">
            <box flexDirection="row" justifyContent="center" gap={0.5} alignItems="center">
                <ascii-font font="tiny" text="Your" color={colors.brandingGray}/>
                <ascii-font font="tiny" text="Code"/>
            </box>
        </box>
    );
}