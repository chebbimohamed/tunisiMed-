import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Importi el pages mte3ek (Thabbet f-el paths mriglin wala le)
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/Dashboard'; // Wala esm el fichier mte3ek
import DoctorDashboard from './pages/DoctorDashboard';
import CourseView from './pages/CourseView';

// 2. ProtectedRoute Component (Security Guard)
const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    // Ken dakhil l-blasa mouch mte3ou, raja3ou l-blastou s7i7a
    return user.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route el Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route el Admin (Path lezem ykoun "/admin") */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Route el Doctor (Path lezem ykoun "/dashboard") */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute roleRequired="USER">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Route el Course (Lezem ykoun mrigel lel Doctor) */}
        <Route 
          path="/course/:id" 
          element={
            <ProtectedRoute roleRequired="USER">
              <CourseView />
            </ProtectedRoute>
          } 
        />

        {/* Redirect ay 7aja okhra lel login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;