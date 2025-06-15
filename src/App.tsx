
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import FindRentals from "./pages/FindRentals";
import ListProperty from "./pages/ListProperty";
import ForAgents from "./pages/ForAgents";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import ApplyProperty from "./pages/ApplyProperty";
import MyApplications from "./pages/MyApplications";
import Maintenance from "./pages/Maintenance";
import HelpCenter from "./pages/HelpCenter";
import SafetyTips from "./pages/SafetyTips";
import ContactUs from "./pages/ContactUs";
import ReportIssue from "./pages/ReportIssue";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-rentals" element={<FindRentals />} />
            <Route path="/list-property" element={<ListProperty />} />
            <Route path="/for-agents" element={<ForAgents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/apply/:id" element={<ApplyProperty />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
