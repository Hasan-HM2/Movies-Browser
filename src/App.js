import './App.css';
import { useState } from 'react';

// Lybraries
import { Routes, Route } from 'react-router-dom';

// Material UI
import Box from '@mui/material/Box';

// Othrts
import Navbar from './navbar';
import Home from './Pages/Home';
import MovieDetails from './Pages/MovieDetails';


function App() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} onSearchQuery={setSearchQuery} />
      <Box sx={{ pt: '80px', pb: 2 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
