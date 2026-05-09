import "./App.css";

// Lybraries
import { Routes, Route } from "react-router-dom";

// Material UI
import Box from "@mui/material/Box";

// Othrts
import Navbar from "./navbar";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Watchlist from "./Pages/Watchlist";
import NotFound from "./NotFound";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Box sx={{ pt: "auto" }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
					<Route path="/watchlist" element={<Watchlist />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>
		</div>
	);
}

export default App;
