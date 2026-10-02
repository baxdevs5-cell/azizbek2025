import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { LessonsPage } from './pages/LessonsPage.tsx';
import { LessonDetailPage } from './pages/LessonDetailPage.tsx';
import { VocabularyPage } from './pages/VocabularyPage.tsx';
import { ExercisesPage } from './pages/ExercisesPage.tsx';
import { TestsPage } from './pages/TestsPage.tsx';
import { TestTakePage } from './pages/TestTakePage.tsx';
import { ProgressPage } from './pages/ProgressPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { LoadingState } from './components/common/StateComponents.tsx';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <LoadingState message="Hisob tekshirilmoqda..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Main Application with AppLayout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="lessons" element={<LessonsPage />} />
              <Route path="lessons/:id" element={<LessonDetailPage />} />
              <Route path="vocabulary" element={<VocabularyPage />} />
              <Route path="exercises" element={<ExercisesPage />} />
              <Route path="tests" element={<TestsPage />} />
              <Route path="tests/:id" element={<TestTakePage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
