import { useState, useContext } from "react";

// Material UI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

// Movie Context
import { MovieContext } from "../src/context/MovieContext";

export default function Navbar() {
	const navigate = useNavigate();
	const { searchQuery, setSearchQuery, watchlist } = useContext(MovieContext);
	const watchlistCount = watchlist?.length || 0;
	const [showMobileSearch, setShowMobileSearch] = useState(false);

	return (
		<AppBar
			position="sticky"
			sx={{ bgcolor: "#121212", backgroundImage: "none" }}
		>
			<Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
				{showMobileSearch ? (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
							gap: 1,
						}}
					>
						<SearchIcon sx={{ color: "grey.500" }} />
						<InputBase
							placeholder="Search movies..."
							value={searchQuery || ""}
							onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)} // استدعاء آمن للدالة
							autoFocus
							sx={{
								color: "white",
								width: "100%",
								bgcolor: "rgba(255, 255, 255, 0.1)",
								borderRadius: "8px",
								px: 1.5,
								py: 0.5,
							}}
						/>
						<IconButton
							onClick={() => {
								setShowMobileSearch(false);
								if (setSearchQuery) setSearchQuery("");
							}}
							sx={{ color: "white" }}
						>
							<CloseIcon />
						</IconButton>
					</Box>
				) : (
					<>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="h6"
								noWrap
								onClick={() => navigate("/")}
								sx={{
									fontWeight: "bold",
									cursor: "pointer",
									fontSize: { xs: "0.95rem", sm: "1.25rem" }, // مقاس متجاوب لتفادي التداخل في الجوال
									display: "block",
								}}
							>
								Movies Browser
							</Typography>
						</Box>

						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								alignItems: "center",
								bgcolor: "rgba(255, 255, 255, 0.08)",
								borderRadius: "20px",
								px: 2,
								py: 0.5,
								width: "300px",
								transition: "all 0.3s ease",
								"&:focus-within": {
									bgcolor: "rgba(255, 255, 255, 0.15)",
									width: "350px",
								},
							}}
						>
							<SearchIcon sx={{ color: "grey.400", mr: 1 }} />
							<InputBase
								placeholder="Search movies..."
								value={searchQuery || ""}
								onChange={(e) =>
									setSearchQuery && setSearchQuery(e.target.value)
								}
								sx={{ color: "white", width: "100%" }}
							/>
						</Box>

						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: { xs: 0.5, sm: 1.5 },
							}}
						>
							<IconButton
								onClick={() => setShowMobileSearch(true)}
								sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
							>
								<SearchIcon />
							</IconButton>

							<IconButton
								onClick={() => navigate("/watchlist")}
								sx={{
									color: "white",
									borderRadius: "10px",
									px: { xs: 1, sm: 2 },
									py: 1,
									"&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
								}}
							>
								<Badge
									badgeContent={watchlistCount}
									color="error"
									sx={{ mr: { xs: 0, sm: 1 } }}
								>
									<FavoriteIcon sx={{ color: "#ff3d47" }} />
								</Badge>

								<Typography
									variant="button"
									sx={{
										display: { xs: "none", sm: "block" },
										fontWeight: "bold",
										textTransform: "capitalize",
									}}
								>
									My List
								</Typography>
							</IconButton>
						</Box>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
}
