import { useParams } from "react-router";

export function Session() {
  const id = useParams().id;

  return (
    <box flexGrow={1} padding={2} flexDirection="column" gap={1}>
        <text>Session: {id}</text>
    </box>
  );
};