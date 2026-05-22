import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const MovieContext = createContext();

export default function MovieProvider({ children }) {
	const genreMap = {
		28: "Action",
		12: "Adventure",
		16: "Animation",
		35: "Comedy",
		80: "Crime",
		99: "Documentary",
		18: "Drama",
		10751: "Family",
		14: "Fantasy",
		36: "History",
		27: "Horror",
		10402: "Music",
		9648: "Mystery",
		10749: "Romance",
		878: "Sci-Fi",
		10770: "TV Movie",
		53: "Thriller",
		10752: "War",
		37: "Western",
	};

	const [movies, setMovies] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedGenre, setSelectedGenre] = useState([]);

	const [watchlist, setWatchlist] = useState(() => {
		const savedMovies = localStorage.getItem("myWatchlist");
		return savedMovies ? JSON.parse(savedMovies) : [];
	});

	useEffect(() => {
		localStorage.setItem("myWatchlist", JSON.stringify(watchlist));
	}, [watchlist]);

	// toggle watchlist
	function toggleWatchlist(movie) {
		// important IEDA with some function
		const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);

		if (isMovieInWatchlist) {
			setWatchlist(watchlist.filter((item) => item.id !== movie.id));
		} else {
			setWatchlist([...watchlist, movie]);
		}
	}
	// ==== toggle watchlist ====

	useEffect(() => {
		setLoading(true);

		const delayDebounceFn = setTimeout(() => {
			let baseUrl = "";

			if (searchQuery.trim() !== "") {
				baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=6131397ffac639fd94093eaee78327b0&page=${page}&query=${encodeURIComponent(searchQuery)}`;
			} else {
				const genresQuery =
					selectedGenre.length > 0 ? selectedGenre.join(",") : "";
				baseUrl = genresQuery
					? `https://api.themoviedb.org/3/discover/movie?api_key=6131397ffac639fd94093eaee78327b0&page=${page}&with_genres=${genresQuery}`
					: `https://api.themoviedb.org/3/movie/popular?api_key=6131397ffac639fd94093eaee78327b0&page=${page}`;
			}

			axios
				.get(baseUrl)
				.then((res) => {
					const newMovies = res.data.results;
					setMovies((prevMovies) => {
						if (page === 1) {
							return newMovies;
						}
						return [...prevMovies, ...newMovies];
					});
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}, 1000); // تأخير نصف ثانية

		return () => clearTimeout(delayDebounceFn);
	}, [page, selectedGenre, searchQuery]);

	const filteredMovies = movies;

	return (
		<MovieContext.Provider
			value={{
				filteredMovies,
				setMovies,
				isLoading,
				page,
				setPage,
				searchQuery,
				setSearchQuery,
				genreMap,
				setLoading,
				watchlist,
				setWatchlist,
				toggleWatchlist,
				selectedGenre,
				setSelectedGenre,
			}}
		>
			{children}
		</MovieContext.Provider>
	);
}
