<script>
	import { ThemeStore } from '../stores.js';
	let theme = 'light';

	ThemeStore.subscribe((data) => {
		theme = data;
	});

	const changeTheme = () => {
		if (theme === 'light') {
			ThemeStore.update((ThemeStore) => (ThemeStore = 'dark'));
		} else {
			ThemeStore.update((ThemeStore) => (ThemeStore = 'light'));
		}
	};

	let dropdown = false;
	const openDropdown = () => {
		dropdown = !dropdown;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
</svelte:head>
<header>
	<nav>
		<span class="navbar-text">
			<a href="/">MoviesCore 2.0</a>
		</span>
		<ul class="navbar-links">
			<li>
				<a href="/movies/now-playing">Movies</a>
				<!-- <div class="dropdown">
					<button class="navbar-link" onclick={openDropdown}>Movies</button>
					<div class={`dropdown-menu ${dropdown ? 'active' : ''}`}>
						<ul class="list">
							<li>
								<a href="/movies/now-playing">Now Playing</a>
							</li>
							<li>
								<a href="/movies/now-playing">Top Rated</a>
							</li>
							<li>
								<a href="/movies/now-playing">Latest</a>
							</li>
						</ul>
					</div>
				</div> -->

			</li>
			<li>
				<a href="/tv-shows" class="navbar-link">TV Shows</a>
			</li>
			<li>
				<a href="/search" class="navbar-link">Search</a>
			</li>
			<li>
				<button class="switch-theme-btn" on:click={changeTheme}>
					{#if theme === "light"}
						<i class="mi mi-sun"><span class="u-sr-only" /></i>
					{:else}
						<i class="mi mi-moon"><span class="u-sr-only" /></i>
					{/if}
					
				</button>
			</li>
		</ul>
	</nav>
</header>

<style>
	nav {
		width: 75%;
		/* border: 2px solid black; */
		display: flex;
		margin: auto;
		padding: 0;
		align-items: center;
		/* height: 7vh; */
		/* color: #fff; */

		color: var(--text-clr);
	}
	nav a {
		text-decoration: none;

		color: var(--text-clr);
		user-select: none;
	}
	.navbar-text {
		font-size: 1.4rem;
		font-weight: 700;
	}
	.navbar-links {
		font-size: 0.9rem;
		margin-left: auto;
		padding: 0;
		margin-right: 5rem;
		list-style: none;
		/* border: 2px solid red; */
		width: 30%;
		min-width: 250px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.navbar-link {
		border: 0;
		background: inherit;
		color: var(--text-clr);
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
	}
	.dropdown{
		position: relative;
	}
	.dropdown-menu{
		position: absolute;
		background-color: var(--background-clr);
		left: 0;
		top: calc(100% + 0.25rem);
		padding: 0.75rem;
		border-radius: 0.25rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		display: none;
	}
	.active{
		display: block;
	}
	.dropdown-menu .active{
		opacity: 1;
	}
	/* .dropdown > .navbar-link:focus + .dropdown-menu, .active {
		opacity: 1;
		transform: translateY(0px);
		pointer-events: auto;
	}
	.dropdown > .navbar-link:focus, .navbar-link:hover{
		color: var(--accent-clr);
	} */
	.list{
		list-style: none;
		padding: 0;
	}
	.list li{
		width: max-content;
		/* padding: 0.5em 1em; */
		/* border: 2px solid blue; */
		display: block;

	}
	.list a{
		display: inline-block;
		padding: 0.25rem;
		/* border: 2px solid red; */
	}
	.switch-theme-btn {
		font-family: inherit;
		background: none;
		border: none;
		display: block;
		cursor: pointer;
		border: 2px solid var(--text-clr);
		padding: 0.4em 0.5em;
		border-radius: 100vw;
		position: relative;
		transition: all 200ms ease-in;
		z-index: 1;
	}
	.switch-theme-btn:hover {
		color: var(--background-clr);
		background: var(--accent-clr-lighter);
	}
	
	/* .switch-theme-btn::after{
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: var(--accent-clr-lighter);
		z-index: -1;
		transform: scaleX(0);
		transition: transform 150ms ease-in;
		transform-origin: right;
		border-radius: 5px;
	}
	.switch-theme-btn:hover::after{
		transform: scaleX(1);
		transform-origin: left;
	} */

	.mi {
		font-size: 1.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.u-sr-only {
		
		position: absolute;
		left: -10000px;
		top: auto;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
