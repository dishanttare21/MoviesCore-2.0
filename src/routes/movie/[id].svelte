<script context="module">
	import { LoadingStore } from '../../stores';
	let loading = false;
	import { PUBLIC_DEPLOYED_BASE_URL, PUBLIC_TMDB_API_KEY } from '$env/static/public';

	export const load = async ({ fetch, params }) => {
		loading = true;
		console.log(params.id);
		const MOVIE_REQ_URL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${PUBLIC_TMDB_API_KEY}&language=en-US`;
		const RECOMMENDED_URL = `${PUBLIC_DEPLOYED_BASE_URL}/recommend/${params.id}`;
		const MOVIE_VIDEOS_URL = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${PUBLIC_TMDB_API_KEY}&language=en-US`;
		const MOVIE_IMAGES_URL = `https://api.themoviedb.org/3/movie/${params.id}/images?api_key=${PUBLIC_TMDB_API_KEY}&language=en-US`;
		const MOVIE_REVIEWS_URL = `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;
		try {
			const [
				movieDetailsResponse,
				recommendedResponse,
				movieVideosResponse,
				movieImagesResponse,
				movieReviewsResponse
			] = await Promise.all([
				fetch(MOVIE_REQ_URL),
				fetch(RECOMMENDED_URL),
				fetch(MOVIE_VIDEOS_URL),
				fetch(MOVIE_IMAGES_URL),
				fetch(MOVIE_REVIEWS_URL)
			]);
			// console.log(await recommendedResponse.json())

			//movie details
			const movieDetails = await movieDetailsResponse.json();

			//recommended mmovies
			const recommendedData = await recommendedResponse.json();
			const recommended = recommendedData.results;
			// console.log(recommended);

			//movie videos
			const movieVideosData = await movieVideosResponse.json();
			const movieVideos = movieVideosData.results.filter((movie) => {
				return movie.type === 'Trailer';
			});
			// movieVideos = movieVideos
			// console.log(movieVideos);

			//movie images(posters and backdrops)
			const movieImagesData = await movieImagesResponse.json();
			const movieImages = await movieImagesData.results;
			// const movieImagesBackdrops = await movieImagesResponse.results.backdrops;
			// const movieImagesPosters = await movieImagesResponse.results.posters;
			// console.log(movieImages);

			//movie reviews
			const movieReviewsData = await movieReviewsResponse.json();
			const movieReviews = await movieReviewsData.results.slice(0, 3);
			// console.log(movieReviews);

			// console.log('hi'+movieReviewsResponse.ok)
			// const movieDetailsResponse = await movieDetailsReq.json();
			// const recommendedResponse = await RecommendedReq.json();
			// const movieVideosResponse = await movieVideosReq.json();
			// const movieImagesResponse = await movieImagesReq.json();
			// const movieReviewsResponse = await movieReviewsReq.json();

			if (
				movieDetailsResponse.ok &&
				recommendedResponse.ok &&
				movieVideosResponse.ok &&
				movieImagesResponse.ok &&
				movieReviewsResponse.ok
			) {
				return {
					props: { movieDetails, recommended, movieVideos, movieImages, movieReviews }
				};
			}
		} catch (error) {
			console.log(error);
			let movieDetails = [
					{
						poster_path: ''
					}
				],
				recommended = [],
				movieVideos = [],
				movieImagesReq = [],
				movieReviews = [];
			return {
				props: { movieDetails, recommended, movieVideos, movieImagesReq, movieReviews }
			};
		}
	};
</script>

<script>
	import { fly, fade } from 'svelte/transition';
	import Modal from '../../components/Modal.svelte';

	import Recommended from '../../components/Recommended.svelte';

	export let movieDetails, recommended, movieVideos, movieImages, movieReviews;
	const image = 'http://image.tmdb.org/t/p/original/';

	let open = false;

	const openModal = () => {
		open = true;
	};
	const closeModal = () => {
		open = false;
	};
	// import YouTube from 'svelte-youtube';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
	<script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js"></script>
</svelte:head>

<main>
	{#if open}
		<Modal {closeModal} />
	{/if}
	{#if movieDetails}
		<section
			in:fly={{ y: 10, duration: 250, delay: 250 }}
			out:fly={{ y: 10, duration: 250 }}
			class="movie-details"
		>
			<div class="movie-details-bottom">
				<div class="movie-details-bottom-poster">
					<div class="poster-image-container">
						<img src={image + movieDetails.poster_path} alt="" class="poster-image" />
					</div>
					<div class="backdrop-image-container">
						<img src={image + movieDetails.backdrop_path} alt="" class="backdrop-image" />
					</div>
				</div>
				<div class="movie-details-bottom-text">
					<h3 class="movie-title">{movieDetails.title}</h3>

					<p class="movie-overview">
						<span class="key"><iconify-icon icon="ic:round-movie" class="icon" />Overview:</span>
						{movieDetails.overview}
					</p>
					<div class="other-details">
						<span
							><iconify-icon icon="fluent-mdl2:date-time-mirrored" class="icon" /><span class="key"
								>Release Date:
							</span>{movieDetails.release_date}</span
						>
						<span
							><iconify-icon icon="material-symbols:star-rounded" class="icon" /><span class="key"
								>Rating:
							</span>
							{movieDetails.vote_average} ({movieDetails.vote_count})</span
						>
						<span
							><iconify-icon icon="bxs:time" class="icon" /><span class="key">Runtime: </span>
							{movieDetails.runtime} mins</span
						>
					</div>
				</div>
			</div>
			<!-- <div class="movie-details-top">
			<img src={image + movieDetails.backdrop_path} alt="" class="backdrop-image" />
		</div> -->
			<div class="movie-posters">
				<!-- {#each movieImagesBackdrops as backdrop}
				<div>
					<img src={image+backdrop.file_path} alt="">
				</div>
			{/each} -->
			</div>
			<!-- <div class="trailers">
				{#each movieVideos as video}
					<div>
						<button on:click={openModal}>Play Trailer</button>
					</div>
				{/each}
			</div> -->
		</section>
	{/if}

	<section class="recommended-section">
		<Recommended {recommended} />
	</section>

	<section class="reviews-section">
		<ul class="reviews">
			{#each movieReviews as review}
				<li class="review">
					<div class="review-top">
						{#if review.author_details.avatar_path?.length <= 32}
							<img src={image + review.author_details.avatar_path} alt="" />
						{:else}
							<img src={review.author_details.avatar_path} alt="" />
						{/if}
						<h4>{review.author}</h4>
					</div>
					<div class="review-bottom">
						<span class={`reviews-text`}>{review.content}</span>
						<button class="readmore-btn">..read more</button>
					</div>
				</li>
			{/each}
		</ul>
		<button>Load More</button>
	</section>
</main>

<style>
	section {
	}
	.movie-details {
		width: 75%;
		margin: auto;
		/* margin-top: 2em; */
		height: max-content;
		position: relative;
		background-color: var(--background-clr-light);
		/* border: 2px solid var(--text-clr); */
		border-radius: 5px;
		padding: 1em 0;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}
	.movie-details img {
		width: 100%;
		display: block;
	}
	.movie-details-top {
		max-height: 30vh;
		/* filter: blur(2px); */
	}
	.backdrop-image-container {
		display: none;
		width: 100%;
		/* border: 2px solid red; */
	}
	.backdrop-image {
		width: 100%;
		/* height: 100%; */
		border-radius: 5px;
		/* max-width: 40rem; */
		/* margin: auto; */
		/* display: none; */
		/* max-width: 18rem; */
	}
	.movie-details-bottom {
		width: 85%;
		margin: auto;
		/* border: 2px solid red; */
		display: flex;
		/* color: #fff; */
		/* background: hsl(217, 69%, 48%); */
		/* box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
			rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset; */
	}
	.movie-details-bottom-poster {
		max-width: 15rem;
		/* flex: 1.3; */
		/* border: 2px solid red; */
	}
	.movie-details-bottom-text {
		/* flex: 3; */
		padding: 1em;
	}
	.movie-title {
		font-size: 2rem;
	}
	.movie-overview {
		margin: 1em auto;

		/* color: rgb(46, 129, 254); */
	}
	.movie-overview span {
		display: block;
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	.poster-image {
		object-fit: contain;
		object-position: center;
		/* max-width: 15rem; */
		border-radius: 5px;
	}
	.movie-details > div {
		z-index: 1;
		max-height: inherit;
	}
	.trailers {
		display: flex;
		/* border: 2px solid red; */
		overflow: auto;
		gap: 2em;
		margin-top: 1em;
	}
	.trailers > div {
		/* width: 300px; */
	}

	.reviews {
		/* border: 2px solid red; */
		margin: 0;
		padding: 0;
		list-style-type: none;
		margin-bottom: 2em;
		/* background: white; */
	}
	.reviews:nth-child(1) {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
	.review {
		/* border: 2px solid blue; */
		padding-bottom: 1em;
		color: var(--text-clr-lighter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.review-top {
		/* border: 2px solid green; */
		display: flex;
		align-items: center;
	}
	.reviews img {
		max-width: 40px;
		border-radius: 50vw;
		object-fit: cover;
		/* border: 2px solid red; */
		margin-right: 0.3rem;
	}
	.reviews-text {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3; /* number of lines to show */
		line-clamp: 3;
		-webkit-box-orient: vertical;
		font-size: 0.9rem;
		padding-left: 0.5rem;
	}
	.readmore-btn {
		border: none;
		background: none;
		cursor: pointer;
		color: inherit;
		font-size: 0.9em;
	}
	.other-details {
		width: 80%;
		margin-top: 3em;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
	}
	.other-details span {
		display: flex;
		align-items: center;
		color: var(--text-clr-lighter);
	}

	.key {
		font-weight: 600;
		margin-right: 0.3em;
		color: var(--text-clr-lighter);
	}
	.recommended-section .icon {
		font-size: 3rem;
	}

	@media (max-width: 800px) {
		.movie-details {
			width: 95%;
			margin: auto;
			/* margin-top: 2em; */
			/* border: 2px solid var(--text-clr); */
			border-radius: 5px;
			padding: 1em 0;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		}
		.movie-details > * {
			width: 98%;
		}
		.movie-details-bottom {
			flex-direction: column;
			width: 98%;
		}
		.movie-details-bottom > * {
			width: 98%;
		}
		.movie-details-bottom-poster {
			max-width: none;
		}
		.poster-image-container {
			display: none;
		}
		.backdrop-image-container {
			display: flex;
		}
		.recommended-section{
			width: 90%;
		}
		.reviews-section {
			/* border: 2px solid blue; */
			width: 90%;
		}
	}
</style>
