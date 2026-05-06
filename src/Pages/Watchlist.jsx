import React from "react";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../MovieCard";

// Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

export default function Watchlist() {
  const { watchlist } = useContext(MovieContext);

  return (
    <div>
      {watchlist.length === 0 ? (
        <div style={{ fontSize: "35px", color: "white", textAlign: "center" }}>
          your list is empty
        </div>
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}
