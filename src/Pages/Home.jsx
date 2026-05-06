import React from "react";
import "../App.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../MovieCard";

// Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Pagination } from "@mui/material";

export default function Home() {
  const {
    setMovies,
    setPage,
    setLoading,
    page,
    filteredMovies,
    setSearchQuery,
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
              margin: "4% auto",
              width: "80%",
            }}
          >
            <CircularProgress aria-label="Loading…" size={70} />
            <CircularProgress aria-label="Loading…" size={70} />
            <CircularProgress aria-label="Loading…" size={70} />
            <Stack
              sx={{ width: "80%", color: "grey.500", margin: "20% auto" }}
              spacing={2}
            >
              <LinearProgress color="secondary" aria-label="Loading…" />
              <LinearProgress color="success" aria-label="Loading…" />
              <LinearProgress color="inherit" aria-label="Loading…" />
            </Stack>
          </div>
        ) : filteredMovies.length > 0 ? (
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
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
              setSearchQuery("");
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
