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
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

// Others
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
    const {
        setPage,
        page,
        filteredMovies,
        isLoading,
        genreMap,
        selectedGenre,
        setSelectedGenre,
    } = useContext(MovieContext);

    // دالة جلب الصفحة التالية
    const fetchNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            {/* 1. شريط أزرار التصنيفات الـ Chips */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: 1.5,
                    overflowX: "auto",
                    py: 2,
                    px: 1,
                    mb: 3,
                    width: "100%",
                    "&::-webkit-scrollbar": {
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                        bgcolor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        bgcolor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "10px",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                    },
                }}
            >
                <Chip
                    label="All"
                    clickable
                    onClick={() => {
                        setSelectedGenre([]);
                        setPage(1);
                    }}
                    sx={{
                        fontWeight: "bold",
                        px: 1,
                        bgcolor:
                            selectedGenre.length === 0 ? "#ff3d47" : "rgba(255,255,255,0.08)",
                        color: "white",
                        "&:hover": {
                            bgcolor:
                                selectedGenre.length === 0
                                    ? "#e02e37"
                                    : "rgba(255,255,255,0.2)",
                        },
                    }}
                />

                {Object.entries(genreMap).map(([id, name]) => {
                    const isSelected = selectedGenre.includes(id);

                    return (
                        <Chip
                            key={id}
                            label={name}
                            clickable
                            onClick={() => {
                                if (isSelected) {
                                    setSelectedGenre(selectedGenre.filter((gId) => gId !== id));
                                } else {
                                    setSelectedGenre([...selectedGenre, id]);
                                }
                                setPage(1);
                            }}
                            sx={{
                                fontWeight: "bold",
                                px: 1,
                                bgcolor: isSelected ? "#ff3d47" : "rgba(255,255,255,0.08)",
                                color: "white",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    bgcolor: isSelected ? "#e02e37" : "rgba(255,255,255,0.2)",
                                    transform: "scale(1.05)",
                                },
                            }}
                        />
                    );
                })}
            </Box>

            {/* 2. منطقة عرض محتوى الأفلام */}
            <Container maxWidth="lg" sx={{ py: 0 }}>
                
                {/* عودة الـ Loading الأصلي المميز الخاص بك عند أول تحميل للموقع */}
                {isLoading && filteredMovies.length === 0 ? (
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
                    
                    /* مكون التمرير اللانهائي المستقر بعد حماية كروت الأفلام */
                    <InfiniteScroll
                        dataLength={filteredMovies.length}
                        next={fetchNextPage}
                        hasMore={page < 500}
                        loader={
                            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                                <CircularProgress aria-label="Loading more…" size={40} color="error" />
                            </Box>
                        }
                        endMessage={
                            <Typography style={{ textAlign: "center", color: "gray", margin: "30px 0" }}>
                                You have reached the end of the list.
                            </Typography>
                        }
                    >
                        <Fade in={filteredMovies.length > 0} timeout={600}>
                            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {filteredMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </Grid>
                        </Fade>
                    </InfiniteScroll>

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
            </Container>
        </div>
    );
}