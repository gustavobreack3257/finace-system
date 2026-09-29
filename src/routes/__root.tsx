import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "../layout/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex flex-col w-full">
      <Header />

      <Outlet />
    </div>
  );
}
