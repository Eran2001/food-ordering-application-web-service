import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CartDrawer } from "@/components/shared/CartDrawer";
import { StickyMobileCartBar } from "@/components/shared/StickyMobileCartBar";
import { QuickViewModal } from "@/components/shared/QuickViewModal";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <StickyMobileCartBar />
      <QuickViewModal />
    </div>
  );
}
