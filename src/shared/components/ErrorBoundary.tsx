import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message:  string | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message:  null
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message:  error.message || 'Error inesperado'
    };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center p-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 p-8 max-w-md w-full text-center">
            <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full mb-6"></div>

            <span className="text-6xl mb-4 block">🌀</span>

            <h2 className="text-2xl font-black text-rose-800 mb-2">
              Algo salió mal
            </h2>

            <p className="text-rose-500 text-sm mb-6">
              {this.state.message}
            </p>

            <button
              onClick={this.handleReset}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}