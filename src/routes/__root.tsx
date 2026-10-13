import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { RouterContext } from "../main";

import { Header } from "../layout/Header";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex flex-col w-full gap-10">
      <Header />

      <Outlet />
    </div>
  );
}
