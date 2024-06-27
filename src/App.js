import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute'; 
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(!!localStorage.getItem('role') || 'Employee'); // Adjusted role default
  const [user, setUser] = useState(!!localStorage.getItem('user'));

  const handleLogin = (token, userRole, thisUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('user', JSON.stringify(thisUser)); // Serialize user object
    setIsLoggedIn(true);
    setRole(userRole);
    setUser(thisUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setRole('Employee'); // Reset role to default 'Employee'
    setUser(null); // Reset user state
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard role={role} user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;