<script>
	import {fly, fade, slide} from 'svelte/transition'
	import MovieCard from './MovieCard.svelte';
	export let movies, tv, title, min, max;
	movies ? (movies = movies.slice(min || 0, max)) : '';
	tv ? (tv = tv.slice(min || 0, max)) : '';

	let movie = movies ? true : false;


	const changeTab = (e) => {
		console.log(e.target)
		// e.target.disabled = !e.target.disabled;
		movie = !movie;
	}
</script>

<div class="popular-container">
	<div class="title-container" in:fly={{x: 20, duration: 250, delay: 250}} out:fly={{x: 20, duration: 250}}>
		{#if title}
			<span class="section-title" >{title}</span>
		{/if}
		{#if movies && tv}
			<div>
				<button on:click={changeTab} class="tab-btn" disabled={movie}>In Theaters</button>
				<button on:click={changeTab} class="tab-btn" disabled={!movie}>On TV</button>
			</div>
		{/if}
	</div>

	{#if movie}
		<div in:fly={{y: -10, duration: 250, delay: 250}} out:fly={{y: -10, duration: 250}} class="popular-movies">
			{#each movies as movie}
				<MovieCard {movie} type="movie" />
			{/each}
		</div>
	{:else}
		<div in:fly={{y: 10, duration: 250, delay: 250}} out:fly={{y: 10, duration: 250}} class="popular-movies">
			{#each tv as t}
				<MovieCard movie={t} type="tv" />
			{/each}
		</div>
	{/if}
</div>

<style>
	.popular-container {
		/* width: 85%; */
		margin: auto;
	}
	.title-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border: 1px solid black; */
		max-width: 350px;
	}
	.title-container >div{

		/* border: 1px solid black;
		border-radius: 10px;
		padding: 0.1em 1em; */
	}
	.tab-btn{
		background: none;
		border: none;
		border: 1px solid var(--text-clr);
		border-radius: 100vw;
		padding: 0.3em 1em ;
		cursor: pointer;
		transition: all 350ms ease;
		font-family: inherit;
		/* border: 2px solid rgb(48, 96, 48); */
	}
	.tab-btn:disabled{
		background: var(--accent-clr);
		color: var(--background-clr);
	}
	.popular-movies {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1em 2em;
		/* border: 2px solid red; */
		border-radius: 5px;
		padding: 1em;
		/* background-color: var(--background-clr-light); */
	}
	.title-container{
		/* background-color: black; */
	}

	@media (max-width: 1200px) {
		.popular-movies {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 800px) {
		.popular-movies {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 450px) {
		.popular-movies {
			grid-template-columns: repeat(2, 1fr);
			gap: 1em 1em;
		}
	}
</style>
