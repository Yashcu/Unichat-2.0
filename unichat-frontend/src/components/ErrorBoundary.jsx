// src/components/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-2xl text-destructive">Oops! Something went wrong.</CardTitle>
                    <CardDescription>
                        An unexpected error occurred. Please try refreshing the page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => window.location.reload()}>
                        Refresh Page
                    </Button>
                    {import.meta.env.DEV && (
                        <details className="mt-4 text-left bg-gray-50 p-3 rounded-md">
                            <summary className="cursor-pointer">Error Details</summary>
                            <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.error?.stack}
                            </pre>
                        </details>
                    )}
                </CardContent>
            </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;
