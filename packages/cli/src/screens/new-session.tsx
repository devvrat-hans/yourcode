import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { SessionShell } from "../components/session-shell";
import { BotMessage, ErrorMessage, UserMessage } from "../components/messages";


export function NewSession() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { message?: string } | null;

  useEffect(() => {
    if (!state?.message) {
        navigate("/", { replace: true }); // just staying true to the web, else no need for adding replace: true
    }
  }, [state, navigate]);

  if(!state?.message) {
    return null;
  }

  return (
    <SessionShell onSubmit={() => {}} inputDisabled={true} loading={true}>
        <UserMessage message={state.message} />
        <BotMessage
            content="This is a sample bot response to demonstrate the chat interface."
            model="sonnet-4-6"
        />
        <ErrorMessage message="This is an error message to demonstrate the error message interface." />
    </SessionShell>
  );
};