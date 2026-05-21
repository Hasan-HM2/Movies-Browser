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
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";

export default function Home() {
	const {
		setMovies,
		setPage,
		setLoading,
		page,
		filteredMovies,
		setSearchQuery,
		isLoading,
		genreMap,
		selectedGenre,
		setSelectedGenre,
	} = useContext(MovieContext);

	return (
		<div>
			<Box
				sx={{
					display: "flex",
					flexWrap: "nowrap", // يمنع الأزرار من النزول إلى سطر جديد نهائياً
					gap: 1.5, // يحافظ على الفراغ الأنيق والثابت بين كل زر والآخر
					overflowX: "auto", // يُجبر المتصفح على إظهار سكرول أفقي عند خروج الأزرار عن الشاشة
					py: 2,
					px: 1,
					mb: 3,
					width: "100%", // يضمن أن الحاوية تأخذ كامل عرض الشاشة المتاح

					// تحسين مظهر شريط التمرير (Scrollbar) ليكون ناعماً ومتناسقاً مع التصميم الداكن
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

				{/* 2. الأزرار الديناميكية للتصنيفات */}
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

			<Container maxWidth="lg" sx={{ py: 0 }}>
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
					<Fade in={!isLoading} timeout={600}>
						<Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
							{filteredMovies.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</Grid>
					</Fade>
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
