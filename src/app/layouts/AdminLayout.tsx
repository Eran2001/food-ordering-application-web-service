import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar p-4">
        <p className="font-display text-lg font-bold text-sidebar-primary mb-8">LankaBites Admin</p>
        <p className="text-sm text-sidebar-foreground">Phase 2 — Coming soon</p>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
