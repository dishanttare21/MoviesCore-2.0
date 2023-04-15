<script context="module">
	import { TMDB_API_KEY } from '$env/static/private'
	export const load = async ({ fetch }) => {
		const API_KEY = 'c468f1a4793dde84b380dc978e620225';
		const POPULAR_MOVIE_REQ_URL =
			'https://api.themoviedb.org/3/movie/popular?api_key=' + TMDB_API_KEY + '&language=en-US&page=1';
		const POPULAR_TV_REQ_URL =
			'https://api.themoviedb.org/3/tv/popular?api_key=' + TMDB_API_KEY + '&language=en-US&page=1';

		const NOW_PLAYING_REQ_URL =
			'https://api.themoviedb.org/3/movie/top_rated?api_key=' + TMDB_API_KEY + '&language=en-US&page=1';

		
		const [PopularMovieRes, PopularTVRes, NowPlayingRes] = await Promise.all([
			fetch(POPULAR_MOVIE_REQ_URL),
			fetch(POPULAR_TV_REQ_URL),
			fetch(NOW_PLAYING_REQ_URL),
		])

		const popularMovieData = await PopularMovieRes.json();

		const popularTVData = await PopularTVRes.json();
		console.log(popularTVData)
		const nowPlayingData = await NowPlayingRes.json();

		// console.log(nowPlayingData);
		if (PopularMovieRes.ok && PopularTVRes.ok && NowPlayingRes.ok) {
			return {
				props: { popularMovies: popularMovieData.results, popularTV: popularTVData.results, nowPlaying: nowPlayingData.results }
			};
		}
	};
</script>

<script>
	import {fly} from 'svelte/transition'
	import PopularMovies from '../components/PopularMovies.svelte';
	import SearchMovies from '../components/SearchMovies.svelte';
	export let popularMovies, popularTV, nowPlaying;
</script>

<main >
	<section class="search-section">
		<SearchMovies />
	</section>

	<section class="popular-movies-section">
		<PopularMovies movies = {popularMovies} tv={popularTV} title={"What's Popular"} max={12} />
	</section>
	<section class="popular-movies-section">
		<PopularMovies movies = {nowPlaying} tv={null} title={"Top Rated"} max={12} />
	</section>
</main>

<style>
	section{
		width: 75%;
		/* display: inline-block; */
	}
	.popular-movies-section {
		/* display: inline-block; */
		/* width: 100%; */
		/* border: 1px solid red; */
		/* padding: auto; */
		/* padding-bottom: 2em; */
		/* background-color: var(--background-clr-light); */
	}
</style>
