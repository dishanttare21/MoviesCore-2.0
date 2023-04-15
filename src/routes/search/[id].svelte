<script context="module">
	import { TMDB_API_KEY } from '$env/static/private'
	const API_KEY = 'c468f1a4793dde84b380dc978e620225';
	export const load = async ({ fetch, params }) => {
		// console.log(params.id)
		const MOVIE_REQ_URL = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${params.id}&page=1&include_adult=false`;

		const res = await fetch(MOVIE_REQ_URL);
		const data = await res.json();
		console.log(data);
		if (res.ok) {
			return {
				props: { searchedMovie: data.results, query: params.id }
			};
		}
	};
</script>

<script>
	export let searchedMovie, query;
	import {fly} from 'svelte/transition'
	import MovieCard from '../../components/MovieCard.svelte';
	import SearchMovies from '../../components/SearchMovies.svelte';
</script>

<main >
	<section>
		<SearchMovies />
	</section>
	<section>
		search results for: {query}
	</section>

	<section in:fly={{y: -10, duration: 250, delay: 250}} out:fly={{y: -10, duration: 250}}  class="searched-movies">
		{#if searchedMovie.length > 0}
			{#each searchedMovie as movie}
				<MovieCard {movie} type={movie.media_type} />
			{/each}
		{:else}
			<h2>No results</h2>
		{/if}
	</section>
</main>

<style>
	.searched-movies {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1em 2em;
		/* border: 2px solid red; */
	}
</style>
