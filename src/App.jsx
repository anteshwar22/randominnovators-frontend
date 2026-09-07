import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import TeamPage from './pages/TeamPage';
import GalleryPage from './pages/GalleryPage';

import AuthModal from './components/AuthModal';

function MainApp() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('public');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState('employee');

  useEffect(() => {
    if (!user) {
      setCurrentView('public');
    }
  }, [user]);

  const handleOpenAuth = (role = 'employee') => {
    setAuthModalInitialRole(role);
    setAuthModalOpen(true);
  };

  const handleOpenDashboard = (view) => {
    setCurrentView(view);
  };

  const handleLoginSuccess = (userPayload) => {
    if (userPayload?.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('public');
    }
  };

  return (
    <>
      {currentView === 'admin' ? (
        <AdminDashboard onBackToPublic={() => setCurrentView('public')} />
      ) : currentView === 'team' ? (
        <TeamPage onBackToHome={() => setCurrentView('public')} />
      ) : currentView === 'gallery' ? (
        <GalleryPage onBackToHome={() => setCurrentView('public')} />
      ) : (
        <Home
          onOpenAuth={handleOpenAuth}
          onOpenDashboard={handleOpenDashboard}
          onExploreTeam={() => setCurrentView('team')}
          onExploreGallery={() => setCurrentView('gallery')}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalInitialRole}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
