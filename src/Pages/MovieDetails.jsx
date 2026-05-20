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
import Avatar from "@mui/material/Avatar";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

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
	const [cast, setCast] = useState([]);
	const [videoKey, setVideoKey] = useState("");
	const [open, setOpen] = useState(false);

	const isFavorite = watchlist.some((item) => item?.id === movie?.id);
	const apiKey = process.env.REACT_APP_TMDB_API_KEY;

	useEffect(() => {
		axios
			.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
			.then((res) => {
				setMovie(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));

		axios
			.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
			.then((res) => {
				setCast(res.data.cast);
			});

		axios
			.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
			.then((res) => {
				const trailerObject = res.data.results.find(
					(item) => item.type === "Trailer" && item.site === "YouTube",
				);

				if (trailerObject) {
					setVideoKey(trailerObject.key);
				} else {
					const fallbackVideo = res.data.results[0];
					if (fallbackVideo) setVideoKey(fallbackVideo.key);
				}
			});
	}, [id, apiKey]);

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
						? `linear-gradient(to bottom, rgba(0, 0, 0, 0.71) 0%, rgb(0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
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

					<Grid
						container
						spacing={{ xs: 4, md: 6 }}
						alignItems="flex-start"
						justifyContent={{ xs: "center" }}
					>
						{/* عمود البوستر المتجاوب */}
						<Grid
							xs={12}
							md={4}
							sx={{
								display: "flex",
								justifyContent: { xs: "center", md: "flex-start" },
								alignItems: "center",
							}}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								style={{
									width: "100%",
									maxWidth: "330px",
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
									display: "flex",
									flexDirection: { xs: "column", sm: "row" },
									gap: 2,
									alignItems: "center",
									justifyContent: "center",
									mt: 3,
									width: "100%",
								}}
							>
								{videoKey && (
									<Button
										variant="contained"
										startIcon={<PlayCircleOutlineIcon />}
										onClick={() => setOpen(true)}
										sx={{
											bgcolor: "#ff3d47",
											color: "white",
											fontWeight: "bold",
											textTransform: "capitalize",
											borderRadius: "30px",
											marginRight: "1.9%",
											px: 4,
											py: 1.2,
											width: { xs: "100%", sm: "auto" },
											maxWidth: "340px",
											boxShadow: "0px 4px 15px rgba(255, 61, 71, 0.3)",
											transition: "all 0.3s ease",
											"&:hover": {
												bgcolor: "#e02e37",
												transform: "scale(1.05)",
												boxShadow: "0px 6px 20px rgba(255, 61, 71, 0.5)",
											},
										}}
									>
										Watch Trailer
									</Button>
								)}
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

					{/* قسم الممثلين المشاركين */}
					<Box sx={{ mt: 4, px: 2 }}>
						<Typography
							variant="h5"
							sx={{ fontWeight: "bold", mb: 2, color: "white" }}
						>
							Cast
						</Typography>

						<Box
							sx={{
								display: "flex",
								gap: 2,
								overflowX: "auto",
								pb: 2,
								"&::-webkit-scrollbar": { height: "6px" },
								"&::-webkit-scrollbar-thumb": {
									bgcolor: "rgba(255,255,255,0.2)",
									borderRadius: "4px",
								},
							}}
						>
							{cast.slice(0, 10).map((actor) => (
								<Box
									key={actor.id}
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										textAlign: "center",
										minWidth: "100px", // لضمان عدم انضغاط العناصر أثناء التمرير الأفقي
									}}
								>
									<Avatar
										src={
											actor.profile_path
												? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
												: null
										}
										alt={actor.name}
										sx={{ width: 80, height: 80, mb: 1, boxShadow: 3 }}
									>
										{actor.name.charAt(0)}
									</Avatar>

									{/* اسم الممثل الحقيقي */}
									<Typography
										variant="body2"
										sx={{ fontWeight: "bold", color: "white" }}
									>
										{actor.name}
									</Typography>

									{/* اسم الشخصية في الفيلم */}
									<Typography variant="caption" sx={{ color: "darkgray" }}>
										{actor.character}
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
				</Container>

				{/* عرض الفيديو الدعائي */}
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					maxWidth="md"
					fullWidth
					disableScrollLock
					PaperProps={{
						sx: {
							bgcolor: "#121212",
							position: "relative",
							overflow: "visible",
						},
					}}
				>
					{/* زر إغلاق أنيق في زاوية النافذة المنبثقة */}
					<IconButton
						onClick={() => setOpen(false)}
						sx={{
							position: "absolute",
							top: -40, // يرفع الزر فوق الفيديو قليلاً في الشاشات الكبيرة
							right: 0,
							color: "white",
							"&:hover": { color: "#ff3d47" },
						}}
					>
						<CloseIcon />
					</IconButton>

					<DialogContent sx={{ p: 0, bgcolor: "black", lineHeight: 0 }}>
						{/* التعديل الذكي للـ iframe ليكون متجاوباً بالكامل ولا يظهر حواف مشوهة */}
						<iframe
							width="100%"
							height="500px" // زدنا الارتفاع قليلاً ليعطي تجربة مشاهدة مريحة على اللابتوب
							src={
								open
									? `https://www.youtube.com/embed/${videoKey}?autoplay=1`
									: ""
							} // يشغل الفيديو تلقائياً عند الفتح، ويوقفه تماماً عند الإغلاق
							title="YouTube video player"
							style={{ border: "none" }} // الاستخدام البديل والأحدث لـ frameBorder
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</DialogContent>
				</Dialog>
			</Box>
		</Fade>
	);
}
