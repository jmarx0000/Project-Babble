import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Launchpage from './Pages/Launchpage';

function App() {
  
  return (
    <Router basename="/Project-Babble">
      <Routes>
      <Route path="/" element={<Launchpage />} />
      <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;