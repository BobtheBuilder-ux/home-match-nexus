import React from "react";
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
import ShortletListings from "./pages/ShortletListings";
import RequireAuth from "@/components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* All routes BELOW this require authentication */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              }
            />
            <Route
              path="/find-rentals"
              element={
                <RequireAuth>
                  <FindRentals />
                </RequireAuth>
              }
            />
            <Route
              path="/list-property"
              element={
                <RequireAuth>
                  <ListProperty />
                </RequireAuth>
              }
            />
            <Route
              path="/shortlets"
              element={
                <RequireAuth>
                  <ShortletListings />
                </RequireAuth>
              }
            />
            <Route
              path="/for-agents"
              element={
                <RequireAuth>
                  <ForAgents />
                </RequireAuth>
              }
            />
            <Route
              path="/agent-dashboard"
              element={
                <RequireAuth>
                  <AgentDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/property/:id"
              element={
                <RequireAuth>
                  <PropertyDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/apply/:id"
              element={
                <RequireAuth>
                  <ApplyProperty />
                </RequireAuth>
              }
            />
            <Route
              path="/my-applications"
              element={
                <RequireAuth>
                  <MyApplications />
                </RequireAuth>
              }
            />
            <Route
              path="/maintenance"
              element={
                <RequireAuth>
                  <Maintenance />
                </RequireAuth>
              }
            />
            <Route
              path="/help-center"
              element={
                <RequireAuth>
                  <HelpCenter />
                </RequireAuth>
              }
            />
            <Route
              path="/safety-tips"
              element={
                <RequireAuth>
                  <SafetyTips />
                </RequireAuth>
              }
            />
            <Route
              path="/contact-us"
              element={
                <RequireAuth>
                  <ContactUs />
                </RequireAuth>
              }
            />
            <Route
              path="/report-issue"
              element={
                <RequireAuth>
                  <ReportIssue />
                </RequireAuth>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
