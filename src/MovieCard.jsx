import { useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "./context/MovieContext";

// Material UI
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MovieCard({ movie }) {
	const { watchlist, toggleWatchlist, genreMap } = useContext(MovieContext);

	// التحقق هل الفيلم في المفضلة
	const isFavorite = watchlist.some((item) => item.id === movie.id);

	return (
		<Grid
			size={{ xs: 4, sm: 4, md: 4 }}
			sx={{ pt: { xs: 5, md: 5 }, pb: { xs: 4, md: 0 } }}
		>
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

					{/* Rating & FAV */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mb: 2,
							mt: 1,
						}}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography variant="body1" sx={{ ml: 1, color: "white" }}>
								{movie.vote_average.toFixed(1)}
							</Typography>
							<Typography sx={{ ml: 1, color: "white", fontSize: "18px" }}>
								⭐
							</Typography>
						</div>

						{/* Add to favourite button */}
						<div
							onClick={() => toggleWatchlist(movie)}
							style={{ cursor: "pointer" }}
						>
							{isFavorite ? (
								<FavoriteIcon
									sx={{
										color: "#e91e63",
										fontSize: "28px",
										transition: "0.3s",
										"&:hover": { scale: "1.2" },
									}}
								/>
							) : (
								<FavoriteBorderIcon
									sx={{
										fontSize: "28px",
										transition: ".3s",
										"&:hover": { scale: "1.2" },
									}}
								/>
							)}
						</div>
						{/* ====Add to favourite button==== */}
					</Box>

					<Typography variant="body2" sx={{ color: "#b3b3b3", flexGrow: 1 }}>
						{movie.overview.length > 100
							? movie.overview?.substring(0, 100) + "..."
							: movie?.overview}
					</Typography>

					<Typography
						gutterBottom
						variant="h6"
						component="div"
						sx={{ color: "gold", mt: 1 }}
					>
						Year: {movie.release_date.substring(0, 4)}
					</Typography>

					<Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
						{movie.genre_ids?.slice(0, 3).map((id) => (
							<Chip
								key={id}
								label={genreMap[id] || "Movie"}
								size="medium"
								variant="outlined"
								sx={{ fontSize: "0.7rem", color: "#aaa", borderColor: "#444" }}
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
}
