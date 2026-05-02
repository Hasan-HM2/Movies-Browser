import React from "react";
import "../App.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

// Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Pagination } from "@mui/material";

// Lybraries
import { Link } from "react-router-dom";

export default function Home() {
  const {
    setMovies,
    setPage,
    setLoading,
    page,
    genreMap,
    filteredMovies,
    isLoading,
  } = useContext(MovieContext);


  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: "4%",
            }}
          >
            <CircularProgress aria-label="Loading…" size={100} />
            <CircularProgress aria-label="Loading…" size={100} />
            <CircularProgress aria-label="Loading…" size={100} />
            <Stack
              sx={{ width: "100%", color: "grey.500", marginTop: "20%" }}
              spacing={2}
            >
              <LinearProgress color="secondary" aria-label="Loading…" />
              <LinearProgress color="success" aria-label="Loading…" />
              <LinearProgress color="inherit" aria-label="Loading…" />
            </Stack>
          </div>
        ) : filteredMovies.length > 0 ? (
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredMovies.map((movie) => {
              return (
                <Grid key={movie.id} size={{ xs: 4, sm: 4, md: 4 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#1e1e1e",
                      color: "white",
                      borderRadius: "12px",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                        "& .MuiCardMedia-root": {
                          filter: "brightness(1.1)",
                        },
                      },
                    }}
                  >
                    <Link to={`/movie/${movie.id}`}>
                      <CardMedia
                        component="img"
                        sx={{
                          height: 450,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          mt: 1,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ ml: 1, color: "white" }}
                        >
                          {movie.vote_average.toFixed(1)}
                        </Typography>

                        <Typography
                          sx={{ ml: 1, color: "white", fontSize: "18px" }}
                        >
                          ⭐
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ color: "#b3b3b3", flexGrow: 1 }}
                      >
                        {movie.overview.length > 100
                          ? movie.overview.substring(0, 100) + "..."
                          : movie.overview}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ color: "gold" }}
                      >
                        Year: {movie.release_date.substring(0, 4)}
                      </Typography>

                      <Box
                        sx={{
                          mb: 1,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {movie.genre_ids.slice(0, 3).map((id) => (
                          <Chip
                            key={id}
                            label={genreMap[id] || "Movie"}
                            size="medium"
                            variant="outlined"
                            sx={{
                              fontSize: "0.8rem",
                              color: "#aaa",
                              borderColor: "#444",
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Link to={`/movie/${movie.id}`}>
                        <Button size="small">Show Details</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div
            style={{
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            No movies found matching your search
          </div>
        )}

        {/* Next Movies page */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
          <Pagination
            count={500}
            page={page}
            onChange={(event, value) => {
              setLoading(true);
              setPage(value);
              setMovies([]);
              window.scrollTo(0, 0); // العودة لأعلى الصفحة عند تبديل الصفحة
            }}
            color="primary"
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": { color: "white" },
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
