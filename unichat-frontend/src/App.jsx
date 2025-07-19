// src/App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { SocketProvider } from './context/SocketProvider'; // Import SocketProvider
import { ChatProvider } from './context/ChatProvider';
import Router from './routes/Router';

function App() {
  return (
    <AuthProvider>
      <SocketProvider> {/* SocketProvider wraps ChatProvider */}
        <ChatProvider>
          <Router />
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
