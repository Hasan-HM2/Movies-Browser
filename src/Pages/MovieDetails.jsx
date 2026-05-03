import React, { useEffect, useState } from "react";

// Hooks
import { useParams, useNavigate } from "react-router-dom";

// MUI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

// Lybraries
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6131397ffac639fd94093eaee78327b0`,
      )
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(movie);
  if (loading)
    return (
      <Stack
        sx={{
          width: "60%",
          color: "grey.500",
          margin: "10% auto",
        }}
        spacing={2}
      >
        <LinearProgress color="secondary" aria-label="Loading…" />
        <LinearProgress color="success" aria-label="Loading…" />
        <LinearProgress color="inherit" aria-label="Loading…" />
      </Stack>
    );
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* عمود البوستر */}
          <Grid item xs={12} md={4}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.8)",
              }}
            />
          </Grid>

          {/* عمود البيانات */}
          <Grid item xs={12} md={8} sx={{ color: "white" }}>
            <Typography
              variant="h3"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              {movie.title}
            </Typography>

            {/* عرض التصنيفات كمكعبات Chip */}
            <Box sx={{ mb: 2 }}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ mr: 1, mb: 1 }}
                  color="primary"
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Release Date: {movie.release_date} | ⭐{" "}
              {movie.vote_average.toFixed(1)}
            </Typography>

            <Typography variant="body1" sx={{ color: "#ccc", lineHeight: 1.7 }}>
              {movie.overview || "No overview available for this movie."}
            </Typography>

            {/* قسم اللغات والبلدان */}
            <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
              {/* لغات الفيلم */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LanguageIcon sx={{ color: "#90cea1" }} />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Languages:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {movie.spoken_languages?.map((lang) => (
                    <Chip
                      key={lang.iso_639_1}
                      label={lang.english_name}
                      variant="outlined"
                      size="small"
                      sx={{ color: "#ccc", borderColor: "#444" }}
                    />
                  ))}
                </Box>
              </Box>

              {/* بلدان المنشأ */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PublicIcon sx={{ color: "#90cea1" }} />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Countrie:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {movie.production_countries?.map((country) => (
                    <Chip
                      key={country.iso_3166_1}
                      label={country.name}
                      color="secondary"
                      variant="filled"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Stack>

            <Typography variant="subtitle1" sx={{ mt: 2, fontStyle: "italic" }}>
              Runtime: {movie.runtime} minutes
            </Typography>
          </Grid>
        </Grid>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ color: "white", mb: 2 }}
        >
          Back to Movies
        </Button>
      </Container>
    </div>
  );
}
