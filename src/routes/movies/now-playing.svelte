<script context="module">
	import { PUBLIC_TMDB_API_KEY } from '$env/static/public'

	export const load = async ({ fetch }) => {
		const NOW_PLAYING_REQ_URL =
			'https://api.themoviedb.org/3/movie/now_playing?api_key=' + PUBLIC_TMDB_API_KEY + '&language=en-US&page=1';
		
		const UPCOMING_REQ_URL =
			'https://api.themoviedb.org/3/movie/upcoming?api_key=' + PUBLIC_TMDB_API_KEY + '&language=en-US&page=1';


		const [now_playing_res, upcoming_res] = await Promise.all([
			fetch(NOW_PLAYING_REQ_URL),
			fetch(UPCOMING_REQ_URL)
		])
		const now_playing_data = await now_playing_res.json()
		const upcoming_data = await upcoming_res.json()

		if (now_playing_res.ok && upcoming_res.ok) {
			return {
				props: { NowPlaying: now_playing_data.results, Upcoming: upcoming_data.results }
			};
		}
	};
</script>

<script>
	export let NowPlaying, Upcoming;
	import PopularMovies from '../../components/PopularMovies.svelte';

</script>

<div class="movies-container">
	<!-- <div class="filters">Filters</div> -->
	<div>
		<PopularMovies movies = {NowPlaying} tv={null} title={"Now Playing"} min={0} max={24} />
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
