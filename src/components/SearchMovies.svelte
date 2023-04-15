<script>
    import {fly} from 'svelte/transition'
    let inputValue = '';
    let inputRef;
    let active = false;
    import {goto} from '$app/navigation'
	import { onMount } from 'svelte';

    function cancelInactive() {
        if(inputValue){
            active=true;
        }
        else{
            active=false;
        }
    }

    onMount(() =>{
        inputRef.focus()
    })

    const submitSearch = () => {
        goto('/search/'+inputValue);
    }
</script>
<form class="search"  on:submit|preventDefault={submitSearch} in:fly={{x: -10, duration: 250, delay: 250}} out:fly={{x: -10, duration: 250}} >
    {#if !active}
        <label for="search-movie">Search Movies, TV Shows...</label>
    {/if}
    <input 
    bind:value={inputValue} 
    bind:this={inputRef}
    on:focus={() => (active=true)} 
    on:blur={cancelInactive} name="search-movie" type="text">
    {#if inputValue}
        <button type="submit" class="search-btn">Search</button>
        {:else}
        <button type="submit" class="search-btn" disabled>Search</button>
    {/if}
</form>

<style>
    .search{
        /* border: 2px solid red; */
        display: flex;
        position: relative;
        isolation: isolate;
        background-color: var(--accent-clr);
        color: var(--background-clr);
        width: 30%;
        border-radius: 10px;
        overflow: hidden;
        height: 5vh;
    }
    .search label{
        position: absolute;
        top: 32%;
        margin-left: 10px;
        opacity: 0.7;
        z-index: 1;
        font-size: 0.85rem;
    }
    .search input{
        display: block;
        outline: none;
        border: none;
        background: none;
        padding: 0.2em 0.6em;
        width: 75%;
        /* max-width: 300px; */
        min-width: 250px;
        z-index: 2;
        color: inherit;
        font-family: inherit;
        font-weight: normal;
    }
    .search-btn{
        font-family: inherit;
        background: #3094e6;
        outline: none;
        /* border: 1px solid rgb(200, 200, 200); */
        border: none;
        cursor: pointer;
        padding: 0.6em 1.5em;
        /* border-radius: 5px; */
        width: 25%;
        color: #fff;
        transition: all 200ms ease;
    }
    .search-btn:hover{
        transform: scaleX(1.1);
        color: #032541;
    }
    .search-btn:disabled{
        filter: grayscale(30%);
        cursor: default;
    }
    .search-btn:disabled:hover{
        transform: scaleX(1);
        color: #fff;
    }

    @media (max-width: 400px) {
        .search{
            width: 100%;
        }
        .search input{
            min-width: none;
            width: 100%;
            border: 2px solid red;
        }
    }
</style>