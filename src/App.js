import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Material UI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';



function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(true)
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

  console.log(movies)


  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isLoading ? (
          <CircularProgress aria-label="Loading…" size={100} />
        ) : (<Grid container spacing={2} sx={{ backgroundColor: 'wheat' }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {movies.map((item, index) => {
            return (
              <Grid key={item.id} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 450 }}
                    image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.overview}
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
        </Grid>)}

      </Container>
    </div>
  );
}

export default App;
