import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientWalkthrough from "./pages/ClientWalkthrough";
import BdmQualification from "./pages/BdmQualification";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/client-walkthrough"
          element={
            <ProtectedRoute>
              <ClientWalkthrough />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bdm-qualification"
          element={
            <ProtectedRoute>
              <BdmQualification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}
