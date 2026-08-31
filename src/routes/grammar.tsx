import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/grammar")({
  component: GrammarLayout,
});

function GrammarLayout() {
  return <Outlet />;
}
