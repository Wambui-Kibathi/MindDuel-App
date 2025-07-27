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
}  