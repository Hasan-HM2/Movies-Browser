import React, { useEffect, useState } from 'react'

// Hooks
import { useParams, useNavigate } from 'react-router-dom'

// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';



// Lybraries
import axios from 'axios'

export default function MovieDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6131397ffac639fd94093eaee78327b0`)
            .then((res) => {
                setMovie(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [id])
    console.log(movie);
    if (loading) return <Typography sx={{ textAlign: 'center', fontSize: '30px', color: 'white' }}>Loading ...</Typography>;
    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {/* عمود البوستر */}
                    <Grid item xs={12} md={4}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.8)' }}
                        />
                    </Grid>

                    {/* عمود البيانات */}
                    <Grid item xs={12} md={8} sx={{ color: 'white' }}>
                        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                            {movie.title}
                        </Typography>

                        {/* عرض التصنيفات كمكعبات Chip */}
                        <Box sx={{ mb: 2 }}>
                            {movie.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} color="primary" />
                            ))}
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            Release Date: {movie.release_date} | ⭐ {movie.vote_average.toFixed(1)}
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.7 }}>
                            {movie.overview || "No overview available for this movie."}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Runtime: {movie.runtime} minutes
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ color: 'white', mb: 2 }}
                >
                    Back to Movies
                </Button>
            </Container>
        </div>
    )
}
