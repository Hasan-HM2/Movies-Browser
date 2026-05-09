// Hooks
import { useEffect, useState, useContext } from "react";
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fade from "@mui/material/Fade";

// Libraries
import axios from "axios";

// Others
import { MovieContext } from "../context/MovieContext";

export default function MovieDetails() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { toggleWatchlist, watchlist } = useContext(MovieContext);

	const isFavorite = watchlist.some((item) => item?.id === movie?.id);

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

	if (loading)
		return (
			<Stack
				sx={{
					width: "60%",
					color: "grey.500",
					margin: "10% auto",
					pt: { xs: 10, md: 10 },
					pb: { xs: 4, md: 2 },
				}}
				spacing={2}
			>
				<LinearProgress color="secondary" aria-label="Loading…" />
				<LinearProgress color="success" aria-label="Loading…" />
				<LinearProgress color="inherit" aria-label="Loading…" />
			</Stack>
		);

	return (
		<Fade in={!loading} timeout={600}>
			<Box
				sx={{
					minHeight: "100vh",
					width: "100%",
					bgcolor: "#000",
					backgroundImage: movie?.backdrop_path
						? `linear-gradient(to bottom, rgba(0, 0, 0, 0.61) 0%, rgb(0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
						: "none",
					backgroundSize: "cover",
					backgroundPosition: "center top",
					backgroundAttachment: { xs: "scroll", md: "fixed" },
					pt: { xs: 4, md: 5 },
					pb: { xs: 4, md: 2 },
					m: 0,
					boxSizing: "border-box",
				}}
			>
				<Container maxWidth="lg">
					<Button
						startIcon={<ArrowBackIcon />}
						onClick={() => navigate("/")}
						sx={{
							color: "white",
							mb: 2,
							alignSelf: { xs: "center", md: "flex-start" },
							textTransform: "capitalize",
							"&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
						}}
					>
						Back to Movies
					</Button>

					<Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
						{/* عمود البوستر المتجاوب */}
						<Grid
							xs={12}
							md={4}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								style={{
									width: "100%",
									maxWidth: "340px",
									borderRadius: "16px",
									boxShadow: "0px 10px 30px rgba(0,0,0,0.9)",
								}}
							/>
						</Grid>

						{/* عمود البيانات */}
						<Grid
							xs={12}
							md={8}
							sx={{
								color: "white",
								display: "flex",
								flexDirection: "column",
								alignItems: { xs: "center", md: "flex-start" },
								textAlign: { xs: "center", md: "left" },
							}}
						>
							{/* العنوان */}
							<Typography
								variant="h3"
								sx={{
									color: "white",
									fontWeight: "bold",
									mb: 2,
									fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
								}}
							>
								{movie.title}
							</Typography>

							{/* تصنيفات الفيلم (Chips) */}
							<Box
								sx={{
									mb: 3,
									display: "flex",
									flexWrap: "wrap",
									justifyContent: { xs: "center", md: "flex-start" },
									gap: 1,
								}}
							>
								{movie.genres?.map((genre) => (
									<Chip
										key={genre.id}
										label={genre.name}
										color="primary"
										sx={{ fontWeight: "600" }}
									/>
								))}
							</Box>

							{/* تاريخ الإصدار والتقييم */}
							<Typography
								variant="h6"
								sx={{ mb: 2, fontWeight: "medium", color: "#e0e0e0" }}
							>
								Release Date: {movie.release_date} | ⭐{" "}
								{movie.vote_average?.toFixed(1)}
							</Typography>

							{/* نبذة الفيلم */}
							<Typography
								variant="body1"
								sx={{
									color: "#cccccc",
									lineHeight: 1.8,
									mb: 4,
									maxWidth: "700px",
								}}
							>
								{movie.overview || "No overview available for this movie."}
							</Typography>

							<Box
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: { xs: "center", md: "flex-start" },
									mb: 4,
								}}
							>
								{isFavorite ? (
									<Button
										variant="contained"
										startIcon={<FavoriteIcon />}
										onClick={() => {
											toggleWatchlist({
												id: movie.id,
												title: movie.title || "No Title",
												poster_path: movie.poster_path || "",
												overview:
													movie.overview ||
													"No overview available for this movie.",
												vote_average: movie.vote_average || 0,
												release_date: movie.release_date || "",
											});
										}}
										sx={{
											bgcolor: "#e50914",
											color: "white",
											fontWeight: "bold",
											textTransform: "capitalize",
											borderRadius: "30px",
											px: 4,
											py: 1.2,
											width: { xs: "100%", sm: "auto" },
											maxWidth: "340px",
											boxShadow: "0px 4px 15px rgba(229, 9, 20, 0.4)",
											transition: "all 0.3s ease",
											"&:hover": {
												bgcolor: "#b20710",
												transform: "scale(1.05)",
												boxShadow: "0px 6px 20px rgba(229, 9, 20, 0.6)",
											},
										}}
									>
										Remove from Favourite
									</Button>
								) : (
									<Button
										variant="outlined"
										startIcon={<FavoriteBorderIcon />}
										onClick={() => {
											toggleWatchlist({
												id: movie.id,
												title: movie.title || "No Title",
												poster_path: movie.poster_path || "",
												overview:
													movie.overview ||
													"No overview available for this movie.",
												vote_average: movie.vote_average || 0,
												release_date: movie.release_date || "",
											});
										}}
										sx={{
											color: "#ff3d47",
											borderColor: "#ff3d47",
											fontWeight: "bold",
											textTransform: "capitalize",
											borderRadius: "30px",
											px: 4,
											py: 1.2,
											borderWidth: "1.5px",
											width: { xs: "100%", sm: "auto" },
											maxWidth: "340px",
											transition: "all 0.3s ease",
											"&:hover": {
												bgcolor: "rgba(255, 61, 71, 0.1)",
												borderColor: "#ff3d47",
												borderWidth: "1.5px",
												transform: "scale(1.05)",
											},
										}}
									>
										Add To Favourite
									</Button>
								)}
							</Box>

							{/* قسم اللغات والبلدان والمدة (تنسيق أفقي متجاوب ومريح للعين) */}
							<Stack
								direction={{ xs: "column", sm: "row" }} // يترتبون عمودياً كأقسام رئيسية في الموبايل، وأفقياً بجانب بعضهم في الشاشات الأكبر
								spacing={{ xs: 3, sm: 4 }}
								sx={{
									width: "100%",
									alignItems: { xs: "center", md: "flex-start" },
									mt: 3,
								}}
							>
								{/* لغات الفيلم */}
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										flexWrap: "wrap",
										justifyContent: { xs: "center", md: "flex-start" },
									}}
								>
									<Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
										<LanguageIcon sx={{ color: "#90cea1" }} />
										<Typography
											variant="body1"
											sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
										>
											Languages:
										</Typography>
									</Box>
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
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										flexWrap: "wrap",
										justifyContent: { xs: "center", md: "flex-start" },
									}}
								>
									<Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
										<PublicIcon sx={{ color: "#90cea1" }} />
										<Typography
											variant="body1"
											sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
										>
											Countries:
										</Typography>
									</Box>
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

							<Typography
								variant="subtitle1"
								sx={{
									fontStyle: "italic",
									color: "#b3b3b3",
									mt: 2,
									textAlign: { xs: "center", md: "left" },
								}}
							>
								Runtime: {movie.runtime} minutes
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Fade>
	);
}
