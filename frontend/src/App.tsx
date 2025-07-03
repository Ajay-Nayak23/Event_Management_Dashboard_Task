import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import RegistrationModal from './components/RegistrationModal';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import { mockEvents } from './data/mockData';
import { Event } from './types';

function AppContent() {
  const { user, isAuthenticated, login, signup } = useAuth();
  const [events, setEvents] = useState(mockEvents);
  const [currentView, setCurrentView] = useState<'dashboard' | 'events'>('dashboard');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCreateEvent = (eventData: Omit<Event, 'id' | 'registered' | 'organizerId' | 'organizerName'>) => {
    if (!user) return;
    
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      registered: 0,
      organizerId: user.id,
      organizerName: user.name
    };
    setEvents(prev => [...prev, newEvent]);
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (eventData: Omit<Event, 'id' | 'registered' | 'organizerId' | 'organizerName'>) => {
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...eventData }
          : event
      ));
      setShowEventForm(false);
      setEditingEvent(null);
    }
  };

  const handleRegisterForEvent = (event: Event, registrationData: any) => {
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { ...e, registered: e.registered + 1 }
        : e
    ));
    setShowRegistrationModal(false);
    setSelectedEvent(null);
    alert('Registration successful! You will receive a confirmation email shortly.');
  };

  const handleEventEdit = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleEventRegister = (event: Event) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    handleAuthSuccess();
  };

  const handleSignup = async (name: string, email: string, password: string, role: 'user' | 'organizer') => {
    await signup(name, email, password, role);
    handleAuthSuccess();
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          onAuthClick={() => setShowAuthModal(true)}
        />
        
        <LandingPage onGetStarted={() => setShowAuthModal(true)} />

        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
      </div>
    );
  }

  const organizerEvents = events.filter(event => event.organizerId === user?.id);
  const displayEvents = user?.role === 'organizer' ? organizerEvents : events;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('events')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                currentView === 'events'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {user?.role === 'organizer' ? 'My Events' : 'Browse Events'}
            </button>
          </nav>
        </div>

        {/* Content */}
        {currentView === 'dashboard' ? (
          <Dashboard 
            user={user!} 
            events={displayEvents} 
            onCreateEvent={() => setShowEventForm(true)}
          />
        ) : (
          <EventList 
            events={displayEvents}
            onRegister={user?.role === 'user' ? handleEventRegister : undefined}
            onEdit={user?.role === 'organizer' ? handleEventEdit : undefined}
            isOrganizer={user?.role === 'organizer'}
            title={user?.role === 'organizer' ? 'My Events' : 'Browse Events'}
          />
        )}
      </main>

      {/* Modals */}
      {showEventForm && (
        <EventForm
          event={editingEvent || undefined}
          onSubmit={editingEvent ? handleEditEvent : handleCreateEvent}
          onClose={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
        />
      )}

      {showRegistrationModal && selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => {
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
          onRegister={handleRegisterForEvent}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;