import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				bgcolor: "#000",
				color: "white",
				textAlign: "center",
				px: 2,
				boxSizing: "border-box",
			}}
		>
			{/* رقم الخطأ بتأثير بصري كبير */}
			<Typography
				variant="h1"
				sx={{
					fontSize: { xs: "6rem", md: "10rem" },
					fontWeight: "900",
					color: "#ff3d47",
					textShadow: "0px 10px 30px rgba(255, 61, 71, 0.3)",
					lineHeight: 1,
					mb: 2,
				}}
			>
				404
			</Typography>

			<Typography
				variant="h5"
				sx={{
					mb: 2,
					fontWeight: "bold",
					fontSize: { xs: "1.2rem", md: "1.8rem" },
				}}
			>
				Oops! Page Not Found
			</Typography>

			<Typography
				variant="body1"
				sx={{ color: "#aaa", mb: 4, maxWidth: "500px" }}
			>
				The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</Typography>

			<Button
				variant="contained"
				startIcon={<HomeIcon />}
				onClick={() => navigate("/")}
				sx={{
					bgcolor: "#ff3d47",
					color: "white",
					fontWeight: "bold",
					px: 4,
					py: 1.5,
					borderRadius: "30px",
					textTransform: "capitalize",
					transition: "all 0.3s ease",
					"&:hover": {
						bgcolor: "#b20710",
						transform: "scale(1.05)",
					},
				}}
			>
				Back to Home
			</Button>
		</Box>
	);
}
