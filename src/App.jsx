import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { RegisterForm } from "./components/Auth/RegisterForm.jsx";
import { NavBar } from "./components/Layout/NavBar.jsx";
import { TopicsCard } from "./components/Home/TopicsCard.jsx";
import { DifficultySelector } from "./components/Quiz/DifficultySelector.jsx";
import { QuizCard } from "./components/Quiz/QuizCard.jsx";
import { ResultsPage } from "./components/Results/ResultsPage.jsx";
import { UserProfile } from "./components/User/UserProfile.jsx";
import { AboutPage } from "./components/About/AboutPage.jsx";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/Layout/ErrorBoundary";
import "./App.css";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
}

function AppRoutesWithNavBar() {
  const location = useLocation();
  const showNavBar = !["/", "/register"].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterForm />} />
          
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <TopicsCard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/difficulty/:topic" 
            element={
              <ProtectedRoute>
                <DifficultySelector />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/quiz/:topic/play" 
            element={
              <ProtectedRoute>
                <QuizCard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/results" 
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />
          
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <AppRoutesWithNavBar />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;