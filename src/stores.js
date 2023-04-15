import { writable } from 'svelte/store'

const ThemeStore = writable('light')

const LoadingStore = writable(false);

export { ThemeStore, LoadingStore }