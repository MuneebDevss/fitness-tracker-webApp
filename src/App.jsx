// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Components
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import SocialLogin from "./components/auth/SocialLogin";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";

// Fitness Components
import GoalSetting from "./components/fitness/GoalSetting";
import ExercisePlan from "./components/fitness/ExercisePlan";
import ProgressTracker from "./components/fitness/ProgressTracker";

// Diet Components
import DietPlan from "./components/diet/DietPlan";
import NutritionTracker from "./components/diet/NutritionTracker";

// Common Components
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

// Contexts
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

// Styles
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="app-container">
            {/* Navbar is always displayed */}
            <Navbar />
            <div className="main-layout">
              {/* Sidebar for navigation */}
              <Sidebar />
              <main className="content">
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/social-login" element={<SocialLogin />} />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserManagement />} />

                  {/* Fitness Routes */}
                  <Route path="/fitness/goal-setting" element={<GoalSetting />} />
                  <Route path="/fitness/exercise-plan" element={<ExercisePlan />} />
                  <Route path="/fitness/progress-tracker" element={<ProgressTracker />} />

                  {/* Diet Routes */}
                  <Route path="/diet/plan" element={<DietPlan />} />
                  <Route path="/diet/nutrition-tracker" element={<NutritionTracker />} />

                  {/* Default Route */}
                  <Route path="/" element={<Login />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
