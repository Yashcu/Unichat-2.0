// src/App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { ChatProvider } from './context/ChatProvider';
import Router from './routes/Router';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;