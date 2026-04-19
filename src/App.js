import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Material UI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';


// Othrts
import Navbar from './navbar';


function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6131397ffac639fd94093eaee78327b0')
      .then((res) => {
        const moviesArray = res.data.results
        setMovies(moviesArray)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(movies)


  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} onSearchQuery={setSearchQuery} />
      <Container maxWidth="lg" sx={{ py: 4, marginTop: '4%' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '4%' }}>
            <CircularProgress aria-label="Loading…" size={100} />
            <CircularProgress aria-label="Loading…" size={100} />
            <CircularProgress aria-label="Loading…" size={100} />
            <Stack sx={{ width: '100%', color: 'grey.500', marginTop: '20%' }} spacing={2}>
              <LinearProgress color="secondary" aria-label="Loading…" />
              <LinearProgress color="success" aria-label="Loading…" />
              <LinearProgress color="inherit" aria-label="Loading…" />
            </Stack>
          </div>
        ) : (filteredMovies.length > 0 ? (
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredMovies.map((item, index) => {
              return (
                <Grid key={item.id} size={{ xs: 4, sm: 4, md: 4 }} >
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#1e1e1e',
                    color: 'white',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
                      '& .MuiCardMedia-root': {
                        filter: 'brightness(1.1)'
                      }
                    }
                  }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 450, objectFit: 'cover', cursor:'pointer' }}
                      image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#b3b3b3', flexGrow: 1 }}>
                        {item.overview.length > 100
                          ? item.overview.substring(0, 100) + "..."
                          : item.overview}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div" sx={{ color: 'gold' }}>
                        Year: {item.release_date.substring(0, 4)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>) :
          <div style={{ color: 'white', fontSize: '20px', textAlign: 'center', marginTop:'10%' }}>
            No movies found matching your search
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
