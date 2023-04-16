<script>
    import Navbar from "../components/Navbar.svelte";
	import { ThemeStore, LoadingStore } from '../stores.js';
	console.log($LoadingStore)
</script>

<svelte:head>
	<meta name="color-scheme" content={$ThemeStore == 'system' ? 'light dark' :
	$ThemeStore}/> <link rel="stylesheet" href={`/theme/${$ThemeStore}.css`} />
    <title>MoviesCore 2</title>
</svelte:head>

<Navbar />
<slot />

<style>
    /* @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap'); */
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
	:global(body) {
		font-family: 'Inter', sans-serif;
		/* font-family: 'Source Sans Pro', sans-serif; */
        margin: 0;
        padding: 0;
		box-sizing: border-box;
		background-color: var(--background-clr);
		color: var(--text-clr);
		/* background: va; */
	}
    :global(header){
		background-color: var(--background-clr);
		color: var(--text-clr);
		display: flex;
		align-items: center;
		/* border-bottom: 0.5px solid hsl(180, 7%, 45%); */
		padding: 0.2em 0;
        /* border: 2px solid red; */
	}
    :global(main){
		width: 100%;
		/* border: 2px solid red; */
        /* margin-top: 1rem; */
	}
    :global(section) {
		width: 75%;
		margin: auto;
		/* border: 0.1px solid #F6F8FC; */
		margin-top: 2rem;
	}
	:global(.section-title){
		font-size: 1.2rem;
		font-weight: 500;
		display: block;
	}
	:global(button) {
		/* font-size: inherit; */
	}
	:global(.icon) {
		font-size: 1.3rem;
		color: var(--text-clr);
		margin-right: 0.2em;
	}

	@media (max-width: 400px) {
		:global(html) {
			font-size: 11px;
		}
	}
    
</style>

