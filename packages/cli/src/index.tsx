import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { StatusBar } from "./components/status-bar";
import { colors } from "./theme/colors";
import { InputBar } from "./components/input-bar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboard-layer";

function App() {
  return (
    <KeyboardLayerProvider>
      <ToastProvider>
        <box
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors.backgroundBlack}
          width="100%"
          height="100%"
          gap={2}
        >
          <Header />
          <box 
            width="100%"
            maxWidth={78}
            paddingX={2}
          >
            <InputBar onSubmit={() => {}} />
          </box>
        </box>
      </ToastProvider>
    </KeyboardLayerProvider>
  );
}

const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false,
});
createRoot(renderer).render(<App />);
