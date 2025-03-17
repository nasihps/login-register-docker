import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { AppThemeProvider } from './AppTheme';
import { UserContextProvider } from './context/UserContext';
import MainLayout from './components/MainLayout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ServicePage from './components/ServicePage';
import TaskPage from './components/TaskPage';
import WavePage from './components/WavePage';
import PlanPage from './components/PlanPage'

// Lazy load components for better performance
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/RegisterPage'));
const HomePage = React.lazy(() => import('./components/HomePage'));

function App() {
  return (
    <AppThemeProvider>
      <UserContextProvider>
        <Router>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes with MainLayout */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/service" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ServicePage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/task" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <TaskPage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/waves" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <WavePage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/plan" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <PlanPage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              {/* Default Route - Redirect to Login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </React.Suspense>
        </Router>
      </UserContextProvider>
    </AppThemeProvider>
  );
}

export default App;