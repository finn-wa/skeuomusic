import Welcome from "@/components/welcome/welcome";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="login-container">
      <Welcome />
    </div>
  );
}
