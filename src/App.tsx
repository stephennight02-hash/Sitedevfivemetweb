import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Support from "./pages/Support";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import { CursorProvider } from "./context/CursorContext";
import { CustomCursor } from "./components/ui/CustomCursor";
import { SoundToggle } from "./components/ui/SoundToggle";
import { CheatCodeListener } from "./components/eggs/CheatCodeListener";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CursorProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <SoundToggle />
        <CheatCodeListener />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/events" element={<Events />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </CursorProvider>
  </QueryClientProvider>
);

export default App;
