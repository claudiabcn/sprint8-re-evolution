import { Component, ReactNode } from 'react';
import ErrorDisplay from './ErrorDisplay'; 

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string | undefined;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: undefined 
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message || 'Error inesperado'
    };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <ErrorDisplay 
            message={this.state.message} 
            onRetry={this.handleReset} 
          />
        </div>
      );
    }

    return this.props.children;
  }
}