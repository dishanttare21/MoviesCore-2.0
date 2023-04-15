<script>
	import MovieCard from './MovieCard.svelte';
	export let recommended;
</script>

{#if recommended.length > 0}
	<h1 class="recommended-title"><iconify-icon icon="ic:baseline-movie-filter" class="icon"></iconify-icon>Similar Movies</h1>
	<div class="recommended-movies">
		{#each recommended as Rmovie}
			<!-- <h1>Hello</h1> -->
			<MovieCard movie={Rmovie} />
		{/each}
	</div>
{/if}

<style>
	.recommended-title{
		font-weight: 500;
		font-size: 1.4rem;
		/* background: #fff7db; */
		padding: 0.5em 0;
		border-radius: 5px;
		display: flex;
		align-items: center;
		/* border: 2px solid black; */
	}
	.recommended-title .icon{
		font-size: 2.4rem;
	}

	.recommended-movies {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1em 2em;
	}
</style>
