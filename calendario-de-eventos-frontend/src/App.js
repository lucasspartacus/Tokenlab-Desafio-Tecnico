import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import Login from './components/Login';
import Register from './components/Register';
import EventForm from './components/EventForm';
import NavBar from './components/Navbar';
import DashBoard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
       <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<DashBoard/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventList token={user} />} />
          <Route path="/events/create" element={<EventForm token={user} />} />
          <Route path="/events/edit/:id" element={<EventForm token={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
