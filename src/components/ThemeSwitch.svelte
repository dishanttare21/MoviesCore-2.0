<script lang="ts">
	import { ThemeStore } from '../stores.js';
</script>

<select bind:value={$ThemeStore}>
	<option value="system">System</option>
	<option value="light">Light</option>
	<option value="dark">Dark</option>
</select>
