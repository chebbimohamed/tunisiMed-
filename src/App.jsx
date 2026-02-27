import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/UserDashboard'; // <--- 1. Lazem el import hedha!
import ProtectedRoute from './components/ProtectedRoute';
import ManageCourses from './pages/ManageCourses';
import CourseView from './pages/CourseView';

function App() {
  return (
    <Router> {/* <--- 2. Zid el Router houni ken mahouch f-main.jsx */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Route */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* User Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute roleRequired="USER"> {/* <--- 3. Salla7 el esm houni (roleRequired) */}
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Manage Courses Route */}
        <Route 
          path="/admin/manage-courses" 
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <ManageCourses />
            </ProtectedRoute>
          } 
        />

        {/* Redirect ay 7aja okhra l-el login */}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/course/:id" element={<CourseView />} />
      </Routes>
    </Router>
  );
}

export default App;