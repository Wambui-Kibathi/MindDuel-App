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

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2 className="neon-flicker">Oops! Something went wrong</h2>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <button 
            className="error-retry-button"
            onClick={this.handleRefresh}
          >
            Refresh App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;