import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../MovieCard";

// Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "@mui/material/Fade";

export default function Watchlist() {
	const { watchlist, setWatchlist, searchQuery, isLoading } =
		useContext(MovieContext);

	const filteredWatchlist = watchlist.filter((movie) =>
		movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<Fade in={!isLoading} timeout={600}>
			<div>
				{filteredWatchlist.length === 0 ? (
					<div
						style={{ fontSize: "35px", color: "white", textAlign: "center" }}
					>
						your list is empty
					</div>
				) : (
					<Container maxWidth="lg" sx={{ py: 4 }}>
						<Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
							{filteredWatchlist.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</Grid>

						<div
							style={{
								display: "flex",
								marginTop: "5%",
								justifyContent: "center",
							}}
						>
							<Button
								onClick={() => {
									if (
										window.confirm(
											"Are you sure you want to delete all movies from your watchlist?",
										)
									) {
										setWatchlist([]);
									}
								}}
								variant="outlined"
								startIcon={<DeleteIcon />}
								color="error"
							>
								Delete All
							</Button>
						</div>
					</Container>
				)}
			</div>
		</Fade>
	);
}
