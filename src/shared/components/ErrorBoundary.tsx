import { Component, ReactNode } from 'react';
import Button from './Button';

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
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-amber-400/20 to-rose-400/20 rounded-3xl blur-2xl transform scale-110"></div>
            
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100 p-8 text-center">
              <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full mb-8"></div>

              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl animate-pulse">🌀</span>
              </div>

              <h2 className="text-3xl font-black text-rose-900 mb-3 tracking-tight">
                ¡Ups! Algo falló
              </h2>


              {this.state.message && (
                <p className="text-rose-600 font-medium mb-8 bg-rose-50/50 py-3 px-4 rounded-xl border border-rose-100 italic">
                  {this.state.message}
                </p>
              )}

              <Button 
                onClick={this.handleReset}
                className="w-full py-4 text-base"
              >
                🔄 Reintentar ahora
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}