<script>
	export let movie, type;
	const image = 'http://image.tmdb.org/t/p/w500/';
	import {fly} from 'svelte/transition';

	// let release_date = movie.release_date;
	// var parts =release_date.split('-');
	// var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
	// release_date =  mydate.toDateString().slice(4);

</script>

<div  class="movie-card">
	<a href={`/${type || "movie"}/${movie.id}`}>
		<img src={image + movie.poster_path} alt="Movie Poster" class="movie-image" />
	</a>
	<span class="movie-title">{movie.title || movie.name}</span>
	<span class="movie-release-date">{movie.release_date || movie.first_air_date}</span>
</div>

<style>
	.movie-card{
		/* padding: 1em; */
		border-radius: 10px;
		overflow: hidden;
		/* background-color: var(--background-clr-light); */
		/* border: 2px solid red; */
		transition: all 250ms ease;
		cursor: pointer;
	}
	.movie-card span {
		display: block;
		padding-inline: 0.4em;
	}
	.movie-image{
		width: 100%;
		border-radius: 10px;
	}
	.movie-title{
		font-size: 1.1rem;
		font-weight: 600;
		/* text-align: center; */
		/* line-height: 1; */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/* border: 2px solid red; */
	}
	.movie-release-date{
		/* border: 2px solid red; */
		margin-left: 0.2em;
		color: var(--text-clr-lighter);
		font-size: 0.75rem;
	}

	.movie-card:hover{
		transform: translateY(-4px);
		/* transition: all 300ms ease; */
	}
	@media (max-width: 600px) {
        .movie-card{
			min-width: 130px;
		}
    }

	@media(max-width: 400px) {
		.movie-card{
			padding: 0.4em;
			min-width: 100px;
		}
	}
</style>
