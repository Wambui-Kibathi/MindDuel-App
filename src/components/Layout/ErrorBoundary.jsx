import { Component } from 'react';
import '../../App.css';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };
}

export default ErrorBoundary;