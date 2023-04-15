<script context="module">

	import { PUBLIC_TMDB_API_KEY } from '$env/static/public'

	export const load = async ({ fetch }) => {
		const POPULAR_REQ_URL =
			'https://api.themoviedb.org/3/tv/popular?api_key=' + PUBLIC_TMDB_API_KEY + '&language=en-US&page=1';
		
		const TOP_RATED_REQ_URL =
			'https://api.themoviedb.org/3/tv/top_rated?api_key=' + PUBLIC_TMDB_API_KEY + '&language=en-US&page=1';


		const [popular_res, top_rated_res] = await Promise.all([
			fetch(POPULAR_REQ_URL),
			fetch(TOP_RATED_REQ_URL)
		])
		const popular_data = await popular_res.json()
		const top_rated_data = await top_rated_res.json()

		if (popular_res.ok && top_rated_res.ok) {
			return {
				props: { Popular: popular_data.results, TopRated: top_rated_data.results }
			};
		}
	};
</script>

<script>
	export let Popular, TopRated;
	import PopularMovies from '../../components/PopularMovies.svelte';
</script>

<div class="movies-container">
	<!-- <div class="filters">Filters</div> -->
	<div>
		<PopularMovies movies = {null} tv={Popular} title={"Popular"} max={12} />
		<PopularMovies movies = {null} tv={TopRated} title={"Top Rated"} max={12} />
	</div>
</div>

<style>
	.movies-container {
		/* border: 2px solid red; */
		width: 85%;
		margin: auto;
		display: flex;
	}
	.filters {
		border: 2px solid blue;

	}
</style>
